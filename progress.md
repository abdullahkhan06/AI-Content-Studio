# AI Content Studio — Progress

> Current status at top is overwritten every session. Session log below is append-only (keep last 5 entries).

## Current status

- **Active phase**: Phase 0 — Scaffold + Auth + DB
- **Active plan file**: `plan-phase-0.md`
- **Current sub-task**: STU-2 — Scaffold (BLOCKED before start)
- **Next action**: Human decision required on monorepo architecture (see blocker)
- **UI work**: no
- **Blockers**: Replit monorepo artifact system has no Next.js artifact type. `createArtifact()` supports: react-vite, expo, data-visualization, slides, video-js, mockup-sandbox. Plan calls for Next.js 15 App Router (full-stack). Three options surfaced for human decision — see session log.
- **Files modified**: (none yet)

---

## Session log

### 2026-06-19 — Phase 0, STU-2 — Pre-start blocker

**What happened:** Read all required files (replit.md, workflow.md, progress.md, plan-phase-0.md, context.md, artifacts SKILL.md). Discovered architectural conflict before writing any code.

**Blocker:** The Replit monorepo only supports these artifact types via `createArtifact()`: `react-vite`, `expo`, `data-visualization`, `slides`, `video-js`, `mockup-sandbox`. There is no `nextjs` type. The plan calls for Next.js 15 App Router as the full-stack framework. Running `create-next-app` at the workspace root collides with the monorepo structure (pnpm-workspace.yaml, tsconfig.json, etc.).

**Three options for human decision:**
1. **Manual Next.js in artifacts/** — Create `artifacts/web-app/` manually (not via `createArtifact`), write `artifact.toml` and workflow config by hand. Stays on Next.js 15 but operates outside the standard artifact lifecycle.
2. **Pivot to react-vite + api-server** — Use `react-vite` artifact for the frontend (React + Vite + TanStack Router), route API calls to the existing Express `api-server` artifact. Drops Next.js SSR/RSC, gains monorepo compliance. Tech stack changes significantly.
3. **Standalone Next.js outside the monorepo structure** — Set up the entire app in a top-level directory alongside the monorepo, configure a custom workflow. Highest risk of conflicts.

**Deferred:** All code work. No files created or modified.

**Tech debt observed:** None yet — blocked pre-code.

**Test/lint/build status:** N/A.
