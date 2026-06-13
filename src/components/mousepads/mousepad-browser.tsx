"use client";

import { useState } from "react";

import { MousepadCard } from "@/components/mousepads/mousepad-card";
import { MousepadFilters } from "@/components/mousepads/mousepad-filters";
import {
  filterMousepads,
  getDefaultMousepadFilters,
  type FilterOption,
  type MousepadCategory,
  type MousepadFilters as MousepadFilterState,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
  brands: FilterOption<string>[];
  categories: FilterOption<MousepadCategory>[];
};

export function MousepadBrowser({
  mousepads,
  brands,
  categories,
}: Props) {
  const [filters, setFilters] = useState<MousepadFilterState>(
    getDefaultMousepadFilters()
  );

  const filteredMousepads = filterMousepads(mousepads, filters);

  return (
    <div className="space-y-6">
      <MousepadFilters
        brands={brands}
        categories={categories}
        resultCount={filteredMousepads.length}
        value={filters}
        onChange={setFilters}
        onReset={() => setFilters(getDefaultMousepadFilters())}
      />

      {filteredMousepads.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMousepads.map((pad) => (
            <MousepadCard key={pad.slug} pad={pad} />
          ))}
        </div>
      ) : (
        <div className="rounded-4xl border border-dashed border-border bg-card/70 px-6 py-10 text-center">
          <p className="text-lg font-semibold text-foreground">
            No mousepads match these filters.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try different filters or clear the current selection.
          </p>
        </div>
      )}
    </div>
  );
}
