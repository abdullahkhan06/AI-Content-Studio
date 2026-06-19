---
name: Webhook route DB driver — use Neon serverless, not lib/db
description: The Clerk webhook route (and any Next.js API route) must use @neondatabase/serverless, not the lib/db node-postgres client.
---

# Webhook / API Route DB Driver

**The rule:** Next.js API routes (including webhooks) must use `@neondatabase/serverless` + `drizzle-orm/neon-http`, not `@workspace/db` (which uses node-postgres / Pool).

**Why:** `lib/db` uses `pg` (node-postgres) with a connection Pool. Next.js API routes in App Router may run in edge or serverless contexts where TCP connections (node-postgres) are not available or create connection pool exhaustion. `@neondatabase/serverless` uses HTTP to Neon and is safe in all Next.js contexts. Also, `@workspace/db` is a workspace lib whose TypeScript module resolution does not work inside Next.js artifact tsconfig (no paths alias for `@workspace/*`).

**How to apply:**
```ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return drizzle(neon(url));
}
```

Define the table schema inline (or import from a shared types-only module) — do not import from `@workspace/db`.
