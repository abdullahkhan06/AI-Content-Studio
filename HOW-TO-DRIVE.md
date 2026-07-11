# How to Drive the AI Agent — Bootcamp Workflow

> One page. Nothing in here is slice-specific, so nothing in here can go stale.
> **What to build** always comes from two places only: the active `plan-phase-N.md` file + the Linear issue.
> **How to behave** is defined once, in `agents.md` (Claude Code reads it as `CLAUDE.md`, Replit as `replit.md` — same rules).
> If any other document disagrees with the plan file, the plan file wins — and tell the instructor.

Works with any coding agent — Replit Agent, Claude Code, Cursor, etc. The rules live in the repo's agent-instruction files, which your tool loads automatically; these prompts just steer the session.

## The golden rules

1. **One slice per session.** Finish, review, then start the next.
2. **Match Linear issues by title, never by number.** Everyone's board numbers issues differently. If two issues share a title, use the one assigned to a phase milestone.
3. **Server Actions, not browser-called `/api` routes.** Project convention (see the Hard rules in `agents.md`). On Replit it's mandatory — the workspace proxy intercepts `/api/*`. On other setups it keeps every student's repo consistent with the plans. External webhooks (Clerk, Stripe) are the exception.
4. **The agent updates `progress.md` and the Linear issue at the end of every slice.** If it didn't, tell it to.

## Prompt 1 — Start a session

```
Read agents.md, then read progress.md. What's the next slice to work on?
Tell me what it is, then wait for my go-ahead before starting.
```

Sanity-check its answer against `plan-index.md` (right phase? right order?). Then:

## Prompt 2 — Go-ahead

```
Go ahead. Follow the active plan-phase file for the spec and the rules in agents.md.
Build only this slice, then stop and wait for my review.
```

That's deliberately short: everything else (Server Actions, exact schema names, design.md before UI, typecheck/lint loop, Linear completion comment, progress.md update) is already mandated by `agents.md`. If the agent skips one of those duties, don't extend this prompt — point it back: *"You skipped [X] — agents.md requires it."*

## Prompt 3 — Review (⚠️ run this in a NEW session, not the build session)

Start a **fresh session** for the review. An agent reviewing its own work in the same session inherits its own assumptions and marks its own homework — a fresh session reads the actual code with no memory of writing it. (This is also the rule in `agents.md`: never review your own work in the same session.)

```
You are reviewing a completed slice — you did not build it.
1. Read progress.md (Current status + latest session log entry) and the slice's Linear
   completion comment to learn what was done and which files were touched.
2. Read the Acceptance Criteria for this slice in the active plan-phase file and turn
   them into a QA checklist.
3. Verify each item against the CURRENT code — read the real files, don't trust the
   session log's claims. Report pass/fail per item.
4. Then look beyond the checklist: bugs, unhandled errors, edge cases (empty input,
   failed API call, missing data), security issues.
5. Fix ONLY what fails or is broken. Do not refactor, do not add features, do not
   "improve" working code. If everything passes, say so and change nothing.
```

This works for every slice in every phase — the checklist is generated fresh from the plan file each time, so it can never drift.

Then do your own human QA: click through the feature yourself. The agent verifying itself is necessary but not sufficient.

## Fix templates (paste when something's off)

**It compiles but doesn't work**
```
The code compiles but [FEATURE] doesn't work at runtime. Check browser console and server logs.
Expected: [EXPECTED]. Actual: [ACTUAL]. Fix it and verify it works, not just compiles.
```

**UI looks wrong**
```
The UI for [PAGE] doesn't match the design system. Read design.md again: Zinc base, Emerald accent,
dark mode first, shadcn/ui components, Phosphor icons. Premium, not template-y. Fix and show me what changed.
```

**Missing error handling**
```
[FEATURE] has no error handling. What if the API call fails? Empty input? DB unreachable?
Add try/catch, user-friendly messages via toast, loading states. Don't just console.log.
```

**Doesn't match the plan**
```
Read the active plan-phase file again. The implementation deviates: [DEVIATION].
Align with the plan. If you think the plan is wrong, tell me why — don't silently change it.
```

## Replit Agent only: mode per slice type

(Claude Code / Cursor users: skip this — it's Replit's cost-control setting.)

| Slice type | Mode |
|---|---|
| Config, schema, data files | Lite |
| Service classes, pipelines, integrations | Economy |
| Complex multi-state UI (wizards, calendars, dashboards) | Power |

## One-time catch-up (only if you built slices before 2026-07-08)

The old prompts file had drifted from the plans. Run this **once** to find and fix the known drift in your repo:

```
Audit this repo for drift against the plan files. Check each item, report what you find, then fix:

1. ENUMS — src/db/schema.ts must have BRAND_TONES = professional/casual/playful/luxury (NOT friendly/bold)
   and BUSINESS_TYPES with 8 values: restaurant, e-commerce, salon, gym, real_estate, fashion, freelancer,
   other (NOT "fitness"/"real estate"). If your DB has rows using old enum values, write a data migration
   mapping old → new before changing the enum.

2. API ROUTES — find any src/app/api/* routes that a browser calls directly (webhooks are fine).
   Convert browser-called routes to Server Actions (project convention; on Replit /api/* is intercepted
   by the workspace proxy).

3. TABLE NAMES — the plan names are: brand_embeddings, content_plans, generations, asset_kits,
   pipeline_logs, generation_feedback. If you created brand_knowledge, assets, muapi_usage, or
   generation_metrics instead, rename via migration and update all imports.

4. PROFILE FIELDS — business_profiles must include businessEvents (jsonb) and region (text). Add if missing.

5. MODEL ROUTER — trim to the 5 image asset types (product-photo, social-graphic, premium-graphic,
   background-removal, reframe) — video is Phase 3. Verify every model id and price against
   https://api.muapi.ai/api/v1/models — especially: it's bytedance-seedream-v4 (seedream-v4 does not
   exist), flux-schnell is $0.003, and luma-flash-reframe must NOT be the image reframe (it's a video model).

6. STRIPE PRICING — if you hardcoded $29/$79 tiers or credit limits, mark them clearly as placeholder
   config; final pricing comes after COGS analysis (plan-phase-6.md).

After fixing: run pnpm typecheck && pnpm lint && pnpm build, update progress.md with what drifted
and what you changed, and post a comment on the relevant Linear issues.
```

Also archive any duplicate issues on your Linear board (leftovers from the initial import — same titles as real slices but no milestone). While they exist, title-matching can pick the wrong issue.
