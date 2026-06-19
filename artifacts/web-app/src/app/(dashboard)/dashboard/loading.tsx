import { Sparkles } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
        <Sparkles className="h-5 w-5" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  );
}
