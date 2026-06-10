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
import type { Mousepad } from "@/types/mousepad";

type Props = {
    pad: Mousepad;
};

export function MousepadFeelChart({ pad }: Props) {
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
                light: ["var(--chart-right)"],
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
                    isClickable
                >
                    <Dot variant="colored-border" />
                    <ActiveDot variant="default" />
                </Radar>
            </EvilRadarChart>
        </Card>
    );
}
