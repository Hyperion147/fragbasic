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
  const saturn = getMousepadBySlug("lgg-saturn-pro-soft")
  const type99 = getMousepadBySlug("artisan-type-99-soft")

  if (!saturn || !type99) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CompareHero left={saturn} right={type99} />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <ProductFaceoff left={saturn} right={type99} />

        <CompareFeelRadar left={saturn} right={type99} />

        <SpeedControlPosition left={saturn} right={type99} />

        <FeelMap left={saturn} right={type99} />

        <SpecRows left={saturn} right={type99} />

        <BuyRecommendation left={saturn} right={type99} />

        <VerdictPanel left={saturn} right={type99} />
      </div>
    </main>
  )
}
