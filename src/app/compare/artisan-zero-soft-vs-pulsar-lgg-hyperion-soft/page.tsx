import { CompareHero } from "@/components/compare/compare-hero"
import { ProductFaceoff } from "@/components/compare/product-faceoff"
import { FeelMap } from "@/components/compare/feel-map"
import { SpecRows } from "@/components/compare/spec-rows"
import { BuyRecommendation } from "@/components/compare/buy-recommendation"
import { VerdictPanel } from "@/components/compare/verdict-panel"
import { getMousepadBySlug } from "@/lib/mousepads"
import { CompareFeelRadar } from "@/components/compare/compare-feel-radar"
import { SpeedControlPosition } from "@/components/compare/speed-control-position"

export default function Page() {
  const zero = getMousepadBySlug("artisan-zero-soft")
  const hyperion = getMousepadBySlug("pulsar-lgg-hyperion-soft")

  if (!zero || !hyperion) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CompareHero left={zero} right={hyperion} />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <ProductFaceoff left={zero} right={hyperion} />

        <CompareFeelRadar left={zero} right={hyperion} />

        <SpeedControlPosition left={zero} right={hyperion} />

        <FeelMap left={zero} right={hyperion} />

        <SpecRows left={zero} right={hyperion} />

        <BuyRecommendation left={zero} right={hyperion} />

        <VerdictPanel left={zero} right={hyperion} />
      </div>
    </main>
  )
}
