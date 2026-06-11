"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  type FilterOption,
  type MousepadFilters,
} from "@/lib/mousepads";

type Props = {
  brands: FilterOption<string>[];
  resultCount: number;
  value: MousepadFilters;
  onChange: (next: MousepadFilters) => void;
  onReset: () => void;
};

export function MousepadFilters({
  brands,
  resultCount,
  value,
  onChange,
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

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Company</p>
        <div className="flex flex-wrap gap-2">
          {brands.map((option) => {
            const active = value.brand === option.value;

            return (
              <Button
                key={option.value}
                type="button"
                size="sm"
                variant={active ? "default" : "outline"}
                className={active ? "text-black" : ""}
                onClick={() => onChange({ ...value, brand: option.value })}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
