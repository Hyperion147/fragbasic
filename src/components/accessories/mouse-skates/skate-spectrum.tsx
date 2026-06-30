"use client";

import type { ComponentType } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Cog,
    Crosshair,
    Shield,
    Zap,
} from "lucide-react";

import { MouseSkateDot } from "@/components/accessories/mouse-skates/mouse-skate-dot";
import { Badge } from "@/components/ui/badge";
import { IconTooltip } from "@/components/ui/tooltip";
import {
    formatMouseSkateMaterial,
    formatMouseSkateRating,
    getMouseSkateVisual,
} from "@/lib/accessories/mouse-skates";
import type { MouseSkate } from "@/types/accessory";

export function SkateSpectrum({ skates }: { skates: MouseSkate[] }) {
    const railRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const rail = railRef.current;

        if (!rail) {
            return;
        }

        const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
        setCanScrollLeft(rail.scrollLeft > 4);
        setCanScrollRight(rail.scrollLeft < maxScrollLeft - 4);
    }, []);

    useEffect(() => {
        updateScrollState();
        const rail = railRef.current;

        if (!rail) {
            return;
        }

        rail.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);

        return () => {
            rail.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [updateScrollState]);

    const scrollSkates = (direction: "left" | "right") => {
        const rail = railRef.current;

        if (!rail) {
            return;
        }

        rail.scrollBy({
            left: direction === "right" ? 440 : -440,
            behavior: "smooth",
        });
    };

    return (
        <div className="overflow-hidden shadow-2xl shadow-black/40">
            <div className="mt-6 px-1">
                <div className="grid grid-cols-6 gap-2 md:grid-cols-12">
                    {skates.map((skate, index) => {
                        const tone = getSpectrumTone(index, skates.length);

                        return (
                            <div
                                key={skate.id}
                                className="h-2 rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, ${tone.light}, ${tone.accent})`,
                                    boxShadow: `0 0 18px ${tone.glow}`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="relative mt-6">
                <button
                    type="button"
                    onClick={() => scrollSkates("left")}
                    disabled={!canScrollLeft}
                    className="absolute left-1 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/20 bg-slate-950/90 text-violet-100 shadow-lg shadow-black/40 transition hover:border-violet-200/45 disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Scroll skates left"
                >
                    <ArrowLeft className="size-5" />
                </button>
                <button
                    type="button"
                    onClick={() => scrollSkates("right")}
                    disabled={!canScrollRight}
                    className="absolute right-1 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/20 bg-slate-950/90 text-violet-100 shadow-lg shadow-black/40 transition hover:border-violet-200/45 disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Scroll skates right"
                >
                    <ArrowRight className="size-5" />
                </button>

                <div
                    ref={railRef}
                    className="flex gap-3 overflow-x-auto scroll-smooth px-2 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                    {skates.map((skate, index) => (
                        <SpectrumSkateCard
                            key={skate.id}
                            skate={skate}
                            rank={index + 1}
                            total={skates.length}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-4 rounded-2xl border border-violet-200/10 bg-violet-200/4 p-4">
                <div className="grid gap-2 text-xs text-violet-100/72 sm:grid-cols-2 lg:grid-cols-4">
                    <LegendItem icon={Zap} label="Speed / glide" />
                    <LegendItem
                        icon={Crosshair}
                        label="Control / aiming lock"
                    />
                    <LegendItem icon={Shield} label="Stopping power" />
                    <LegendItem icon={Cog} label="Durability / wear" />
                </div>
            </div>
        </div>
    );
}

function SpectrumSkateCard({
    skate,
    rank,
    total,
}: {
    skate: MouseSkate;
    rank: number;
    total: number;
}) {
    const tone = getSpectrumTone(rank - 1, total);
    const visual = getSkateVisual(skate, tone);
    const spectrumLabel =
        rank === 1 ? "Fastest" : rank === total ? "Slowest" : `#${rank}`;

    return (
        <article
            className="min-w-[188px] rounded-2xl border bg-slate-950/70 p-3 shadow-xl shadow-black/30 md:min-w-[205px]"
            style={{
                borderColor: `${tone.accent}55`,
                boxShadow: `0 18px 42px rgba(0,0,0,0.34), 0 0 28px ${tone.glow}`,
            }}
        >
            <div className="flex items-center justify-between gap-3">
                <Badge
                    variant="outline"
                    className="border-violet-200/30 bg-violet-200/10 text-violet-100"
                >
                    {spectrumLabel}
                </Badge>
                <span className="text-xs font-semibold text-violet-100">
                    {formatMouseSkateRating(skate.ratings.speed)}
                </span>
            </div>

            <div className="relative mx-auto my-5 h-24">
                <MouseSkateDot
                    skate={skate}
                    size="lg"
                    className="absolute left-1/2 top-0 -translate-x-1/2"
                />
            </div>

            <IconTooltip label={skate.name}>
                <div
                    className="mx-auto mt-1 flex h-8 w-36 max-w-full items-center justify-center rounded-full px-3 text-center text-[11px] font-semibold text-slate-950"
                    style={{
                        background: `linear-gradient(90deg, ${visual.secondaryHex}, ${visual.primaryHex})`,
                        color: visual.textHex,
                    }}
                    tabIndex={0}
                >
                    <span className="truncate">{skate.name}</span>
                </div>
            </IconTooltip>

            <div className="mt-5 space-y-3">
                <SegmentRow
                    icon={Zap}
                    value={skate.ratings.speed}
                    tone={tone}
                    label="Speed"
                />
                <SegmentRow
                    icon={Crosshair}
                    value={skate.ratings.control}
                    tone={tone}
                    label="Control"
                />
                <SegmentRow
                    icon={Shield}
                    value={skate.ratings.stoppingPower}
                    tone={tone}
                    label="Stopping"
                />
                <SegmentRow
                    icon={Cog}
                    value={skate.ratings.durability}
                    tone={tone}
                    label="Durability"
                />
            </div>

            <div className="mt-4 border-t border-violet-200/10 pt-3">
                <p className="truncate text-xs text-violet-100/60">
                    {visual.colorName} ·{" "}
                    {formatMouseSkateMaterial(skate.material)}
                </p>
            </div>
        </article>
    );
}

function LegendItem({
    icon: Icon,
    label,
}: {
    icon: ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-violet-200" />
            <span>{label}</span>
        </div>
    );
}

function SegmentRow({
    icon: Icon,
    value,
    tone,
    label,
}: {
    icon: ComponentType<{ className?: string }>;
    value: number;
    tone: SpectrumTone;
    label: string;
}) {
    const activeSegments = Math.max(1, Math.round(value / 2.5));

    return (
        <IconTooltip label={`${label}: ${value}/10`}>
            <div className="flex items-center gap-3" tabIndex={0}>
                <Icon className="size-5 shrink-0 text-violet-200" />
                <div className="grid flex-1 grid-cols-4 gap-1.5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <span
                            key={index}
                            className="h-3 rounded-[4px]"
                            style={{
                                background:
                                    index < activeSegments
                                        ? `linear-gradient(90deg, ${tone.light}, ${tone.accent})`
                                        : "rgba(139, 124, 184, 0.18)",
                            }}
                        />
                    ))}
                </div>
            </div>
        </IconTooltip>
    );
}

type SpectrumTone = {
    accent: string;
    glow: string;
    light: string;
    skateTop: string;
    skateBottom: string;
};

function getSkateVisual(skate: MouseSkate, tone: SpectrumTone) {
    const visual = getMouseSkateVisual(skate);

    return {
        colorName: visual.colorName,
        primaryHex: skate.visual?.primaryHex ?? tone.skateBottom,
        secondaryHex: skate.visual?.secondaryHex ?? tone.skateTop,
        textHex: visual.textHex,
    };
}

function getSpectrumTone(index: number, total: number): SpectrumTone {
    const progress = total <= 1 ? 0 : index / (total - 1);

    if (progress < 0.2) {
        return {
            accent: "#ddd6fe",
            glow: "rgba(221, 214, 254, 0.24)",
            light: "#f5f3ff",
            skateTop: "#ffffff",
            skateBottom: "#c7c3d7",
        };
    }

    if (progress < 0.42) {
        return {
            accent: "#c4b5fd",
            glow: "rgba(196, 181, 253, 0.24)",
            light: "#ede9fe",
            skateTop: "#f7f4ff",
            skateBottom: "#b9b0ca",
        };
    }

    if (progress < 0.62) {
        return {
            accent: "#a855f7",
            glow: "rgba(168, 85, 247, 0.24)",
            light: "#c4b5fd",
            skateTop: "#aeb2bb",
            skateBottom: "#6b7280",
        };
    }

    if (progress < 0.82) {
        return {
            accent: "#7e22ce",
            glow: "rgba(126, 34, 206, 0.24)",
            light: "#a855f7",
            skateTop: "#191923",
            skateBottom: "#050508",
        };
    }

    return {
        accent: "#4c1d95",
        glow: "rgba(76, 29, 149, 0.28)",
        light: "#7e22ce",
        skateTop: "#2b2237",
        skateBottom: "#050507",
    };
}
