"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";

import { IemCard } from "@/components/iems/iem-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  formatIemSoundSignature,
  getIemFullName,
} from "@/lib/iems";
import type { Iem, IemSoundSignature } from "@/types/iem";

const allFilterValue = "all";

type SortKey = "score" | "fps" | "value" | "price";
type PriceFilter = typeof allFilterValue | Iem["priceTier"];

const priceTierOrder: Record<Iem["priceTier"], number> = {
  "under-2000": 1,
  "under-5000": 2,
  midrange: 3,
  premium: 4,
};

export function IemBrowser({ iems }: { iems: Iem[] }) {
  const [query, setQuery] = useState("");
  const [signature, setSignature] = useState<typeof allFilterValue | IemSoundSignature>(
    allFilterValue,
  );
  const [price, setPrice] = useState<PriceFilter>(allFilterValue);
  const [sort, setSort] = useState<SortKey>("score");

  const signatures = useMemo(
    () => Array.from(new Set(iems.map((iem) => iem.soundSignature))),
    [iems],
  );
  const priceTiers = useMemo(
    () =>
      Array.from(new Set(iems.map((iem) => iem.priceTier))).sort(
        (left, right) => priceTierOrder[left] - priceTierOrder[right],
      ),
    [iems],
  );

  const filteredIems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...iems]
      .filter((iem) => {
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
  }, [iems, price, query, signature, sort]);

  const resetFilters = () => {
    setQuery("");
    setSignature(allFilterValue);
    setPrice(allFilterValue);
    setSort("score");
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/90 p-5 shadow-lg shadow-black/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Filters</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Find IEMs by tuning, price, and FPS score
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {filteredIems.length} IEM{filteredIems.length === 1 ? "" : "s"}
            </p>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Search</p>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search IEMs, tuning, tags"
                className="pl-10"
                aria-label="Search IEMs"
              />
            </div>
          </div>

          <FilterGroup label="Tuning">
            <FilterButton active={signature === allFilterValue} onClick={() => setSignature(allFilterValue)}>
              All
            </FilterButton>
            {signatures.map((option) => (
              <FilterButton
                key={option}
                active={signature === option}
                onClick={() => setSignature(option)}
              >
                {formatIemSoundSignature(option)}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup label="Price">
            <FilterButton active={price === allFilterValue} onClick={() => setPrice(allFilterValue)}>
              All
            </FilterButton>
            {priceTiers.map((option) => (
              <FilterButton
                key={option}
                active={price === option}
                onClick={() => setPrice(option)}
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
                onClick={() => setSort(value as SortKey)}
              >
                {label}
              </FilterButton>
            ))}
          </FilterGroup>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredIems.map((iem) => (
          <IemCard key={iem.id} iem={iem} />
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
