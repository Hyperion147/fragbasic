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
import { getDefaultColorway } from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
};

type EnvironmentChartRow = {
  metric: string;
} & Record<string, string | number>;

const environmentRows = [
  { label: "Humidity", key: "humidityResistance" },
  { label: "Sweat", key: "sweatResistance" },
  { label: "Dust / Hair", key: "dustHairResistance" },
] as const;

export function MultiEnvironmentChart({ mousepads }: Props) {
  const data: EnvironmentChartRow[] = environmentRows.map((row) => {
    const values = Object.fromEntries(
      mousepads.map((mousepad) => [mousepad.slug, mousepad.environment[row.key]])
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
      const color = getDefaultColorway(mousepad).color;

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
        <CardTitle className="text-2xl tracking-tight">
          Environment behavior
        </CardTitle>
        <CardDescription>
          Compare how the selected pads hold up against humidity, sweat, and
          dust or hair buildup.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <EvilRadarChart
          data={data}
          config={config}
          className="mx-auto aspect-square max-h-[30rem] bg-background/20 pb-8"
          chartProps={{ outerRadius: "72%" }}
        >
          <PolarGrid gridType="circle" />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
          <Legend isClickable />
          <Tooltip variant="frosted-glass" />

          {mousepads.map((mousepad) => {
            const color = getDefaultColorway(mousepad).color;

            return (
              <Radar
                key={mousepad.slug}
                dataKey={mousepad.slug}
                variant="lines"
                radarProps={{
                  stroke: color,
                  fill: color,
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
