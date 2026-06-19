"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  CheckCircle,
  XCircle,
  Loader2,
  Image as ImageIcon,
  Hash,
  DollarSign,
  Clock,
  Building2,
} from "lucide-react";
import type { TracerResult, TracerStep } from "@/app/api/tracer/route";

function StepRow({ step }: { step: TracerStep }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="mt-0.5 shrink-0">
        {step.status === "success" && (
          <CheckCircle className="h-4 w-4 text-emerald-500" />
        )}
        {step.status === "error" && (
          <XCircle className="h-4 w-4 text-destructive" />
        )}
        {step.status === "running" && (
          <Loader2 className="h-4 w-4 text-primary animate-spin" />
        )}
        {step.status === "pending" && (
          <div className="h-4 w-4 rounded-full border border-muted-foreground/40" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{step.name}</span>
          {step.durationMs !== undefined && (
            <span className="text-xs text-muted-foreground">
              {step.durationMs}ms
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 break-words">
          {step.message}
        </p>
      </div>
    </div>
  );
}

export default function TracerPage() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TracerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runTracer() {
    setRunning(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/tracer", { method: "POST" });
      const data = (await res.json()) as TracerResult;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold">Tracer Bullet</h1>
          <Badge variant="outline" className="text-xs">
            Phase 0.5
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          End-to-end proof: Muapi → R2 → GPT caption. Validates the full
          generation pipeline before building the real product.
        </p>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Test Business Profile</span>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div>
            <span className="text-muted-foreground">Name: </span>
            <span>Sunrise Café</span>
          </div>
          <div>
            <span className="text-muted-foreground">Type: </span>
            <span>Restaurant</span>
          </div>
          <div>
            <span className="text-muted-foreground">Tone: </span>
            <span>Casual</span>
          </div>
          <div>
            <span className="text-muted-foreground">Products: </span>
            <span>Cappuccino, Avocado Toast, Smoothie Bowl</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground">Brand colors:</span>
          {["#2D5016", "#F5E6D3", "#D4A574"].map((c) => (
            <div
              key={c}
              className="h-5 w-5 rounded-full border border-border/60"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      <Button
        size="lg"
        onClick={runTracer}
        disabled={running}
        className="mb-8 gap-2"
      >
        {running ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Running pipeline…
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Run Tracer
          </>
        )}
      </Button>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Pipeline Steps
            </h2>
            <div className="divide-y divide-border/40">
              {result.steps.map((step, i) => (
                <StepRow key={i} step={step} />
              ))}
            </div>
          </div>

          {result.image && (
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Generated Image
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={result.image.r2Url ?? result.image.url}
                  alt="Generated product photo"
                  className="rounded-lg w-full aspect-square object-cover border border-border/40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = result.image!.url;
                  }}
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="font-mono font-medium text-emerald-500">
                      ${result.image.costUsd.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-mono">
                      {result.image.durationMs}ms
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-mono text-xs">
                      {result.image.model}
                    </span>
                  </div>
                  {result.image.r2Url && result.image.r2Url !== result.image.url && (
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-1">R2 URL:</p>
                      <p className="text-xs font-mono break-all text-primary">
                        {result.image.r2Url}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {result.caption && (
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Generated Caption
                </h2>
                <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-mono">{result.caption.model}</span>
                  <span>{result.caption.durationMs}ms</span>
                </div>
              </div>
              <p className="text-base mb-4 leading-relaxed">
                {result.caption.text}
              </p>
              <Separator className="mb-4" />
              <div className="flex flex-wrap gap-2">
                {result.caption.hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-mono text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {result.error && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
