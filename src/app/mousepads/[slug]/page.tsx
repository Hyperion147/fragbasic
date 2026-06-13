import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  Check,
  CircleOff,
  Dot,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { getRelatedComparisons } from "@/lib/comparisons"
import { getBrandSlugFromMousepad } from "@/lib/brands"
import {
  getAllMousepads,
  getMousepadBySlug,
  getSimilarMousepads,
} from "@/lib/mousepads"
import { formatPrice, formatValue } from "@/lib/utils/format"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MousepadFeelChart } from "@/components/mousepads/mousepad-feel-chart"
import { MousepadSpecGrid } from "@/components/mousepads/mousepad-spec-grid"
import { MousepadImageGallery } from "@/components/mousepads/mousepad-image-gallery"
import { SimilarMousepads } from "@/components/mousepads/similar-mousepads"
import type { Mousepad } from "@/types/mousepad"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllMousepads().map((pad) => ({
    slug: pad.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const pad = getMousepadBySlug(slug)

  if (!pad) {
    notFound()
  }

  return {
    title: `${pad.brand} ${pad.name} Review & Specs`,
    description: `${pad.brand} ${pad.name} feel profile, specs, humidity resistance, control, speed, and FPS recommendations.`,
  }
}

export default async function MousepadPage({ params }: PageProps) {
  const { slug } = await params
  const pad = getMousepadBySlug(slug)

  if (!pad) notFound()

  const relatedComparisons = getRelatedComparisons(pad.slug)
  const brandSlug = getBrandSlugFromMousepad(pad)
  const similarMousepads = getSimilarMousepads(pad, {
    excludeSameBrand: true,
    limit: 3,
  })
  const publishedComparison = relatedComparisons.find(
    (comparison) => comparison.status === "published"
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-background">
        <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="text-black">{formatValue(pad.category)}</Badge>
                <Badge variant="outline">{formatValue(pad.softness)}</Badge>
                <Badge variant="outline">{formatValue(pad.surface)}</Badge>
                <Badge variant="outline">{formatValue(pad.base)} base</Badge>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {pad.brand}
                </p>

                <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                  {pad.name}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  {getHeroSummary(pad)}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <HeroStat label="Speed" value={pad.feel.speed} />
                <HeroStat label="Control" value={pad.feel.control} />
                <HeroStat label="Stopping" value={pad.feel.stoppingPower} />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <HighlightCard
                  label="Best for"
                  value={pad.recommendedFor.games.map(formatValue).join(", ")}
                />
                <HighlightCard
                  label="Humidity fit"
                  value={`${pad.environment.humidityResistance}/10 resistance`}
                />
                <HighlightCard
                  label="India price"
                  value={formatPrice(pad.price.inr)}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={publishedComparison ? `/mousepads/compare/${publishedComparison.slug}` : "/mousepads/compare"}>
                    {publishedComparison ? "Read comparison" : "Browse comparisons"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/mousepads">Browse all pads</Link>
                </Button>

                {brandSlug ? (
                  <Button variant="secondary" asChild>
                    <Link href={`/mousepads/brands/${brandSlug}`}>Visit brand</Link>
                  </Button>
                ) : null}
              </div>
            </div>

            <Card className="overflow-hidden border-border bg-card/95 p-5 shadow-lg shadow-black/10">
              <MousepadImageGallery
                brand={pad.brand}
                name={pad.name}
                image={pad.images.main}
              />
            </Card>
          </div>
        </div>
      </section>

      <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <MousepadFeelChart pad={pad} />
            <MousepadSpecGrid pad={pad} />
            <SurfaceAndUseCard pad={pad} />
            <PersonalNotes pad={pad} />
            <SourcesCard pad={pad} />
          </div>

          <aside className="space-y-6">
            <RecommendationCard pad={pad} />
            <AvailabilityCard pad={pad} />
            <ColorwaysCard pad={pad} />
            <CompareLinksCard
              pad={pad}
              comparisonSlug={publishedComparison?.slug}
              relatedCount={relatedComparisons.length}
            />
            <SimilarMousepads source={pad} mousepads={similarMousepads} />
          </aside>
        </div>
      </div>
    </main>
  )
}

function HeroStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
    </div>
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
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-foreground">
        {value}
      </p>
    </div>
  )
}

function RecommendationCard({ pad }: { pad: Mousepad }) {
  return (
    <Card className="border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4 text-primary" />
        <p className="text-sm text-muted-foreground">Best for</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {pad.recommendedFor.games.map((game) => (
          <Badge key={game} className="text-black">
            {formatValue(game)}
          </Badge>
        ))}
      </div>

      <div className="mt-5 space-y-3 text-sm text-muted-foreground">
        <p>
          Aim style:{" "}
          <span className="text-foreground">
            {pad.recommendedFor.aimStyles.map(formatValue).join(", ")}
          </span>
        </p>

        <p>
          Sensitivity:{" "}
          <span className="text-foreground">
            {pad.recommendedFor.sensitivity.map(formatValue).join(", ")}
          </span>
        </p>
      </div>
    </Card>
  )
}

function AvailabilityCard({ pad }: { pad: Mousepad }) {
  return (
    <Card className="border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">Availability</p>

      <h3 className="mt-2 text-xl font-semibold">
        {formatValue(pad.availability.india)} in India
      </h3>

      <p className="mt-3 text-sm text-muted-foreground">
        Estimated India price:{" "}
        <span className="text-foreground">{formatPrice(pad.price.inr)}</span>
      </p>

      {pad.availability.stores?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {pad.availability.stores.map((store) => (
            <Badge key={store} variant="outline">
              {store}
            </Badge>
          ))}
        </div>
      ) : null}

      {pad.availability.notes ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {pad.availability.notes}
        </p>
      ) : null}
    </Card>
  )
}

function ColorwaysCard({ pad }: { pad: Mousepad }) {
  return (
    <Card className="border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">Colorways</p>

      <div className="mt-4 space-y-3">
        {pad.visuals.colorways.map((colorway) => (
          <div
            key={colorway.slug}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/70 p-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="size-5 rounded-full border border-border"
                style={{ backgroundColor: colorway.color }}
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {colorway.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {colorway.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>

            {pad.visuals.defaultColorway === colorway.slug ? (
              <Badge variant="outline">Default</Badge>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  )
}

function CompareLinksCard({
  pad,
  comparisonSlug,
  relatedCount,
}: {
  pad: Mousepad
  comparisonSlug?: string
  relatedCount: number
}) {
  return (
    <Card className="border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <p className="text-sm text-muted-foreground">Compare this pad</p>
      </div>

      <h3 className="mt-2 text-xl font-semibold">
        See where {pad.name} fits
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {relatedCount > 0
          ? `${relatedCount} related comparison${relatedCount > 1 ? "s" : ""} found for this mousepad.`
          : "No direct comparisons are published yet, but you can still explore the compare hub."}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild className="w-full">
          <Link href={comparisonSlug ? `/mousepads/compare/${comparisonSlug}` : "/mousepads/compare"}>
            {comparisonSlug ? "Open related comparison" : "Visit compare hub"}
          </Link>
        </Button>
      </div>
    </Card>
  )
}

function SurfaceAndUseCard({ pad }: { pad: Mousepad }) {
  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Use case</p>
        <h2 className="text-2xl font-semibold tracking-tight">
          What to expect day to day
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background/80 p-4">
          <p className="text-sm font-medium text-foreground">Texture and comfort</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {formatValue(pad.texture.feel)} surface, {pad.texture.noiseLevel} noise,
            skin comfort rated {pad.texture.skinComfort}/10, and{" "}
            {pad.texture.sleeveFriendly ? "good sleeve compatibility." : "less sleeve-friendly behavior."}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background/80 p-4">
          <p className="text-sm font-medium text-foreground">Environment fit</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Humidity {pad.environment.humidityResistance}/10, sweat{" "}
            {pad.environment.sweatResistance}/10, dust and hair{" "}
            {pad.environment.dustHairResistance}/10, and{" "}
            {pad.environment.washable ? "washable for easier maintenance." : "not ideal for regular washing."}
          </p>
        </div>
      </div>

      {pad.avoidIf?.length ? (
        <div className="mt-6 rounded-3xl border border-border bg-background/60 p-5">
          <p className="text-sm font-medium text-foreground">Maybe skip it if</p>

          <ul className="mt-4 space-y-3">
            {pad.avoidIf.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CircleOff className="mt-0.5 size-4 text-destructive" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  )
}

function PersonalNotes({ pad }: { pad: Mousepad }) {
  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <p className="text-sm text-muted-foreground">Personal notes</p>

      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
        Tested experience
      </h2>

      <p className="mt-4 leading-7 text-muted-foreground">
        {pad.personal.notes || "Personal testing notes will be added later."}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background/70 p-4">
          <p className="font-medium text-foreground">Pros</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {(pad.personal.pros || []).map((pro) => (
              <li key={pro} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 text-primary" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-background/70 p-4">
          <p className="font-medium text-foreground">Cons</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {(pad.personal.cons || []).map((con) => (
              <li key={con} className="flex items-start gap-2">
                <Dot className="mt-0.5 size-4 text-muted-foreground" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

function SourcesCard({ pad }: { pad: Mousepad }) {
  return (
    <Card className="border-border bg-card p-5 md:p-6">
      <p className="text-sm text-muted-foreground">Sources</p>

      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
        Where this information comes from
      </h2>

      <div className="mt-5 space-y-3">
        {pad.sources.map((source) => (
          <div
            key={`${source.label}-${source.url ?? source.type}`}
            className="rounded-2xl border border-border bg-background/70 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {source.label}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {source.type}
                </p>
              </div>

              {source.url ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href={source.url} target="_blank" rel="noreferrer">
                    Open
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function getHeroSummary(pad: Mousepad) {
  const games = pad.recommendedFor.games.slice(0, 2).map(formatValue).join(" and ")
  return `${pad.brand} ${pad.name} is a ${formatValue(pad.category)} pad built for ${games}. It balances ${pad.feel.control}/10 control, ${pad.feel.speed}/10 speed, and ${pad.feel.stoppingPower}/10 stopping power for players who care about gear feel, not just marketing labels.`
}

