import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    formatFeelLabel,
    formatMousepadValue,
    getMousepadFullName,
} from "@/lib/mousepads";
import { cn } from "@/lib/utils";
import type { Mousepad } from "@/types/mousepad";

export function MousepadCard({
    pad,
    compact = false,
    isLatestAdded = false,
    featured = false,
}: {
    pad: Mousepad;
    compact?: boolean;
    isLatestAdded?: boolean;
    featured?: boolean;
}) {
    const glassFinishLabel =
        pad.category === "glass" && pad.glassSurfaceFinish
            ? pad.glassSurfaceFinish === "unknown"
                ? "Finish unknown"
                : `${formatMousepadValue(pad.glassSurfaceFinish)} glass`
            : null;

    if (featured) {
        return <FeaturedMousepadCard pad={pad} />;
    }

    return (
        <Link
            href={`/mousepads/${pad.slug}`}
            className={cn(compact ? "block" : "h-full")}
        >
            <Card
                className={cn(
                    "group bg-card/95 p-4 transition-all duration-200 hover:shadow-lg hover:shadow-black/10 sm:p-5",
                    compact ? "h-auto" : "h-full",
                )}
            >
                <div className="flex flex-wrap gap-2">
                    <Badge className="text-black">
                        {formatMousepadValue(pad.category)}
                    </Badge>
                    {isLatestAdded ? (
                        <Badge
                            variant="outline"
                            className="border-sky-300/70 bg-sky-200/10 text-sky-100"
                        >
                            Latest added
                        </Badge>
                    ) : null}
                    <Badge variant="outline">
                        {formatMousepadValue(pad.surface)}
                    </Badge>
                    {glassFinishLabel ? (
                        <Badge
                            variant="outline"
                            className="border-sky-300/70 bg-sky-200/10 text-sky-100"
                        >
                            {glassFinishLabel}
                        </Badge>
                    ) : null}
                    <Badge variant="outline">
                        {formatMousepadValue(pad.availability.india)} in India
                    </Badge>
                </div>

                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{pad.brand}</p>
                    <p className="panel-title text-foreground">{pad.name}</p>
                </div>

                <div
                    className={cn(
                        "relative rounded-md bg-card shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)]",
                        compact ? "aspect-[16/10]" : "aspect-4/3",
                    )}
                >
                    <Image
                        src={pad.images.main}
                        alt={getMousepadFullName(pad)}
                        fill
                        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 100vw"
                        className={cn(
                            "object-contain transition-transform duration-300 group-hover:scale-[1.03]",
                            compact ? "p-4" : "p-5",
                        )}
                    />
                </div>

                <div
                    className={cn(
                        "grid gap-2 sm:gap-3",
                        compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2",
                    )}
                >
                    <StatPill
                        label="Control"
                        value={formatFeelLabel(pad.feel.control, "control")}
                    />
                    <StatPill
                        label="Glide"
                        value={formatFeelLabel(pad.feel.speed, "speed")}
                    />
                    <StatPill
                        label="Stopping"
                        value={formatFeelLabel(
                            pad.feel.stoppingPower,
                            "stoppingPower",
                        )}
                    />
                    <StatPill
                        label="Corrections"
                        value={formatFeelLabel(
                            pad.feel.microAdjustments,
                            "microAdjustments",
                        )}
                    />
                </div>

                <div
                    className={cn(
                        "flex flex-col items-start justify-between gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-3",
                        compact ? "" : "mt-auto",
                    )}
                >
                    <span>{formatMousepadValue(pad.texture.feel)} feel</span>
                    <span className="inline-flex items-center gap-2 font-medium text-foreground">
                        View profile
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </Card>
        </Link>
    );
}

function FeaturedMousepadCard({ pad }: { pad: Mousepad }) {
    return (
        <Link href={`/mousepads/${pad.slug}`} className="group block">
            <Card className="overflow-hidden bg-card/95 inset-ring-2 inset-ring-violet-400/90 transition-shadow hover:shadow-lg hover:shadow-violet-500/10 sm:p-5">
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(100px,0.4fr)_minmax(220px,0.4fr)] md:items-center md:gap-6">
                    <div className="min-w-0 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">Latest review</Badge>
                            <Badge variant="outline">
                                {formatMousepadValue(pad.category)}
                            </Badge>
                            <Badge variant="outline">
                                {formatMousepadValue(pad.surface)}
                            </Badge>
                        </div>
                        <div>
                            <p className="mt-4 text-sm text-muted-foreground">
                                {pad.brand}
                            </p>
                            <h2 className="panel-title mt-1 text-2xl sm:text-3xl">
                                {pad.name}
                            </h2>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {pad.communityConsensus.summary}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-hover">
                            View latest review
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <StatPill
                            label="Control"
                            value={formatFeelLabel(pad.feel.control, "control")}
                        />
                        <StatPill
                            label="Glide"
                            value={formatFeelLabel(pad.feel.speed, "speed")}
                        />
                        <StatPill
                            label="Stop"
                            value={formatFeelLabel(
                                pad.feel.stoppingPower,
                                "stoppingPower",
                            )}
                        />
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-card shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
                        <Image
                            src={pad.images.main}
                            alt={getMousepadFullName(pad)}
                            fill
                            sizes="(min-width: 768px) 32vw, 100vw"
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                    </div>
                </div>
            </Card>
        </Link>
    );
}

function StatPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl soft-surface px-3 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.16em]">
                {label}
            </p>
            <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
                {value}
            </p>
        </div>
    );
}
