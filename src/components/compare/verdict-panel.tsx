import { ArrowRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import {
  getMoreVersatilePad,
  getSaferTacFpsPad,
  getVerdictBody,
  getVerdictHeadline,
} from "@/lib/compare"
import type { Mousepad } from "@/types/mousepad"

export function VerdictPanel({
  left,
  right,
}: {
  left: Mousepad
  right: Mousepad
}) {
  const saferPad = getSaferTacFpsPad(left, right)
  const versatilePad = getMoreVersatilePad(left, right)

  return (
    <Card className="border-border bg-card p-6 md:p-8">
      <p className="text-sm text-muted-foreground">Final verdict</p>

      <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight">
        {getVerdictHeadline(left, right)}
      </h2>

      <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
        {getVerdictBody(left, right)}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <TakeawayCard
          label="Safest recommendation"
          value={`${saferPad.brand} ${saferPad.name}`}
          body="Best when your aim style depends on stronger stopping power and a steadier, more planted feel."
        />
        <TakeawayCard
          label="Most adaptable recommendation"
          value={`${versatilePad.brand} ${versatilePad.name}`}
          body="Best when you want easier corrections, more glide freedom, and a broader crossover between tac FPS and tracking."
        />
      </div>
    </Card>
  )
}

function TakeawayCard({
  label,
  value,
  body,
}: {
  label: string
  value: string
  body: string
}) {
  return (
    <div className="rounded-3xl border border-border bg-background/70 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="text-lg font-semibold text-foreground">{value}</p>
        <ArrowRight className="mt-1 size-4 text-primary" />
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  )
}
