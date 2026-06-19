import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { TRACER_BUSINESS } from "@/lib/tracer-data";

export interface TracerResult {
  business: typeof TRACER_BUSINESS;
  image: {
    url: string;
    r2Url: string | null;
    model: string;
    costUsd: number;
    durationMs: number;
  } | null;
  caption: {
    text: string;
    hashtags: string[];
    model: string;
    durationMs: number;
  } | null;
  error: string | null;
  steps: TracerStep[];
}

export interface TracerStep {
  name: string;
  status: "pending" | "running" | "success" | "error";
  message: string;
  durationMs?: number;
}

export async function POST(): Promise<NextResponse<TracerResult>> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      {
        business: TRACER_BUSINESS,
        image: null,
        caption: null,
        error: "Unauthorized",
        steps: [],
      },
      { status: 401 }
    );
  }

  const steps: TracerStep[] = [];
  let imageUrl: string | null = null;
  let r2Url: string | null = null;
  let imageModel = "";
  let imageCostUsd = 0;
  let imageDurationMs = 0;
  let captionText = "";
  let hashtags: string[] = [];
  let captionModel = "";
  let captionDurationMs = 0;

  const muapiKey = process.env.MUAPI_API_KEY;
  const openaiBaseUrl = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const openaiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

  if (!muapiKey) {
    steps.push({
      name: "Muapi check",
      status: "error",
      message: "MUAPI_API_KEY not configured — skipping image generation",
    });
  } else {
    const imageStart = Date.now();
    steps.push({ name: "Muapi image generation", status: "running", message: "Calling ai-product-photography…" });
    try {
      const prompt = `A ${TRACER_BUSINESS.products[0]} on a rustic wooden table, morning light, aesthetic café setting, ${TRACER_BUSINESS.brandColors[1]} tones, professional food photography`;
      const muapiRes = await fetch("https://api.muapi.ai/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${muapiKey}`,
        },
        body: JSON.stringify({
          model: "ai-product-photography",
          prompt,
        }),
      });

      imageDurationMs = Date.now() - imageStart;
      const costHeader = muapiRes.headers.get("X-MuAPI-Cost-USD");
      imageCostUsd = costHeader ? parseFloat(costHeader) : 0;
      imageModel = "ai-product-photography";

      if (!muapiRes.ok) {
        const errText = await muapiRes.text();
        steps[steps.length - 1] = {
          name: "Muapi image generation",
          status: "error",
          message: `Muapi returned ${muapiRes.status}: ${errText.slice(0, 200)}`,
          durationMs: imageDurationMs,
        };
      } else {
        const muapiData = (await muapiRes.json()) as { url?: string; output?: string[] };
        imageUrl = muapiData.url ?? muapiData.output?.[0] ?? null;
        steps[steps.length - 1] = {
          name: "Muapi image generation",
          status: imageUrl ? "success" : "error",
          message: imageUrl
            ? `Image generated. Cost: $${imageCostUsd.toFixed(4)}`
            : "No image URL in response",
          durationMs: imageDurationMs,
        };
      }
    } catch (err) {
      imageDurationMs = Date.now() - imageStart;
      steps[steps.length - 1] = {
        name: "Muapi image generation",
        status: "error",
        message: err instanceof Error ? err.message : "Unknown error",
        durationMs: imageDurationMs,
      };
    }

    if (imageUrl) {
      const r2AccountId = process.env.R2_ACCOUNT_ID;
      const r2AccessKey = process.env.R2_ACCESS_KEY_ID;
      const r2SecretKey = process.env.R2_SECRET_ACCESS_KEY;
      const r2Bucket = process.env.R2_BUCKET_NAME;
      const r2PublicUrl = process.env.R2_PUBLIC_URL;

      if (!r2AccountId || !r2AccessKey || !r2SecretKey || !r2Bucket) {
        steps.push({
          name: "R2 upload",
          status: "error",
          message: "R2 credentials not configured — skipping upload. Image URL from Muapi: " + imageUrl,
        });
        r2Url = imageUrl;
      } else {
        const r2Start = Date.now();
        steps.push({ name: "R2 upload", status: "running", message: "Downloading and uploading to R2…" });
        try {
          const imgRes = await fetch(imageUrl);
          const imgBuffer = await imgRes.arrayBuffer();
          const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";
          const key = `tracer/${Date.now()}.jpg`;

          const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
          const s3 = new S3Client({
            region: "auto",
            endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
            credentials: { accessKeyId: r2AccessKey, secretAccessKey: r2SecretKey },
          });
          await s3.send(new PutObjectCommand({
            Bucket: r2Bucket,
            Key: key,
            Body: Buffer.from(imgBuffer),
            ContentType: contentType,
          }));
          r2Url = r2PublicUrl ? `${r2PublicUrl}/${key}` : imageUrl;
          steps[steps.length - 1] = {
            name: "R2 upload",
            status: "success",
            message: `Uploaded to R2: ${key}`,
            durationMs: Date.now() - r2Start,
          };
        } catch (err) {
          steps[steps.length - 1] = {
            name: "R2 upload",
            status: "error",
            message: err instanceof Error ? err.message : "R2 upload failed",
            durationMs: Date.now() - r2Start,
          };
          r2Url = imageUrl;
        }
      }
    }
  }

  if (!openaiBaseUrl || !openaiKey) {
    steps.push({
      name: "GPT caption",
      status: "error",
      message: "OpenAI integration not configured",
    });
  } else {
    const captionStart = Date.now();
    steps.push({ name: "GPT caption", status: "running", message: "Generating caption with GPT-4.1-mini…" });
    try {
      const systemPrompt = `You are a social media content writer for ${TRACER_BUSINESS.name}, a ${TRACER_BUSINESS.type}. Brand tone: ${TRACER_BUSINESS.brandTone}. Target customers: ${TRACER_BUSINESS.targetCustomers}. Products: ${TRACER_BUSINESS.products.join(", ")}.`;
      const userPrompt = `Write an Instagram caption for a photo of our ${TRACER_BUSINESS.products[0]}. Keep it ${TRACER_BUSINESS.brandTone}, engaging, and under 150 characters. Then provide 10 relevant hashtags. Respond as JSON: { "caption": "...", "hashtags": ["#tag1", "#tag2", ...] }`;

      const openaiRes = await fetch(`${openaiBaseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });

      captionDurationMs = Date.now() - captionStart;
      captionModel = "gpt-4.1-mini";

      if (!openaiRes.ok) {
        const errText = await openaiRes.text();
        steps[steps.length - 1] = {
          name: "GPT caption",
          status: "error",
          message: `OpenAI returned ${openaiRes.status}: ${errText.slice(0, 200)}`,
          durationMs: captionDurationMs,
        };
      } else {
        const openaiData = (await openaiRes.json()) as {
          choices: Array<{ message: { content: string } }>;
        };
        const content = openaiData.choices[0]?.message?.content ?? "{}";
        const parsed = JSON.parse(content) as { caption?: string; hashtags?: string[] };
        captionText = parsed.caption ?? "";
        hashtags = parsed.hashtags ?? [];
        steps[steps.length - 1] = {
          name: "GPT caption",
          status: "success",
          message: `Caption generated (${captionText.length} chars, ${hashtags.length} hashtags)`,
          durationMs: captionDurationMs,
        };
      }
    } catch (err) {
      captionDurationMs = Date.now() - captionStart;
      steps[steps.length - 1] = {
        name: "GPT caption",
        status: "error",
        message: err instanceof Error ? err.message : "Caption generation failed",
        durationMs: captionDurationMs,
      };
    }
  }

  return NextResponse.json({
    business: TRACER_BUSINESS,
    image: imageUrl
      ? {
          url: imageUrl,
          r2Url,
          model: imageModel,
          costUsd: imageCostUsd,
          durationMs: imageDurationMs,
        }
      : null,
    caption:
      captionText
        ? {
            text: captionText,
            hashtags,
            model: captionModel,
            durationMs: captionDurationMs,
          }
        : null,
    error: null,
    steps,
  });
}
