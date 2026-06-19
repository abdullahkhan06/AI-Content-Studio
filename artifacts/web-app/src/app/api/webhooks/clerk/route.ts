import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  imageUrl: text("image_url"),
  plan: text("plan").notNull().default("free"),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  imagesGeneratedThisMonth: integer("images_generated_this_month").notNull().default(0),
  captionsGeneratedThisMonth: integer("captions_generated_this_month").notNull().default(0),
  videosGeneratedThisMonth: integer("videos_generated_this_month").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return drizzle(neon(url));
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

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

    const db = getDb();
    await db.insert(usersTable).values({
      id: randomUUID(),
      clerkId,
      email: primaryEmail,
      firstName: first_name ?? null,
      lastName: last_name ?? null,
      imageUrl: image_url ?? null,
      plan: "free",
      onboardingCompleted: false,
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

    if (primaryEmail) {
      const db = getDb();
      await db
        .update(usersTable)
        .set({
          email: primaryEmail,
          firstName: first_name ?? null,
          lastName: last_name ?? null,
          imageUrl: image_url ?? null,
          updatedAt: new Date(),
        })
        .where(eq(usersTable.clerkId, clerkId));
    }
  }

  if (eventType === "user.deleted") {
    const { id: clerkId } = evt.data;
    if (clerkId) {
      const db = getDb();
      await db.delete(usersTable).where(eq(usersTable.clerkId, clerkId));
    }
  }

  return new Response("OK", { status: 200 });
}
