"use client";

import { RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  type FilterOption,
  type MousepadCategory,
  type MousepadFilters,
} from "@/lib/mousepads";

type Props = {
  brands: FilterOption<string>[];
  categories: FilterOption<MousepadCategory>[];
  resultCount: number;
  value: MousepadFilters;
  query: string;
  onChange: (next: MousepadFilters) => void;
  onQueryChange: (next: string) => void;
  onReset: () => void;
};

export function MousepadFilters({
  brands,
  categories,
  resultCount,
  value,
  query,
  onChange,
  onQueryChange,
  onReset,
}: Props) {
  return (
    <Card className="border-border bg-card/90 p-5 shadow-lg shadow-black/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Filters</p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Narrow the shortlist fast
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {resultCount} mousepad{resultCount === 1 ? "" : "s"}
          </p>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Search</p>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search by brand, series, or model"
              className="pl-10"
              aria-label="Search the mousepad database"
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Company</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((option) => {
              const active = value.brand === option.value;
              const isGlasspads = option.value === "Glasspads";

              return (
                <Button
                  key={option.value}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  className={
                    isGlasspads
                      ? active
                        ? "bg-sky-400/90 text-white border-sky-300 hover:bg-sky-500"
                        : "border-sky-400 text-sky-300 hover:bg-sky-950/40"
                      : active
                      ? "text-black"
                      : ""
                  }
                  onClick={() => onChange({ ...value, brand: option.value })}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Speed / Control</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((option) => {
              const active = value.category === option.value;

              return (
                <Button
                  key={option.value}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  className={active ? "text-black" : ""}
                  onClick={() => onChange({ ...value, category: option.value })}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
