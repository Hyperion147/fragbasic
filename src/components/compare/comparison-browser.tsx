"use client";

import { useState } from "react";

import { ComparisonCard } from "@/components/compare/comparison-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { MousepadComparison } from "@/data/comparisons";
import type { Mousepad } from "@/types/mousepad";

type ComparisonWithPads = {
  comparison: MousepadComparison;
  left: Mousepad;
  right: Mousepad;
};

type Props = {
  comparisons: ComparisonWithPads[];
  tags: string[];
};

export function ComparisonBrowser({ comparisons, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const visibleComparisons =
    activeTag === "All"
      ? comparisons
      : comparisons.filter((entry) => entry.comparison.tags.includes(activeTag));

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/90 p-5 shadow-lg shadow-black/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Tag filter</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Browse the matchup angles that matter
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            {visibleComparisons.length} comparison
            {visibleComparisons.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...tags].map((tag) => (
            <Button
              key={tag}
              type="button"
              variant={activeTag === tag ? "default" : "outline"}
              size="sm"
              className={activeTag === tag ? "text-black" : ""}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </Card>

      <div className="grid gap-4">
        {visibleComparisons.map(({ comparison, left, right }) => (
          <ComparisonCard
            key={comparison.slug}
            comparison={comparison}
            left={left}
            right={right}
          />
        ))}
      </div>
    </div>
  );
}
