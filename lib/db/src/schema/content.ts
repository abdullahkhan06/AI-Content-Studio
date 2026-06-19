import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const generatedContentTable = pgTable("generated_content", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),

  type: text("type", {
    enum: ["image", "caption", "hashtags", "video_script"],
  }).notNull(),
  platform: text("platform", {
    enum: ["instagram", "tiktok", "youtube", "twitter", "facebook", "generic"],
  })
    .notNull()
    .default("generic"),

  prompt: text("prompt"),
  result: text("result"),
  mediaUrl: text("media_url"),
  metadata: jsonb("metadata"),

  status: text("status", {
    enum: ["pending", "generating", "completed", "failed"],
  })
    .notNull()
    .default("pending"),

  publishedAt: timestamp("published_at"),
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const brandKnowledgeTable = pgTable("brand_knowledge", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),

  title: text("title").notNull(),
  content: text("content").notNull(),
  embedding: text("embedding"),
  chunkIndex: integer("chunk_index").notNull().default(0),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertGeneratedContentSchema = createInsertSchema(
  generatedContentTable
).omit({ createdAt: true, updatedAt: true });

export const insertBrandKnowledgeSchema = createInsertSchema(
  brandKnowledgeTable
).omit({ createdAt: true, updatedAt: true });

export type InsertGeneratedContent = typeof generatedContentTable.$inferInsert;
export type GeneratedContent = typeof generatedContentTable.$inferSelect;

export type InsertBrandKnowledge = typeof brandKnowledgeTable.$inferInsert;
export type BrandKnowledge = typeof brandKnowledgeTable.$inferSelect;
