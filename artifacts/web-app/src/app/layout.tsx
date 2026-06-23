import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aicontentstudio.app"),
  title: {
    default: "AI Content Studio",
    template: "%s — AI Content Studio",
  },
  description:
    "AI-powered social media content platform for small businesses. Generate product photos, graphics, video ads, captions, and hashtags in seconds.",
  keywords: [
    "AI content generation",
    "social media automation",
    "small business marketing",
    "AI product photos",
    "TikTok automation",
    "Instagram automation",
  ],
  authors: [{ name: "AI Content Studio" }],
  creator: "AI Content Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicontentstudio.app",
    siteName: "AI Content Studio",
    title: "AI Content Studio",
    description:
      "AI-powered social media content platform for small businesses.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AI Content Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Studio",
    description:
      "AI-powered social media content platform for small businesses.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Content Studio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered social media content platform for small businesses. Generate product photos, video ads, captions, and hashtags — published automatically to TikTok, Instagram, and YouTube.",
  url: "https://aicontentstudio.app",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "19",
      priceCurrency: "USD",
      description: "50 AI images/mo, 30 captions, 1 social account",
    },
    {
      "@type": "Offer",
      name: "Growth",
      price: "49",
      priceCurrency: "USD",
      description: "200 AI images/mo, unlimited captions, 5 social accounts",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "99",
      priceCurrency: "USD",
      description: "Unlimited everything, 20 social accounts, video scripts",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          card: "shadow-none border border-border",
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          footer: "hidden",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
