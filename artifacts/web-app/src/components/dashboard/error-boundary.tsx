"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Warning } from "@phosphor-icons/react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class DashboardErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[DashboardErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border"
            style={{
              borderColor: "oklch(0.704 0.191 22.216 / 0.25)",
              background: "oklch(0.704 0.191 22.216 / 0.1)",
            }}
          >
            <Warning weight="fill" className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Something went wrong</h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              An unexpected error occurred in this section. Your other work is
              safe.
            </p>
          </div>
          <Button variant="outline" onClick={this.handleReset}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
