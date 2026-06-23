import { auth, currentUser } from "@clerk/nextjs/server";
import {
  Sparkle,
  Image as ImageIcon,
  VideoCamera,
  Hash,
  CalendarBlank,
  Images,
  ArrowRight,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// design.md §6.9: no emojis in UI — use Phosphor icons
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) return null;

  const firstName = user?.firstName ?? "there";
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Welcome header — design.md §9.4 */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {greeting}, {firstName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Ready to create content that converts?
        </p>
      </div>

      {/* Primary CTA card — design.md §9.4: #1 action on the page */}
      <Link
        href="/dashboard/generate"
        className="group block rounded-xl border border-primary/30 p-8 transition-all hover:border-primary/60 hover:shadow-lg hover:-translate-y-0.5"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.696 0.17 162.48 / 0.08) 0%, oklch(0.105 0 0) 60%)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border"
              style={{
                borderColor: "oklch(0.696 0.17 162.48 / 0.3)",
                background: "oklch(0.696 0.17 162.48 / 0.12)",
              }}
            >
              <Sparkle weight="fill" className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Generate This Week&apos;s Content
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
              Describe what you need — product photos, captions, video scripts —
              and your AI studio gets to work. No design skills required.
            </p>
          </div>
          <ArrowRight
            weight="bold"
            className="h-5 w-5 text-muted-foreground shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
          />
        </div>
      </Link>

      {/* Stats row — design.md §9.4: Content this month, Credits left, Connected platforms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <ImageIcon weight="duotone" className="h-5 w-5 text-primary mb-3" />
          <div className="text-2xl font-mono font-semibold">0</div>
          <div className="text-sm text-muted-foreground">
            Content created this month
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-6">
          <Lightning weight="duotone" className="h-5 w-5 text-primary mb-3" />
          <div className="text-2xl font-mono font-semibold">50</div>
          <div className="text-sm text-muted-foreground mb-3">
            Credits remaining
          </div>
          {/* Usage bar */}
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: "100%" }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1.5">
            50 of 50 available
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-6">
          <div className="flex items-center gap-1.5 mb-3">
            {/* Platform icons: YouTube, TikTok, Instagram placeholders */}
            {["YT", "TT", "IG"].map((p) => (
              <div
                key={p}
                className="h-5 w-5 rounded-full bg-muted flex items-center justify-center"
              >
                <span className="text-[8px] font-bold text-muted-foreground">
                  {p}
                </span>
              </div>
            ))}
          </div>
          <div className="text-2xl font-mono font-semibold">0</div>
          <div className="text-sm text-muted-foreground">
            Connected platforms
          </div>
        </div>
      </div>

      {/* Empty state — design.md §9.4 new user copy */}
      <div className="rounded-xl border border-dashed border-border/60 bg-card/50 p-12 text-center">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border"
          style={{
            borderColor: "oklch(0.696 0.17 162.48 / 0.25)",
            background: "oklch(0.696 0.17 162.48 / 0.08)",
          }}
        >
          <Hash weight="duotone" className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No generations yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6 leading-relaxed">
          Welcome! Complete your business profile and we&apos;ll create your
          first content plan.
        </p>
        <Button asChild size="lg" className="gap-2 rounded-full font-semibold">
          <Link href="/onboarding">
            Set up business profile
            <ArrowRight weight="bold" className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Quick actions — design.md §9.4: Calendar, Gallery, Connect Platforms */}
      <div>
        <h2 className="text-xl font-medium mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5 hover:border-primary/40 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                style={{
                  borderColor: "oklch(0.696 0.17 162.48 / 0.2)",
                  background: "oklch(0.696 0.17 162.48 / 0.08)",
                }}
              >
                <action.icon
                  weight="duotone"
                  className="h-5 w-5 text-primary"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {action.title}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {action.description}
                </div>
              </div>
              <ArrowRight
                weight="bold"
                className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const quickActions = [
  {
    icon: CalendarBlank,
    title: "View Calendar",
    description: "See your scheduled content.",
    href: "/dashboard/calendar",
  },
  {
    icon: Images,
    title: "Browse Gallery",
    description: "All your generated assets.",
    href: "/dashboard/gallery",
  },
  {
    icon: VideoCamera,
    title: "Connect Platforms",
    description: "Link YouTube, TikTok, Instagram.",
    href: "/dashboard/settings",
  },
];
