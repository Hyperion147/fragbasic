import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatEnvironmentLabel,
  formatFeelLabel,
  getDefaultColorway,
  getCalibratedFeelValue,
  hasMixedFeelScaleFamilies,
  getMousepadFullName,
} from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  mousepads: Mousepad[];
};

type SummaryKey =
  | "speed"
  | "control"
  | "stoppingPower"
  | "microAdjustments"
  | "humidityResistance";

const summaryItems: Array<{
  label: string;
  key: SummaryKey;
  accessor: (mousepad: Mousepad) => number;
  valueLabel: (value: number) => string;
}> = [
  {
    label: "Easiest glide",
    key: "speed",
    accessor: (mousepad) => mousepad.feel.speed,
    valueLabel: (value) => formatFeelLabel(value, "speed"),
  },
  {
    label: "Most locked-in",
    key: "control",
    accessor: (mousepad) => mousepad.feel.control,
    valueLabel: (value) => formatFeelLabel(value, "control"),
  },
  {
    label: "Strongest stop",
    key: "stoppingPower",
    accessor: (mousepad) => mousepad.feel.stoppingPower,
    valueLabel: (value) => formatFeelLabel(value, "stoppingPower"),
  },
  {
    label: "Best humidity handling",
    key: "humidityResistance",
    accessor: (mousepad) => mousepad.environment.humidityResistance,
    valueLabel: formatEnvironmentLabel,
  },
  {
    label: "Easiest corrections",
    key: "microAdjustments",
    accessor: (mousepad) => mousepad.feel.microAdjustments,
    valueLabel: (value) => formatFeelLabel(value, "microAdjustments"),
  },
];

export function CompareSummaryCards({ mousepads }: Props) {
  const useUniversalFeel = hasMixedFeelScaleFamilies(mousepads);
  const resolvedItems = summaryItems.map((item) =>
    item.key === "speed" && useUniversalFeel
      ? {
          ...item,
          label: "Easiest overall glide",
          accessor: (mousepad: Mousepad) =>
            getCalibratedFeelValue(mousepad, "speed", "universal"),
        }
      : item
  );

  return (
    <div className="grid gap-2 md:gap-4 md:grid-cols-2 xl:grid-cols-5">
      {resolvedItems.map((item) => {
        const winners = getWinningMousepads(mousepads, item.accessor);
        const leadValue = winners.length > 0 ? item.accessor(winners[0]) : 0;

        return (
          <Card key={item.key} className="border-border bg-card/90">
            <CardHeader className="p-3 pb-2 sm:p-4">
              <CardTitle className="text-sm sm:text-base">{item.label}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Current leader: {item.valueLabel(leadValue)}
                {useUniversalFeel && item.key === "speed" ? " feel" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0">
              {winners.map((mousepad) => {
                const color = getDefaultColorway(mousepad).color;

                return (
                  <div
                    key={mousepad.slug}
                    className="flex items-center gap-2 rounded-lg border border-border bg-background/80 p-2 sm:rounded-2xl sm:p-3"
                  >
                    <span
                      className="size-3 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                      {getMousepadFullName(mousepad)}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function getWinningMousepads(
  mousepads: Mousepad[],
  accessor: (mousepad: Mousepad) => number
) {
  const highestValue = Math.max(...mousepads.map(accessor));

  return mousepads.filter((mousepad) => accessor(mousepad) === highestValue);
}
