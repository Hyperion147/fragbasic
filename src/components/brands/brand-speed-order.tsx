import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function BrandSpeedOrder({ mousepads }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">
          Speed-control order
        </CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          Ordered from slower, more planted pads to faster, freer options using
          the same category-plus-speed position logic from the compare tools.
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {mousepads.map((mousepad, index) => {
          const position = getMousepadSpeedControlPosition(mousepad);
          const color = getDefaultColorway(mousepad).color;

          return (
            <div
              key={mousepad.slug}
              className="grid gap-4 rounded-3xl border border-border bg-background/70 p-4 lg:grid-cols-[56px_240px_1fr_140px]"
            >
              <div className="rounded-2xl border border-border bg-card px-3 py-3 text-center">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Rank
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {index + 1}
                </p>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    className="size-3 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                  <p className="truncate font-medium text-foreground">
                    {getMousepadFullName(mousepad)}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {getSpeedControlZoneLabel(position)} /{" "}
                  {formatMousepadValue(mousepad.category)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="relative h-4 overflow-hidden rounded-full border border-border bg-[linear-gradient(90deg,oklch(0.24_0.01_230/0.65),oklch(0.28_0.01_230/0.65),oklch(0.31_0.02_230/0.65),oklch(0.35_0.02_230/0.65),oklch(0.39_0.03_230/0.65),oklch(0.43_0.03_230/0.65))]">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                      width: `${position}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <div className="grid grid-cols-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>Mud</span>
                  <span className="text-center">Control</span>
                  <span className="text-center">Bal Ctrl</span>
                  <span className="text-center">Bal Spd</span>
                  <span className="text-center">Speed</span>
                  <span className="text-right">Glass</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card px-4 py-3">
                <p className="text-xs text-muted-foreground">Readout</p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {position.toFixed(1)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {mousepad.feel.speed}/10 speed
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
