import { auth, currentUser } from "@clerk/nextjs/server";
import {
  Sparkles,
  ImageIcon,
  Video,
  Hash,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) return null;

  const firstName = user?.firstName ?? "there";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good morning, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to create content that converts?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/60 bg-card p-6"
          >
            <stat.icon className="h-5 w-5 text-primary mb-3" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-xl border border-border/60 bg-card p-6 hover:border-primary/40 transition-all hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <action.icon className="h-6 w-6 text-primary" />
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-border/60 bg-card/50 p-12 text-center">
        <Sparkles className="h-10 w-10 text-primary mx-auto mb-4 opacity-60" />
        <h3 className="font-semibold text-lg mb-2">
          Tell us about your business
        </h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          Set up your Brand Knowledge Base and every piece of content will be
          tailored to your brand automatically.
        </p>
        <Button asChild>
          <Link href="/dashboard/brand">Set up brand profile</Link>
        </Button>
      </div>
    </div>
  );
}

const stats = [
  { icon: ImageIcon, value: "0", label: "Images generated" },
  { icon: Hash, value: "0", label: "Captions created" },
  { icon: Video, value: "0", label: "Video scripts" },
  { icon: TrendingUp, value: "0", label: "Posts published" },
];

const quickActions = [
  {
    icon: ImageIcon,
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
    icon: Video,
    title: "Script a video ad",
    description: "AI writes your next viral video script.",
    href: "/dashboard/generate/video",
  },
  {
    icon: Calendar,
    title: "Content calendar",
    description: "Plan your week of posts automatically.",
    href: "/dashboard/calendar",
  },
  {
    icon: Sparkles,
    title: "Brand profile",
    description: "Update your brand knowledge base.",
    href: "/dashboard/brand",
  },
  {
    icon: TrendingUp,
    title: "Published posts",
    description: "Review and manage your published content.",
    href: "/dashboard/posts",
  },
];
