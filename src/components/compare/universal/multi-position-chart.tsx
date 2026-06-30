import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SPEED_CONTROL_ZONES,
  MOUSEPAD_GRAPH_COLOR,
  formatFeelLabel,
  formatMousepadValue,
  getCalibratedFeelValue,
  getMousepadFullName,
  getMousepadSpeedControlPosition,
  getSpeedControlZoneLabel,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
};

export function MultiPositionChart({ mousepads }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
        <CardTitle className="panel-title">
          Glide lane
        </CardTitle>
        <CardDescription className="hidden sm:block">
          Left means more controlled and planted. Right means easier glide and
          faster movement. Glass sits far right because its hard surface changes
          the baseline feel.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 p-3 sm:space-y-6 sm:p-6">
        <div className="overflow-hidden rounded-md bg-background/60">

          <div className="space-y-2 sm:space-y-3">
            {mousepads.map((mousepad) => {
              const position = getMousepadSpeedControlPosition(mousepad);
              const color = MOUSEPAD_GRAPH_COLOR;
              const zoneLabel = getSpeedControlZoneLabel(position);

              return (
                <div
                  key={mousepad.slug}
                  className="grid gap-3 rounded-md border border-border bg-card/75 px-3 py-3 sm:px-4 sm:py-4 lg:grid-cols-[240px_1fr_140px]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="size-3 shrink-0 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                      <p className="truncate text-sm font-medium text-foreground sm:text-base">
                        {getMousepadFullName(mousepad)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      {zoneLabel}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-8 overflow-hidden rounded-full border border-border bg-[linear-gradient(90deg,oklch(0.24_0.01_230/0.5),oklch(0.27_0.01_230/0.5),oklch(0.31_0.02_230/0.5),oklch(0.35_0.02_230/0.5),oklch(0.39_0.03_230/0.5),oklch(0.43_0.03_230/0.5))] sm:h-10">
                      {SPEED_CONTROL_ZONES.slice(0, -1).map((zone) => (
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
                        <div className="flex items-center gap-1 rounded-full border border-border bg-background px-1.5 py-1 shadow-md shadow-black/10 sm:gap-2 sm:px-2">
                          <span
                            className="size-3 rounded-full border border-background"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[10px] font-medium text-foreground sm:text-xs">
                            {formatFeelLabel(
                              getCalibratedFeelValue(mousepad, "speed", "universal"),
                              "speed"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden grid-cols-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:grid md:text-[11px]">
                      {SPEED_CONTROL_ZONES.map((zone) => (
                        <span key={zone.label} className="text-center">
                          {zone.shortLabel}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden rounded-2xl border border-border bg-background/70 px-4 py-2 lg:block">
                    <p className="mt-1 text-base font-semibold leading-6 text-foreground">
                      {zoneLabel}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatMousepadValue(mousepad.category)} pad,{" "}
                      {formatFeelLabel(
                        getCalibratedFeelValue(mousepad, "speed", "universal"),
                        "speed"
                      )}{" "}
                      glide,{" "}
                      {formatFeelLabel(
                        getCalibratedFeelValue(mousepad, "control", "universal"),
                        "control"
                      )}{" "}
                      control
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
