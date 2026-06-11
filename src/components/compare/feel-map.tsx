import { Card } from "@/components/ui/card"
import type { Mousepad } from "@/types/mousepad"

const rows = [
  ["Speed", "speed"],
  ["Control", "control"],
  ["Stopping Power", "stoppingPower"],
  ["Static Friction", "staticFriction"],
  ["Dynamic Glide", "dynamicFriction"],
  ["Micro-adjustments", "microAdjustments"],
] as const

export function FeelMap({
  left,
  right,
}: {
  left: Mousepad
  right: Mousepad
}) {
  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Feel map</p>
        <h2 className="text-2xl font-semibold tracking-tight">
          How they feel in-game
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Each row compares the two pads on the same 10-point scale so you can
          see where the feel difference is minor and where it is immediately
          noticeable.
        </p>
      </div>

      <div className="mb-6 grid gap-3 rounded-3xl border border-border bg-background/60 p-4 sm:grid-cols-2">
        <LegendChip color="bg-[var(--chart-left)]" label={left.name} />
        <LegendChip color="bg-[var(--chart-right)]" label={right.name} />
      </div>

      <div className="space-y-6">
        {rows.map(([label, key]) => (
          <div key={key} className="rounded-3xl border border-border bg-background/40 p-4">
            <div className="mb-3 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-foreground">{label}</span>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {left.feel[key]} / {right.feel[key]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Meter value={left.feel[key]} align="right" color="var(--chart-left)" />
              <Meter value={right.feel[key]} align="left" color="var(--chart-right)" />
            </div>

            <div className="mt-2 grid grid-cols-2 text-xs text-muted-foreground">
              <span>{left.name}</span>
              <span className="text-right">{right.name}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Meter({
  value,
  align,
  color,
}: {
  value: number
  align: "left" | "right"
  color: string
}) {
  return (
    <div className="h-3 rounded-full bg-secondary/80">
      <div
        className={["h-full rounded-full", align === "right" ? "ml-auto" : ""].join(" ")}
        style={{ width: `${value * 10}%`, backgroundColor: color }}
      />
    </div>
  )
}

function LegendChip({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3">
      <span className={`size-3 rounded-full ${color}`} />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  )
}
