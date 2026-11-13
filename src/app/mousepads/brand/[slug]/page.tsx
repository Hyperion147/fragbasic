import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { AiFaq } from "@/components/seo/ai-blocks";
import { PopularSearches } from "@/components/seo/related-links";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBrandName, getBrandSlug, getBrandSlugs } from "@/lib/brands";
import {
  formatMousepadValue,
  getMousepadFullName,
} from "@/lib/mousepads";
import {
  buildCollectionJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";
import { getPublicComparisons } from "@/server/catalog/comparisons";
import { getPublicPads } from "@/server/catalog/pads";
import type { Mousepad } from "@/types/mousepad";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pads = await getPublicPads();
  return getBrandSlugs(pads.map((pad) => pad.brand)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pads = await getPublicPads();
  const brandPads = pads.filter((pad) => getBrandSlug(pad.brand) === slug);
  const brand = brandPads[0] ? getBrandName(brandPads[0].brand) : undefined;

  if (!brand || brandPads.length === 0) {
    return {};
  }

  const baseDescription = `Every ${brand} mousepad we track: speed, control, stopping power, specs, price, and India availability for VALORANT, CS2, and tracking FPS.`;
  // Add model names only while the description stays under ~160 characters.
  const models = brandPads
    .slice(0, 2)
    .map((pad) => getMousepadFullName(pad))
    .join(" and ");
  const withModels = `${baseDescription} Includes ${models}.`;
  const description =
    withModels.length <= 160 ? withModels : baseDescription;

  return buildMetadata({
    title: `${brand} Mousepads: Reviews & Specs`,
    description,
    path: `/mousepads/brand/${slug}`,
    keywords: [
      ...seoKeywords.brands,
      ...seoKeywords.mousepads,
      `${brand} mousepad`,
      `${brand} mousepads`,
      `${brand} mousepad review`,
      `${brand} mousepad reviews`,
      `${brand} mousepad india`,
      `best ${brand} mousepad`,
      `best ${brand} mousepad for valorant`,
      `best ${brand} mousepad for cs2`,
      ...brandPads.map((pad) => getMousepadFullName(pad)),
      ...brandPads.map((pad) => `${getMousepadFullName(pad)} review`),
    ],
  });
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const [pads, comparisons] = await Promise.all([
    getPublicPads(),
    getPublicComparisons(),
  ]);
  const brandPads = pads.filter((pad) => getBrandSlug(pad.brand) === slug);
  const brand = brandPads[0] ? getBrandName(brandPads[0].brand) : undefined;

  if (!brand || brandPads.length === 0) {
    notFound();
  }

  const sortedByControl = [...brandPads].sort(
    (left, right) =>
      right.feel.control +
      right.feel.stoppingPower -
      (left.feel.control + left.feel.stoppingPower),
  );
  const sortedBySpeed = [...brandPads].sort(
    (left, right) => right.feel.speed - left.feel.speed,
  );
  const bestControl = sortedByControl[0];
  const bestSpeed = sortedBySpeed[0];
  const indiaAvailable = brandPads.filter(
    (pad) =>
      pad.availability.india === "available" ||
      pad.availability.india === "limited",
  ).length;
  const glassCount = brandPads.filter((pad) => pad.category === "glass").length;
  const brandComparisons = comparisons.filter((comparison) => {
    const left = pads.find((pad) => pad.slug === comparison.leftSlug);
    const right = pads.find((pad) => pad.slug === comparison.rightSlug);
    return (
      (left && getBrandSlug(left.brand) === slug) ||
      (right && getBrandSlug(right.brand) === slug)
    );
  });
  const otherBrands = Array.from(
    new Set(
      pads
        .map((pad) => pad.brand)
        .filter((entry) => getBrandSlug(entry) !== slug)
        .map((entry) => getBrandName(entry)),
    ),
  )
    .sort((left, right) => left.localeCompare(right))
    .slice(0, 12);
  const faqs = getBrandFaqs(
    brand,
    bestControl,
    bestSpeed,
    brandPads.length,
    indiaAvailable,
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={buildCollectionJsonLd({
          name: `${brand} Mousepad Database`,
          description: `Every ${brand} mousepad tracked by FragBasic with feel ratings, specs, price, and India availability.`,
          path: `/mousepads/brand/${slug}`,
          itemCount: brandPads.length,
        })}
      />
      <JsonLd data={buildFaqJsonLd(faqs)} />

      <section className="border-b border-border bg-background">
        <div className="page-hero">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Mousepads", href: "/mousepads" },
                { label: brand },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="text-black">{brand}</Badge>
              <Badge variant="outline">
                {brandPads.length} model{brandPads.length === 1 ? "" : "s"}
              </Badge>
              {glassCount > 0 ? (
                <Badge variant="outline">{glassCount} glasspad</Badge>
              ) : null}
            </div>

            <h1 className="page-title mt-5">
              {brand} mousepads: reviews, specs, and comparisons.
            </h1>
            <p className="body-copy mt-4 max-w-3xl">
              Browse every {brand} mousepad in the FragBasic database. Compare
              speed, control, stopping power, surface, price, and India
              availability, then open a review or put two {brand} pads side by
              side.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/mousepads/compare/universal">
                  Compare {brand} pads
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/mousepads">All mousepads</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brandPads.map((pad) => (
            <MousepadCard key={pad.slug} pad={pad} />
          ))}
        </div>
      </section>

      <section className="page-section border-t border-border">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="soft-panel p-5">
            <h2 className="section-title">Best {brand} pads by feel</h2>
            <div className="mt-4 space-y-4">
              <BrandPick
                label="Most control"
                pad={bestControl}
                value={`${bestControl.feel.control}/10 control · ${bestControl.feel.stoppingPower}/10 stopping`}
              />
              <BrandPick
                label="Fastest glide"
                pad={bestSpeed}
                value={`${bestSpeed.feel.speed}/10 speed · ${bestSpeed.feel.microAdjustments}/10 micro-adjustments`}
              />
            </div>
          </div>

          <div className="soft-panel p-5">
            <h2 className="section-title">Buying {brand} in India</h2>
            <p className="body-copy mt-3">
              {indiaAvailable > 0
                ? `${indiaAvailable} of ${brandPads.length} tracked ${brand} pads are listed as available or limited in India. Check the buying notes on each review for current stores and import caveats.`
                : `${brand} pads are tracked as import-only or unavailable in India right now. Use the reviews to shortlist models, then verify import costs and warranty before ordering.`}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {brand} is best known in this database for{" "}
              {Array.from(
                new Set(brandPads.map((pad) => formatMousepadValue(pad.category))),
              ).join(", ")}{" "}
              surfaces.
            </p>
          </div>
        </div>
      </section>

      {brandComparisons.length > 0 ? (
        <section className="page-section">
          <h2 className="section-title">{brand} comparisons</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {brandComparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/mousepads/compare/${comparison.slug}`}
                className="soft-panel flex items-center justify-between gap-4 p-4 text-sm transition-colors hover:text-brand-hover"
              >
                <span>{comparison.title}</span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="page-section border-t border-border">
        <div className="space-y-6">
          <AiFaq items={faqs} />
          <PopularSearches
            title={`More ${brand} and FPS mousepad research`}
            description={`Use these links to compare ${brand} pads with alternatives, browse other brands, or jump into a game-specific best list.`}
            groups={[
              {
                title: "Compare and choose",
                links: [
                  { label: `Compare ${brand} mousepads`, href: "/mousepads/compare/universal" },
                  { label: "Best mousepads for VALORANT", href: "/best/valorant-mousepads" },
                  { label: "Best mousepads for CS2", href: "/best/cs2-mousepads" },
                  { label: "Best control mousepads", href: "/best/control-mousepads" },
                  { label: "Best speed mousepads", href: "/best/speed-mousepads" },
                  { label: "Best glasspads", href: "/best/glasspads" },
                ],
              },
              {
                title: "Other mousepad brands",
                links: otherBrands.map((entry) => ({
                  label: `${entry} mousepads`,
                  href: `/mousepads/brand/${getBrandSlug(entry)}`,
                })),
              },
              {
                title: "Learn",
                links: [
                  { label: "How to choose a gaming mousepad", href: "/mousepads/guides/first-mousepad-guide" },
                  { label: "Control vs speed mousepads", href: "/mousepads/guides/control-vs-speed-mousepads" },
                  { label: "Humid climate mousepad guide", href: "/mousepads/guides/humid-climate-mousepads" },
                  { label: "All FPS mousepad guides", href: "/mousepads/guides" },
                ],
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

function BrandPick({
  label,
  pad,
  value,
}: {
  label: string;
  pad: Mousepad;
  value: string;
}) {
  return (
    <div className="border-b border-border/60 pb-4 last:border-0 last:pb-0">
      <p className="compact-label">{label}</p>
      <Link
        href={`/mousepads/${pad.slug}`}
        className="panel-title mt-1 block text-foreground hover:text-primary"
      >
        {getMousepadFullName(pad)}
      </Link>
      <p className="mt-1 text-sm text-muted-foreground">{value}</p>
    </div>
  );
}

function getBrandFaqs(
  brand: string,
  bestControl: Mousepad,
  bestSpeed: Mousepad,
  count: number,
  indiaAvailable: number,
) {
  return [
    {
      q: `What is the best ${brand} mousepad for control?`,
      a: `In the FragBasic database, ${getMousepadFullName(
        bestControl,
      )} has the strongest control and stopping profile among ${brand} pads. It is rated ${bestControl.feel.control}/10 for control and ${bestControl.feel.stoppingPower}/10 for stopping power.`,
    },
    {
      q: `What is the fastest ${brand} mousepad?`,
      a: `${getMousepadFullName(
        bestSpeed,
      )} has the highest speed rating among the ${count} ${brand} pads tracked. It is rated ${bestSpeed.feel.speed}/10 for speed and ${bestSpeed.feel.microAdjustments}/10 for micro-adjustments.`,
    },
    {
      q: `Are ${brand} mousepads good for VALORANT and CS2?`,
      a: `${brand} makes pads across control, balanced, and speed profiles, so the right pick depends on the model. For VALORANT and CS2, start with the ${brand} pad that has the most stopping power and control, then compare it with a faster alternative if you want easier clearing.`,
    },
    {
      q: `Are ${brand} mousepads available in India?`,
      a:
        indiaAvailable > 0
          ? `${indiaAvailable} of ${count} tracked ${brand} pads are listed as available or limited in India. Availability changes, so check each review's buying notes before ordering.`
          : `${brand} pads are currently tracked as import-only or unavailable in India. Check import costs, duties, and warranty before buying.`,
    },
  ];
}
