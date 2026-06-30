"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { MouseSkateCard } from "@/components/accessories/mouse-skates/mouse-skate-card";
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
import { formatMouseSkateMaterial, getMouseSkateFullName } from "@/lib/accessories/mouse-skates";
import type { MouseSkate, MouseSkateMaterial } from "@/types/accessory";

const allFilterValue = "all";

type SortKey = "fastest" | "slowest";

export function MouseSkateBrowser({ skates }: { skates: MouseSkate[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [brand, setBrand] = useState(() => searchParams.get("brand") ?? allFilterValue);
  const [material, setMaterial] = useState<typeof allFilterValue | MouseSkateMaterial>(
    () => (searchParams.get("material") as MouseSkateMaterial | null) ?? allFilterValue
  );
  const [sort, setSort] = useState<SortKey>(() => (searchParams.get("sort") as SortKey | null) ?? "fastest");

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
    router.replace(pathname, { scroll: false });
  };

  const updateUrl = (next: {
    query?: string;
    brand?: string;
    material?: typeof allFilterValue | MouseSkateMaterial;
    sort?: SortKey;
  }) => {
    const nextQuery = next.query ?? query;
    const nextBrand = next.brand ?? brand;
    const nextMaterial = next.material ?? material;
    const nextSort = next.sort ?? sort;
    const params = new URLSearchParams();

    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextBrand !== allFilterValue) params.set("brand", nextBrand);
    if (nextMaterial !== allFilterValue) params.set("material", nextMaterial);
    if (nextSort !== "fastest") params.set("sort", nextSort);

    const serialized = params.toString();
    router.replace(serialized ? `${pathname}?${serialized}` : pathname, { scroll: false });
  };

  const updateQuery = (next: string) => {
    setQuery(next);
    updateUrl({ query: next });
  };

  const updateBrand = (next: string) => {
    setBrand(next);
    updateUrl({ brand: next });
  };

  const updateMaterial = (next: typeof allFilterValue | MouseSkateMaterial) => {
    setMaterial(next);
    updateUrl({ material: next });
  };

  const updateSort = (next: SortKey) => {
    setSort(next);
    updateUrl({ sort: next });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/90 p-4 shadow-lg shadow-black/5 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Filters</p>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
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

        <div className="mt-5 grid gap-4 lg:hidden">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Search</p>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search brand, series, material"
                className="pl-10"
                aria-label="Search mouse skates"
              />
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-center">
                <SlidersHorizontal className="size-4" />
                Filter skates
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[82vh] rounded-t-2xl border-border">
              <SheetHeader className="px-4 pb-2 pt-5">
                <SheetTitle>Filter skates</SheetTitle>
                <SheetDescription>
                  Pick a brand, material, or speed order.
                </SheetDescription>
              </SheetHeader>
              <div className="overflow-y-auto px-4 pb-6">
                <div className="grid gap-6">
                  <SkateFilterControls
                    brand={brand}
                    brands={brands}
                    material={material}
                    materials={materials}
                    sort={sort}
                    updateBrand={updateBrand}
                    updateMaterial={updateMaterial}
                    updateSort={updateSort}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-5 hidden gap-6 lg:grid lg:grid-cols-[1.2fr_1fr_1fr_0.8fr] lg:gap-8">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Search</p>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search brand, series, material"
                className="pl-10"
                aria-label="Search mouse skates"
              />
            </div>
          </div>

          <SkateFilterControls
            brand={brand}
            brands={brands}
            material={material}
            materials={materials}
            sort={sort}
            updateBrand={updateBrand}
            updateMaterial={updateMaterial}
            updateSort={updateSort}
          />
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

function SkateFilterControls({
  brand,
  brands,
  material,
  materials,
  sort,
  updateBrand,
  updateMaterial,
  updateSort,
}: {
  brand: string;
  brands: string[];
  material: typeof allFilterValue | MouseSkateMaterial;
  materials: MouseSkateMaterial[];
  sort: SortKey;
  updateBrand: (next: string) => void;
  updateMaterial: (next: typeof allFilterValue | MouseSkateMaterial) => void;
  updateSort: (next: SortKey) => void;
}) {
  return (
    <>
          <FilterGroup label="Company">
            <Button
              type="button"
              size="sm"
              variant={brand === allFilterValue ? "default" : "outline"}
              className={brand === allFilterValue ? "text-black" : ""}
              onClick={() => updateBrand(allFilterValue)}
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
                onClick={() => updateBrand(option)}
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
              onClick={() => updateMaterial(allFilterValue)}
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
                onClick={() => updateMaterial(option)}
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
              onClick={() => updateSort("fastest")}
            >
              Fastest
            </Button>
            <Button
              type="button"
              size="sm"
              variant={sort === "slowest" ? "default" : "outline"}
              className={sort === "slowest" ? "text-black" : ""}
              onClick={() => updateSort("slowest")}
            >
              Slowest
            </Button>
          </FilterGroup>
    </>
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
