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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FEEL_METRICS,
  FEEL_SCALE_DESCRIPTIONS,
  FEEL_SCALE_LABELS,
  type FeelScaleMode,
  getCalibratedFeelValue,
  getFeelScaleModesForComparison,
  getMousepadChartColors,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
};

type FeelChartRow = {
  metric: string;
} & Record<string, string | number>;

export function MultiFeelChart({ mousepads }: Props) {
  const scaleModes = getFeelScaleModesForComparison(mousepads);
  const config = getChartConfig(mousepads);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
        <CardTitle className="text-lg tracking-tight sm:text-2xl">Feel breakdown</CardTitle>
      </CardHeader>

      <CardContent className={scaleModes.length > 1 ? "grid gap-3 p-3 sm:gap-5 sm:p-6 xl:grid-cols-2" : "p-3 sm:p-6"}>
        {scaleModes.map((mode) => (
          <ScaleRadar
            key={mode}
            mousepads={mousepads}
            config={config}
            mode={mode}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function ScaleRadar({
  mousepads,
  config,
  mode,
}: {
  mousepads: Mousepad[];
  config: Record<string, { label: string; colors: { light: string[] } }>;
  mode: FeelScaleMode;
}) {
  const data: FeelChartRow[] = FEEL_METRICS.map((row) => {
    const values = Object.fromEntries(
      mousepads.map((mousepad) => [
        mousepad.slug,
        getCalibratedFeelValue(mousepad, row.key, mode),
      ])
    );

    return {
      metric: row.shortLabel,
      ...values,
    };
  });

  return (
    <div className="rounded-xl border border-border bg-background/35 p-3 sm:rounded-3xl sm:p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
          {FEEL_SCALE_LABELS[mode]}
        </h3>
        <p className="mt-1 hidden text-sm leading-6 text-muted-foreground sm:block">
          {FEEL_SCALE_DESCRIPTIONS[mode]}
        </p>
      </div>
        <EvilRadarChart
          data={data}
          config={config}
          className="mx-auto aspect-square max-h-[22rem] pb-4 sm:max-h-[36rem] sm:pb-8"
          chartProps={{ outerRadius: "68%" }}
        >
          <PolarGrid gridType="circle" />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
          <Legend isClickable />
          <Tooltip variant="frosted-glass" />

          {mousepads.map((mousepad, index) => {
            const chartColors = getMousepadChartColors();

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
    </div>
  );
}

function getChartConfig(mousepads: Mousepad[]) {
  return Object.fromEntries(
    mousepads.map((mousepad) => {
      const color = getMousepadChartColors().stroke;

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
}
