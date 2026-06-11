"use client";

import {
  ActiveDot,
  Dot,
  EvilRadarChart,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "@/components/evilcharts/charts/radar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMousepadChartColors } from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
};

type FeelChartRow = {
  metric: string;
} & Record<string, string | number>;

const feelRows = [
  { label: "Speed", key: "speed" },
  { label: "Control", key: "control" },
  { label: "Stopping", key: "stoppingPower" },
  { label: "Static", key: "staticFriction" },
  { label: "Dynamic", key: "dynamicFriction" },
  { label: "Micro", key: "microAdjustments" },
] as const;

export function MultiFeelChart({ mousepads }: Props) {
  const data: FeelChartRow[] = feelRows.map((row) => {
    const values = Object.fromEntries(
      mousepads.map((mousepad) => [mousepad.slug, mousepad.feel[row.key]])
    );

    return {
      metric: row.label,
      ...values,
    };
  });

  const config: Record<
    string,
    { label: string; colors: { light: string[] } }
  > = Object.fromEntries(
    mousepads.map((mousepad) => {
      const color = getMousepadChartColors(mousepad).stroke;

      return [
        mousepad.slug,
        {
          label: mousepad.name,
          colors: {
            light: [color],
          },
        },
      ];
    })
  );

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">Feel profile</CardTitle>
        <CardDescription>
          Compare core glide behavior across speed, control, stopping power,
          friction, and micro-adjustment freedom.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <EvilRadarChart
          data={data}
          config={config}
          className="mx-auto aspect-square max-h-[36rem] bg-background/20 pb-8"
          chartProps={{ outerRadius: "72%" }}
        >
          <PolarGrid gridType="circle" />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
          <Legend isClickable />
          <Tooltip variant="frosted-glass" />

          {mousepads.map((mousepad, index) => {
            const chartColors = getMousepadChartColors(mousepad);

            return (
              <Radar
                key={mousepad.slug}
                dataKey={mousepad.slug}
                variant="filled"
                fillOpacity={index === 0 ? 0.18 : 0.1}
                radarProps={{
                  stroke: chartColors.stroke,
                  fill: chartColors.fill,
                }}
                isClickable
              >
                <Dot variant="colored-border" />
                <ActiveDot variant="default" />
              </Radar>
            );
          })}
        </EvilRadarChart>
      </CardContent>
    </Card>
  );
}
