"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Activity,
  CircleDollarSign,
  Ear,
  Eye,
  Radio,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import { MetricCell } from "@/components/data-display";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { latestAddedIemSlugs } from "@/data/latest-added";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  formatIemDriverType,
  formatIemPrice,
  formatIemSoundSignature,
  getIemFullName,
  getIemScoreTone,
} from "@/lib/iems";
import type { Iem, IemSoundSignature } from "@/types/iem";
import { IconTooltip } from "@/components/ui/tooltip";

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
      <Card className="border-border bg-card/90 p-4 shadow-lg shadow-black/5 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.9fr)_minmax(280px,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Filters</p>
            <h2 className="panel-title">
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
            <IconTooltip label="Reset all filters" side="left">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={resetFilters}
                aria-label="Reset all filters"
              >
                <RotateCcw className="size-4" />
              </Button>
            </IconTooltip>
          </div>
        </div>

        <div className="mt-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-center">
                <SlidersHorizontal className="size-4" />
                Filter IEMs
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[82vh] rounded-t-2xl border-border">
              <SheetHeader className="px-4 pb-2 pt-5">
                <SheetTitle>Filter IEMs</SheetTitle>
                <SheetDescription>
                  Tune the list by brand, sound signature, price, or ranking.
                </SheetDescription>
              </SheetHeader>
              <div className="overflow-y-auto px-4 pb-6">
                <div className="grid gap-6">
                  <IemFilterControls
                    brand={brand}
                    brands={brands}
                    signature={signature}
                    signatures={signatures}
                    price={price}
                    priceTiers={priceTiers}
                    sort={sort}
                    updateBrand={updateBrand}
                    updateSignature={updateSignature}
                    updatePrice={updatePrice}
                    updateSort={updateSort}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-6 hidden gap-6 lg:grid lg:grid-cols-[minmax(180px,0.75fr)_1fr_1fr_1fr]">
          <IemFilterControls
            brand={brand}
            brands={brands}
            signature={signature}
            signatures={signatures}
            price={price}
            priceTiers={priceTiers}
            sort={sort}
            updateBrand={updateBrand}
            updateSignature={updateSignature}
            updatePrice={updatePrice}
            updateSort={updateSort}
          />
        </div>
      </Card>

      <div className="overflow-x-auto border border-border bg-card/45 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <table className="data-table min-w-[1180px]">
          <thead>
            <tr>
              <th className="w-[340px]">
                <TableHeadLabel
                  icon={<Ear className="size-3.5" />}
                  label="IEM"
                  tooltip="Model, tuning, and overall FragBasic score"
                />
              </th>
              <th>
                <TableHeadLabel
                  icon={<Radio className="size-3.5" />}
                  label="Build"
                  tooltip="Driver type and cable setup"
                />
              </th>
              <th>
                <TableHeadLabel
                  icon={<Activity className="size-3.5" />}
                  label="FPS"
                  tooltip="Competitive FPS usefulness"
                />
              </th>
              <th>
                <TableHeadLabel
                  icon={<Sparkles className="size-3.5" />}
                  label="Imaging"
                  tooltip="Positional accuracy and directional separation"
                />
              </th>
              <th>
                <TableHeadLabel
                  icon={<Radio className="size-3.5" />}
                  label="Clarity"
                  tooltip="Detail, separation, and clean sound cues"
                />
              </th>
              <th>
                <TableHeadLabel
                  icon={<Sparkles className="size-3.5" />}
                  label="Value"
                  tooltip="Performance for the asking price"
                />
              </th>
              <th>
                <TableHeadLabel
                  icon={<CircleDollarSign className="size-3.5" />}
                  label="Price"
                  tooltip="Approximate India or global price band"
                />
              </th>
              <th className="text-right">
                <span className="sr-only">Profile</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIems.map((iem) => (
              <IemTableRow
                key={iem.id}
                iem={iem}
                isLatestAdded={latestAddedSlugSet.has(iem.slug)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IemTableRow({
  iem,
  isLatestAdded,
}: {
  iem: Iem;
  isLatestAdded: boolean;
}) {
  const fullName = getIemFullName(iem);

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <Link
            href={`/iems/${iem.slug}`}
            className="relative block size-16 shrink-0 overflow-hidden border border-border bg-background/75"
          >
            <Image
              src={iem.images.main}
              alt={fullName}
              fill
              sizes="64px"
              className="object-cover object-right"
            />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5">
              <Badge className="text-black">
                {formatIemSoundSignature(iem.soundSignature)}
              </Badge>
              {isLatestAdded ? <Badge variant="outline">Latest</Badge> : null}
            </div>
            <Link
              href={`/iems/${iem.slug}`}
              className="mt-2 block truncate text-base font-semibold tracking-tight text-foreground hover:text-primary"
            >
              {fullName}
            </Link>
            <p className="truncate text-xs text-muted-foreground">
              {getIemScoreTone(iem.ratings.fragbasic)} overall
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="space-y-1">
          <p className="font-medium text-foreground">
            {formatIemDriverType(iem.driverType)}
          </p>
          <p className="text-xs text-muted-foreground">
            {iem.specs.detachableCable ? "Detachable" : "Fixed"} cable
          </p>
        </div>
      </td>
      <td>
        <MetricCell label="FPS" value={iem.ratings.fps} />
      </td>
      <td>
        <MetricCell label="Imaging" value={iem.ratings.imaging} tone="alt" />
      </td>
      <td>
        <MetricCell label="Clarity" value={iem.ratings.clarity} />
      </td>
      <td>
        <MetricCell label="Value" value={iem.ratings.value} tone="muted" />
      </td>
      <td>
        <div className="space-y-1">
          <p className="font-medium text-foreground">{formatIemPrice(iem)}</p>
          <p className="text-xs text-muted-foreground">
            {iem.priceTier.replace("-", " ")}
          </p>
        </div>
      </td>
      <td className="text-right">
        <IconTooltip label={`Open ${fullName} profile`} side="left">
          <Button size="icon-sm" variant="outline" asChild>
            <Link href={`/iems/${iem.slug}`} aria-label={`Open ${fullName} profile`}>
              <Eye className="size-4" />
            </Link>
          </Button>
        </IconTooltip>
      </td>
    </tr>
  );
}

function TableHeadLabel({
  icon,
  label,
  tooltip,
}: {
  icon: ReactNode;
  label: string;
  tooltip: string;
}) {
  return (
    <IconTooltip label={tooltip}>
      <span className="inline-flex w-fit items-center gap-1.5">
        {icon}
        {label}
      </span>
    </IconTooltip>
  );
}

function IemFilterControls({
  brand,
  brands,
  signature,
  signatures,
  price,
  priceTiers,
  sort,
  updateBrand,
  updateSignature,
  updatePrice,
  updateSort,
}: {
  brand: BrandFilter;
  brands: string[];
  signature: typeof allFilterValue | IemSoundSignature;
  signatures: IemSoundSignature[];
  price: PriceFilter;
  priceTiers: Iem["priceTier"][];
  sort: SortKey;
  updateBrand: (next: string) => void;
  updateSignature: (next: typeof allFilterValue | IemSoundSignature) => void;
  updatePrice: (next: PriceFilter) => void;
  updateSort: (next: SortKey) => void;
}) {
  return (
    <>
          <FilterGroup label="Brand">
            <FilterButton active={brand === allFilterValue} onClick={() => updateBrand(allFilterValue)}>
              All
            </FilterButton>
            {brands.map((option) => (
              <FilterButton
                key={option}
                active={brand === option}
                onClick={() => updateBrand(option)}
              >
                {option}
              </FilterButton>
            ))}
          </FilterGroup>

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
