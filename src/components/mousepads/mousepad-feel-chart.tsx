// components/mousepads/mousepad-feel-chart.tsx

"use client";

import {
    EvilRadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    Legend,
    Tooltip,
    Dot,
    ActiveDot,
} from "@/components/evilcharts/charts/radar-chart";

import {
    getMousepadChartColors,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    pad: Mousepad;
};

export function MousepadFeelChart({ pad }: Props) {
    const chartColors = getMousepadChartColors();
    const softVariant = pad.feelVariants?.find((variant) => variant.softness === "soft");
    const firmVariant = pad.feelVariants?.find((variant) => variant.softness === "firm");
    const metrics = [
        { metric: "Glide", key: "speed" },
        { metric: "Control", key: "control" },
        { metric: "Stopping", key: "stoppingPower" },
        { metric: "Start", key: "staticFriction" },
        { metric: "Glide drag", key: "dynamicFriction" },
        { metric: "Corrections", key: "microAdjustments" },
    ] as const;

    const data = metrics.map(({ metric, key }) => ({
        metric,
        value: !softVariant && !firmVariant ? pad.feel[key] : undefined,
        soft: softVariant ? softVariant.feel[key] : undefined,
        firm: firmVariant ? firmVariant.feel[key] : undefined,
    }));

    const chartConfig = {
        value: {
            label: pad.name,
            colors: {
                light: [chartColors.stroke],
            },
        },
        soft: {
            label: `${softVariant?.label ?? "Soft"} variant`,
            colors: {
                light: [chartColors.stroke],
            },
        },
        firm: {
            label: `${firmVariant?.label ?? "Firm"} variant`,
            colors: {
                light: ["#7dd3fc"],
            },
        },
    };

    return (
        <div>
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">Feel profile</p>

                <h2 className="panel-title">
                    How {pad.name} feels in-game
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    A native feel profile for glide speed, aim control,
                    stopping power, initial movement, moving glide, and small
                    corrections inside this pad&apos;s surface family.
                </p>
            </div>

            <EvilRadarChart
                data={data}
                config={chartConfig}
                className="mx-auto aspect-square max-h-105"
                chartProps={{
                    outerRadius: "72%",
                }}
            >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="metric" />
                <Tooltip variant="frosted-glass" />
                {softVariant || firmVariant ? (
                    <Legend variant="rounded-square-outline" />
                ) : null}

                {softVariant ? (
                    <Radar
                        dataKey="soft"
                        variant="filled"
                        fillOpacity={0.24}
                        radarProps={{
                            fill: chartColors.fill,
                            stroke: chartColors.stroke,
                        }}
                        isClickable={Boolean(firmVariant)}
                    >
                        <Dot variant="colored-border" />
                        <ActiveDot variant="default" />
                    </Radar>
                ) : null}

                {firmVariant ? (
                    <Radar
                        dataKey="firm"
                        variant={softVariant ? "lines" : "filled"}
                        fillOpacity={0.18}
                        radarProps={{
                            stroke: "#7dd3fc",
                        }}
                        isClickable={Boolean(softVariant)}
                    >
                        <Dot variant="colored-border" />
                        <ActiveDot variant="default" />
                    </Radar>
                ) : null}

                {!softVariant && !firmVariant ? (
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
                ) : null}
            </EvilRadarChart>

            {pad.feelVariants?.length ? (
                <div className="mt-4 border border-border bg-background/60 p-4">
                    <p className="text-sm font-medium text-foreground">
                        Variant note
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Different variants can shift glide, feedback, and stopping behavior even within the same pad family. The chart above reflects those variant-specific differences directly.
                    </p>
                    {pad.feelVariants
                        .filter((variant) => variant.notes)
                        .map((variant) => (
                            <p
                                key={`${variant.label}-${variant.softness}-note`}
                                className="mt-3 text-sm leading-6 text-muted-foreground"
                            >
                                <span className="font-medium text-foreground">
                                    {variant.label}:
                                </span>{" "}
                                {variant.notes}
                            </p>
                        ))}
                </div>
            ) : null}
        </div>
    );
}
