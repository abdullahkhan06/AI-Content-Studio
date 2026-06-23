import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/shell";
import { DashboardErrorBoundary } from "@/components/dashboard/error-boundary";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <DashboardShell>
      <DashboardErrorBoundary>{children}</DashboardErrorBoundary>
    </DashboardShell>
  );
}
