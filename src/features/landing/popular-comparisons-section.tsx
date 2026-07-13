import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Flame, GitCompareArrows, Grid2X2, Star, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { IconTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { ComparisonPreview } from "@/features/landing/types";

type Props = {
    comparisons: ComparisonPreview[];
};

export function PopularComparisonsSection({ comparisons }: Props) {
    return (
        <section className="space-y-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-hover)] sm:text-xs sm:tracking-[0.36em]">
                        Popular comparisons
                    </p>
                    <h2 className="mt-3 max-w-4xl text-2xl font-semibold leading-tight tracking-tight sm:text-4xl md:mt-4 md:text-5xl">
                        <span className="sm:hidden">Popular matchups.</span>
                        <span className="hidden sm:inline">
                            See how top mousepads{" "}
                            <span className="text-[color:var(--brand-hover)]">stack up.</span>
                        </span>
                    </h2>
                    <p className="mt-3 hidden text-sm text-muted-foreground sm:block sm:text-base">
                        Real data. Side by side.
                    </p>
                </div>

                <Link
                    href="/mousepads/compare"
                    className="group hidden w-fit items-center gap-2 text-sm font-semibold text-[color:var(--brand-hover)] transition-colors hover:text-foreground sm:inline-flex"
                >
                    View all comparisons
                    <ArrowRight className="size-4 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/8 bg-white/8 sm:hidden">
                {comparisons.slice(0, 3).map((comparison) => (
                    <Link
                        key={comparison.slug}
                        href={`/mousepads/compare/${comparison.slug}`}
                        className="group flex min-h-40 min-w-0 flex-col bg-[#0d0d11] p-4"
                    >
                        <span className="w-fit rounded-full border border-brand-hover/30 px-2 py-1 text-[9px] font-semibold text-brand-hover">
                            VS
                        </span>
                        <div className="mt-auto space-y-1">
                            <p className="truncate text-sm font-semibold">{comparison.leftName}</p>
                            <p className="truncate text-sm font-semibold text-white/55">{comparison.rightName}</p>
                        </div>
                    </Link>
                ))}
                {comparisons.length < 2 ? (
                    <Link
                        href="/mousepads"
                        className="flex min-h-40 flex-col justify-between bg-[#17131f] p-4 text-white"
                    >
                        <Grid2X2 className="ml-auto size-5 text-brand-hover" />
                        <span className="max-w-[8ch] text-base font-semibold leading-tight">Browse pads</span>
                    </Link>
                ) : null}
                {comparisons.length < 3 ? (
                    <Link
                        href="/mousepads/compare/universal"
                        className="flex min-h-40 flex-col justify-between bg-[#17131f] p-4 text-white"
                    >
                        <GitCompareArrows className="ml-auto size-5 text-brand-hover" />
                        <span className="max-w-[8ch] text-base font-semibold leading-tight">Build a matchup</span>
                    </Link>
                ) : null}
                <Link
                    href="/mousepads/compare"
                    className="flex min-h-40 flex-col justify-between bg-brand p-4 text-white"
                >
                    <ArrowRight className="ml-auto size-5" />
                    <span className="max-w-[8ch] text-base font-semibold leading-tight">View all comparisons</span>
                </Link>
            </div>

            <div className="hidden gap-4 sm:grid lg:grid-cols-3">
                {comparisons.map((comparison, index) => (
                    <ComparisonCard
                        key={comparison.slug}
                        comparison={comparison}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}

function ComparisonCard({
    comparison,
    index,
}: {
    comparison: ComparisonPreview;
    index: number;
}) {
    const badge = cardBadges[index % cardBadges.length];
    const [leftTag = "Popular", rightTag = "Balanced"] = comparison.tags;
    const Icon = badge.icon;

    return (
        <Link
            href={`/mousepads/compare/${comparison.slug}`}
            className={cn(
                "group overflow-hidden rounded-lg bg-card/55 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_4%,transparent)] transition-colors hover:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--brand-hover)_20%,transparent),0_0_28px_color-mix(in_srgb,var(--brand-glow)_10%,transparent)]",
            )}
        >
            <div className="p-4 sm:p-5">
                <Badge
                    variant="outline"
                    className="h-7 gap-2 rounded-md border-border/90 bg-background/60 px-3 text-[11px]"
                >
                    <Icon className="size-3.5 text-[color:var(--brand-hover)]" />
                    {badge.label}
                </Badge>

                <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-6 sm:gap-3">
                    <ProductPreview
                        name={comparison.leftName}
                        image={comparison.leftImage}
                        color={comparison.leftColor}
                    />
                    <span className="flex size-9 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--brand-hover)_55%,transparent)] bg-background text-[11px] font-semibold shadow-[0_0_18px_color-mix(in_srgb,var(--brand-glow)_20%,transparent)] sm:size-10 sm:text-xs">
                        VS
                    </span>
                    <ProductPreview
                        name={comparison.rightName}
                        image={comparison.rightImage}
                        color={comparison.rightColor}
                    />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-5">
                    <MousepadName name={comparison.leftName} />
                    <MousepadName name={comparison.rightName} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-5">
                    <TagChip label={leftTag} active={index === 0} />
                    <TagChip label={rightTag} />
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 bg-background/36 px-4 py-4 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:px-5">
                <IconTooltip label="Opens the full comparison page with side-by-side feel, surface, and recommendation data.">
                    <span className="inline-flex cursor-help items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                        <BarChart3 className="size-4 text-foreground/72" />
                        View full stats
                    </span>
                </IconTooltip>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--brand-hover)] sm:text-sm">
                    Compare
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}

function ProductPreview({
    name,
    image,
    color,
}: {
    name: string;
    image: string;
    color: string;
}) {
    return (
        <div className="relative aspect-square overflow-hidden">
            <div
                className="absolute inset-x-5 top-8 bottom-4 rounded-full opacity-55 blur-2xl"
                style={{
                    background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
                }}
            />
            <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 1024px) 42vw, 12vw"
                className="object-contain p-4 drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] transition-transform duration-300"
            />
        </div>
    );
}

function MousepadName({ name }: { name: string }) {
    return (
        <p className="min-h-10 text-sm font-semibold leading-5 tracking-tight text-foreground sm:min-h-12 sm:text-base sm:leading-6">
            {name}
        </p>
    );
}

function TagChip({
    label,
    active = false,
}: {
    label: string;
    active?: boolean;
}) {
    return (
        <span
            className={cn(
                "w-fit rounded-md bg-background/45 px-2.5 py-1 text-xs text-muted-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_6%,transparent)]",
                active &&
                    "text-[color:var(--brand-hover)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand-hover)_45%,transparent)]",
            )}
        >
            {label}
        </span>
    );
}

const cardBadges = [
    {
        label: "Popular",
        icon: Flame,
    },
    {
        label: "Trending",
        icon: Zap,
    },
    {
        label: "Community Pick",
        icon: Star,
    },
] as const;
