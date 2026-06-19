import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL").optional(),

  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
  CLERK_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),
});

function validateEnv(): z.infer<typeof envSchema> {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const missing = Object.entries(fieldErrors)
      .map(([k, v]) => `${k}: ${v?.join(", ")}`)
      .join("\n  ");
    throw new Error(`Invalid environment variables:\n  ${missing}`);
  }
  return parsed.data;
}

export const env = validateEnv();
