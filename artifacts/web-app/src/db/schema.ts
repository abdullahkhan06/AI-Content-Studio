import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// Canonical users schema — matches lib/db push (first_name/last_name, plan, usage counters).
// Do NOT add name/role columns — they don't exist in Neon.
export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(createId),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  imageUrl: text("image_url"),

  plan: text("plan", { enum: ["free", "starter", "growth", "pro"] })
    .notNull()
    .default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status"),

  businessName: text("business_name"),
  businessDescription: text("business_description"),
  brandVoice: text("brand_voice"),
  targetAudience: text("target_audience"),
  industry: text("industry"),

  imagesGeneratedThisMonth: integer("images_generated_this_month")
    .notNull()
    .default(0),
  captionsGeneratedThisMonth: integer("captions_generated_this_month")
    .notNull()
    .default(0),
  videosGeneratedThisMonth: integer("videos_generated_this_month")
    .notNull()
    .default(0),
  usageResetAt: timestamp("usage_reset_at"),

  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
