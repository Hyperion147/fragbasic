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
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">Feel breakdown</CardTitle>
        <CardDescription>
          {scaleModes.length > 1
            ? "Use same-surface feel for pads from the same material family, and cross-surface feel when glass and cloth are in the same set."
            : "Compare the parts of feel that matter in-game: glide, control, stop, start feel, moving friction, and small corrections."}
        </CardDescription>
      </CardHeader>

      <CardContent className={scaleModes.length > 1 ? "grid gap-5 xl:grid-cols-2" : ""}>
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
    <div className="rounded-3xl border border-border bg-background/35 p-4">
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
          config={config}
          className="mx-auto aspect-square max-h-[36rem] pb-8"
          chartProps={{ outerRadius: "72%" }}
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
