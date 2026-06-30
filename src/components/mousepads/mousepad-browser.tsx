"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { MousepadFilters } from "@/components/mousepads/mousepad-filters";
import {
  ALL_FILTER_VALUE,
  filterMousepads,
  getDefaultMousepadFilters,
  type MousepadCategory,
  type MousepadFilters as MousepadFilterState,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";
import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMousepadFullName } from "@/lib/mousepads";

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

  return (
    <div className="space-y-6">
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

      {filteredMousepads.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMousepads.map((pad) => (
            <MousepadCard
              key={pad.slug}
              pad={pad}
              isLatestAdded={latestAddedSlugSet.has(pad.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-4xl border border-dashed border-border bg-card/70 px-6 py-12 text-center">
          <div className="mx-auto max-w-xs space-y-4">
            <SearchX className="mx-auto size-10 text-muted-foreground" />
            <p className="text-xl font-semibold text-foreground">
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
