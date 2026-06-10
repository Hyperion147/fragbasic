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
    </Card>
  )
}