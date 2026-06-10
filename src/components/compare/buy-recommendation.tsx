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
    <section className="grid gap-4 md:grid-cols-2">
      <Card className="border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">Choose</p>
        <h3 className="mt-1 text-xl font-semibold">{left.name}</h3>

        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          <li>• You want stronger stopping power.</li>
          <li>• You mostly play Valorant or CS2.</li>
          <li>• You prefer a safer control pad.</li>
          <li>• You do not mind a more textured surface.</li>
        </ul>
      </Card>

      <Card className="border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">Choose</p>
        <h3 className="mt-1 text-xl font-semibold">{right.name}</h3>

        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          <li>• You want easier micro-adjustments.</li>
          <li>• You want control without feeling muddy.</li>
          <li>• You play both tac FPS and tracking games.</li>
          <li>• You want something closer to Zero than Saturn Pro.</li>
        </ul>
      </Card>
    </section>
  )
}