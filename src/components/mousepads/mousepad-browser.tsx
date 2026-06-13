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
import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handleReset = () => setFilters(getDefaultMousepadFilters());

  const filteredMousepads = filterMousepads(mousepads, filters);

  return (
    <div className="space-y-6">
      <MousepadFilters
        brands={brands}
        categories={categories}
        resultCount={filteredMousepads.length}
        value={filters}
        onChange={setFilters}
        onReset={handleReset}
      />

      {filteredMousepads.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMousepads.map((pad) => (
            <MousepadCard key={pad.slug} pad={pad} />
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
              Try adjusting the Company or Speed / Control filters, or start fresh.
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
