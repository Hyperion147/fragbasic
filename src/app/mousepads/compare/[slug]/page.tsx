import { notFound } from "next/navigation";

import { BuyRecommendation } from "@/components/compare/buy-recommendation";
import { CompareFeelRadar } from "@/components/compare/compare-feel-radar";
import { CompareHero } from "@/components/compare/compare-hero";
import { FeelMap } from "@/components/compare/feel-map";
import { ProductFaceoff } from "@/components/compare/product-faceoff";
import { SpeedControlPosition } from "@/components/compare/speed-control-position";
import { SpecRows } from "@/components/compare/spec-rows";
import { VerdictPanel } from "@/components/compare/verdict-panel";
import { getAllComparisons } from "@/lib/comparisons";
import { getComparisonPageData } from "@/lib/compare";
import { getMousepadFullName } from "@/lib/mousepads";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllComparisons().map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const comparisonData = getComparisonPageData(slug);

  if (!comparisonData) {
    notFound();
  }

  const { comparison, left, right } = comparisonData;

  return {
    title: comparison.title,
    description: `${comparison.excerpt} Compare ${getMousepadFullName(
      left
    )} and ${getMousepadFullName(
      right
    )} across speed, control, stopping power, and humidity resistance.`,
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comparisonData = getComparisonPageData(slug);

  if (!comparisonData) {
    notFound();
  }

  const { left, right } = comparisonData;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CompareHero left={left} right={right} />

      <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10 space-y-6">
        <ProductFaceoff left={left} right={right} />
        <CompareFeelRadar left={left} right={right} />
        <SpeedControlPosition left={left} right={right} />
        <FeelMap left={left} right={right} />
        <SpecRows left={left} right={right} />
        <BuyRecommendation left={left} right={right} />
        <VerdictPanel left={left} right={right} />
      </div>
    </main>
  );
}
