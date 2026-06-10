import { Badge } from "@/components/ui/badge"
import type { Mousepad } from "@/types/mousepad"

type Props = {
  left: Mousepad
  right: Mousepad
}

export function CompareHero({ left, right }: Props) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge variant="secondary">Mousepad comparison</Badge>
            <Badge variant="outline">Valorant / CS2 focused</Badge>
            <Badge variant="outline">Soft base</Badge>
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {left.brand} {left.name}
            <span className="block text-muted-foreground">vs</span>
            {right.brand} {right.name}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            A control-first classic against a smoother balanced-control pad.
            The real question is whether you want maximum stopping power or
            easier micro-adjustments.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Quick verdict</p>

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

function VerdictRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}