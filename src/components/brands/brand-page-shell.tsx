"use client";

import Image from "next/image";
import Link from "next/link";
import {
  startTransition,
  useDeferredValue,
  useState,
  type ChangeEvent,
} from "react";
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Layers3,
  Search,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import {
  formatMousepadValue,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type BrandPageBrand = {
  slug: string;
  name: string;
  logoSrc: string;
  officialSite: string;
  origin: string;
  tagline: string;
  description: string;
  highlights: ReadonlyArray<{
    title: string;
    body: string;
  }>;
};

type Props = {
  brand: BrandPageBrand;
  mousepads: Mousepad[];
  averageRating: number;
};

type SortMode = "fastest" | "slowest" | "control" | "popular";

const sortOptions: Array<{
  value: SortMode;
  label: string;
}> = [
  { value: "fastest", label: "Fastest to Slowest" },
  { value: "slowest", label: "Slowest to Fastest" },
  { value: "control", label: "Most Control" },
  { value: "popular", label: "Popular" },
];

export function BrandPageShell({ brand, mousepads, averageRating }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("fastest");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const visibleMousepads = [...mousepads]
    .filter((mousepad) => {
      if (!normalizedQuery) {
        return true;
      }

      return (
        getMousepadFullName(mousepad).toLowerCase().includes(normalizedQuery) ||
        formatMousepadValue(mousepad.category)
          .toLowerCase()
          .includes(normalizedQuery)
      );
    })
    .sort((left, right) => {
      if (sort === "fastest") {
        return right.feel.speed - left.feel.speed;
      }

      if (sort === "slowest") {
        return left.feel.speed - right.feel.speed;
      }

      if (sort === "control") {
        return right.feel.control - left.feel.control;
      }

      return getPopularScore(right) - getPopularScore(left);
    });

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;

    startTransition(() => {
      setQuery(nextQuery);
    });
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextSort = event.target.value as SortMode;

    startTransition(() => {
      setSort(nextSort);
    });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="w-full px-4 py-6 md:px-6 lg:px-8 xl:px-10">
        <div className="overflow-hidden rounded-xl border border-border bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--brand-glow)_8%,transparent),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]">
          <section className="border-b border-border px-4 py-5 md:px-6 md:py-6">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Brands", href: "/mousepads/brands" },
                { label: brand.name },
              ]}
            />

            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-border bg-background/40 md:h-24 md:w-24">
                  <Image
                    src={brand.logoSrc}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={120}
                    className="h-auto max-h-14 w-auto max-w-16 object-contain invert md:max-h-16 md:max-w-18"
                  />
                </div>

                <div className="min-w-0">
                  <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
                    {brand.name}
                  </h1>
                  <p className="mt-2 text-base font-medium text-brand-hover">
                    {brand.tagline}
                  </p>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                    {brand.description}
                  </p>
                </div>
              </div>

              <Button variant="outline" asChild className="w-fit shrink-0">
                <Link href={brand.officialSite} target="_blank" rel="noreferrer">
                  Visit Official Site
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-3">
              <HeroStat
                icon={Layers3}
                value={mousepads.length.toString()}
                label="Mousepads"
              />
              <HeroStat
                icon={Star}
                value={averageRating.toFixed(1)}
                label="Avg. Community Rating"
              />
              <HeroStat icon={Globe} value={brand.origin} label="Origin" />
            </div>
          </section>

          <section className="border-b border-border px-4 md:px-6">
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm">
              <span className="border-b-2 border-brand-hover pb-4 font-medium text-brand-hover">
                Mousepads
              </span>
              <span className="pb-4 text-muted-foreground opacity-45">
                Glasspads
              </span>
              <a
                href="#about"
                className="pb-4 text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </a>
            </div>
          </section>

          <section className="px-4 py-5 md:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={handleQueryChange}
                    placeholder={`Search ${brand.name} pads...`}
                    className="pl-10"
                    aria-label={`Search ${brand.name} mousepads`}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>Sort:</span>
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-brand-hover"
                  aria-label="Sort brand mousepads"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visibleMousepads.map((mousepad, index) => (
                <BrandMousepadCard
                  key={mousepad.slug}
                  mousepad={mousepad}
                  badge={index < 2 ? "Popular" : formatMousepadValue(mousepad.category)}
                />
              ))}
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full justify-center rounded-xl border-brand-hover/30 bg-background/65 text-brand-hover hover:text-foreground"
                onClick={() => {
                  startTransition(() => {
                    setQuery("");
                    setSort("fastest");
                  });
                }}
              >
                View all {mousepads.length} mousepads
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </section>

          <section id="about" className="px-4 py-6 md:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {brand.highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-xl border border-border bg-card/35 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-hover/25 bg-brand/12 text-brand-hover">
                      <Star className="size-4" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {highlight.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {highlight.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function HeroStat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Layers3;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 border-border md:border-r md:pr-6 last:md:border-r-0 last:md:pr-0">
      <span className="flex size-10 items-center justify-center rounded-xl border border-brand-hover/25 bg-brand/10 text-brand-hover">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function BrandMousepadCard({
  mousepad,
  badge,
}: {
  mousepad: Mousepad;
  badge: string;
}) {
  return (
    <Link
      href={`/mousepads/${mousepad.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-card/45 transition-colors hover:border-brand-hover/45 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--brand-glow)_10%,transparent)]"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-md border border-brand-hover/25 bg-brand/10 px-2 py-1 text-[11px] text-brand-hover">
            {badge}
          </span>
          <span className="rounded-md border border-border p-1.5 text-muted-foreground">
            <ExternalLink className="size-3.5" />
          </span>
        </div>

        <div className="relative mt-4 aspect-[1/1.02] overflow-hidden rounded-lg border border-white/6 bg-background/55">
          <Image
            src={mousepad.images.main}
            alt={getMousepadFullName(mousepad)}
            fill
            sizes="(max-width: 1279px) 50vw, 22vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-103"
          />
        </div>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          {getMousepadFullName(mousepad)}
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <BrandMetric label="Speed" value={mousepad.feel.speed} />
          <BrandMetric label="Control" value={mousepad.feel.control} />
        </div>
      </div>
    </Link>
  );
}

function BrandMetric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        <p className="text-lg font-semibold">{value.toFixed(1)}</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-brand-hover"
          style={{ width: `${Math.min(100, (value / 10) * 100)}%` }}
        />
      </div>
    </div>
  );
}

function getPopularScore(mousepad: Mousepad) {
  return (
    mousepad.feel.speed * 0.2 +
    mousepad.feel.control * 0.24 +
    mousepad.feel.stoppingPower * 0.16 +
    mousepad.feel.microAdjustments * 0.2 +
    mousepad.environment.humidityResistance * 0.2
  );
}
