import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { getAllMouseSkates, getMouseSkatesBySpeed } from "@/data/accessories/mouse-skates";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { MouseSkate, MouseSkateMaterial, MouseSkateSurfaceFit } from "@/types/accessory";

export const metadata: Metadata = buildMetadata({
  title: "Mouse Skate Database",
  description:
    "Browse FragBasic's mouse skate database with Xraypad skate speed, control, material, glasspad fit, and surface compatibility notes.",
  path: "/accessories/mouse-skates",
  keywords: [
    "mouse skates",
    "Xraypad skates",
    "Jade skates",
    "Obsidian skates",
    "best mouse skates",
    "glasspad mouse skates",
  ],
});

const skates = getAllMouseSkates();
const speedRankedSkates = getMouseSkatesBySpeed();

const materialNotes: Array<{
  material: MouseSkateMaterial;
  title: string;
  body: string;
}> = [
  {
    material: "ptfe",
    title: "PTFE",
    body: "Fastest and smoothest feel on cloth or hybrid pads. Standard PTFE wears faster on hard surfaces, so it is usually not the first glasspad pick.",
  },
  {
    material: "hardened-ptfe",
    title: "Hardened PTFE",
    body: "More control, stopping feedback, and durability than pure speed PTFE. This is the safer middle ground for cloth, hybrid, and many glass setups.",
  },
  {
    material: "uhmwpe",
    title: "UHMWPE / U-PE",
    body: "Durability and damped control first. Xraypad uses it on Obsidian Pro Air for glass-focused, quieter, slower glide.",
  },
  {
    material: "titanium",
    title: "Titanium",
    body: "A specialized durability option. Treat it as a tuning part for hard surfaces rather than a normal PTFE replacement.",
  },
];

export default function MouseSkatesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-background">
        <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Accessories" },
                { label: "Mouse Skates" },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-sky-300 text-slate-950">Accessories</Badge>
              <Badge variant="outline">
                {skates.length} Xraypad skate{skates.length === 1 ? "" : "s"} tracked
              </Badge>
              <Badge variant="outline">No images yet</Badge>
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
              Xraypad mouse skates ranked by glide and control.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              A first pass at skate data for tuning cloth, hybrid, and glasspad
              setups. Ratings are comparison values inside the skate category,
              based on official positioning, retailer notes, and community
              impressions.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <SectionHeading
              eyebrow="Fastest to slowest"
              title="Speed order"
              body="Jade is the speed side of the lineup. Obsidian adds braking, Air variants calm noise and vibration, and Pro Air is the glass-control end."
            />
            <div className="mt-6 grid gap-4">
              {speedRankedSkates.map((skate, index) => (
                <SpeedRankCard key={skate.id} skate={skate} rank={index + 1} />
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <SectionHeading
              eyebrow="Materials"
              title="What changes feel"
              body="Skate material matters as much as the pad. Use these as category anchors, then tune dot count for speed versus stability."
            />
            <div className="grid gap-3">
              {materialNotes.map((note) => (
                <div
                  key={note.material}
                  className="rounded-2xl border border-border bg-card/45 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold">{note.title}</h2>
                    <Badge variant="outline">{formatMaterial(note.material)}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <SectionHeading
          eyebrow="Database"
          title="All tracked skates"
          body="Numbers are deliberately skate-only ratings. Do not compare these directly with mousepad speed ratings."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {skates.map((skate) => (
            <SkateDetailCard key={skate.id} skate={skate} />
          ))}
        </div>
      </section>
    </main>
  );
}

function SpeedRankCard({ skate, rank }: { skate: MouseSkate; rank: number }) {
  return (
    <article className="rounded-2xl border border-border bg-card/45 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">#{rank}</Badge>
            <Badge>{skate.series}</Badge>
            <Badge variant="outline">{formatMaterial(skate.material)}</Badge>
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {skate.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {skate.communitySummary}
          </p>
        </div>
        <div className="min-w-32 rounded-xl border border-border bg-background/55 p-3 text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Speed
          </p>
          <p className="mt-1 text-3xl font-semibold">
            {formatRating(skate.ratings.speed)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RatingMeter label="Control" value={skate.ratings.control} />
        <RatingMeter label="Stopping" value={skate.ratings.stoppingPower} />
        <RatingMeter label="Noise control" value={skate.ratings.noiseControl} />
        <RatingMeter label="Glass fit" value={skate.ratings.glassCompatibility} />
      </div>
    </article>
  );
}

function SkateDetailCard({ skate }: { skate: MouseSkate }) {
  return (
    <article className="rounded-2xl border border-border bg-card/45 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{skate.brand}</Badge>
            <Badge variant="outline">{skate.series}</Badge>
            <Badge variant="outline">
              {skate.shape}
              {skate.diameterMm ? ` / ${skate.diameterMm}mm` : ""}
            </Badge>
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">
            {skate.name}
          </h2>
        </div>
        <Badge variant="outline">{skate.ratings.ratingConfidence}</Badge>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {skate.notes}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <RatingMeter label="Speed" value={skate.ratings.speed} />
        <RatingMeter label="Control" value={skate.ratings.control} />
        <RatingMeter label="Durability" value={skate.ratings.durability} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TextList title="Best for" items={skate.bestFor} />
        <TextList title="Avoid if" items={skate.avoidIf} />
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Surface fit
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(skate.surfaceFit).map(([surface, fit]) => (
            <span
              key={surface}
              className={cn(
                "rounded-full border px-3 py-1 text-xs capitalize",
                getSurfaceFitClass(fit),
              )}
            >
              {surface}: {fit}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Sources
        </p>
        <div className="mt-3 grid gap-2">
          {skate.sources.map((source) => (
            <Link
              key={source.label}
              href={source.url ?? "#"}
              className="inline-flex items-start gap-2 text-sm text-foreground/82 hover:text-foreground"
              target={source.url ? "_blank" : undefined}
              rel={source.url ? "noreferrer" : undefined}
            >
              <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{source.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function RatingMeter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background/55 p-3">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{formatRating(value)}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-sky-300"
          style={{ width: `${Math.max(0, Math.min(100, value * 10))}%` }}
        />
      </div>
    </div>
  );
}

function TextList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function formatRating(value: number) {
  return value.toFixed(1);
}

function formatMaterial(material: MouseSkateMaterial) {
  const labels: Record<MouseSkateMaterial, string> = {
    ptfe: "PTFE",
    "hardened-ptfe": "Hardened PTFE",
    uhmwpe: "UHMWPE",
    titanium: "Titanium",
  };

  return labels[material];
}

function getSurfaceFitClass(fit: MouseSkateSurfaceFit) {
  if (fit === "excellent") {
    return "border-emerald-400/40 bg-emerald-400/10 text-emerald-200";
  }

  if (fit === "good") {
    return "border-sky-300/40 bg-sky-300/10 text-sky-200";
  }

  if (fit === "usable") {
    return "border-amber-300/45 bg-amber-300/10 text-amber-100";
  }

  return "border-rose-300/45 bg-rose-300/10 text-rose-100";
}
