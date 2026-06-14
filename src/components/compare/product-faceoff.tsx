import Image from "next/image"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Mousepad } from "@/types/mousepad"
import {
  getColorwayBySlug,
  formatMousepadValue,
  getFeaturedColorwaySlug,
} from "@/lib/mousepads"
import { getPadUseCaseSummary as getComparePadUseCaseSummary } from "@/lib/compare"

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
    getFeaturedColorwaySlug(pad)
  )
  const title = `${pad.brand} ${pad.name}`

  return (
    <Card className="overflow-hidden border-border bg-card/95 shadow-lg shadow-black/10">
      <div
        className="relative aspect-video border-b border-border"
        style={{
          background: `radial-gradient(circle at top, ${colorway.color}22, transparent 55%)`,
        }}
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
            {getComparePadUseCaseSummary(pad)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="text-black">{formatMousepadValue(pad.category)}</Badge>
          <Badge variant="secondary">{formatMousepadValue(pad.softness)}</Badge>
          <Badge variant="outline">{formatMousepadValue(pad.surface)}</Badge>
          <Badge variant="outline">{formatMousepadValue(pad.base)}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="Speed" value={pad.feel.speed} />
          <MiniStat label="Control" value={pad.feel.control} />
          <MiniStat label="Stop" value={pad.feel.stoppingPower} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailPill label="Texture" value={formatMousepadValue(pad.texture.feel)} />
          <DetailPill
            label="Humidity"
            value={`${pad.environment.humidityResistance}/10`}
          />
        </div>

        {pad.communityConsensus && (
          <div className="border-t border-border/60 pt-4 space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Community notes
            </p>
            <p className="text-sm leading-6 text-muted-foreground line-clamp-3">
              {pad.communityConsensus.summary}
            </p>
            {pad.communityConsensus.commonComparisons?.length ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pad.communityConsensus.commonComparisons.slice(0, 3).map((c) => (
                  <Badge key={c} variant="outline" className="text-[10px] px-2 py-0">
                    {c}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        )}
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
