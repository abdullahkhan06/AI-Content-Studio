---
name: Clerk publishable key forwarding in Next.js on Replit
description: Replit sets CLERK_PUBLISHABLE_KEY (no NEXT_PUBLIC_ prefix); must be forwarded in next.config.ts env block — ONLY when using Replit-managed Clerk.
---

# Clerk Key Configuration — Replit + Next.js

## Replit-managed Clerk (status = "managed")

Replit's `setupClerkWhitelabelAuth()` sets `CLERK_PUBLISHABLE_KEY` (no `NEXT_PUBLIC_` prefix). Next.js client code requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. Forward it in `next.config.ts`:

```ts
// next.config.ts
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  },
};
```

**Why:** Next.js only exposes env vars prefixed `NEXT_PUBLIC_` to the browser bundle. Replit's Clerk integration sets the unprefixed key. Without the forwarding, `@clerk/nextjs` cannot initialize on the client.

## External / user-managed Clerk (status = "external" or "unknown")

When the user sets their own Clerk keys — `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET` — as Replit secrets:

**Do NOT include the forwarding in next.config.ts.** The user's `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` secret is used directly by Next.js. Adding the forwarding would override it with the Replit-managed key, causing a KID mismatch crash.

```ts
// next.config.ts — external Clerk setup (no NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY override)
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in",
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up",
  },
};
```

**Why:** Two different Clerk publishable keys pointing to two different instances causes `jwk-kid-mismatch` and `infinite redirect loop` errors. The env block override silently wins over the secret, so the symptom (wrong instance) is hard to trace.

## Stale-session middleware guard (keep regardless of Clerk type)

The middleware wraps `clerkMiddleware` in a try-catch that detects KID mismatch / redirect-loop errors, clears all Clerk cookies (with `SameSite=None; Secure`), and redirects to `/sign-in`. This prevents a 404 crash loop when browser cookies are from the wrong instance.

**How to apply:** See `artifacts/web-app/src/middleware.ts` — `isClerkStaleSessionError` + `clearClerkCookies`.
