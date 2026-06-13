"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

import { FinderResultCard } from "@/components/finder/finder-result-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { FinderResult } from "@/lib/finder/types";
import type { Mousepad } from "@/types/mousepad";
import {
    formatMousepadValue,
    getDefaultColorway,
    getMousepadFullName,
} from "@/lib/mousepads";

type Props = {
    results: FinderResult[];
    honorableMentions: Mousepad[];
};

const imageSafePrefixes = [
    "/mousepads/artisan/",
    "/mousepads/lgg/",
    "/mousepads/zowie/",
] as const;

export function FinderResults({ results, honorableMentions }: Props) {
    return (
        <div className="space-y-6">
            <Card className="border-border bg-card/90 p-5 shadow-xl shadow-black/10">
                <div className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
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

                <div className="mt-5 space-y-4">
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

            <Card className="border-border bg-card/90 p-5 shadow-lg shadow-black/5">
                <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-10 items-center justify-center rounded-2xl border border-border bg-background/70">
                        <Info className="size-4 text-foreground" />
                    </span>
                    <div>
                        <h3 className="text-lg font-semibold tracking-tight">
                            How we score matches
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Our algorithm compares feel data points including
                            speed, control, stopping power, consistency,
                            humidity resistance, and community feedback against
                            the playstyle you selected.
                        </p>
                    </div>
                </div>
            </Card>

            {honorableMentions.length > 0 ? (
                <section className="space-y-4">
                    <div className="max-w-3xl">
                        <p className="text-sm text-muted-foreground">
                            Honorable mentions
                        </p>
                        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                            Other pads worth a look
                        </h2>
                    </div>

                    <div className="overflow-x-auto pb-2">
                        <div className="flex min-w-max gap-4">
                            {honorableMentions.map((mousepad) => {
                                const defaultColorway = getDefaultColorway(mousepad);
                                const canRenderImage = imageSafePrefixes.some((prefix) =>
                                    mousepad.images.main.startsWith(prefix)
                                );

                                return (
                                    <Link
                                        key={mousepad.slug}
                                        href={`/mousepads/${mousepad.slug}`}
                                        className="w-64 shrink-0"
                                    >
                                        <Card className="h-full border-border bg-card/88 p-4 transition-all hover:-translate-y-0.5 hover:border-violet-300/35">
                                            <div
                                                className="relative h-32 overflow-hidden rounded-2xl border border-border"
                                                style={{
                                                    background: `radial-gradient(circle at top, ${defaultColorway.color}22, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.22))`,
                                                }}
                                            >
                                                {canRenderImage ? (
                                                    <Image
                                                        src={mousepad.images.main}
                                                        alt={getMousepadFullName(mousepad)}
                                                        fill
                                                        sizes="256px"
                                                        className="object-contain p-3"
                                                    />
                                                ) : null}
                                            </div>
                                            <h3 className="mt-4 text-lg font-semibold tracking-tight">
                                                {getMousepadFullName(mousepad)}
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                {formatMousepadValue(mousepad.category)} -{" "}
                                                {mousepad.environment.humidityResistance >= 8
                                                    ? "strong humidity performance"
                                                    : "solid all-round fit"}
                                            </p>
                                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                                                View details
                                                <ArrowRight className="size-4" />
                                            </span>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ) : null}
        </div>
    );
}
