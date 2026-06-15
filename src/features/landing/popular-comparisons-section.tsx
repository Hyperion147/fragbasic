import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Flame, Star, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
                    <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[color:var(--brand-hover)]">
                        Popular comparisons
                    </p>
                    <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                        See how top mousepads{" "}
                        <span className="text-[color:var(--brand-hover)]">
                            stack up.
                        </span>
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        Real data. Side by side.
                    </p>
                </div>

                <Link
                    href="/mousepads/compare"
                    className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[color:var(--brand-hover)] transition-colors hover:text-foreground"
                >
                    View all comparisons
                    <ArrowRight className="size-4 transition-transform" />
                </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
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
                "group overflow-hidden rounded-xl border border-border bg-card/55 transition-colors hover:border-[color:color-mix(in_srgb,var(--brand-hover)_58%,transparent)] hover:shadow-[0_0_28px_color-mix(in_srgb,var(--brand-glow)_12%,transparent)]",
            )}
        >
            <div className="p-5">
                <Badge
                    variant="outline"
                    className="h-7 gap-2 rounded-md border-border/90 bg-background/60 px-3 text-[11px]"
                >
                    <Icon className="size-3.5 text-[color:var(--brand-hover)]" />
                    {badge.label}
                </Badge>

                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <ProductPreview
                        name={comparison.leftName}
                        image={comparison.leftImage}
                        color={comparison.leftColor}
                    />
                    <span className="flex size-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--brand-hover)_55%,transparent)] bg-background text-xs font-semibold shadow-[0_0_18px_color-mix(in_srgb,var(--brand-glow)_20%,transparent)]">
                        VS
                    </span>
                    <ProductPreview
                        name={comparison.rightName}
                        image={comparison.rightImage}
                        color={comparison.rightColor}
                    />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5">
                    <MousepadName name={comparison.leftName} />
                    <MousepadName name={comparison.rightName} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5">
                    <TagChip label={leftTag} active={index === 0} />
                    <TagChip label={rightTag} />
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-border bg-background/36 px-5 py-4">
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="size-4 text-foreground/72" />
                    View full stats
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-hover)]">
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
        <h3 className="min-h-12 text-base font-semibold leading-6 tracking-tight text-foreground">
            {name}
        </h3>
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
                "w-fit rounded-md border border-border bg-background/45 px-2.5 py-1 text-xs text-muted-foreground",
                active &&
                    "border-[color:color-mix(in_srgb,var(--brand-hover)_55%,transparent)] text-[color:var(--brand-hover)]",
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
