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
      </div>

      <div className="space-y-5">
        {rows.map(([label, key]) => (
          <div key={key}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>{label}</span>
              <span className="text-muted-foreground">
                {left.feel[key]} / {right.feel[key]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Meter value={left.feel[key]} align="right" />
              <Meter value={right.feel[key]} align="left" />
            </div>

            <div className="mt-1 grid grid-cols-2 text-xs text-muted-foreground">
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
}: {
  value: number
  align: "left" | "right"
}) {
  return (
    <div className="h-2 rounded-full bg-secondary">
      <div
        className={[
          "h-full rounded-full bg-primary",
          align === "right" ? "ml-auto" : "",
        ].join(" ")}
        style={{ width: `${value * 10}%` }}
      />
    </div>
  )
}