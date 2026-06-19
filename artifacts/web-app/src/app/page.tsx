import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  BarChart3,
  ImageIcon,
  Video,
  Hash,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">AI Content Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Get started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </header>

      <main>
        <section className="py-24 md:py-36 text-center px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs text-primary mb-8">
              <Zap className="h-3 w-3" />
              Powered by GPT-4 + AI image generation
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              Social content that
              <br />
              sells itself
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Describe your business once. Get product photos, video ads,
              captions, and hashtags crafted for your brand — published to
              TikTok, Instagram, and YouTube automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="text-base px-8">
                    Start for free
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" size="lg" className="text-base px-8">
                    Sign in
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button asChild size="lg" className="text-base px-8">
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              </SignedIn>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-4 border-t border-border/40">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything you need to go viral
            </h2>
            <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
              From AI-generated visuals to auto-published posts — the full
              content pipeline, automated.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border/60 bg-card p-6 hover:border-primary/40 transition-colors"
                >
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 px-4 border-t border-border/40">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground mb-16 max-w-xl mx-auto">
              Start free, scale as you grow. No hidden fees.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border p-8 text-left ${
                    plan.featured
                      ? "border-primary bg-primary/5"
                      : "border-border/60 bg-card"
                  }`}
                >
                  {plan.featured && (
                    <div className="text-xs font-medium text-primary mb-3">
                      Most popular
                    </div>
                  )}
                  <div className="font-bold text-2xl mb-1">{plan.name}</div>
                  <div className="text-4xl font-bold mb-2">
                    ${plan.price}
                    <span className="text-base font-normal text-muted-foreground">
                      /mo
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm flex gap-2">
                        <span className="text-primary">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <SignUpButton mode="modal">
                    <Button
                      className="w-full"
                      variant={plan.featured ? "default" : "outline"}
                    >
                      Get started
                    </Button>
                  </SignUpButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>AI Content Studio © 2025</span>
          </div>
          <div className="text-xs text-muted-foreground">
            AI-powered social media for small businesses
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: ImageIcon,
    title: "AI Product Photos",
    description:
      "Generate studio-quality product images from a simple text description. 50+ visual styles included.",
  },
  {
    icon: Video,
    title: "Video Ad Scripts",
    description:
      "GPT-4 writes scroll-stopping video scripts tailored to your brand voice and target audience.",
  },
  {
    icon: Hash,
    title: "Captions & Hashtags",
    description:
      "Platform-optimised captions and hashtag sets for TikTok, Instagram, and YouTube — generated in seconds.",
  },
  {
    icon: Zap,
    title: "Auto-Publish",
    description:
      "Connect your social accounts once. Schedule and publish directly without leaving the dashboard.",
  },
  {
    icon: BarChart3,
    title: "Content Calendar",
    description:
      "AI plans your posting schedule for maximum reach. See a week of content at a glance.",
  },
  {
    icon: Sparkles,
    title: "Brand Knowledge Base",
    description:
      "Tell the AI about your business once. Every piece of content stays on-brand, automatically.",
  },
];

const plans = [
  {
    name: "Starter",
    price: 19,
    featured: false,
    description: "Perfect for solo entrepreneurs just getting started.",
    features: [
      "50 AI-generated images/mo",
      "30 caption + hashtag sets",
      "1 social account",
      "Content calendar",
    ],
  },
  {
    name: "Growth",
    price: 49,
    featured: true,
    description: "For growing businesses ready to scale their presence.",
    features: [
      "200 AI-generated images/mo",
      "Unlimited captions",
      "5 social accounts",
      "Auto-publish",
      "Brand Knowledge Base",
    ],
  },
  {
    name: "Pro",
    price: 99,
    featured: false,
    description: "For agencies and power users managing multiple brands.",
    features: [
      "Unlimited images",
      "Unlimited everything",
      "20 social accounts",
      "Video ad scripts",
      "Priority support",
    ],
  },
];
