"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { MetricCell } from "@/components/data-display";
import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { MousepadFilters } from "@/components/mousepads/mousepad-filters";
import {
  ALL_FILTER_VALUE,
  filterMousepads,
  formatFeelLabel,
  formatMousepadValue,
  formatPrice,
  getDefaultMousepadFilters,
  type MousepadCategory,
  type MousepadFilters as MousepadFilterState,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";
import {
  Crosshair,
  Eye,
  Gauge,
  Layers,
  MapPin,
  RotateCcw,
  SearchX,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMousepadFullName } from "@/lib/mousepads";
import { Badge } from "@/components/ui/badge";
import { IconTooltip } from "@/components/ui/tooltip";

type Props = {
  mousepads: Mousepad[];
  brands?: Array<{ label: string; value: string }>;
  categories: Array<{ label: string; value: MousepadCategory }>;
  initialCategory?: MousepadCategory;
  searchOnly?: boolean;
  latestAddedSlugs?: readonly string[];
};

export function MousepadBrowser({
  mousepads,
  brands,
  categories,
  initialCategory,
  searchOnly = false,
  latestAddedSlugs = [],
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<MousepadFilterState>(() =>
    getInitialMousepadFilters(searchParams, initialCategory)
  );
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const handleReset = () => {
    setFilters(getDefaultMousepadFilters());
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const updateUrl = (nextFilters: MousepadFilterState, nextQuery: string) => {
    const defaults = getDefaultMousepadFilters();
    const params = new URLSearchParams();

    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (!searchOnly && nextFilters.brand !== defaults.brand) params.set("brand", nextFilters.brand);
    if (!searchOnly && nextFilters.category !== defaults.category) params.set("category", nextFilters.category);
    if (!searchOnly && nextFilters.surface !== defaults.surface) params.set("surface", nextFilters.surface);
    if (!searchOnly && nextFilters.indiaAvailability !== defaults.indiaAvailability) {
      params.set("availability", nextFilters.indiaAvailability);
    }
    if (!searchOnly && nextFilters.sort !== defaults.sort) params.set("sort", nextFilters.sort);

    const serialized = params.toString();
    router.replace(serialized ? `${pathname}?${serialized}` : pathname, { scroll: false });
  };

  const handleFiltersChange = (next: MousepadFilterState) => {
    setFilters(next);
    updateUrl(next, query);
  };

  const handleQueryChange = (next: string) => {
    setQuery(next);
    updateUrl(filters, next);
  };

  const filteredMousepads = useMemo(() => {
    const visible = filterMousepads(mousepads, filters);
    const normalizedQuery = query.trim().toLowerCase();
    const latestOrder = new Map(
      latestAddedSlugs.map((slug, index) => [slug, index])
    );
    const shouldPinLatest =
      normalizedQuery.length === 0 &&
      filters.brand === ALL_FILTER_VALUE &&
      filters.category === ALL_FILTER_VALUE &&
      filters.surface === ALL_FILTER_VALUE &&
      filters.indiaAvailability === ALL_FILTER_VALUE;

    if (!normalizedQuery) {
      return shouldPinLatest ? pinLatestMousepads(visible, latestOrder) : visible;
    }

    return visible
      .filter((pad) =>
        [getMousepadFullName(pad), pad.brand, pad.series ?? "", pad.surface]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      );
  }, [filters, latestAddedSlugs, mousepads, query]);

  const latestAddedSlugSet = useMemo(
    () => new Set(latestAddedSlugs),
    [latestAddedSlugs]
  );
  const isDefaultBrowse =
    !query.trim() &&
    filters.brand === ALL_FILTER_VALUE &&
    filters.category === ALL_FILTER_VALUE &&
    filters.surface === ALL_FILTER_VALUE &&
    filters.indiaAvailability === ALL_FILTER_VALUE &&
    filters.sort === getDefaultMousepadFilters().sort;
  const latestMousepads = useMemo(
    () =>
      latestAddedSlugs
        .map((slug) => mousepads.find((pad) => pad.slug === slug))
        .filter((pad): pad is Mousepad => Boolean(pad)),
    [latestAddedSlugs, mousepads],
  );
  const tableMousepads = isDefaultBrowse
    ? filteredMousepads.filter((pad) => !latestAddedSlugSet.has(pad.slug))
    : filteredMousepads;

  return (
    <div className="space-y-8">
      <MousepadFilters
        brands={brands}
        categories={categories}
        resultCount={filteredMousepads.length}
        value={filters}
        query={query}
        searchOnly={searchOnly}
        onChange={handleFiltersChange}
        onQueryChange={handleQueryChange}
        onReset={handleReset}
      />

      {isDefaultBrowse && latestMousepads.length > 0 ? (
        <section aria-labelledby="latest-mousepads-heading">
          <div className="">
            {latestMousepads.map((pad) => (
              <div key={pad.slug}>
                <MousepadCard pad={pad} featured />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {filteredMousepads.length > 0 ? (
        tableMousepads.length > 0 ? (
          <div className="data-scroll-container min-w-0 max-w-full overflow-x-auto bg-card/35 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="data-table min-w-[1280px]">
            <thead>
              <tr>
                <th className="w-[340px]">
                  <TableHeadLabel
                    icon={<Crosshair className="size-3.5" />}
                    label="Mousepad"
                    tooltip="Model, category, and primary game fit"
                  />
                </th>
                <th>
                  <TableHeadLabel
                    icon={<Layers className="size-3.5" />}
                    label="Surface"
                    tooltip="Surface material, softness, and base construction"
                  />
                </th>
                <th>
                  <TableHeadLabel
                    icon={<Gauge className="size-3.5" />}
                    label="Glide"
                    tooltip="How fast the pad feels during broad movement"
                  />
                </th>
                <th>
                  <TableHeadLabel
                    icon={<Shield className="size-3.5" />}
                    label="Control"
                    tooltip="How planted the pad feels while aiming"
                  />
                </th>
                <th>
                  <TableHeadLabel
                    icon={<Shield className="size-3.5" />}
                    label="Stop"
                    tooltip="Stopping power for flicks and final corrections"
                  />
                </th>
                <th>
                  <TableHeadLabel
                    icon={<Sparkles className="size-3.5" />}
                    label="Correct"
                    tooltip="Ease of micro-adjustments after the first movement"
                  />
                </th>
                <th>
                  <TableHeadLabel
                    icon={<MapPin className="size-3.5" />}
                    label="India"
                    tooltip="India availability and approximate local pricing"
                  />
                </th>
                <th className="text-right">
                  <span className="sr-only">Profile</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableMousepads.map((pad) => (
                <MousepadTableRow
                  key={pad.slug}
                  pad={pad}
                  isLatestAdded={latestAddedSlugSet.has(pad.slug)}
                />
              ))}
            </tbody>
          </table>
          </div>
        ) : null
      ) : (
        <div className="rounded-md border border-dashed border-border bg-card/70 px-5 py-8 text-center">
          <div className="mx-auto max-w-xs space-y-3">
            <SearchX className="mx-auto size-8 text-muted-foreground" />
            <p className="panel-title text-foreground">
              No mousepads match these filters
            </p>
            <p className="text-sm text-muted-foreground">
              {searchOnly
                ? "Try a different search term, or clear the search to see every glasspad again."
                : "Try adjusting the search or Speed / Control filters, or start fresh."}
            </p>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="size-4" />
              Clear all filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function MousepadTableRow({
  pad,
  isLatestAdded,
}: {
  pad: Mousepad;
  isLatestAdded: boolean;
}) {
  const fullName = getMousepadFullName(pad);

  return (
    <tr>
      <td>
        <div className="flex items-center gap-4">
          <Link
            href={`/mousepads/${pad.slug}`}
            className="relative block size-18 shrink-0 overflow-hidden bg-background/75 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)]"
          >
            <Image
              src={pad.images.main}
              alt={fullName}
              fill
              sizes="72px"
              className="object-contain p-2"
            />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <Badge className="text-black">
                {formatMousepadValue(pad.category)}
              </Badge>
              {isLatestAdded ? <Badge variant="outline">Latest</Badge> : null}
            </div>
            <Link
              href={`/mousepads/${pad.slug}`}
              className="mt-2 block truncate text-lg font-semibold leading-6 text-foreground hover:text-primary"
            >
              {fullName}
            </Link>
            <p className="mt-1 truncate text-sm leading-5 text-muted-foreground">
              {pad.recommendedFor.games.map(formatMousepadValue).join(", ")}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="space-y-1">
          <p className="text-sm font-semibold leading-5 text-foreground">
            {formatMousepadValue(pad.surface)}
          </p>
          <p className="text-sm leading-5 text-muted-foreground">
            {formatMousepadValue(pad.softness)} / {formatMousepadValue(pad.base)}
          </p>
        </div>
      </td>
      <td>
        <MetricCell label={formatFeelLabel(pad.feel.speed, "speed")} value={pad.feel.speed} />
      </td>
      <td>
        <MetricCell label={formatFeelLabel(pad.feel.control, "control")} value={pad.feel.control} tone="alt" />
      </td>
      <td>
        <MetricCell label={formatFeelLabel(pad.feel.stoppingPower, "stoppingPower")} value={pad.feel.stoppingPower} />
      </td>
      <td>
        <MetricCell label={formatFeelLabel(pad.feel.microAdjustments, "microAdjustments")} value={pad.feel.microAdjustments} tone="muted" />
      </td>
      <td>
        <div className="space-y-1">
          <p className="text-sm font-semibold leading-5 text-foreground">
            {formatMousepadValue(pad.availability.india)}
          </p>
          <p className="text-sm leading-5 text-muted-foreground">{formatPrice(pad.price.inr)}</p>
        </div>
      </td>
      <td className="text-right">
        <IconTooltip label={`Open ${fullName} profile`} side="left">
          <Button size="icon-sm" variant="outline" asChild>
            <Link href={`/mousepads/${pad.slug}`} aria-label={`Open ${fullName} profile`}>
              <Eye className="size-4" />
            </Link>
          </Button>
        </IconTooltip>
      </td>
    </tr>
  );
}

function TableHeadLabel({
  icon,
  label,
  tooltip,
}: {
  icon: ReactNode;
  label: string;
  tooltip: string;
}) {
  return (
    <IconTooltip label={tooltip}>
      <span className="inline-flex w-fit items-center gap-1.5">
        {icon}
        {label}
      </span>
    </IconTooltip>
  );
}

function getInitialMousepadFilters(
  searchParams: ReturnType<typeof useSearchParams>,
  initialCategory?: MousepadCategory
): MousepadFilterState {
  const defaults = getDefaultMousepadFilters();

  return {
    ...defaults,
    brand: searchParams.get("brand") ?? defaults.brand,
    category:
      (searchParams.get("category") as MousepadFilterState["category"] | null) ??
      initialCategory ??
      defaults.category,
    surface:
      (searchParams.get("surface") as MousepadFilterState["surface"] | null) ??
      defaults.surface,
    indiaAvailability:
      (searchParams.get("availability") as MousepadFilterState["indiaAvailability"] | null) ??
      defaults.indiaAvailability,
    sort:
      (searchParams.get("sort") as MousepadFilterState["sort"] | null) ??
      defaults.sort,
  };
}

function pinLatestMousepads(
  mousepads: Mousepad[],
  latestOrder: Map<string, number>
) {
  if (latestOrder.size === 0) {
    return mousepads;
  }

  return [...mousepads].sort((left, right) => {
    const leftOrder = latestOrder.get(left.slug);
    const rightOrder = latestOrder.get(right.slug);

    if (leftOrder === undefined && rightOrder === undefined) {
      return 0;
    }

    if (leftOrder === undefined) {
      return 1;
    }

    if (rightOrder === undefined) {
      return -1;
    }

    return leftOrder - rightOrder;
  });
}
