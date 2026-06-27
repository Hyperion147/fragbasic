"use client";

import { useMemo, useState } from "react";

import { MouseSkateDot } from "@/components/accessories/mouse-skates/mouse-skate-dot";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    formatMouseSkateMaterial,
    formatMouseSkateRating,
    getMouseSkateFullName,
    getMouseSkateSurfaceFitClass,
} from "@/lib/accessories/mouse-skates";
import { cn } from "@/lib/utils";
import type { MouseSkate } from "@/types/accessory";

const comparedRatings = [
    { key: "speed", label: "Speed" },
    { key: "control", label: "Control" },
    { key: "stoppingPower", label: "Stopping" },
    { key: "smoothness", label: "Smoothness" },
    { key: "noiseControl", label: "Noise control" },
    { key: "durability", label: "Durability" },
    { key: "glassCompatibility", label: "Glass fit" },
] as const;

type CompareSlot = "left" | "middle" | "right";

export function MouseSkateCompare({
    skates,
    initialLeftSlug,
}: {
    skates: MouseSkate[];
    initialLeftSlug?: string;
}) {
    const defaultSlugs = useMemo(() => {
        const sorted = [...skates].sort(
            (left, right) => right.ratings.speed - left.ratings.speed,
        );
        const initialLeft = initialLeftSlug
            ? skates.find((skate) => skate.slug === initialLeftSlug)
            : undefined;

        const first = initialLeft ?? sorted[0];
        const fallback = sorted.filter((skate) => skate.slug !== first?.slug);

        return {
            left: first?.slug ?? "",
            middle: fallback[0]?.slug ?? "",
            right: fallback[1]?.slug ?? "",
        };
    }, [initialLeftSlug, skates]);

    const [selected, setSelected] =
        useState<Record<CompareSlot, string>>(defaultSlugs);

    const selectedSkates = (["left", "middle", "right"] as CompareSlot[])
        .map((slot) => {
            const skate = skates.find((item) => item.slug === selected[slot]);

            return skate ? { slot, skate } : undefined;
        })
        .filter(
            (
                entry,
            ): entry is {
                slot: CompareSlot;
                skate: MouseSkate;
            } => entry !== undefined,
        );

    const updateSlot = (slot: CompareSlot, slug: string) => {
        setSelected((current) => ({ ...current, [slot]: slug }));
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                {(["left", "middle", "right"] as CompareSlot[]).map(
                    (slot, index) => {

                        return (
                            <div
                                key={slot}
                                className="rounded-2xl border border-border bg-card/70 p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                        Slot {index + 1}
                                    </p>
                                </div>
                                <Select
                                    value={selected[slot]}
                                    onValueChange={(value) =>
                                        updateSlot(slot, value)
                                    }
                                >
                                    <SelectTrigger
                                        className="mt-3"
                                        aria-label={`Select skate ${index + 1}`}
                                    >
                                        <SelectValue placeholder="Select skate" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {skates.map((skate) => (
                                            <SelectItem
                                                key={skate.id}
                                                value={skate.slug}
                                            >
                                                {getMouseSkateFullName(skate)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        );
                    },
                )}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                {selectedSkates.map(({ slot, skate }) => (
                    <SkateComparePanel key={`${slot}-${skate.id}`} skate={skate} />
                ))}
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Rating matrix
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                            Where each skate wins
                        </h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Higher is better inside each stat.
                    </p>
                </div>

                <div className="mt-6 space-y-5">
                    {comparedRatings.map((rating) => (
                        <div key={rating.key}>
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="font-medium">
                                    {rating.label}
                                </span>
                                <span className="text-muted-foreground">
                                    0-10
                                </span>
                            </div>
                            <div className="grid gap-2 lg:grid-cols-3">
                                {selectedSkates.map(({ slot, skate }) => {
                                    const value = skate.ratings[rating.key];

                                    return (
                                        <div
                                            key={`${slot}-${skate.id}-${rating.key}`}
                                            className="rounded-xl border border-border bg-background/55 p-3"
                                        >
                                            <div className="flex items-center justify-between gap-3 text-xs">
                                                <span className="truncate text-muted-foreground">
                                                    {skate.name}
                                                </span>
                                                <span className="font-semibold">
                                                    {formatMouseSkateRating(
                                                        value,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full rounded-full bg-sky-300"
                                                    style={{
                                                        width: `${Math.max(0, Math.min(100, value * 10))}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SkateComparePanel({ skate }: { skate: MouseSkate }) {
    return (
        <article className="rounded-2xl border border-border bg-card/70 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    <Badge>{skate.brand}</Badge>
                    <Badge variant="outline">
                        {formatMouseSkateMaterial(skate.material)}
                    </Badge>
                    <Badge variant="outline">{skate.shape}</Badge>
                </div>
                <MouseSkateDot skate={skate} size="md" />
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {skate.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {skate.notes}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
                <Stat label="Speed" value={skate.ratings.speed} />
                <Stat label="Control" value={skate.ratings.control} />
                <Stat label="Stop" value={skate.ratings.stoppingPower} />
            </div>

            <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Best fit
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(skate.surfaceFit).map(([surface, fit]) => (
                        <span
                            key={surface}
                            className={cn(
                                "rounded-full border px-2.5 py-1 text-[11px] capitalize",
                                getMouseSkateSurfaceFitClass(fit),
                            )}
                        >
                            {surface}: {fit}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 text-lg font-semibold">
                {formatMouseSkateRating(value)}
            </p>
        </div>
    );
}
