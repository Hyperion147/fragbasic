import { Card } from "@/components/ui/card"
import type { Mousepad } from "@/types/mousepad"

type Props = {
  left: Mousepad
  right: Mousepad
}

const zones = [
  { label: "Mud", start: 0, end: 20 },
  { label: "Slow control", start: 20, end: 40 },
  { label: "Balanced control", start: 40, end: 60 },
  { label: "Balanced speed", start: 60, end: 80 },
  { label: "Speed / glass", start: 80, end: 100 },
]

export function SpeedControlPosition({ left, right }: Props) {
  const leftPosition = getPositionFromSpeed(left.feel.speed)
  const rightPosition = getPositionFromSpeed(right.feel.speed)

  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">Speed-control position</p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Where they sit on the glide scale
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          This makes the speed score easier to interpret by placing each pad on
          a practical spectrum from mud-control to speed/glass behavior.
        </p>
      </div>

      <div className="space-y-12">
        <div className="relative">
          <div className="grid h-14 grid-cols-5 overflow-hidden rounded-2xl border border-border bg-[linear-gradient(90deg,oklch(0.26_0.02_220),oklch(0.31_0.03_220),oklch(0.35_0.04_220),oklch(0.41_0.05_220),oklch(0.47_0.06_220))]">
            {zones.map((zone) => (
              <div
                key={zone.label}
                className="flex items-center justify-center border-r border-border/60 px-2 text-center text-[11px] text-muted-foreground last:border-r-0 md:text-xs"
              >
                {zone.label}
              </div>
            ))}
          </div>

          <PadMarker
            label={left.name}
            brand={left.brand}
            position={leftPosition}
            side="top"
          />

          <PadMarker
            label={right.name}
            brand={right.brand}
            position={rightPosition}
            side="bottom"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <PositionSummary pad={left} position={leftPosition} />
          <PositionSummary pad={right} position={rightPosition} />
        </div>
      </div>
    </Card>
  )
}

function PadMarker({
  label,
  brand,
  position,
  side,
}: {
  label: string
  brand: string
  position: number
  side: "top" | "bottom"
}) {
  return (
    <div
      className={[
        "absolute z-10 flex -translate-x-1/2 flex-col items-center",
        side === "top" ? "top-7" : "bottom-7 flex-col-reverse",
      ].join(" ")}
      style={{ left: `${position}%` }}
    >
      <div className="h-8 w-px bg-primary" />

      <div className="rounded-full border border-border bg-card px-3 py-1.5 shadow-md shadow-black/10">
        <p className="whitespace-nowrap text-xs font-medium">
          {brand} {label}
        </p>
      </div>
    </div>
  )
}

function PositionSummary({
  pad,
  position,
}: {
  pad: Mousepad
  position: number
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">
            {pad.brand} {pad.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {getZoneLabel(position)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-semibold">{pad.feel.speed}</p>
          <p className="text-xs text-muted-foreground">speed score</p>
        </div>
      </div>
    </div>
  )
}

function getPositionFromSpeed(speed: number) {
  return Math.max(0, Math.min(100, speed * 10))
}

function getZoneLabel(position: number) {
  if (position < 20) return "Mud"
  if (position < 40) return "Slow control"
  if (position < 60) return "Balanced control"
  if (position < 80) return "Balanced speed"
  return "Speed / glass"
}
