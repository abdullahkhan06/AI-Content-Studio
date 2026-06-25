# PROGRESS

## Current Status

**Active Phase:** Phase 0.5 — Tracer Bullet  
**Phase Status:** AIA-8 done. AIA-10 + AIA-11 blocked on credentials (MUAPI_API_KEY, R2 keys).  
**Next:** Provide MUAPI_API_KEY, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL to unblock AIA-10/11.

**Phase 0 Audit (2026-06-25):** All acceptance criteria verified. Two bugs found and fixed — see Session 4 log.  
**Clerk (2026-06-25):** Switched to user-managed external Clerk. Removed Replit-managed key forwarding from next.config.ts. Stale-session guard middleware added.

---

## Concepts Introduced (cumulative)
<!-- Updated by agent after each slice. Don't re-explain known concepts in Linear comments. -->
- AIA-3: Next.js framework, TypeScript strict mode, App Router, Tailwind CSS, shadcn/ui component library
- AIA-1: Route-based authentication, middleware, protected routes
- AIA-2: Schema-as-code, database migrations, webhook-driven data sync
- AIA-8: End-to-end pipeline validation (tracer bullet pattern), environment variable validation

---

### Phase 0.5 Slice Status

| Slice | Title | Linear | Status |
|-------|-------|--------|--------|
| AIA-8 | Hardcoded business profile + tracer page shell | AIA-8 | Done |
| AIA-10 | Muapi integration proof (generate photo, parse cost, save to R2) | AIA-10 | Blocked — needs MUAPI_API_KEY + R2 |
| AIA-11 | GPT caption proof (caption conditioned on business profile) | AIA-11 | Blocked — needs AIA-10 |

### Phase 0 Slice Status (Complete)

| Slice | Title | Linear | Status |
|-------|-------|--------|--------|
| AIA-3 | Scaffold Next.js 15 + Tailwind + shadcn/ui | AIA-3 | Done |
| AIA-1 | Clerk auth (sign-in, sign-up, middleware) | AIA-1 | Done |
| AIA-2 | Drizzle ORM + Neon schema push | AIA-2 | Done |
| AIA-5 | Clerk webhook → upsert user in DB | — | Done (part of AIA-2) |
| AIA-4 | Landing page (3-section MVP) | — | Done (part of AIA-3) |
| AIA-6 | Dashboard shell | — | Done (part of AIA-3) |

### What's Live

- **URL:** Running on port 22965 in Replit dev
- **Landing page** `/` — hero, features (6), pricing (3 tiers: $19/$49/$99), footer
- **Auth** — Clerk sign-in/sign-up modal + dedicated pages, middleware protecting all non-public routes
- **Dashboard** `/dashboard` — sidebar nav, header, auth-gated, empty state
- **Tracer** `/tracer` — full pipeline page (Muapi → R2 → GPT). Runs when MUAPI_API_KEY set.
- **Webhook** `/api/webhooks/clerk` — handles user.created/updated/deleted → Neon upsert
- **DB** — Neon PostgreSQL: `users`, `generated_content`, `brand_knowledge`
- **Legal** `/privacy`, `/terms`

### Tech decisions locked in

- Next.js 15.5 App Router, TypeScript strict
- Tailwind v4 OKLCH dark theme
- Drizzle ORM lib in `lib/db/` (shared workspace), node-postgres for migrations
- Webhook + API routes use `@neondatabase/serverless` (not lib/db node-postgres)
- `drizzle-zod` v0.8.x — use `$inferInsert`/`$inferSelect`, NOT `createSelectSchema`
- All 55 shadcn/ui components installed with full radix deps
- OpenAI via Replit AI Integrations proxy (AI_INTEGRATIONS_OPENAI_BASE_URL + API_KEY)
- R2 uploads via @aws-sdk/client-s3 (S3-compatible endpoint)

---

## Session Log

### 2026-06-25 — Session 4 (Phase 0 Audit)

**Goal:** Validate all Phase 0 integrations, env vars, DB, Clerk auth, webhook, and routing.

**Bugs found and fixed:**

**Bug 1 — Webhook unreachable (critical)**
- Root cause: api-server artifact owns `paths=["/api"]` in artifact.toml. Every `/api/*` request is routed to Express — Next.js never sees them. The Clerk webhook at `/api/webhooks/clerk` has been returning 404 from Express since day one.
- Fix: Moved webhook to `src/app/webhooks/clerk/route.ts`. Updated middleware to allow `/webhooks(.*)` as a public route. Old `src/app/api/webhooks/` directory deleted.
- Action needed: Update Clerk Dashboard webhook URL to `https://<REPLIT_DEV_DOMAIN>/webhooks/clerk`.

**Bug 2 — Schema mismatch (critical)**
- Root cause: `artifacts/web-app/src/db/schema.ts` defined `users` with `name`/`role` columns. Neon was pushed from `lib/db/src/schema/users.ts` which has `first_name`/`last_name`/`plan` — no `name` or `role`. Webhook inserts would fail on column-not-found.
- Fix: Replaced web-app `src/db/schema.ts` with the canonical lib/db schema (firstName, lastName, plan, Stripe fields, usage counters, onboardingCompleted). Webhook handler updated to write `firstName`/`lastName` separately.

**All Phase 0 acceptance criteria verified:**
- ✅ `/` → 200, landing page with all sections + meta + JSON-LD SEO
- ✅ `/sign-in`, `/sign-up` → 200, Clerk hosted components
- ✅ `/privacy`, `/terms` → 200
- ✅ Unauthenticated `/dashboard` → middleware redirects to /sign-in (confirmed via Clerk session logs)
- ✅ `/webhooks/clerk` POST → 400 "Missing svix headers" (reachable, signature check working)
- ✅ Neon DB: `pnpm --filter @workspace/db run push` → `[✓] Changes applied`
- ✅ typecheck: 0 errors | lint: 0 errors
- ✅ All env vars set: DATABASE_URL, CLERK_SECRET_KEY, CLERK_WEBHOOK_SECRET, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, AI_INTEGRATIONS_OPENAI_BASE_URL + API_KEY

**Still missing (Phase 0.5, not Phase 0):** MUAPI_API_KEY, R2_* keys

### 2026-06-19 — Session 3

**Goal:** Phase 0.5 AIA-8 — tracer page shell

**Done:**
- OpenAI Replit AI Integrations provisioned
- env.ts updated with all integration env vars (optional, validated at runtime)
- TRACER_BUSINESS hardcoded profile (Sunrise Café)
- /api/tracer/route.ts — full 3-step pipeline: Muapi → R2 → GPT-4.1-mini
- /tracer page — animated pipeline UI with step status, image display, caption+hashtags, cost breakdown
- @aws-sdk/client-s3 installed
- AIA-8 marked Done in Linear
- 0 typecheck errors

**Awaiting:** MUAPI_API_KEY, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL from user

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
