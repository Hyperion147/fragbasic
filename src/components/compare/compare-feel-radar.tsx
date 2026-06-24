"use client";

import {
    EvilRadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    Tooltip,
    Legend,
    Dot,
    ActiveDot,
} from "@/components/evilcharts/charts/radar-chart";

import { Card } from "@/components/ui/card";
import {
    FEEL_METRICS,
    FEEL_SCALE_DESCRIPTIONS,
    FEEL_SCALE_LABELS,
    type FeelScaleMode,
    getCalibratedFeelValue,
    getFeaturedColorwaySlug,
    getFeelScaleModesForComparison,
    getMousepadChartColors,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    left: Mousepad;
    right: Mousepad;
};

export function CompareFeelRadar({ left, right }: Props) {
    const scaleModes = getFeelScaleModesForComparison([left, right]);

    return (
        <Card className="border-border bg-card p-5 md:p-6">
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">Feel profile</p>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Glide ratings with calibrated scale context
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {scaleModes.length > 1
                        ? "This matchup mixes glass and non-glass, so it shows both native surface-family ratings and a universal physical glide scale."
                        : FEEL_SCALE_DESCRIPTIONS.native}
                </p>
            </div>

            <div className={scaleModes.length > 1 ? "grid gap-5 xl:grid-cols-2" : ""}>
                {scaleModes.map((mode) => (
                    <ScaleRadar key={mode} left={left} right={right} mode={mode} />
                ))}
            </div>
        </Card>
    );
}

function ScaleRadar({
    left,
    right,
    mode,
}: {
    left: Mousepad;
    right: Mousepad;
    mode: FeelScaleMode;
}) {
    const leftChartColors = getMousepadChartColors(left, getFeaturedColorwaySlug(left));
    const rightChartColors = getMousepadChartColors(
        right,
        getFeaturedColorwaySlug(right)
    );
    const data = FEEL_METRICS.map((metric) => ({
        metric: metric.shortLabel,
        left: getCalibratedFeelValue(left, metric.key, mode),
        right: getCalibratedFeelValue(right, metric.key, mode),
    }));

    const chartConfig = {
        left: {
            label: left.name,
            colors: {
                light: [leftChartColors.stroke],
            },
        },

        right: {
            label: right.name,
            colors: {
                light: [rightChartColors.stroke],
            },
        },
    };

    return (
        <div className="rounded-3xl border border-border bg-background/45 p-4">
            <div className="mb-3">
                <h3 className="text-lg font-semibold tracking-tight">
                    {FEEL_SCALE_LABELS[mode]}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {FEEL_SCALE_DESCRIPTIONS[mode]}
                </p>
            </div>

            <EvilRadarChart
                data={data}
                config={chartConfig}
                className="mx-auto aspect-square max-h-100 pb-8"
                chartProps={{
                    outerRadius: "72%",
                }}
            >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="metric" />
                <Legend isClickable />
                <Tooltip variant="frosted-glass" />

                <Radar
                    dataKey="left"
                    variant="filled"
                    fillOpacity={0.25}
                    radarProps={{
                        fill: leftChartColors.fill,
                        stroke: leftChartColors.stroke,
                    }}
                    isClickable
                >
                    <Dot variant="colored-border" />
                    <ActiveDot variant="default" />
                </Radar>

                <Radar
                    dataKey="right"
                    variant="lines"
                    radarProps={{
                        stroke: rightChartColors.stroke,
                    }}
                    isClickable
                >
                    <Dot variant="colored-border" />
                    <ActiveDot variant="default" />
                </Radar>
            </EvilRadarChart>
        </div>
    );
}
