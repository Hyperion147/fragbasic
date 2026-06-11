import { ArrowRightLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Mousepad } from "@/types/mousepad"

type Props = {
  left: Mousepad
  right: Mousepad
}

export function CompareHero({ left, right }: Props) {
  return (
    <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,oklch(0.28_0.05_215_/_0.45),transparent_32%),linear-gradient(180deg,oklch(0.23_0.02_224),oklch(0.21_0.02_224))]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className="text-black">Mousepad comparison</Badge>
            <Badge variant="outline">Valorant / CS2 focused</Badge>
            <Badge variant="outline">Soft base</Badge>
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {left.brand} {left.name}{" "}
            <span className="inline-flex items-center gap-3 text-muted-foreground">
              <ArrowRightLeft className="size-5" />
              vs
            </span>{" "}
            {right.brand} {right.name}
          </h1>

          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            A control-first classic against a smoother balanced-control pad.
            The real question is whether you want maximum stopping power or
            easier micro-adjustments.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <HighlightCard
              label="Best for raw control"
              value={`${left.brand} ${left.name}`}
            />
            <HighlightCard
              label="Best for micro-corrections"
              value={`${right.brand} ${right.name}`}
            />
            <HighlightCard
              label="Closest matchup type"
              value="Tac FPS vs hybrid control"
            />
          </div>
        </div>

        <div className="rounded-4xl border border-border bg-card/90 p-6 shadow-lg shadow-black/10 backdrop-blur">
          <p className="text-sm text-muted-foreground">Quick verdict</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Choose based on how much freedom you want in your glide.
          </h2>

          <div className="mt-5 space-y-4">
            <VerdictRow label="More control" value={left.name} />
            <VerdictRow label="Better micro-adjustments" value={right.name} />
            <VerdictRow label="Safer tac FPS pick" value={left.name} />
            <VerdictRow label="More versatile" value={right.name} />
          </div>
        </div>
      </div>
    </section>
  )
}

function HighlightCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/60 p-4 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

function VerdictRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/80 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
