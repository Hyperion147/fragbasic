import { Card } from "@/components/ui/card"
import {
  FEEL_METRICS,
  FEEL_SCALE_DESCRIPTIONS,
  FEEL_SCALE_LABELS,
  type FeelScaleMode,
  formatCalibratedFeelValue,
  formatFeelLabel,
  getCalibratedFeelValue,
  getFeelScaleModesForComparison,
  getMousepadChartColors,
} from "@/lib/mousepads"
import type { Mousepad } from "@/types/mousepad"

export function FeelMap({
  left,
  right,
}: {
  left: Mousepad
  right: Mousepad
}) {
  const leftColors = getMousepadChartColors()
  const rightColors = getMousepadChartColors()
  const scaleModes = getFeelScaleModesForComparison([left, right])

  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Feel map</p>
        <h2 className="panel-title">
          How they feel in-game
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {scaleModes.length > 1
            ? "Glass and fabric do not share the same raw feel meaning, so the map shows native ratings and a universal cross-surface calibration."
            : "Each row compares the two pads on their native 10-point surface-family scale."}
        </p>
      </div>

      <div className="mb-6 grid gap-3 rounded-md border border-border bg-background/60 p-4 sm:grid-cols-2">
        <LegendChip color={leftColors.solid} label={left.name} />
        <LegendChip color={rightColors.solid} label={right.name} />
      </div>

      <div className="space-y-5">
        {scaleModes.map((mode) => (
          <ScaleMap
            key={mode}
            left={left}
            right={right}
            leftColor={leftColors.solid}
            rightColor={rightColors.solid}
            mode={mode}
          />
        ))}
      </div>
    </Card>
  )
}

function ScaleMap({
  left,
  right,
  leftColor,
  rightColor,
  mode,
}: {
  left: Mousepad
  right: Mousepad
  leftColor: string
  rightColor: string
  mode: FeelScaleMode
}) {
  return (
    <div className="rounded-md border border-border bg-background/35 p-4">
      <div className="mb-5">
        <h3 className="panel-title">
          {FEEL_SCALE_LABELS[mode]}
        </h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {FEEL_SCALE_DESCRIPTIONS[mode]}
        </p>
      </div>

      <div className="space-y-5">
        {FEEL_METRICS.map(({ label, key }) => (
          <div key={key} className="rounded-md border border-border bg-card/55 p-4">
            <div className="mb-3 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-foreground">{label}</span>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {formatFeelLabel(getCalibratedFeelValue(left, key, mode), key)} /{" "}
                {formatFeelLabel(getCalibratedFeelValue(right, key, mode), key)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Meter
                value={getCalibratedFeelValue(left, key, mode)}
                align="right"
                color={leftColor}
              />
              <Meter
                value={getCalibratedFeelValue(right, key, mode)}
                align="left"
                color={rightColor}
              />
            </div>

            <div className="mt-2 grid grid-cols-2 text-xs text-muted-foreground">
              <span>
                {left.name} - {formatCalibratedFeelValue(left, key, mode)}
              </span>
              <span className="text-right">
                {right.name} - {formatCalibratedFeelValue(right, key, mode)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
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
      <span
        className="size-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  )
}
