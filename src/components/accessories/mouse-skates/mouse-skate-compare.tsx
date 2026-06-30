"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
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

    const [selected, setSelected] = useState<Record<CompareSlot, string>>(() => {
        const urlSlugs = (searchParams.get("skates") ?? "")
            .split(",")
            .map((slug) => slug.trim())
            .filter((slug) => skates.some((skate) => skate.slug === slug))
            .slice(0, 3);

        return {
            left: urlSlugs[0] ?? defaultSlugs.left,
            middle: urlSlugs[1] ?? defaultSlugs.middle,
            right: urlSlugs[2] ?? defaultSlugs.right,
        };
    });

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
        setSelected((current) => {
            const next = { ...current, [slot]: slug };
            const params = new URLSearchParams(searchParams.toString());
            params.set("skates", [next.left, next.middle, next.right].filter(Boolean).join(","));
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            return next;
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                {(["left", "middle", "right"] as CompareSlot[]).map(
                    (slot, index) => {

                        return (
                            <div
                                key={slot}
                                className="rounded-2xl soft-panel p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="compact-label">
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

            <SkateCompareDisclosure title="Rating matrix">
            <div className="rounded-2xl soft-panel p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="compact-label">
                            Rating matrix
                        </p>
                        <h2 className="panel-title mt-2">
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
                                            className="rounded-xl soft-surface p-3"
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
            </SkateCompareDisclosure>
        </div>
    );
}

function SkateCompareDisclosure({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <details className="group rounded-xl soft-panel">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-foreground sm:px-5">
                {title}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-3 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-4">{children}</div>
        </details>
    );
}

function SkateComparePanel({ skate }: { skate: MouseSkate }) {
    return (
        <article className="rounded-2xl soft-panel p-5">
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

            <h2 className="panel-title mt-4">
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
                <p className="compact-label">
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
        <div className="rounded-xl soft-surface px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 text-lg font-semibold">
                {formatMouseSkateRating(value)}
            </p>
        </div>
    );
}
