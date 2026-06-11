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

import {
    getFeaturedColorwaySlug,
    getMousepadChartColors,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    left: Mousepad;
    right: Mousepad;
};

export function CompareFeelRadar({ left, right }: Props) {
    const leftChartColors = getMousepadChartColors(left, getFeaturedColorwaySlug(left));
    const rightChartColors = getMousepadChartColors(
        right,
        getFeaturedColorwaySlug(right)
    );
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
        <EvilRadarChart
            data={data}
            config={chartConfig}
            className="mx-auto aspect-square max-h-100 bg-card/90 pb-8"
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
    );
}
