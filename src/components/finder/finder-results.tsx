"use client";

import { motion } from "motion/react";
import { Info, Target } from "lucide-react";

import { FinderResultCard } from "@/components/finder/finder-result-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { FinderResult } from "@/lib/finder/types";

type Props = {
    results: FinderResult[];
    onToggleSave?: (slug: string) => void;
    isSaved?: (slug: string) => boolean;
    gamesSelected?: boolean;
    canSaveMore?: boolean;
};

export function FinderResults({ results, onToggleSave, isSaved, gamesSelected = true, canSaveMore = true }: Props) {
    if (!gamesSelected) {
        return (
            <Card className="border-border bg-card/90 p-8 text-center shadow-xl shadow-black/10">
                <div className="mx-auto max-w-xs space-y-3">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border bg-background/60">
                        <Target className="size-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">Select games to see recommendations</h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                        Choose up to 3 games you play on the left. We'll rank mousepads based on how well they match your playstyle, sensitivity, and preferences.
                    </p>
                </div>
            </Card>
        );
    }

    if (results.length === 0) {
        return (
            <Card className="border-border bg-card/90 p-8 text-center shadow-xl shadow-black/10">
                <div className="mx-auto max-w-xs space-y-3">
                    <p className="text-xl font-semibold tracking-tight">No matches found</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                        Try selecting different games or adjusting your sensitivity and preferences.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-8">
            <Card className="border-border bg-card/90 p-6 shadow-xl shadow-black/10">
                <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Your Top Matches
                        </p>
                        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                            Ranked from your answers
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{results.length} results</Badge>
                        <Badge variant="outline">Why these results?</Badge>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {results.map((result, index) => (
                        <motion.div
                            key={result.mousepad.slug}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04, duration: 0.28 }}
                        >
                            <FinderResultCard 
                                result={result} 
                                rank={index + 1} 
                                onToggleSave={onToggleSave}
                                isSaved={isSaved ? isSaved(result.mousepad.slug) : false}
                                canSaveMore={canSaveMore}
                            />
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
