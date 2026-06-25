import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { type NextFetchEvent, NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/privacy",
  "/terms",
  // Webhook lives at /webhooks/* (NOT /api/webhooks/*) to avoid the
  // api-server artifact intercepting paths=["/api"] before Next.js sees them.
  "/webhooks(.*)",
]);

// All cookie names that Clerk sets in the browser for dev mode.
const CLERK_COOKIE_NAMES = [
  "__session",
  "__client_uat",
  "__clerk_db_jwt",
  "__refresh",
];

// Patterns that indicate a stale/mismatched Clerk session that can't be
// recovered without a full cookie wipe. When we detect any of these we
// redirect to /sign-in with cookies cleared rather than letting Clerk enter
// its 404 / infinite-redirect loop.
const CLERK_STALE_SESSION_PATTERNS = [
  "jwk-kid-mismatch",
  "infinite redirect loop",
  "instance keys do not match",
  "Unable to find a signing key in JWKS",
];

function isClerkStaleSessionError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return CLERK_STALE_SESSION_PATTERNS.some((pattern) => msg.includes(pattern));
}

function clearClerkCookies(response: NextResponse, hostname: string): void {
  const past = new Date(0);
  const baseAttrs = {
    value: "",
    expires: past,
    path: "/",
    sameSite: "none" as const,
    secure: true,
  };
  for (const name of CLERK_COOKIE_NAMES) {
    // Clear without domain (catches cookies scoped to the bare origin)
    response.cookies.set({ name, ...baseAttrs });
    // Clear with explicit domain (catches cookies Clerk sets with Domain=)
    response.cookies.set({ name, ...baseAttrs, domain: hostname });
  }
}

const clerkHandler = clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  try {
    return await clerkHandler(request, event);
  } catch (error) {
    if (isClerkStaleSessionError(error)) {
      // Wipe every Clerk cookie and send the browser back to sign-in so it
      // can establish a fresh session against the correct Clerk instance.
      const signInUrl = new URL("/sign-in", request.url);
      const response = NextResponse.redirect(signInUrl);
      clearClerkCookies(response, request.nextUrl.hostname);
      return response;
    }
    // Re-throw anything that isn't a stale-session Clerk error.
    throw error;
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
