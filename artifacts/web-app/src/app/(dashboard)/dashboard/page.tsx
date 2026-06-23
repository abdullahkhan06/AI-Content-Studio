import { auth, currentUser } from "@clerk/nextjs/server";
import {
  Sparkle,
  Image,
  VideoCamera,
  Hash,
  CalendarBlank,
  ChartLineUp,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) return null;

  const firstName = user?.firstName ?? "there";

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good to see you, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to create content that converts?
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/60 bg-card p-6"
          >
            <stat.icon
              weight="duotone"
              className="h-5 w-5 text-primary mb-3"
            />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Welcome / empty state */}
      <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-10 text-center">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
          style={{
            borderColor: "oklch(0.696 0.17 162.48 / 0.25)",
            background: "oklch(0.696 0.17 162.48 / 0.1)",
          }}
        >
          <Sparkle weight="fill" className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          Welcome! Let&apos;s set up your business profile.
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Tell us about your business once — products, tone, audience, brand
          colours — and every piece of AI-generated content will be tailored to
          you automatically.
        </p>
        <Button asChild size="lg" className="gap-2 font-semibold">
          <Link href="/dashboard/brand">
            Set up brand profile
            <ArrowRight weight="bold" className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-xl border border-border/60 bg-card p-6 hover:border-primary/40 transition-all hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <action.icon
                  weight="duotone"
                  className="h-6 w-6 text-primary"
                />
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const stats = [
  { icon: Image, value: "0", label: "Images generated" },
  { icon: Hash, value: "0", label: "Captions created" },
  { icon: VideoCamera, value: "0", label: "Video scripts" },
  { icon: ChartLineUp, value: "0", label: "Posts published" },
];

const quickActions = [
  {
    icon: Image,
    title: "Generate product photo",
    description: "Create studio-quality images with AI.",
    href: "/dashboard/generate/image",
  },
  {
    icon: Hash,
    title: "Write a caption",
    description: "Get captions and hashtags for any post.",
    href: "/dashboard/generate/caption",
  },
  {
    icon: VideoCamera,
    title: "Script a video ad",
    description: "AI writes your next viral video script.",
    href: "/dashboard/generate/video",
  },
  {
    icon: CalendarBlank,
    title: "Content calendar",
    description: "Plan your week of posts automatically.",
    href: "/dashboard/calendar",
  },
  {
    icon: Sparkle,
    title: "Brand profile",
    description: "Update your brand knowledge base.",
    href: "/dashboard/brand",
  },
  {
    icon: ChartLineUp,
    title: "Published posts",
    description: "Review and manage your published content.",
    href: "/dashboard/posts",
  },
];
