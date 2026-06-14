"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
            : comparisons.filter((entry) =>
                  entry.comparison.tags.includes(activeTag),
              );

    return (
        <div className="space-y-6">
            <Card className="border-border bg-card/90 p-5 shadow-lg shadow-black/5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Filter by playstyle or matchup type
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {["All", ...tags].map((tag) => (
                            <Button
                                key={tag}
                                type="button"
                                variant={
                                    activeTag === tag ? "default" : "outline"
                                }
                                size="sm"
                                className={
                                    activeTag === tag ? "text-black" : ""
                                }
                                onClick={() => setActiveTag(tag)}
                            >
                                {tag}
                            </Button>
                        ))}
                        </div>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground lg:text-right">
                        <p>
                            {visibleComparisons.length} comparison
                            {visibleComparisons.length === 1 ? "" : "s"}
                        </p>
                        <p>Published writeups plus the universal compare builder.</p>
                    </div>
                </div>
            </Card>

            {visibleComparisons.length > 0 ? (
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
            ) : (
                <Card className="border-dashed border-border bg-card/80 p-8 text-center">
                    <div className="mx-auto max-w-xl space-y-4">
                        <h3 className="text-2xl font-semibold tracking-tight">
                            No published matchups for this filter yet
                        </h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                            Switch tags to explore the current library, or build
                            your own side-by-side set with the universal compare tool.
                        </p>
                        <Button asChild>
                            <Link href="/mousepads/compare/universal">
                                Open Universal Compare
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
