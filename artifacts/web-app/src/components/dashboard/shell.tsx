"use client";

import { useState, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    // design.md §5: NEVER h-screen — use min-h-[100dvh]. Sidebar sticks via sticky+h-[100dvh].
    <div className="flex min-h-[100dvh] bg-background">
      {/* Desktop sidebar — sticky, fills viewport height, hidden on mobile */}
      <div className="hidden lg:flex shrink-0 sticky top-0 h-[100dvh]">
        <DashboardSidebar />
      </div>

      {/* Mobile sidebar — Sheet drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[280px] p-0 border-r border-sidebar-border bg-sidebar"
        >
          <DashboardSidebar onClose={closeMobile} />
        </SheetContent>
      </Sheet>

      {/* Main column — grows with content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
