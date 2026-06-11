"use client";

import { useMemo, useState } from "react";
import { Scale, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { CompareSummaryCards } from "@/components/compare/universal/compare-summary-cards";
import { MousepadSelector } from "@/components/compare/universal/mousepad-selector";
import { MultiEnvironmentChart } from "@/components/compare/universal/multi-environment-chart";
import { MultiFeelChart } from "@/components/compare/universal/multi-feel-chart";
import { MultiPositionChart } from "@/components/compare/universal/multi-position-chart";
import { SelectedMousepadStrip } from "@/components/compare/universal/selected-mousepad-strip";
import { UniversalProductGrid } from "@/components/compare/universal/universal-product-grid";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMousepadBySlug } from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  allMousepads: Mousepad[];
};

const DEFAULT_SELECTED_SLUGS = [
  "artisan-zero-soft",
  "pulsar-lgg-hyperion-soft",
  "lgg-saturn-pro-soft",
] as const;

const MAX_SELECTED = 3;

export function UniversalCompare({ allMousepads }: Props) {
  const [query, setQuery] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    DEFAULT_SELECTED_SLUGS.filter((slug) => getMousepadBySlug(slug))
  );

  const selectedMousepads = useMemo(
    () =>
      selectedSlugs
        .map((slug) => allMousepads.find((mousepad) => mousepad.slug === slug))
        .filter((mousepad): mousepad is Mousepad => mousepad !== undefined),
    [allMousepads, selectedSlugs]
  );

  const canCompare = selectedMousepads.length >= 2;

  function handleAdd(mousepad: Mousepad) {
    setSelectedSlugs((current) => {
      if (current.includes(mousepad.slug) || current.length >= MAX_SELECTED) {
        return current;
      }

      return [...current, mousepad.slug];
    });
    setQuery("");
  }

  function handleRemove(slug: string) {
    setSelectedSlugs((current) => current.filter((item) => item !== slug));
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge className="text-black">Universal compare</Badge>
            <Badge variant="outline">Up to three pads</Badge>
          </div>
          <CardTitle className="mt-4 text-4xl tracking-tight md:text-5xl">
            Build your own mousepad matchup.
          </CardTitle>
        </CardHeader>
      </Card>

      <MousepadSelector
        allMousepads={allMousepads}
        selectedSlugs={selectedSlugs}
        query={query}
        maxSelected={MAX_SELECTED}
        onQueryChange={setQuery}
        onAdd={handleAdd}
      />

      {selectedMousepads.length > 0 ? (
        <SelectedMousepadStrip
          mousepads={selectedMousepads}
          onRemove={handleRemove}
        />
      ) : null}

      {canCompare ? (
        <>
          <CompareSummaryCards mousepads={selectedMousepads} />
          <UniversalProductGrid mousepads={selectedMousepads} />
          <MultiFeelChart mousepads={selectedMousepads} />
          <MultiPositionChart mousepads={selectedMousepads} />
          <MultiEnvironmentChart mousepads={selectedMousepads} />
        </>
      ) : (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">
              Add one more mousepad to start comparing
            </CardTitle>
            <CardDescription>
              Universal comparison becomes useful once at least two pads are in
              the set.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-3 md:grid-cols-3">
            <HintCard
              icon={<SlidersHorizontal className="size-4" />}
              title="Feel profile"
              body="Compare speed, control, stopping power, and micro-adjustments on one radar."
            />
            <HintCard
              icon={<Scale className="size-4" />}
              title="Positioning"
              body="See where each pad sits on a shared mud-to-glass scale with one clean lane per pad."
            />
            <HintCard
              icon={<ShieldCheck className="size-4" />}
              title="Environment"
              body="Check humidity, sweat, and dust resistance without falling back to a giant table."
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function HintCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-background/80 px-4 py-4">
      <div className="inline-flex rounded-full border border-border bg-card p-2">
        {icon}
      </div>
      <p className="mt-3 font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
