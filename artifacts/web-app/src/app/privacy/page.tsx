import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Content Studio",
  description: "Privacy policy for AI Content Studio.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 py-4 px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Content Studio
        </Link>
      </header>
      <main className="container mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: June 19, 2025</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide when creating an account (name, email address), information about your business and brand that you input into the platform, content you generate using our AI tools, and usage data such as pages visited and features used.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to provide and improve our services, personalize your experience, process payments, send transactional emails, and comply with legal obligations. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Data Storage and Security</h2>
            <p className="text-muted-foreground">
              Your data is stored securely using industry-standard encryption. We use Neon (PostgreSQL) for database storage and Cloudflare R2 for media assets. Authentication is handled by Clerk, which is SOC 2 compliant.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use third-party services including Clerk (authentication), Stripe (payments), OpenAI (text generation), and cloud infrastructure providers. Each has their own privacy policy governing data they process on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal data. You may request account deletion at any time by contacting us. Upon deletion, your data will be removed from our systems within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about this policy, please contact us at privacy@aicontentstudio.app.
            </p>
          </section>
        </div>
      </main>
      <footer className="border-t border-border/40 py-6 px-6 text-center text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">← Back to home</Link>
        <span className="mx-3">·</span>
        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
      </footer>
    </div>
  );
}
