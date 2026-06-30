"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search } from "lucide-react";

import { IemCard } from "@/components/iems/iem-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { latestAddedIemSlugs } from "@/data/latest-added";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatIemSoundSignature,
  getIemFullName,
} from "@/lib/iems";
import type { Iem, IemSoundSignature } from "@/types/iem";

const allFilterValue = "all";

type SortKey = "score" | "fps" | "value" | "price";
type PriceFilter = typeof allFilterValue | Iem["priceTier"];
type BrandFilter = typeof allFilterValue | string;

const priceTierOrder: Record<Iem["priceTier"], number> = {
  "under-2000": 1,
  "under-5000": 2,
  midrange: 3,
  premium: 4,
};

export function IemBrowser({ iems }: { iems: Iem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [brand, setBrand] = useState<BrandFilter>(() => searchParams.get("brand") ?? allFilterValue);
  const [signature, setSignature] = useState<typeof allFilterValue | IemSoundSignature>(
    () => (searchParams.get("signature") as IemSoundSignature | null) ?? allFilterValue,
  );
  const [price, setPrice] = useState<PriceFilter>(() => (searchParams.get("price") as PriceFilter | null) ?? allFilterValue);
  const [sort, setSort] = useState<SortKey>(() => (searchParams.get("sort") as SortKey | null) ?? "score");

  const signatures = useMemo(
    () => Array.from(new Set(iems.map((iem) => iem.soundSignature))),
    [iems],
  );
  const brands = useMemo(
    () => Array.from(new Set(iems.map((iem) => iem.brand))).sort(),
    [iems],
  );
  const priceTiers = useMemo(
    () =>
      Array.from(new Set(iems.map((iem) => iem.priceTier))).sort(
        (left, right) => priceTierOrder[left] - priceTierOrder[right],
      ),
    [iems],
  );
  const latestAddedSlugSet = useMemo(
    () => new Set<string>(latestAddedIemSlugs),
    [],
  );

  const filteredIems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...iems]
      .filter((iem) => {
        if (brand !== allFilterValue && iem.brand !== brand) {
          return false;
        }

        if (signature !== allFilterValue && iem.soundSignature !== signature) {
          return false;
        }

        if (price !== allFilterValue && iem.priceTier !== price) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        return [
          getIemFullName(iem),
          iem.brand,
          iem.shortName,
          iem.subtitle,
          iem.communitySummary,
          iem.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((left, right) => {
        if (sort === "fps") {
          return right.ratings.fps - left.ratings.fps;
        }

        if (sort === "value") {
          return right.ratings.value - left.ratings.value;
        }

        if (sort === "price") {
          return (left.buying.priceInr ?? 999999) - (right.buying.priceInr ?? 999999);
        }

        return right.ratings.fragbasic - left.ratings.fragbasic;
      });
  }, [brand, iems, price, query, signature, sort]);

  const resetFilters = () => {
    setQuery("");
    setBrand(allFilterValue);
    setSignature(allFilterValue);
    setPrice(allFilterValue);
    setSort("score");
    router.replace(pathname, { scroll: false });
  };

  const updateUrl = (next: {
    query?: string;
    brand?: BrandFilter;
    signature?: typeof allFilterValue | IemSoundSignature;
    price?: PriceFilter;
    sort?: SortKey;
  }) => {
    const nextQuery = next.query ?? query;
    const nextBrand = next.brand ?? brand;
    const nextSignature = next.signature ?? signature;
    const nextPrice = next.price ?? price;
    const nextSort = next.sort ?? sort;
    const params = new URLSearchParams();

    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextBrand !== allFilterValue) params.set("brand", nextBrand);
    if (nextSignature !== allFilterValue) params.set("signature", nextSignature);
    if (nextPrice !== allFilterValue) params.set("price", nextPrice);
    if (nextSort !== "score") params.set("sort", nextSort);

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

  const updateSignature = (next: typeof allFilterValue | IemSoundSignature) => {
    setSignature(next);
    updateUrl({ signature: next });
  };

  const updatePrice = (next: PriceFilter) => {
    setPrice(next);
    updateUrl({ price: next });
  };

  const updateSort = (next: SortKey) => {
    setSort(next);
    updateUrl({ sort: next });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/90 p-5 shadow-lg shadow-black/5">
        <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.9fr)_minmax(280px,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Filters</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Find IEMs by tuning, price, and FPS score
            </h2>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Search</p>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search IEMs, tuning, tags"
                className="pl-10"
                aria-label="Search IEMs"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 lg:justify-end">
            <p className="text-sm text-muted-foreground">
              {filteredIems.length} IEM{filteredIems.length === 1 ? "" : "s"}
            </p>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(180px,0.75fr)_1fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Brand</p>
            <Select value={brand} onValueChange={updateBrand}>
              <SelectTrigger aria-label="Select IEM brand">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={allFilterValue}>All brands</SelectItem>
                {brands.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FilterGroup label="Tuning">
            <FilterButton active={signature === allFilterValue} onClick={() => updateSignature(allFilterValue)}>
              All
            </FilterButton>
            {signatures.map((option) => (
              <FilterButton
                key={option}
                active={signature === option}
                onClick={() => updateSignature(option)}
              >
                {formatIemSoundSignature(option)}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup label="Price">
            <FilterButton active={price === allFilterValue} onClick={() => updatePrice(allFilterValue)}>
              All
            </FilterButton>
            {priceTiers.map((option) => (
              <FilterButton
                key={option}
                active={price === option}
                onClick={() => updatePrice(option)}
              >
                {formatPriceTier(option)}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup label="Sort">
            {[
              ["score", "Score"],
              ["fps", "FPS"],
              ["value", "Value"],
              ["price", "Price"],
            ].map(([value, label]) => (
              <FilterButton
                key={value}
                active={sort === value}
                onClick={() => updateSort(value as SortKey)}
              >
                {label}
              </FilterButton>
            ))}
          </FilterGroup>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredIems.map((iem) => (
          <IemCard
            key={iem.id}
            iem={iem}
            isLatestAdded={latestAddedSlugSet.has(iem.slug)}
          />
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

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "outline"}
      className={active ? "text-black" : ""}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function formatPriceTier(priceTier: Iem["priceTier"]) {
  const labels: Record<Iem["priceTier"], string> = {
    "under-2000": "Under INR 2,000",
    "under-5000": "Under INR 5,000",
    midrange: "Midrange",
    premium: "Premium",
  };

  return labels[priceTier];
}
