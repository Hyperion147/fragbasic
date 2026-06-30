import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { BuyRecommendation } from "@/components/compare/buy-recommendation";
import { CompareFeelRadar } from "@/components/compare/compare-feel-radar";
import { CompareHero } from "@/components/compare/compare-hero";
import { FeelMap } from "@/components/compare/feel-map";
import { ProductFaceoff } from "@/components/compare/product-faceoff";
import { SpeedControlPosition } from "@/components/compare/speed-control-position";
import { SpecRows } from "@/components/compare/spec-rows";
import { VerdictPanel } from "@/components/compare/verdict-panel";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { getAllComparisons } from "@/lib/comparisons";
import { getComparisonPageData } from "@/lib/compare";
import { getMousepadFullName } from "@/lib/mousepads";
import { buildMetadata } from "@/lib/seo";

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparisonData = getComparisonPageData(slug);

  if (!comparisonData) {
    notFound();
  }

  const { comparison, left, right } = comparisonData;

  return buildMetadata({
    title: comparison.title,
    description: `${comparison.excerpt} Compare ${getMousepadFullName(
      left
    )} and ${getMousepadFullName(
      right
    )} across speed, control, stopping power, humidity resistance, and overall feel.`,
    path: `/mousepads/compare/${comparison.slug}`,
    keywords: [
      comparison.title,
      `${getMousepadFullName(left)} vs ${getMousepadFullName(right)}`,
      "mousepad comparison",
    ],
  });
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comparisonData = getComparisonPageData(slug);

  if (!comparisonData) {
    notFound();
  }

  const { comparison, left, right } = comparisonData;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="w-full px-4 pt-8 md:px-6 lg:px-8 xl:px-10">
        <SiteBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Mousepads", href: "/mousepads" },
            { label: "Compare", href: "/mousepads/compare" },
            { label: comparison.title },
          ]}
        />
      </div>
      <CompareHero left={left} right={right} comparisonSlug={comparison.slug} />

      <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10 space-y-6">
        <CompareDisclosure title="Product faceoff" defaultOpen>
          <ProductFaceoff left={left} right={right} />
        </CompareDisclosure>
        <CompareDisclosure title="Feel radar" defaultOpen>
          <CompareFeelRadar left={left} right={right} />
        </CompareDisclosure>
        <CompareDisclosure title="Speed and control position">
          <SpeedControlPosition left={left} right={right} />
        </CompareDisclosure>
        <CompareDisclosure title="Feel map">
          <FeelMap left={left} right={right} />
        </CompareDisclosure>
        <CompareDisclosure title="Specifications">
          <SpecRows left={left} right={right} />
        </CompareDisclosure>
        <CompareDisclosure title="Buying recommendation">
          <BuyRecommendation left={left} right={right} />
        </CompareDisclosure>
        <CompareDisclosure title="Verdict">
          <VerdictPanel left={left} right={right} />
        </CompareDisclosure>
      </div>
    </main>
  );
}

function CompareDisclosure({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-border bg-card/45"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-foreground sm:px-5">
        {title}
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border p-3 sm:p-4">{children}</div>
    </details>
  );
}
