"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "@phosphor-icons/react";

export function FinalCTA() {
  return (
    <section
      className="py-24 px-4 border-t"
      style={{ borderColor: "oklch(1 0 0 / 8%)" }}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6">
          <Star weight="fill" className="h-3.5 w-3.5" />
          Join SMBs already automating their content
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Your brand, on every feed,{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.696 0.17 162.48), oklch(0.78 0.15 180))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            every day.
          </span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Stop spending hours on content that underperforms. AI Content Studio
          generates, schedules, and publishes — while you focus on your
          business.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <SignedOut>
            <Button
              asChild
              size="lg"
              className="gap-2 text-base px-8 font-semibold"
            >
              <Link href="/sign-up">
                Get started free
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              asChild
              size="lg"
              className="gap-2 text-base px-8 font-semibold"
            >
              <Link href="/dashboard">
                Go to dashboard
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
            </Button>
          </SignedIn>
        </div>

        <p className="text-xs text-muted-foreground mt-5">
          Free to start · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
