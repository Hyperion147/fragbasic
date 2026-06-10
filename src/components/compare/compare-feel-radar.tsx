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
import type { Mousepad } from "@/types/mousepad";

type Props = {
    left: Mousepad;
    right: Mousepad;
};

export function CompareFeelRadar({ left, right }: Props) {
    const data = [
        {
            metric: "Speed",
            left: left.feel.speed,
            right: right.feel.speed,
        },
        {
            metric: "Control",
            left: left.feel.control,
            right: right.feel.control,
        },
        {
            metric: "Stopping",
            left: left.feel.stoppingPower,
            right: right.feel.stoppingPower,
        },
        {
            metric: "Static",
            left: left.feel.staticFriction,
            right: right.feel.staticFriction,
        },
        {
            metric: "Dynamic",
            left: left.feel.dynamicFriction,
            right: right.feel.dynamicFriction,
        },
        {
            metric: "Micro",
            left: left.feel.microAdjustments,
            right: right.feel.microAdjustments,
        },
    ];

    const chartConfig = {
        left: {
            label: left.name,
            colors: {
                light: ["var(--chart-left)"],
            },
        },

        right: {
            label: right.name,
            colors: {
                light: ["var(--chart-right)"],
            },
        },
    };

    return (
        <Card className="border-border bg-card p-5 md:p-6">
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                    Radar comparison
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Feel profile overlap
                </h2>
            </div>

            <EvilRadarChart
                data={data}
                config={chartConfig}
                className="mx-auto aspect-square max-h-[460px]"
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
                    fillOpacity={0.22}
                    isClickable
                >
                    <Dot variant="colored-border" />
                    <ActiveDot variant="default" />
                </Radar>

                <Radar dataKey="right" variant="lines" isClickable>
                    <Dot variant="colored-border" />
                    <ActiveDot variant="default" />
                </Radar>
            </EvilRadarChart>
        </Card>
    );
}
