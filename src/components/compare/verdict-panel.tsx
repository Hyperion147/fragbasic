import { ArrowRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import type { Mousepad } from "@/types/mousepad"

export function VerdictPanel({
  left,
  right,
}: {
  left: Mousepad
  right: Mousepad
}) {
  return (
    <Card className="border-border bg-card p-6 md:p-8">
      <p className="text-sm text-muted-foreground">Final verdict</p>

      <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight">
        Artisan Zero is the safer control pick. Hyperion feels like the more
        flexible modern alternative.
      </h2>

      <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
        If your priority is pure tactical FPS control, the Artisan Zero still
        makes more sense. But if you want a pad that keeps enough control while
        giving more freedom for micro-corrections, the Hyperion is easier to
        recommend than a slower Saturn-style pad.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <TakeawayCard
          label="Safest recommendation"
          value={`${left.brand} ${left.name}`}
          body="Best when your aim style depends on strong stopping power and a more locked-in control feel."
        />
        <TakeawayCard
          label="Most adaptable recommendation"
          value={`${right.brand} ${right.name}`}
          body="Best when you want easier corrections, more glide freedom, and a better bridge between tac FPS and tracking."
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
