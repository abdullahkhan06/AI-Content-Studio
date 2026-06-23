"use client";

import { useState, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden lg:flex shrink-0">
        <DashboardSidebar />
      </div>

      {/* Mobile sidebar — Sheet drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-64 p-0 border-r border-sidebar-border bg-sidebar"
        >
          <DashboardSidebar onClose={closeMobile} />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
