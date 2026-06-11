import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatMousepadValue,
  getDefaultColorway,
  getMousepadFullName,
  getMousepadSpeedControlPosition,
  getSpeedControlZoneLabel,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
};

const zones = [
  { label: "Mud", start: 0, end: 16.7 },
  { label: "Control", start: 16.7, end: 33.4 },
  { label: "Balanced Control", start: 33.4, end: 50.1 },
  { label: "Balanced Speed", start: 50.1, end: 66.8 },
  { label: "Speed", start: 66.8, end: 83.5 },
  { label: "Glass", start: 83.5, end: 100 },
] as const;

export function MultiPositionChart({ mousepads }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">
          Speed-control position
        </CardTitle>
        <CardDescription>
          Each pad gets its own lane on a shared scale. Position uses category
          plus speed, so this reads closer to how the pad actually fits.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="overflow-hidden rounded-3xl bg-background/60">

          <div className="space-y-3">
            {mousepads.map((mousepad) => {
              const position = getMousepadSpeedControlPosition(mousepad);
              const color = getDefaultColorway(mousepad).color;
              const zoneLabel = getSpeedControlZoneLabel(position);

              return (
                <div
                  key={mousepad.slug}
                  className="grid gap-3 rounded-3xl border border-border bg-card/75 px-4 py-4 lg:grid-cols-[240px_1fr_140px]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="size-3 shrink-0 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                      <p className="truncate font-medium text-foreground">
                        {getMousepadFullName(mousepad)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {zoneLabel}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-10 overflow-hidden rounded-full border border-border bg-[linear-gradient(90deg,oklch(0.24_0.01_230/0.5),oklch(0.27_0.01_230/0.5),oklch(0.31_0.02_230/0.5),oklch(0.35_0.02_230/0.5),oklch(0.39_0.03_230/0.5),oklch(0.43_0.03_230/0.5))]">
                      {zones.slice(0, -1).map((zone) => (
                        <div
                          key={zone.label}
                          className="absolute top-0 bottom-0 w-px bg-border/70"
                          style={{ left: `${zone.end}%` }}
                        />
                      ))}

                      <div
                        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full opacity-70"
                        style={{
                          left: "2%",
                          width: `${Math.max(position - 2, 0)}%`,
                          backgroundColor: color,
                        }}
                      />

                      <div
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${position}%` }}
                      >
                        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1 shadow-md shadow-black/10">
                          <span
                            className="size-3 rounded-full border border-background"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs font-medium text-foreground">
                            {mousepad.feel.speed}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:text-[11px]">
                      {zones.map((zone) => (
                        <span key={zone.label} className="text-center">
                          {zone.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
                    <p className="text-xs text-muted-foreground">Readout</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {position.toFixed(1)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatMousepadValue(mousepad.category)} / speed{" "}
                      {mousepad.feel.speed}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
