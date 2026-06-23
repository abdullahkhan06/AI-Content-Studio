"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

const socialProof = [
  "No credit card required",
  "Cancel anytime",
  "Live in 5 minutes",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.696 0.17 162.48 / 0.12), transparent)",
        }}
      />

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Now with GPT-4.1 + 50+ visual models
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                Social content that{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.696 0.17 162.48), oklch(0.78 0.15 180))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  sells itself
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Describe your business once. Get product photos, video ads,
                captions, and hashtags crafted for your brand — published to
                TikTok, Instagram, and YouTube automatically.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <SignedOut>
                <Button
                  asChild
                  size="lg"
                  className="gap-2 text-base px-7 font-semibold"
                >
                  <Link href="/sign-up">
                    Start for free
                    <ArrowRight weight="bold" className="h-4 w-4" />
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  asChild
                  size="lg"
                  className="gap-2 text-base px-7 font-semibold"
                >
                  <Link href="/dashboard">
                    Go to dashboard
                    <ArrowRight weight="bold" className="h-4 w-4" />
                  </Link>
                </Button>
              </SignedIn>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socialProof.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle
                    weight="fill"
                    className="h-4 w-4 text-primary shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — product mockup */}
          <div className="relative hidden lg:block">
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductMockup() {
  return (
    <div
      className="relative rounded-2xl border border-border/60 overflow-hidden shadow-2xl"
      style={{ background: "oklch(0.105 0 0)" }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div
            className="h-3 w-3 rounded-full"
            style={{ background: "oklch(0.78 0.18 85)" }}
          />
          <div className="h-3 w-3 rounded-full bg-primary/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-6 rounded-md border border-border/40 bg-muted/30 flex items-center px-3">
            <span className="text-xs text-muted-foreground">
              app.aicontentstudio.com/generate
            </span>
          </div>
        </div>
      </div>

      {/* App UI */}
      <div className="p-5 space-y-4">
        {/* Status bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            Generate Content
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">
              Generating…
            </span>
          </div>
        </div>

        {/* Generated image card */}
        <div className="rounded-xl overflow-hidden border border-border/60">
          <div
            className="h-48 flex items-center justify-center relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.14 0 0) 0%, oklch(0.18 0.02 160) 100%)",
            }}
          >
            <div className="text-center">
              <div
                className="mx-auto mb-3 h-20 w-20 rounded-2xl border border-primary/30 flex items-center justify-center"
                style={{ background: "oklch(0.696 0.17 162.48 / 0.15)" }}
              >
                <span className="text-4xl">☕</span>
              </div>
              <div className="h-2 w-32 mx-auto rounded-full bg-primary/20" />
              <div className="h-2 w-20 mx-auto mt-2 rounded-full bg-muted/40" />
            </div>
            <div
              className="absolute bottom-3 right-3 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs text-muted-foreground"
              style={{ background: "oklch(0.105 0 0 / 0.9)" }}
            >
              Sunrise Café · Product photo
            </div>
          </div>

          <div className="p-4 space-y-3" style={{ background: "oklch(0.13 0 0)" }}>
            <p className="text-xs text-foreground leading-relaxed">
              ✨ Start your morning right with our signature oat milk cappuccino
              — smooth, rich, and crafted with care. ☕{" "}
              <span className="text-primary">#SunriseCafé</span>{" "}
              <span className="text-primary">#MorningCoffee</span>{" "}
              <span className="text-primary">#CaféVibes</span>
            </p>
            <div className="flex gap-2">
              <div className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary cursor-pointer">
                Copy caption
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground cursor-pointer">
                Publish now
              </div>
            </div>
          </div>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Images", val: "127" },
            { label: "Captions", val: "94" },
            { label: "Published", val: "38" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border/60 p-3 text-center"
              style={{ background: "oklch(0.13 0 0)" }}
            >
              <div className="text-base font-bold text-foreground">{s.val}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
