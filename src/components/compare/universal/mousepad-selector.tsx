"use client";

import { useDeferredValue, useMemo } from "react";
import { Plus, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  formatMousepadValue,
  getDefaultColorway,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  allMousepads: Mousepad[];
  selectedSlugs: string[];
  query: string;
  maxSelected: number;
  onQueryChange: (value: string) => void;
  onAdd: (mousepad: Mousepad) => void;
};

const MAX_VISIBLE_RESULTS = 8;

export function MousepadSelector({
  allMousepads,
  selectedSlugs,
  query,
  maxSelected,
  onQueryChange,
  onAdd,
}: Props) {
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const hasReachedLimit = selectedSlugs.length >= maxSelected;

  const availableMousepads = useMemo(() => {
    const unselected = allMousepads.filter(
      (mousepad) => !selectedSlugs.includes(mousepad.slug)
    );

    if (!normalizedQuery) {
      return unselected.slice(0, MAX_VISIBLE_RESULTS);
    }

    return unselected
      .filter((mousepad) => {
        const searchable = [
          mousepad.brand,
          mousepad.name,
          mousepad.series ?? "",
          mousepad.slug,
          mousepad.category,
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalizedQuery);
      })
      .slice(0, MAX_VISIBLE_RESULTS);
  }, [allMousepads, normalizedQuery, selectedSlugs]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">
          Pick up to three mousepads
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by brand, series, or mousepad name"
            className="pl-10"
          />
        </div>
        
        <div className="grid gap-3 md:grid-cols-2">
          {availableMousepads.map((mousepad) => {
            const colorway = getDefaultColorway(mousepad);

            return (
              <div
                key={mousepad.slug}
                className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-background/70 px-4 py-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-3 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: colorway.color }}
                    />
                    <p className="truncate font-medium text-foreground">
                      {getMousepadFullName(mousepad)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatMousepadValue(mousepad.category)} /{" "}
                    {formatMousepadValue(mousepad.surface)}
                  </p>
                </div>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => onAdd(mousepad)}
                  disabled={hasReachedLimit}
                >
                  <Plus className="size-4" />
                  Add
                </Button>
              </div>
            );
          })}
        </div>

        {availableMousepads.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-background/70 px-5 py-8 text-center">
            <p className="font-medium text-foreground">No matching mousepads</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or remove one of the selected pads.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
