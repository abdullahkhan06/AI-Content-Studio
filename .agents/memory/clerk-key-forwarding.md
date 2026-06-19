---
name: Clerk publishable key forwarding in Next.js on Replit
description: Replit sets CLERK_PUBLISHABLE_KEY (no NEXT_PUBLIC_ prefix); must be forwarded in next.config.ts env block.
---

# Clerk Key Forwarding — Replit + Next.js

**The rule:** Replit's `setupClerkWhitelabelAuth()` sets `CLERK_PUBLISHABLE_KEY` (no `NEXT_PUBLIC_` prefix). Next.js client code requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. Forward it in `next.config.ts`.

**How to apply:**
```ts
// next.config.ts
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  },
};
```

**Why:** Next.js only exposes env vars prefixed `NEXT_PUBLIC_` to the browser bundle. Replit's Clerk integration sets the unprefixed key. Without the forwarding, `@clerk/nextjs` cannot initialize on the client.
