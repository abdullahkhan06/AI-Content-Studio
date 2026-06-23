import Link from "next/link";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AI Content Studio",
  description: "Terms of service for AI Content Studio.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 py-4 px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <Sparkle weight="fill" className="h-4 w-4 text-primary" />
          AI Content Studio
        </Link>
      </header>
      <main className="container mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-10">
          Last updated: June 19, 2025
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By creating an account or using AI Content Studio, you agree to
              these Terms of Service. If you do not agree, please do not use the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground">
              AI Content Studio is an AI-powered platform that generates social
              media content including images, captions, hashtags, and video
              scripts for small and medium-sized businesses. The service
              includes tools for scheduling and publishing content to social
              media platforms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              3. User Responsibilities
            </h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your
              account credentials, ensuring content you publish complies with
              applicable laws and platform terms, and using the service only for
              lawful purposes. You may not use the service to generate content
              that is illegal, harmful, or violates third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              You retain ownership of the content you create using our platform.
              By using the service, you grant us a limited license to process
              and store your content for the purpose of providing the service.
              AI-generated outputs are provided for your use subject to
              applicable AI provider terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              5. Subscriptions and Billing
            </h2>
            <p className="text-muted-foreground">
              Paid plans are billed monthly. You may cancel at any time;
              cancellation takes effect at the end of the current billing
              period. Refunds are not provided for partial months. We reserve
              the right to change pricing with 30 days notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              AI Content Studio is provided &ldquo;as is.&rdquo; We do not warrant that the
              service will be error-free or uninterrupted. To the maximum extent
              permitted by law, our liability for any claim is limited to the
              amount you paid us in the 12 months prior to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate accounts that violate
              these terms. You may delete your account at any time through the
              dashboard settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms, contact us at
              legal@aicontentstudio.app.
            </p>
          </section>
        </div>
      </main>
      <footer className="border-t border-border/40 py-6 px-6 text-center text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          ← Back to home
        </Link>
        <span className="mx-3">·</span>
        <Link
          href="/privacy"
          className="hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
