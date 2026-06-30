"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

import { ComparisonCard } from "@/components/compare/comparison-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [activeTag, setActiveTag] = useState<string>(
        () => searchParams.get("tag") ?? "All",
    );

    const updateTag = (tag: string) => {
        setActiveTag(tag);

        if (tag === "All") {
            router.replace(pathname, { scroll: false });
            return;
        }

        const params = new URLSearchParams();
        params.set("tag", tag);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const visibleComparisons =
        activeTag === "All"
            ? comparisons
            : comparisons.filter((entry) =>
                  entry.comparison.tags.includes(activeTag),
              );

    return (
        <div className="space-y-6">
            <Card className="border-border bg-card/90 p-4 shadow-lg shadow-black/5 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Filter by playstyle or matchup type
                            </p>
                        </div>
                        <div className="hidden flex-wrap gap-2 lg:flex">
                            <ComparisonTagButtons
                                activeTag={activeTag}
                                tags={tags}
                                updateTag={updateTag}
                            />
                        </div>
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="w-full justify-center">
                                        <SlidersHorizontal className="size-4" />
                                        Filter comparisons
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="max-h-[82vh] rounded-t-2xl border-border">
                                    <SheetHeader className="px-4 pb-2 pt-5">
                                        <SheetTitle>Filter comparisons</SheetTitle>
                                        <SheetDescription>
                                            Choose the matchup type you want to see.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-wrap gap-2 overflow-y-auto px-4 pb-6">
                                        <ComparisonTagButtons
                                            activeTag={activeTag}
                                            tags={tags}
                                            updateTag={updateTag}
                                        />
                                    </div>
                                </SheetContent>
                            </Sheet>
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
                        <h3 className="panel-title">
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

function ComparisonTagButtons({
    activeTag,
    tags,
    updateTag,
}: {
    activeTag: string;
    tags: string[];
    updateTag: (tag: string) => void;
}) {
    return (
        <>
            {["All", ...tags].map((tag) => (
                <Button
                    key={tag}
                    type="button"
                    variant={activeTag === tag ? "default" : "outline"}
                    size="sm"
                    className={activeTag === tag ? "text-black" : ""}
                    onClick={() => updateTag(tag)}
                >
                    {tag}
                </Button>
            ))}
        </>
    );
}
