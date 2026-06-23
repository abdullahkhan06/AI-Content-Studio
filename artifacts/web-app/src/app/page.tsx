import { LandingNav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Content Studio — Social content that sells itself",
  description:
    "Describe your business once. Get product photos, video ads, captions, and hashtags crafted for your brand — published to TikTok, Instagram, and YouTube automatically.",
  openGraph: {
    title: "AI Content Studio — Social content that sells itself",
    description:
      "AI-powered content generation for small businesses. Studio-quality images, captions, and video scripts — published automatically.",
    url: "https://aicontentstudio.app",
    siteName: "AI Content Studio",
    type: "website",
    images: [
      {
        url: "https://aicontentstudio.app/og.png",
        width: 1200,
        height: 630,
        alt: "AI Content Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Studio — Social content that sells itself",
    description:
      "AI-powered content generation for small businesses. Generate, schedule, and publish — automatically.",
    images: ["https://aicontentstudio.app/og.png"],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
