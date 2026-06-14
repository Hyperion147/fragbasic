"use client";

import { useMemo, useState } from "react";
import { Copy, Scale, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    // Initialize from URL if present (enables shareable links)
    const padsParam = searchParams.get("pads");
    if (padsParam) {
      const fromUrl = padsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, MAX_SELECTED)
        .filter((slug) => getMousepadBySlug(slug));
      if (fromUrl.length > 0) return fromUrl;
    }
    return DEFAULT_SELECTED_SLUGS.filter((slug) => getMousepadBySlug(slug));
  });

  const selectedMousepads = useMemo(
    () =>
      selectedSlugs
        .map((slug) => allMousepads.find((mousepad) => mousepad.slug === slug))
        .filter((mousepad): mousepad is Mousepad => mousepad !== undefined),
    [allMousepads, selectedSlugs]
  );

  const canCompare = selectedMousepads.length >= 2;

  // Keep URL in sync so the current selection is shareable
  const updateUrl = (slugs: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slugs.length > 0) {
      params.set("pads", slugs.join(","));
    } else {
      params.delete("pads");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  function handleAdd(mousepad: Mousepad) {
    setSelectedSlugs((current) => {
      if (current.includes(mousepad.slug) || current.length >= MAX_SELECTED) {
        return current;
      }
      const next = [...current, mousepad.slug];
      updateUrl(next);
      return next;
    });
    setQuery("");
  }

  function handleRemove(slug: string) {
    setSelectedSlugs((current) => {
      const next = current.filter((item) => item !== slug);
      updateUrl(next);
      return next;
    });
  }

  // Copy current page URL (now contains the exact selection)
  const [copied, setCopied] = useState(false);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for very old browsers
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const selectionCount = selectedSlugs.length;

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge className="text-black">Universal compare</Badge>
              <Badge variant="outline">Up to three pads</Badge>
              <Badge variant="outline" className="font-mono">
                {selectionCount}/3 selected
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
            {selectionCount > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSelectedSlugs([]);
                  updateUrl([]);
                }}
              >
                Clear set
              </Button>
            )}
            {canCompare && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyLink}
                className="gap-2"
              >
                <Copy className="size-3.5" />
                {copied ? "Copied!" : "Copy link to this set"}
              </Button>
            )}
            </div>
          </div>
          <CardTitle className="mt-4 text-4xl tracking-tight md:text-5xl">
            Build your own mousepad matchup.
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Your exact selection is saved in the URL — copy the link to share this comparison set with others.
          </p>
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
              {selectionCount === 0
                ? "Select 2–3 mousepads above to start comparing"
                : "Add one more mousepad to start comparing"}
            </CardTitle>
            <CardDescription>
              {selectionCount === 0
                ? "Use the search below, or load one of these popular starter sets for a quick comparison."
                : "Universal comparison becomes useful once at least two pads are in the set."}
            </CardDescription>
          </CardHeader>

          {selectionCount === 0 && (
            <CardContent className="pb-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Classic balanced", slugs: ["artisan-zero-soft", "pulsar-lgg-hyperion-soft", "lgg-saturn-pro-soft"] as const },
                  { label: "Control focus", slugs: ["lgg-saturn-pro-soft", "artisan-type-99-soft", "zowie-g-sr-iii"] as const },
                  { label: "Speed & tracking", slugs: ["artisan-raiden-soft", "lgg-neptune-pro-soft", "wallhack-sp-005"] as const },
                ].map((preset) => (
                  <Button
                    key={preset.label}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const valid = preset.slugs.filter((s) => getMousepadBySlug(s));
                      setSelectedSlugs(valid);
                      updateUrl(valid);
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          )}

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
