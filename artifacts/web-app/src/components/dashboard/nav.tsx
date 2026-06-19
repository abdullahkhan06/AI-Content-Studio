"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Sparkles,
  LayoutDashboard,
  ImageIcon,
  Video,
  Hash,
  Calendar,
  Settings,
  TrendingUp,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/generate/image", label: "Images", icon: ImageIcon },
  { href: "/dashboard/generate/caption", label: "Captions", icon: Hash },
  { href: "/dashboard/generate/video", label: "Video Scripts", icon: Video },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/posts", label: "Published", icon: TrendingUp },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/tracer", label: "Tracer", icon: Zap },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border/60 bg-sidebar flex flex-col shrink-0">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
        <Sparkles className="h-5 w-5 text-sidebar-primary" />
        <span className="font-semibold text-sidebar-foreground">
          AI Content Studio
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : (pathname ?? "").startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="text-sm text-sidebar-foreground">Account</div>
        </div>
      </div>
    </aside>
  );
}
