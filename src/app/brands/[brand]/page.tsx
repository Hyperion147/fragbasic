import { notFound } from "next/navigation";

import { BrandBestPicks } from "@/components/brands/brand-best-picks";
import { BrandComparisons } from "@/components/brands/brand-comparisons";
import { BrandOverview } from "@/components/brands/brand-overview";
import { BrandSpeedOrder } from "@/components/brands/brand-speed-order";
import { MousepadCard } from "@/components/mousepads/mousepad-card";
import {
  getAllBrandSlugs,
  getBrandBestPicks,
  getBrandNameFromSlug,
  getBrandOverview,
  getBrandPopularComparisons,
  getBrandSpeedControlOrder,
  type BrandSlug,
} from "@/lib/brands";

type PageProps = {
  params: Promise<{
    brand: string;
  }>;
};

export function generateStaticParams() {
  return getAllBrandSlugs().map((brand) => ({
    brand,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { brand } = await params;
  const brandName = getBrandNameFromSlug(brand);

  if (!brandName) {
    notFound();
  }

  return {
    title: `${brandName} Mousepads`,
    description: `Browse ${brandName} mousepads by brand overview, speed-control order, top picks, and published comparisons.`,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { brand } = await params;
  const brandName = getBrandNameFromSlug(brand);

  if (!brandName) {
    notFound();
  }

  const brandSlug = brand as BrandSlug;
  const overview = getBrandOverview(brandSlug);
  const bestPicks = getBrandBestPicks(brandSlug);

  if (!overview || !bestPicks) {
    notFound();
  }

  const orderedMousepads = getBrandSpeedControlOrder(brandSlug);
  const comparisons = getBrandPopularComparisons(brandSlug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BrandOverview
        brand={overview.brand}
        summary={overview.summary}
        controlAverage={overview.controlAverage}
        speedAverage={overview.speedAverage}
        availableInIndiaCount={overview.availableInIndiaCount}
        strongestCategory={overview.strongestCategory}
        cheapestPad={overview.cheapestPad}
        totalPads={overview.mousepads.length}
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8 md:py-10">
        <BrandBestPicks
          control={bestPicks.control}
          speed={bestPicks.speed}
          value={bestPicks.value}
        />

        <section className="space-y-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              All {brandName} pads
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Every tracked mousepad currently listed under {brandName}, using
              the same product card language as the main mousepad database.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {overview.mousepads.map((mousepad) => (
              <MousepadCard key={mousepad.slug} pad={mousepad} />
            ))}
          </div>
        </section>

        <BrandSpeedOrder mousepads={orderedMousepads} />
        <BrandComparisons comparisons={comparisons} brandName={brandName} />
      </div>
    </main>
  );
}
