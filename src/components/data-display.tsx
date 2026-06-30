import { cn } from "@/lib/utils";

export function DataSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn("data-shell", className)}>{children}</section>;
}

export function DataPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("data-panel", className)}>{children}</div>;
}

export function MetricBar({
  value,
  max = 10,
  tone = "default",
  className,
}: {
  value: number;
  max?: number;
  tone?: "default" | "alt" | "muted";
  className?: string;
}) {
  const width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;

  return (
    <div className={cn("metric-track", className)}>
      <div
        className={cn(
          tone === "alt" ? "metric-fill-alt" : "metric-fill",
          tone === "muted" && "bg-muted-foreground",
        )}
        style={{ width }}
      />
    </div>
  );
}

export function MetricCell({
  label,
  value,
  suffix = "/10",
  tone,
}: {
  label: string;
  value: number;
  suffix?: string;
  tone?: "default" | "alt" | "muted";
}) {
  return (
    <div className="min-w-36">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <span className="truncate text-xs text-muted-foreground">{label}</span>
        <span className="font-mono text-xs text-foreground">
          {value.toFixed(1)}
          {suffix}
        </span>
      </div>
      <MetricBar value={value} tone={tone} className="mt-1.5" />
    </div>
  );
}
