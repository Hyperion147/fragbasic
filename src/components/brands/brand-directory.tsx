"use client";

import Image from "next/image";
import Link from "next/link";
import {
  startTransition,
  useDeferredValue,
  useState,
  type ChangeEvent,
} from "react";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { cn } from "@/lib/utils";

type BrandDirectoryEntry = {
  slug: string;
  name: string;
  count: number;
  description: string;
  logoSrc: string;
  kind: "mousepads" | "glasspads";
  featured?: boolean;
};

type Props = {
  brands: BrandDirectoryEntry[];
};

type FilterMode = "all" | "mousepads" | "glasspads";

const filterOptions: Array<{
  value: FilterMode;
  label: string;
}> = [
  { value: "all", label: "All Brands" },
  { value: "mousepads", label: "Mousepads" },
  { value: "glasspads", label: "Glasspads" },
];

export function BrandDirectory({ brands }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const visibleBrands = [...brands]
    .filter((brand) => {
      if (filter !== "all" && brand.kind !== filter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        brand.name.toLowerCase().includes(normalizedQuery) ||
        brand.description.toLowerCase().includes(normalizedQuery)
      );
    })
    .sort((left, right) => left.name.localeCompare(right.name));

  const hasGlassBrands = brands.some((brand) => brand.kind === "glasspads");

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;

    startTransition(() => {
      setQuery(nextQuery);
    });
  }

  function handleFilterChange(nextFilter: FilterMode) {
    startTransition(() => {
      setFilter(nextFilter);
    });
  }

  return (
    <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
      <div className="">
        <SiteBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Brands" },
          ]}
        />

        <div className="mt-5 max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Brands
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            Explore mousepad brands and find the lineup that matches your
            playstyle, surface preference, and budget.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={handleQueryChange}
              placeholder="Search brands..."
              className="pl-10"
              aria-label="Search brands"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between xl:flex-1">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => {
                const isActive = filter === option.value;
                const isDisabled =
                  option.value === "glasspads" && !hasGlassBrands;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleFilterChange(option.value)}
                    disabled={isDisabled}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm transition-colors",
                      isActive
                        ? "border-brand-hover/40 bg-brand/15 text-brand-hover shadow-[0_0_18px_color-mix(in_srgb,var(--brand-glow)_12%,transparent)]"
                        : "border-border bg-background/70 text-muted-foreground hover:text-foreground",
                      isDisabled && "cursor-not-allowed opacity-45",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleBrands.length > 0 ? (
            visibleBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/mousepads/brands/${brand.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card/45 transition-colors hover:border-brand-hover/45 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--brand-glow)_10%,transparent)]"
              >
                <div className="flex min-h-73 flex-col p-6">
                  <div className="flex min-h-8 items-start justify-between gap-3">
                    <span
                      className={cn(
                        "rounded-md border px-2 py-1 text-[11px] uppercase tracking-[0.16em]",
                        brand.featured
                          ? "border-brand-hover/40 bg-brand/12 text-brand-hover"
                          : "border-transparent",
                      )}
                    >
                      {brand.featured ? "Featured" : ""}
                    </span>
                  </div>

                  <div className="mt-5 flex h-20 items-center">
                    <Image
                      src={brand.logoSrc}
                      alt={`${brand.name} logo`}
                      width={220}
                      height={72}
                      className="h-auto max-h-12 w-auto max-w-45 object-contain invert"
                    />
                  </div>

                  <div className="mt-6">
                    <h2 className="text-3xl font-semibold tracking-tight">
                      {brand.name}
                    </h2>
                    <p className="mt-3 max-w-[30ch] text-sm leading-6 text-muted-foreground">
                      {brand.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5">
                    <p className="text-sm font-medium text-brand-hover">
                      {brand.count}{" "}
                      {brand.kind === "glasspads"
                        ? `Glasspad${brand.count === 1 ? "" : "s"}`
                        : `Mousepad${brand.count === 1 ? "" : "s"}`}
                    </p>
                    <ArrowRight className="size-4 text-brand-hover transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card/35 p-8 md:col-span-2 xl:col-span-3">
              <h2 className="text-2xl font-semibold tracking-tight">
                {filter === "glasspads"
                  ? "Glasspad brand pages are not tracked yet."
                  : "No brands match that search."}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {filter === "glasspads"
                  ? "The glasspad database exists, but dedicated glass brand landing pages are not published yet."
                  : "Try a different brand name or switch back to the full brand list."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {filter === "glasspads" ? (
                  <Button variant="outline" asChild>
                    <Link href="/mousepads/glasspads">
                      Browse glasspads
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      startTransition(() => {
                        setQuery("");
                        setFilter("all");
                      });
                    }}
                  >
                    Reset filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full justify-center rounded-xl border-brand-hover/30 bg-background/65 text-brand-hover hover:text-foreground"
          >
            More brands coming soon
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
