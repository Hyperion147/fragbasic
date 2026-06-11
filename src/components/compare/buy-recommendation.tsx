import { Check } from "lucide-react"

import { Card } from "@/components/ui/card"
import type { Mousepad } from "@/types/mousepad"

export function BuyRecommendation({
  left,
  right,
}: {
  left: Mousepad
  right: Mousepad
}) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Decision guide</p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Which one should you actually buy?
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecommendationCard
          title={left.name}
          subtitle="Choose this if you want the more planted, safer control feel."
          items={[
            "You want stronger stopping power.",
            "You mostly play Valorant or CS2.",
            "You prefer a safer control pad.",
            "You do not mind a more textured surface.",
          ]}
        />

        <RecommendationCard
          title={right.name}
          subtitle="Choose this if you want control with easier movement and correction."
          items={[
            "You want easier micro-adjustments.",
            "You want control without feeling muddy.",
            "You play both tac FPS and tracking games.",
            "You want something closer to Zero than Saturn Pro.",
          ]}
        />
      </div>
    </section>
  )
}

function RecommendationCard({
  title,
  subtitle,
  items,
}: {
  title: string
  subtitle: string
  items: string[]
}) {
  return (
    <Card className="border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">Choose</p>
      <h3 className="mt-1 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{subtitle}</p>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Check className="size-3.5" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
