"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { List } from "@phosphor-icons/react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

interface Crumb {
  label: string;
  href: string;
}

interface PageMeta {
  title: string;
  crumbs?: Crumb[];
}

const PAGE_META: Record<string, PageMeta> = {
  "/dashboard": { title: "Dashboard" },
  "/dashboard/generate": {
    title: "Content",
    crumbs: [{ label: "Content", href: "/dashboard/generate" }],
  },
  "/dashboard/generate/image": {
    title: "Generate Image",
    crumbs: [
      { label: "Content", href: "/dashboard/generate" },
      { label: "Images", href: "/dashboard/generate/image" },
    ],
  },
  "/dashboard/generate/caption": {
    title: "Write Caption",
    crumbs: [
      { label: "Content", href: "/dashboard/generate" },
      { label: "Captions", href: "/dashboard/generate/caption" },
    ],
  },
  "/dashboard/generate/video": {
    title: "Video Script",
    crumbs: [
      { label: "Content", href: "/dashboard/generate" },
      { label: "Video Scripts", href: "/dashboard/generate/video" },
    ],
  },
  "/dashboard/calendar": { title: "Calendar" },
  "/dashboard/gallery": { title: "Gallery" },
  "/dashboard/settings": { title: "Settings" },
  "/tracer": { title: "Tracer" },
};

function getPageMeta(pathname: string): PageMeta {
  if (PAGE_META[pathname]) return PAGE_META[pathname];
  const keys = Object.keys(PAGE_META).sort((a, b) => b.length - a.length);
  const match = keys.find((k) => pathname.startsWith(k));
  return match ? PAGE_META[match] : { title: "Dashboard" };
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname() ?? "/dashboard";
  const { title, crumbs } = getPageMeta(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border/60 bg-background px-6">
      {/* Hamburger — mobile only */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden shrink-0 -ml-2"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <List className="h-5 w-5" />
      </Button>

      <div className="flex min-w-0 flex-col justify-center">
        {crumbs && crumbs.length > 0 && (
          <Breadcrumb className="mb-0.5">
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-xs">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <React.Fragment key={crumb.href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-xs">
                          {crumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href} className="text-xs">
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <h1 className="text-lg font-semibold leading-tight truncate">{title}</h1>
      </div>
    </header>
  );
}
