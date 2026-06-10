import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Mousepad } from "@/types/mousepad"

export function ProductFaceoff({
  left,
  right,
}: {
  left: Mousepad
  right: Mousepad
}) {
  return (
    <section className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
      <PadCard pad={left} />
      <div className="hidden items-center justify-center px-2 text-sm text-muted-foreground md:flex">
        VS
      </div>
      <PadCard pad={right} />
    </section>
  )
}

function PadCard({ pad }: { pad: Mousepad }) {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <div className="aspect-[16/9] border-b border-border bg-secondary" />

      <div className="space-y-5 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{pad.brand}</p>
          <h2 className="text-2xl font-semibold tracking-tight">{pad.name}</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{pad.category}</Badge>
          <Badge variant="secondary">{pad.softness}</Badge>
          <Badge variant="outline">{pad.surface}</Badge>
          <Badge variant="outline">{pad.base}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="Speed" value={pad.feel.speed} />
          <MiniStat label="Control" value={pad.feel.control} />
          <MiniStat label="Stop" value={pad.feel.stoppingPower} />
        </div>
      </div>
    </Card>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  )
}