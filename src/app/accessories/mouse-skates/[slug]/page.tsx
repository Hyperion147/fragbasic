import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  CircleOff,
  Gauge,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";

import { MouseSkateDot } from "@/components/accessories/mouse-skates/mouse-skate-dot";
import { JsonLd } from "@/components/json-ld";
import { AiDefinition, AiFaq, AiSpecTable } from "@/components/seo/ai-blocks";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatMouseSkateMaterial,
  formatMouseSkateRating,
  getMouseSkateFullName,
  getMouseSkateSurfaceFitClass,
} from "@/lib/accessories/mouse-skates";
import {
  buildFaqJsonLd,
  buildMetadata,
  buildProductJsonLd,
  seoKeywords,
} from "@/lib/seo";
import {
  getPublicMouseSkateBySlug,
  getPublicMouseSkateSlugs,
  getPublicMouseSkates,
} from "@/server/catalog/accessories";
import type { MouseSkate } from "@/types/accessory";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getPublicMouseSkateSlugs()).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skate = await getPublicMouseSkateBySlug(slug);

  if (!skate) {
    return {};
  }

  const fullName = getMouseSkateFullName(skate);
  const material = formatMouseSkateMaterial(skate.material);

  return buildMetadata({
    title: `${fullName} Review & Specs`,
    description: `${fullName} review: speed, control, stopping, durability, and glasspad fit. See whether these ${material.toLowerCase()} skates suit cloth or glass pads.`,
    path: `/accessories/mouse-skates/${skate.slug}`,
    keywords: [
      ...seoKeywords.skates,
      fullName,
      `${fullName} review`,
      `${fullName} specs`,
      `${fullName} skates`,
      `${skate.name} review`,
      `${skate.name} skates`,
      `${skate.name} mouse skates`,
      `${skate.brand} skates`,
      `${skate.brand} mouse skates`,
      `are ${skate.name} good for glass`,
      `${skate.name} for glass mousepad`,
      `${skate.name} vs`,
      `${material} mouse skates`,
      `${skate.shape} mouse skates`,
      "mouse skate review",
      "glasspad mouse skates",
    ],
  });
}

export default async function MouseSkatePage({ params }: Props) {
  const { slug } = await params;
  const [skate, allSkates] = await Promise.all([
    getPublicMouseSkateBySlug(slug),
    getPublicMouseSkates(),
  ]);

  if (!skate) {
    notFound();
  }

  const fullName = getMouseSkateFullName(skate);
  const material = formatMouseSkateMaterial(skate.material);
  const faqs = getSkateFaqs(skate);
  const averageRating =
    (skate.ratings.speed +
      skate.ratings.control +
      skate.ratings.stoppingPower +
      skate.ratings.durability) /
    4;
  const relatedSkates = allSkates
    .filter((entry) => entry.slug !== skate.slug)
    .sort((left, right) => {
      const leftScore =
        (left.material === skate.material ? 2 : 0) +
        (left.brand === skate.brand ? 1 : 0);
      const rightScore =
        (right.material === skate.material ? 2 : 0) +
        (right.brand === skate.brand ? 1 : 0);

      return rightScore - leftScore;
    })
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={buildProductJsonLd({
          name: fullName,
          description: skate.communitySummary || skate.notes,
          path: `/accessories/mouse-skates/${skate.slug}`,
          brand: skate.brand,
          category: "Mouse Skates",
          review: {
            name: `${fullName} review`,
            body: skate.communitySummary || skate.notes,
            author: "FragBasic Review Team",
            rating: Number(averageRating.toFixed(1)),
            positiveNotes: skate.bestFor,
            negativeNotes: skate.avoidIf,
          },
        })}
      />
      <JsonLd data={buildFaqJsonLd(faqs)} />

      <section className="border-b border-border bg-background">
        <div className="page-hero">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <SiteBreadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  {
                    label: "Mouse skates",
                    href: "/accessories/mouse-skates",
                  },
                  { label: fullName },
                ]}
              />

              <div className="flex flex-wrap gap-2">
                <Badge>{skate.brand}</Badge>
                <Badge variant="outline">{material}</Badge>
                <Badge variant="outline">{skate.shape}</Badge>
                <Badge variant="outline">{skate.series}</Badge>
                <Badge variant="outline">
                  {skate.sources.length} sources
                </Badge>
              </div>

              <div>
                <p className="compact-label">Mouse skate review</p>
                <h1 className="page-title mt-3 max-w-4xl">{fullName}</h1>
                <p className="body-copy mt-4 max-w-2xl">
                  {skate.communitySummary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <HeroStat
                  label="Speed"
                  value={formatMouseSkateRating(skate.ratings.speed)}
                />
                <HeroStat
                  label="Control"
                  value={formatMouseSkateRating(skate.ratings.control)}
                />
                <HeroStat
                  label="Stopping"
                  value={formatMouseSkateRating(skate.ratings.stoppingPower)}
                />
                <HeroStat
                  label="Durability"
                  value={formatMouseSkateRating(skate.ratings.durability)}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link
                    href={`/accessories/mouse-skates/compare?left=${skate.slug}`}
                  >
                    Compare this skate
                    <ArrowLeftRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/accessories/mouse-skates/browse">
                    Browse all skates
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/mousepads/glasspads">Glass mousepads</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-2xl border border-border bg-card/60 p-8">
              <MouseSkateDot skate={skate} size="lg" />
            </div>
          </div>
        </div>
      </section>

      <div className="page-section">
        <div className="mx-auto max-w-7xl space-y-6">
          <AiDefinition
            heading={`What are ${fullName}?`}
            definition={`${fullName} are ${material.toLowerCase()} ${skate.shape.replace(
              "-",
              " ",
            )} mouse skates from ${skate.brand}. ${skate.notes}`}
            bottomLine={
              skate.bestFor.length > 0
                ? `Best for ${skate.bestFor.join(", ")}.`
                : skate.communitySummary
            }
          />
          <AiSpecTable
            heading={`${fullName} specs at a glance`}
            rows={getSpecRows(skate)}
          />
          <AiFaq items={faqs} />
        </div>
      </div>

      <section className="page-section soft-divider-top">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="soft-panel p-5">
            <h2 className="section-title">Full rating profile</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <RatingRow label="Speed" value={skate.ratings.speed} />
              <RatingRow label="Control" value={skate.ratings.control} />
              <RatingRow
                label="Stopping power"
                value={skate.ratings.stoppingPower}
              />
              <RatingRow label="Smoothness" value={skate.ratings.smoothness} />
              <RatingRow
                label="Noise control"
                value={skate.ratings.noiseControl}
              />
              <RatingRow label="Durability" value={skate.ratings.durability} />
              <RatingRow
                label="Glass compatibility"
                value={skate.ratings.glassCompatibility}
              />
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Rating confidence: {skate.ratings.ratingConfidence}. Ratings are
              editorial summaries from official specs, community reports, and
              review patterns, not lab measurements.
            </p>
          </div>

          <div className="soft-panel p-5">
            <h2 className="section-title">Surface fit</h2>
            <div className="mt-5 space-y-3">
              {Object.entries(skate.surfaceFit).map(([surface, fit]) => (
                <div
                  key={surface}
                  className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm capitalize text-muted-foreground">
                    {surface} pads
                  </span>
                  <span
                    className={`inline-flex border px-2.5 py-1 text-xs capitalize ${getMouseSkateSurfaceFitClass(
                      fit,
                    )}`}
                  >
                    {fit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="soft-panel p-5">
            <h2 className="section-title flex items-center gap-2">
              <Sparkles className="size-5 text-brand-hover" />
              Best for
            </h2>
            <ul className="mt-4 space-y-3">
              {skate.bestFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <Check className="mt-1 size-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="soft-panel p-5">
            <h2 className="section-title flex items-center gap-2">
              <CircleOff className="size-5 text-rose-300" />
              Avoid if
            </h2>
            <ul className="mt-4 space-y-3">
              {skate.avoidIf.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <CircleOff className="mt-1 size-4 shrink-0 text-rose-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section soft-divider-top">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-6">
            <div className="soft-panel p-5">
              <h2 className="section-title flex items-center gap-2">
                <Info className="size-5 text-brand-hover" />
                Buying notes
              </h2>
              <p className="body-copy mt-3">{skate.notes}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {skate.communitySummary}
              </p>
            </div>

            <div className="soft-panel p-5">
              <h2 className="section-title">Sources</h2>
              <ul className="mt-4 space-y-3">
                {skate.sources.map((source) => (
                  <li
                    key={`${source.label}-${source.url ?? "no-url"}`}
                    className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Badge variant="outline" className="capitalize">
                      {source.type}
                    </Badge>
                    {source.url ? (
                      <a
                        href={source.url}
                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.label}
                      </a>
                    ) : (
                      <span>{source.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="soft-panel p-5">
            <h2 className="section-title flex items-center gap-2">
              <Layers className="size-5 text-brand-hover" />
              Related mouse skates
            </h2>
            <div className="mt-4 space-y-3">
              {relatedSkates.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/accessories/mouse-skates/${entry.slug}`}
                  className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 text-sm transition-colors last:border-0 last:pb-0 hover:text-brand-hover"
                >
                  <span>{getMouseSkateFullName(entry)}</span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Gauge className="size-3.5" />
                    {formatMouseSkateMaterial(entry.material)}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/accessories/mouse-skates/browse"
                className="text-sm font-semibold text-brand-hover hover:text-foreground"
              >
                Browse all mouse skates
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link
                href="/accessories/mouse-skates/compare"
                className="text-sm font-semibold text-brand-hover hover:text-foreground"
              >
                Compare skates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card/60 px-3 py-3">
      <p className="compact-label">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function RatingRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border/60 px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-semibold">
        {formatMouseSkateRating(value)}/10
      </span>
    </div>
  );
}

function getSpecRows(skate: MouseSkate) {
  return [
    { feature: "Brand", value: skate.brand },
    { feature: "Series", value: skate.series },
    { feature: "Material", value: formatMouseSkateMaterial(skate.material) },
    { feature: "Shape", value: skate.shape.replace("-", " ") },
    {
      feature: "Thickness",
      value: skate.thicknessMm ? `${skate.thicknessMm} mm` : "Not listed",
    },
    {
      feature: "Diameter",
      value: skate.diameterMm ? `${skate.diameterMm} mm` : "Not listed",
    },
    {
      feature: "Quantity",
      value: skate.quantity ?? "Not listed",
    },
    {
      feature: "Glass compatibility",
      value: `${formatMouseSkateRating(skate.ratings.glassCompatibility)}/10`,
    },
    {
      feature: "Rating confidence",
      value: skate.ratings.ratingConfidence,
    },
  ];
}

function getSkateFaqs(skate: MouseSkate) {
  const fullName = getMouseSkateFullName(skate);
  const material = formatMouseSkateMaterial(skate.material);

  return [
    {
      q: `Are ${fullName} good for glass mousepads?`,
      a: `${fullName} are rated ${skate.surfaceFit.glass} for glass mousepads, with a ${formatMouseSkateRating(
        skate.ratings.glassCompatibility,
      )}/10 glass-compatibility score. ${
        skate.surfaceFit.glass === "avoid"
          ? "They are not the right pairing for a glass surface."
          : "Check the surface-fit table above and pair them with a clean glasspad."
      }`,
    },
    {
      q: `What material are ${fullName}?`,
      a: `${fullName} use ${material} in a ${skate.shape.replace(
        "-",
        " ",
      )} shape. ${skate.notes}`,
    },
    {
      q: `Do ${fullName} add speed or control?`,
      a: `${fullName} are rated ${formatMouseSkateRating(
        skate.ratings.speed,
      )}/10 for speed and ${formatMouseSkateRating(
        skate.ratings.control,
      )}/10 for control, with ${formatMouseSkateRating(
        skate.ratings.stoppingPower,
      )}/10 stopping power. ${skate.communitySummary}`,
    },
    {
      q: `Are ${fullName} worth buying?`,
      a: `Buy them if you need ${skate.bestFor.join(
        ", ",
      )}. Avoid them if ${skate.avoidIf.join(
        "; ",
      )}. Compare them with similar skates before deciding.`,
    },
  ];
}
