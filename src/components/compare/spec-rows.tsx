import { Card } from "@/components/ui/card"
import type { Mousepad } from "@/types/mousepad"

type Props = {
  left: Mousepad
  right: Mousepad
}

type SpecRow = {
  label: string
  left: string | number
  right: string | number
  note?: string
}

export function SpecRows({ left, right }: Props) {
  const leftMainSize = left.sizes[0]
  const rightMainSize = right.sizes[0]

  const rows: SpecRow[] = [
    {
      label: "Category",
      left: formatValue(left.category),
      right: formatValue(right.category),
    },
    {
      label: "Surface",
      left: formatValue(left.surface),
      right: formatValue(right.surface),
    },
    {
      label: "Base",
      left: formatValue(left.base),
      right: formatValue(right.base),
    },
    {
      label: "Softness",
      left: formatValue(left.softness),
      right: formatValue(right.softness),
    },
    {
      label: "Main size",
      left: formatSize(leftMainSize),
      right: formatSize(rightMainSize),
    },
    {
      label: "Thickness",
      left: leftMainSize?.thickness ? `${leftMainSize.thickness}mm` : "Unknown",
      right: rightMainSize?.thickness
        ? `${rightMainSize.thickness}mm`
        : "Unknown",
    },
    {
      label: "Texture",
      left: formatValue(left.texture.feel),
      right: formatValue(right.texture.feel),
    },
    {
      label: "Sleeve friendly",
      left: left.texture.sleeveFriendly ? "Yes" : "No",
      right: right.texture.sleeveFriendly ? "Yes" : "No",
    },
    {
      label: "Noise level",
      left: formatValue(left.texture.noiseLevel),
      right: formatValue(right.texture.noiseLevel),
    },
    {
      label: "Humidity resistance",
      left: `${left.environment.humidityResistance}/10`,
      right: `${right.environment.humidityResistance}/10`,
      note: "Important for Indian weather and sweaty hands.",
    },
    {
      label: "Sweat resistance",
      left: `${left.environment.sweatResistance}/10`,
      right: `${right.environment.sweatResistance}/10`,
    },
    {
      label: "Dust / hair resistance",
      left: `${left.environment.dustHairResistance}/10`,
      right: `${right.environment.dustHairResistance}/10`,
    },
    {
      label: "Washable",
      left: left.environment.washable ? "Yes" : "No",
      right: right.environment.washable ? "Yes" : "No",
    },
    {
      label: "India availability",
      left: formatValue(left.availability.india),
      right: formatValue(right.availability.india),
    },
    {
      label: "Estimated India price",
      left: left.price.inr ? `Rs ${left.price.inr.toLocaleString("en-IN")}` : "N/A",
      right: right.price.inr
        ? `Rs ${right.price.inr.toLocaleString("en-IN")}`
        : "N/A",
    },
    {
      label: "Confidence",
      left: formatValue(left.feel.ratingConfidence),
      right: formatValue(right.feel.ratingConfidence),
      note: "Personal-tested data should be trusted more than community estimates.",
    },
  ]

  return (
    <Card className="overflow-hidden border-border bg-card">
      <div className="border-b border-border p-5 md:p-6">
        <p className="text-sm text-muted-foreground">Spec sheet</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          Specs that actually matter
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          The goal here is not to dump every spec, but to show the details that
          change how the pad feels, wears, and fits a competitive setup.
        </p>
      </div>

      <div className="hidden grid-cols-[220px_1fr_1fr] gap-6 border-b border-border bg-background/50 px-5 py-4 md:grid">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Attribute
        </div>
        <div className="text-sm font-medium text-foreground">
          {left.brand} {left.name}
        </div>
        <div className="text-sm font-medium text-foreground">
          {right.brand} {right.name}
        </div>
      </div>

      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-3 p-4 md:grid-cols-[220px_1fr_1fr] md:items-start md:gap-6 md:p-5"
          >
            <div>
              <p className="text-sm font-medium">{row.label}</p>
              {row.note ? (
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {row.note}
                </p>
              ) : null}
            </div>

            <SpecValue name={`${left.brand} ${left.name}`} value={row.left} />
            <SpecValue name={`${right.brand} ${right.name}`} value={row.right} />
          </div>
        ))}
      </div>
    </Card>
  )
}

function SpecValue({
  name,
  value,
}: {
  name: string
  value: string | number
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/80 p-4">
      <p className="mb-1 text-xs text-muted-foreground md:hidden">{name}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

function formatValue(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatSize(size?: {
  label: string
  width: number
  height: number
  thickness?: number
  unit: "mm"
}) {
  if (!size) return "Unknown"

  return `${size.label} - ${size.width} x ${size.height}${size.unit}`
}
