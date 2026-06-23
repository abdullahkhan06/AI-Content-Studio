import Link from "next/link";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export function LandingFooter() {
  return (
    <footer
      className="border-t py-10 px-4"
      style={{ borderColor: "oklch(1 0 0 / 8%)" }}
    >
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkle weight="fill" className="h-4 w-4 text-primary" />
          <span>AI Content Studio</span>
          <span className="text-border">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
