"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Check } from "@phosphor-icons/react";

const plans = [
  {
    name: "Starter",
    price: 19,
    featured: false,
    description: "Perfect for solo entrepreneurs just getting started.",
    features: [
      "50 AI-generated images / mo",
      "30 caption + hashtag sets",
      "1 social account",
      "Content calendar",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: 49,
    featured: true,
    description: "For growing businesses ready to scale their presence.",
    features: [
      "200 AI-generated images / mo",
      "Unlimited captions",
      "5 social accounts",
      "Auto-publish",
      "Brand Knowledge Base",
      "Priority support",
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
      "White-label reports",
      "Dedicated support",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 px-4 border-t"
      style={{ borderColor: "oklch(1 0 0 / 8%)" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl border p-8 flex flex-col"
              style={
                plan.featured
                  ? {
                      borderColor: "oklch(0.696 0.17 162.48 / 0.5)",
                      background:
                        "linear-gradient(160deg, oklch(0.696 0.17 162.48 / 0.08), oklch(0.105 0 0))",
                    }
                  : {
                      borderColor: "oklch(1 0 0 / 10%)",
                      background: "oklch(0.105 0 0)",
                    }
              }
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <div className="font-semibold text-base mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check
                      weight="bold"
                      className="h-4 w-4 text-primary shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <SignedOut>
                <Button
                  asChild
                  className="w-full font-semibold"
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link href="/sign-up">Get started</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  asChild
                  className="w-full font-semibold"
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              </SignedIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
