import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <FeaturedComparison />

        <Categories />

        <PopularGuides />
      </div>
    </main>
  )
}

function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            Competitive FPS Mousepad Database
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Find the right mousepad
            <span className="block text-muted-foreground">
              for your aim style.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Comparisons, testing notes, friction profiles, humidity
            resistance, and recommendations for competitive FPS players.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/mousepads">
                Browse mousepads
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/compare">
                Compare mousepads
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <MetricCard
            value="20+"
            label="Mousepads tracked"
          />

          <MetricCard
            value="10+"
            label="Comparison pages"
          />

          <MetricCard
            value="FPS"
            label="Focused recommendations"
          />
        </div>
      </div>
    </section>
  )
}

function MetricCard({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <Card className="border-border bg-card p-5">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {label}
      </p>
    </Card>
  )
}

function FeaturedComparison() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Featured
          </p>

          <h2 className="text-2xl font-semibold tracking-tight">
            Popular comparisons
          </h2>
        </div>

        <Button variant="ghost" asChild>
          <Link href="/compare">
            View all
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ComparisonCard
          title="Artisan Zero vs Hyperion"
          href="/compare/artisan-zero-soft-vs-pulsar-lgg-hyperion-soft"
        />

        <ComparisonCard
          title="Artisan Zero vs Saturn Pro"
          href="/compare/artisan-zero-soft-vs-lgg-saturn-pro-soft"
        />

        <ComparisonCard
          title="Type-99 vs Zero"
          href="/compare/artisan-type-99-soft-vs-artisan-zero-soft"
        />
      </div>
    </section>
  )
}

function ComparisonCard({
  title,
  href,
}: {
  title: string
  href: string
}) {
  return (
    <Link href={href}>
      <Card className="group h-full border-border bg-card transition-colors hover:border-primary/40">
        <div className="aspect-[16/9] border-b border-border bg-secondary" />

        <div className="p-5">
          <h3 className="font-medium">{title}</h3>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            Read comparison

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

function Categories() {
  return (
    <section className="mt-16">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Explore
        </p>

        <h2 className="text-2xl font-semibold tracking-tight">
          Browse by category
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <CategoryCard
          title="Control"
          count="8 pads"
        />

        <CategoryCard
          title="Balanced"
          count="6 pads"
        />

        <CategoryCard
          title="Speed"
          count="4 pads"
        />

        <CategoryCard
          title="Glass"
          count="Coming soon"
        />
      </div>
    </section>
  )
}

function CategoryCard({
  title,
  count,
}: {
  title: string
  count: string
}) {
  return (
    <Card className="border-border bg-card p-5">
      <h3 className="font-medium">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {count}
      </p>
    </Card>
  )
}

function PopularGuides() {
  return (
    <section className="mt-16">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Guides
        </p>

        <h2 className="text-2xl font-semibold tracking-tight">
          Learn before you buy
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <GuideCard
          title="Best mousepads for Valorant"
        />

        <GuideCard
          title="Control vs speed mousepads"
        />

        <GuideCard
          title="Best mousepads for humidity"
        />

        <GuideCard
          title="How mousepads affect aim"
        />
      </div>
    </section>
  )
}

function GuideCard({
  title,
}: {
  title: string
}) {
  return (
    <Card className="border-border bg-card p-5">
      <h3 className="font-medium">{title}</h3>
    </Card>
  )
}