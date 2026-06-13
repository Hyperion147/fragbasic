"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    formatMousepadValue,
    getDefaultColorway,
    getMousepadFullName,
} from "@/lib/mousepads";
import type { FinderResult } from "@/lib/finder/types";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    result: FinderResult;
    rank: number;
};

const imageSafePrefixes = [
    "/mousepads/artisan/",
    "/mousepads/lgg/",
    "/mousepads/zowie/",
] as const;

export function FinderResultCard({ result, rank }: Props) {
    const { mousepad, score, reasons } = result;
    const defaultColorway = getDefaultColorway(mousepad);
    const matchPercentage = Math.round(score);
    const explanation =
        reasons[0] ??
        `${getMousepadFullName(mousepad)} fits this profile across speed, control, and consistency.`;
    const tags = getFinderTags(mousepad);
    const canRenderImage = imageSafePrefixes.some((prefix) =>
        mousepad.images.main.startsWith(prefix)
    );

    return (
        <Card className="overflow-hidden border-border bg-card/92 p-4 shadow-lg shadow-black/5">
            <div className="grid gap-4 md:grid-cols-[160px_1fr_auto] md:items-center">
                <div className="space-y-3">
                    <Badge className="w-fit rounded-md px-2.5 py-1 text-black">
                        {rank}
                    </Badge>

                    <div
                        className="relative h-28 overflow-hidden rounded-2xl border border-border"
                        style={{
                            background: `radial-gradient(circle at top, ${defaultColorway.color}22, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.26))`,
                        }}
                    >
                        {canRenderImage ? (
                            <Image
                                src={mousepad.images.main}
                                alt={getMousepadFullName(mousepad)}
                                fill
                                sizes="160px"
                                className="object-contain p-3"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.32))]" />
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-semibold tracking-tight">
                            {getMousepadFullName(mousepad)}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="rounded-md"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                        {explanation}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>Best for</span>
                        {mousepad.recommendedFor.games.slice(0, 3).map((game) => (
                            <Badge key={game} variant="outline" className="rounded-md">
                                {formatMousepadValue(game)}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-4 md:items-end">
                    <MatchRing value={matchPercentage} />
                    <Link
                        href={`/mousepads/${mousepad.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-violet-200"
                    >
                        View details
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </Card>
    );
}

function MatchRing({ value }: { value: number }) {
    return (
        <div
            className="grid size-18 place-items-center rounded-full border border-border text-center"
            style={{
                background: `conic-gradient(oklch(0.73 0.18 300) ${value * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
            }}
        >
            <div className="grid size-14 place-items-center rounded-full bg-card">
                <div>
                    <p className="text-lg font-semibold leading-none">{value}%</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        Match
                    </p>
                </div>
            </div>
        </div>
    );
}

function getFinderTags(mousepad: Mousepad) {
    const tags = [
        formatMousepadValue(mousepad.category),
        mousepad.feel.speed >= 7.7 ? "Fast" : null,
        mousepad.feel.control >= 8 ? "Control" : null,
        mousepad.environment.humidityResistance >= 8
            ? "Humidity Friendly"
            : null,
        mousepad.environment.humidityResistance >= 7 &&
        mousepad.feel.ratingConfidence !== "estimated"
            ? "Stable"
            : null,
    ].filter((tag): tag is string => Boolean(tag));

    return Array.from(new Set(tags)).slice(0, 4);
}
