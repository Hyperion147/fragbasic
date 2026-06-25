"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";

import { MouseSkateCard } from "@/components/accessories/mouse-skates/mouse-skate-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatMouseSkateMaterial, getMouseSkateFullName } from "@/lib/accessories/mouse-skates";
import type { MouseSkate, MouseSkateMaterial } from "@/types/accessory";

const allFilterValue = "all";

type SortKey = "fastest" | "slowest";

export function MouseSkateBrowser({ skates }: { skates: MouseSkate[] }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState(allFilterValue);
  const [material, setMaterial] = useState<typeof allFilterValue | MouseSkateMaterial>(
    allFilterValue
  );
  const [sort, setSort] = useState<SortKey>("fastest");

  const brands = useMemo(
    () => Array.from(new Set(skates.map((skate) => skate.brand))).sort(),
    [skates]
  );
  const materials = useMemo(
    () => Array.from(new Set(skates.map((skate) => skate.material))),
    [skates]
  );

  const filteredSkates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...skates]
      .filter((skate) => {
        if (brand !== allFilterValue && skate.brand !== brand) {
          return false;
        }

        if (material !== allFilterValue && skate.material !== material) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        return [
          getMouseSkateFullName(skate),
          skate.series,
          skate.material,
          skate.shape,
          skate.communitySummary,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((left, right) => {
        const speedDifference =
          sort === "fastest"
            ? right.ratings.speed - left.ratings.speed
            : left.ratings.speed - right.ratings.speed;

        if (speedDifference !== 0) {
          return speedDifference;
        }

        return getMouseSkateFullName(left).localeCompare(
          getMouseSkateFullName(right)
        );
      });
  }, [brand, material, query, skates, sort]);

  const resetFilters = () => {
    setQuery("");
    setBrand(allFilterValue);
    setMaterial(allFilterValue);
    setSort("fastest");
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/90 p-5 shadow-lg shadow-black/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Filters</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Find skates by speed, brand, and material
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {filteredSkates.length} skate{filteredSkates.length === 1 ? "" : "s"}
            </p>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr] lg:gap-8">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Search</p>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search brand, series, material"
                className="pl-10"
                aria-label="Search mouse skates"
              />
            </div>
          </div>

          <FilterGroup label="Company">
            <Button
              type="button"
              size="sm"
              variant={brand === allFilterValue ? "default" : "outline"}
              className={brand === allFilterValue ? "text-black" : ""}
              onClick={() => setBrand(allFilterValue)}
            >
              All
            </Button>
            {brands.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={brand === option ? "default" : "outline"}
                className={brand === option ? "text-black" : ""}
                onClick={() => setBrand(option)}
              >
                {option}
              </Button>
            ))}
          </FilterGroup>

          <FilterGroup label="Material">
            <Button
              type="button"
              size="sm"
              variant={material === allFilterValue ? "default" : "outline"}
              className={material === allFilterValue ? "text-black" : ""}
              onClick={() => setMaterial(allFilterValue)}
            >
              All
            </Button>
            {materials.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={material === option ? "default" : "outline"}
                className={material === option ? "text-black" : ""}
                onClick={() => setMaterial(option)}
              >
                {formatMouseSkateMaterial(option)}
              </Button>
            ))}
          </FilterGroup>

          <FilterGroup label="Speed order">
            <Button
              type="button"
              size="sm"
              variant={sort === "fastest" ? "default" : "outline"}
              className={sort === "fastest" ? "text-black" : ""}
              onClick={() => setSort("fastest")}
            >
              Fastest
            </Button>
            <Button
              type="button"
              size="sm"
              variant={sort === "slowest" ? "default" : "outline"}
              className={sort === "slowest" ? "text-black" : ""}
              onClick={() => setSort("slowest")}
            >
              Slowest
            </Button>
          </FilterGroup>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredSkates.map((skate) => (
          <MouseSkateCard key={skate.id} skate={skate} />
        ))}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
