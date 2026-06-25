import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env";

// NOTE: This route lives at /webhooks/clerk (NOT /api/webhooks/clerk).
// The api-server artifact owns paths=["/api"], so any Next.js route under /api
// is intercepted by Express and never reaches Next.js.
// Configure your Clerk webhook URL to: https://<domain>/webhooks/clerk

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response("CLERK_WEBHOOK_SECRET not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const {
      id: clerkId,
      email_addresses,
      first_name,
      last_name,
      image_url,
      primary_email_address_id,
    } = evt.data;

    const primaryEmail = email_addresses.find(
      (e) => e.id === primary_email_address_id
    )?.email_address;

    if (!primaryEmail) {
      return new Response("No primary email", { status: 400 });
    }

    await db.insert(users).values({
      clerkId,
      email: primaryEmail,
      firstName: first_name ?? null,
      lastName: last_name ?? null,
      imageUrl: image_url ?? null,
    });
  }

  if (eventType === "user.updated") {
    const {
      id: clerkId,
      email_addresses,
      first_name,
      last_name,
      image_url,
      primary_email_address_id,
    } = evt.data;

    const primaryEmail = email_addresses.find(
      (e) => e.id === primary_email_address_id
    )?.email_address;

    const updateData: Partial<typeof users.$inferInsert> = {
      firstName: first_name ?? null,
      lastName: last_name ?? null,
      imageUrl: image_url ?? null,
    };

    if (primaryEmail) {
      updateData.email = primaryEmail;
    }

    await db.update(users).set(updateData).where(eq(users.clerkId, clerkId));
  }

  if (eventType === "user.deleted") {
    const { id: clerkId } = evt.data;
    if (clerkId) {
      await db.delete(users).where(eq(users.clerkId, clerkId));
    }
  }

  return new Response("OK", { status: 200 });
}
