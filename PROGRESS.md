# PROGRESS

## Current Status

**Active Phase:** Phase 0 — Scaffold + Auth + DB  
**Phase Status:** Complete (all slices done)  
**Next Phase:** Phase 1 (check plan-phase-1.md when ready)

### Phase 0 Slice Status

| Slice | Title | Linear | Status |
|-------|-------|--------|--------|
| AIA-3 | Scaffold Next.js 15 + Tailwind + shadcn/ui | AIA-3 | Done |
| AIA-1 | Clerk auth (sign-in, sign-up, middleware) | AIA-1 | Done |
| AIA-2 | Drizzle ORM + Neon schema push | AIA-2 | Done |
| AIA-5 | Clerk webhook → upsert user in DB | AIA-3/AIA-2 | Done (part of AIA-2) |
| AIA-4 | Landing page (3-section MVP) | AIA-3 | Done (part of AIA-3) |
| AIA-6 | Dashboard shell | AIA-3 | Done (part of AIA-3) |

### What's Live

- **URL:** Running on port 22965 in Replit dev
- **Landing page** `/` — hero, features (6), pricing (3 tiers: $19/$49/$99), footer
- **Auth** — Clerk sign-in/sign-up modal + dedicated pages, middleware protecting all non-public routes
- **Dashboard** `/dashboard` — sidebar nav, header, auth-gated, empty state
- **Webhook** `/api/webhooks/clerk` — handles user.created, user.updated, user.deleted (upserts to Neon via @neondatabase/serverless)
- **DB** — Neon PostgreSQL with 3 tables: `users`, `generated_content`, `brand_knowledge` — schema pushed
- **Legal** `/privacy`, `/terms` — placeholder content

### Tech decisions locked in

- Next.js 15.5 App Router, TypeScript strict
- Tailwind v4 OKLCH dark theme
- Drizzle ORM lib in `lib/db/` (shared workspace), node-postgres for migrations
- Webhook uses `@neondatabase/serverless` (edge-compatible, not the lib/db node-postgres client)
- `drizzle-zod` v0.8.x — uses `$inferInsert`/`$inferSelect` types, NOT `createSelectSchema` (Zod v4 compat issue)
- All 55 shadcn/ui components installed with full radix deps

---

## Session Log

### 2026-06-19 — Session 2

**Goal:** AIA-1 (Clerk auth) + AIA-2 (Drizzle schema) + remaining Phase 0 cleanup

**Done:**
- Schema: `users`, `generated_content`, `brand_knowledge` tables defined in `lib/db/src/schema/`
- Fixed `drizzle-zod` v4 compat issue (use `$inferInsert`/`$inferSelect`, not `createSelectSchema`)
- `pnpm --filter @workspace/db run push` → tables live in Neon
- Added all missing shadcn/ui radix deps (55 components now typecheck clean)
- Webhook `/api/webhooks/clerk` — full user.created/updated/deleted with Neon serverless
- Privacy + Terms pages added
- AIA-1, AIA-2, AIA-3 marked Done in Linear
- `pnpm typecheck:libs` → 0 errors
- `pnpm --filter @workspace/web-app run typecheck` → 0 errors

### 2026-06-19 — Session 1

**Goal:** AIA-3 scaffold + kick off AIA-1/AIA-2

**Done:**
- Next.js 15.5 scaffolded in `artifacts/web-app/` (App Router, src/ dir, TypeScript strict)
- Tailwind v4 OKLCH dark theme configured
- Clerk auth: ClerkProvider, middleware, sign-in/sign-up pages
- Landing page: hero + 6 features + 3-tier pricing
- Dashboard shell: sidebar nav + header + empty state
- Webhook stub at `/api/webhooks/clerk`
- Error boundary + not-found page
- Replit-managed Clerk provisioned (dev keys active)
- AIA-3 marked Done in Linear
