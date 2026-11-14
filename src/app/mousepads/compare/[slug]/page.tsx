import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { BuyRecommendation } from "@/components/compare/buy-recommendation";
import { JsonLd } from "@/components/json-ld";import { CompareFeelRadar } from "@/components/compare/compare-feel-radar";
import { CompareHero } from "@/components/compare/compare-hero";
import { FeelMap } from "@/components/compare/feel-map";import { ProductFaceoff } from "@/components/compare/product-faceoff";
import { SpeedControlPosition } from "@/components/compare/speed-control-position";
import { SpecRows } from "@/components/compare/spec-rows";
import { VerdictPanel } from "@/components/compare/verdict-panel";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { AiFaq } from "@/components/seo/ai-blocks";
import { getMousepadFullName } from "@/lib/mousepads";
import {
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";
import {
  getPublicComparisonPageData,
  getPublicComparisonSlugs,
} from "@/server/catalog/comparisons";
import type { Mousepad } from "@/types/mousepad";

export const revalidate = 300;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return (await getPublicComparisonSlugs()).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparisonData = await getPublicComparisonPageData(slug);

  if (!comparisonData) {
    notFound();
  }

  const { comparison, left, right } = comparisonData;
  const leftName = getMousepadFullName(left);
  const rightName = getMousepadFullName(right);

  return buildMetadata({
    title: comparison.title,
    description: `${comparison.excerpt} ${leftName} vs ${rightName}: speed, control, stopping power, and which pad fits your FPS aim.`,
    path: `/mousepads/compare/${comparison.slug}`,
    keywords: [
      ...seoKeywords.comparisons,
      comparison.title,
      `${leftName} vs ${rightName}`,
      `${leftName} vs ${rightName} reddit`,
      `${leftName} vs ${rightName} for valorant`,
      `${leftName} vs ${rightName} for cs2`,
      `${leftName} or ${rightName}`,
      `${leftName} vs ${rightName} which is better`,
      `difference between ${leftName} and ${rightName}`,
      `is ${leftName} better than ${rightName}`,
      `${left.name} vs ${right.name}`,
      `${left.brand} vs ${right.brand} mousepad`,
      "mousepad comparison",
    ],
  });
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comparisonData = await getPublicComparisonPageData(slug);

  if (!comparisonData) {
    notFound();
  }

  const { comparison, left, right } = comparisonData;
  const faqs = getCompareFaqs(left, right, comparison.excerpt);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <div className="w-full px-4 pt-6 md:px-6 lg:px-8 xl:px-10">
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

      <div className="page-section space-y-6">
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

      <div className="page-section border-t border-border">
        <AiFaq items={faqs} />
      </div>
    </main>
  );
}

function getCompareFaqs(left: Mousepad, right: Mousepad, excerpt: string) {
  const leftName = getMousepadFullName(left);
  const rightName = getMousepadFullName(right);
  const faster = left.feel.speed >= right.feel.speed ? left : right;
  const slower = faster.slug === left.slug ? right : left;
  const moreStopping =
    left.feel.stoppingPower >= right.feel.stoppingPower ? left : right;
  const lessStopping = moreStopping.slug === left.slug ? right : left;
  const moreControl =
    left.feel.control >= right.feel.control ? left : right;

  return [
    {
      q: `${leftName} vs ${rightName}: which is better?`,
      a: `There is no universal winner. ${excerpt} ${getMousepadFullName(faster)} is the faster pad in this matchup, while ${getMousepadFullName(moreStopping)} offers more stopping power. Pick the faster option for tracking and wide flicks, or the more planted option for angle holding and micro-corrections.`,
    },
    {
      q: `What is the difference between ${leftName} and ${rightName}?`,
      a: `The main differences are glide speed, stopping power, control, surface texture, and base feel. ${leftName} is rated ${left.feel.speed}/10 for speed and ${left.feel.stoppingPower}/10 for stopping. ${rightName} is rated ${right.feel.speed}/10 for speed and ${right.feel.stoppingPower}/10 for stopping. Those feel differences matter more than the raw category label.`,
    },
    {
      q: `Which is faster, ${leftName} or ${rightName}?`,
      a: `${getMousepadFullName(faster)} has the higher speed rating in this comparison. ${getMousepadFullName(slower)} will feel more controlled because it asks for more force to start moving, which can help if you overflick or need to hold tight angles.`,
    },
    {
      q: `Which has more stopping power, ${leftName} or ${rightName}?`,
      a: `${getMousepadFullName(moreStopping)} has the higher stopping-power rating. ${getMousepadFullName(lessStopping)} gives up some braking force, so it is better suited to players who already stop with their arm and want easier tracking or faster corrections.`,
    },
    {
      q: `Is ${leftName} or ${rightName} better for VALORANT and CS2?`,
      a: `For VALORANT and CS2, start with the pad that has more stopping power and control: ${getMousepadFullName(moreStopping)}. If you play tracking-heavy games or prefer a lower-friction feel, ${getMousepadFullName(faster)} may suit you better. There is no substitute for trying the feel that matches your sensitivity and grip.`,
    },
    {
      q: `Which is better for tracking games, ${leftName} or ${rightName}?`,
      a: `${getMousepadFullName(faster)} is the more natural tracking pick because its lower friction makes small adjustments and wide target switches easier. ${getMousepadFullName(moreControl)} still works if you prefer a more controlled glide and do not mind adding a little hand speed.`,
    },
  ];
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
      className="group data-panel"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-foreground sm:px-5">
        {title}
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="p-3 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-4">{children}</div>
    </details>
  );
}
