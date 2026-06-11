import Image from "next/image"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Mousepad } from "@/types/mousepad"
import { getColorwayBySlug } from "@/lib/mousepads"

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
  const colorway = getColorwayBySlug(
    pad,
    pad.slug === "artisan-zero-soft" ? "orange" : "midnight"
  )
  const title = `${pad.brand} ${pad.name}`

  return (
    <Card className="overflow-hidden border-border bg-card/95 shadow-lg shadow-black/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_45%)]">
      <div
        className="relative aspect-video border-b border-border"
      >
        <Image
          src={pad.images.main}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-contain p-5"
        />
      </div>

      <div className="space-y-5 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{pad.brand}</p>
          <h2 className="text-2xl font-semibold tracking-tight">{pad.name}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {getPadSummary(pad)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="text-black">{pad.category}</Badge>
          <Badge variant="secondary">{pad.softness}</Badge>
          <Badge variant="outline">{pad.surface}</Badge>
          <Badge variant="outline">{pad.base}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="Speed" value={pad.feel.speed} />
          <MiniStat label="Control" value={pad.feel.control} />
          <MiniStat label="Stop" value={pad.feel.stoppingPower} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailPill label="Texture" value={formatValue(pad.texture.feel)} />
          <DetailPill
            label="Humidity"
            value={`${pad.environment.humidityResistance}/10`}
          />
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

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

function getPadSummary(pad: Mousepad) {
  if (pad.category === "balanced-control") {
    return "A classic control-leaning cloth pad with strong stopping power and dependable tac FPS stability."
  }

  if (pad.category === "balanced-speed") {
    return "A smoother, more flexible glide that keeps control without feeling overly slow or muddy."
  }

  return "A competition-focused option tuned for consistent glide, control, and comfort."
}

function formatValue(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
