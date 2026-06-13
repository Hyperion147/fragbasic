"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";

import { FinderResultCard } from "@/components/finder/finder-result-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { FinderResult } from "@/lib/finder/types";

type Props = {
    results: FinderResult[];
};

export function FinderResults({ results }: Props) {
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
                            <FinderResultCard result={result} rank={index + 1} />
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
