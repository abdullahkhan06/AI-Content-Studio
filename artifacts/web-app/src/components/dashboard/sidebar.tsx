"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Sparkle,
  SquaresFour,
  Lightning,
  CalendarBlank,
  Images,
  Gear,
  TerminalWindow,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: SquaresFour, exact: true },
  { href: "/dashboard/generate", label: "Content", icon: Lightning, exact: false },
  { href: "/dashboard/calendar", label: "Calendar", icon: CalendarBlank, exact: false },
  { href: "/dashboard/gallery", label: "Gallery", icon: Images, exact: false },
  { href: "/dashboard/settings", label: "Settings", icon: Gear, exact: false },
  { href: "/tracer", label: "Tracer", icon: TerminalWindow, exact: false },
];

interface SidebarProps {
  onClose?: () => void;
}

export function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    // design.md §5: sidebar 280px expanded
    <aside className="flex h-full w-[280px] flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 shrink-0">
        <Sparkle weight="fill" className="h-5 w-5 text-sidebar-primary" />
        <span className="font-semibold text-sidebar-foreground">
          AI Content Studio
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname !== null && pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                weight={isActive ? "fill" : "regular"}
                className="h-4 w-4 shrink-0"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="shrink-0 border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 min-w-0">
          <UserButton afterSignOutUrl="/" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.fullName ?? user?.firstName ?? "Account"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user?.primaryEmailAddress?.emailAddress ?? ""}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
