"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ALL_FILTER_VALUE,
  type MousepadCategory,
  type MousepadFilters,
} from "@/lib/mousepads";

type Props = {
  brands?: Array<{ label: string; value: string }>;
  categories: Array<{ label: string; value: MousepadCategory }>;
  resultCount: number;
  value: MousepadFilters;
  query: string;
  searchOnly?: boolean;
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
  searchOnly = false,
  onChange,
  onQueryChange,
  onReset,
}: Props) {
  return (
    <Card className="border-border bg-card/90 p-4 shadow-lg shadow-black/5 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Filters</p>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
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

      <div className="mt-5 grid gap-4 lg:hidden">
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

        {!searchOnly ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-center">
                <SlidersHorizontal className="size-4" />
                Filter mousepads
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[82vh] rounded-t-2xl border-border">
              <SheetHeader className="px-4 pb-2 pt-5">
                <SheetTitle>Filter mousepads</SheetTitle>
                <SheetDescription>
                  Pick the brand and feel lane you want to browse.
                </SheetDescription>
              </SheetHeader>
              <div className="overflow-y-auto px-4 pb-6">
                <div className="grid gap-6">
                  <MousepadFilterControls
                    brands={brands}
                    categories={categories}
                    value={value}
                    onChange={onChange}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : null}
      </div>

      <div
        className={
          searchOnly
            ? "mt-5 hidden gap-6 lg:grid"
            : "mt-5 hidden gap-6 lg:grid lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-8"
        }
      >
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

        {!searchOnly ? (
          <MousepadFilterControls
            brands={brands}
            categories={categories}
            value={value}
            onChange={onChange}
          />
        ) : null}
      </div>
    </Card>
  );
}

function MousepadFilterControls({
  brands,
  categories,
  value,
  onChange,
}: Pick<Props, "brands" | "categories" | "value" | "onChange">) {
  return (
    <>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Company</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={value.brand === ALL_FILTER_VALUE ? "default" : "outline"}
            className={value.brand === ALL_FILTER_VALUE ? "text-black" : ""}
            onClick={() => onChange({ ...value, brand: ALL_FILTER_VALUE })}
          >
            All companies
          </Button>
          {(brands ?? []).map((option) => {
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
    </>
  );
}
