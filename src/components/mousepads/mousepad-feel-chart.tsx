// components/mousepads/mousepad-feel-chart.tsx

"use client";

import {
    EvilRadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    Tooltip,
    Dot,
    ActiveDot,
} from "@/components/evilcharts/charts/radar-chart";

import { Card } from "@/components/ui/card";
import {
    getFeaturedColorwaySlug,
    getMousepadChartColors,
} from "@/lib/mousepads";
import { formatValue } from "@/lib/utils/format";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    pad: Mousepad;
};

export function MousepadFeelChart({ pad }: Props) {
    const chartColors = getMousepadChartColors(
        pad,
        getFeaturedColorwaySlug(pad)
    );
    const data = [
        {
            metric: "Speed",
            value: pad.feel.speed,
        },
        {
            metric: "Control",
            value: pad.feel.control,
        },
        {
            metric: "Stopping",
            value: pad.feel.stoppingPower,
        },
        {
            metric: "Static",
            value: pad.feel.staticFriction,
        },
        {
            metric: "Dynamic",
            value: pad.feel.dynamicFriction,
        },
        {
            metric: "Micro",
            value: pad.feel.microAdjustments,
        },
    ];

    const chartConfig = {
        value: {
            label: pad.name,
            colors: {
                light: [chartColors.stroke],
            },
        },
    };

    return (
        <Card className="border-border bg-card p-5 md:p-6">
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">Feel profile</p>

                <h2 className="text-2xl font-semibold tracking-tight">
                    How {pad.name} feels in-game
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    A 1-10 profile for speed, control, stopping power, static
                    friction, dynamic glide, and micro-adjustment freedom.
                </p>
            </div>

            <EvilRadarChart
                data={data}
                config={chartConfig}
                className="mx-auto aspect-square max-h-[420px]"
                chartProps={{
                    outerRadius: "72%",
                }}
            >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="metric" />
                <Tooltip variant="frosted-glass" />

                <Radar
                    dataKey="value"
                    variant="filled"
                    fillOpacity={0.24}
                    radarProps={{
                        fill: chartColors.fill,
                        stroke: chartColors.stroke,
                    }}
                    isClickable
                >
                    <Dot variant="colored-border" />
                    <ActiveDot variant="default" />
                </Radar>
            </EvilRadarChart>

            {pad.feelVariants?.length ? (
                <div className="mt-6 space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Variant feel values</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            Soft and firm bases can shift glide, feedback, and stopping behavior even within the same pad family.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {pad.feelVariants.map((variant) => (
                            <div
                                key={`${variant.softness}-${variant.label}`}
                                className="rounded-2xl border border-border bg-background/70 p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-base font-semibold text-foreground">
                                            {variant.label} variant
                                        </p>
                                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                            {variant.softness} base
                                        </p>
                                    </div>

                                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                        {formatValue(variant.feel.ratingConfidence)}
                                    </p>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <VariantStat label="Speed" value={variant.feel.speed} />
                                    <VariantStat label="Control" value={variant.feel.control} />
                                    <VariantStat label="Stopping" value={variant.feel.stoppingPower} />
                                    <VariantStat label="Static" value={variant.feel.staticFriction} />
                                    <VariantStat label="Dynamic" value={variant.feel.dynamicFriction} />
                                    <VariantStat label="Micro" value={variant.feel.microAdjustments} />
                                </div>

                                {variant.notes ? (
                                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                        {variant.notes}
                                    </p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </Card>
    );
}

function VariantStat({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-border bg-card/80 px-3 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
        </div>
    );
}
