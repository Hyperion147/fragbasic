import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDefaultColorway,
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
}> = [
  { label: "Fastest", key: "speed", accessor: (mousepad) => mousepad.feel.speed },
  {
    label: "Most control",
    key: "control",
    accessor: (mousepad) => mousepad.feel.control,
  },
  {
    label: "Best stopping power",
    key: "stoppingPower",
    accessor: (mousepad) => mousepad.feel.stoppingPower,
  },
  {
    label: "Best humidity resistance",
    key: "humidityResistance",
    accessor: (mousepad) => mousepad.environment.humidityResistance,
  },
  {
    label: "Best micro-adjustments",
    key: "microAdjustments",
    accessor: (mousepad) => mousepad.feel.microAdjustments,
  },
];

export function CompareSummaryCards({ mousepads }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {summaryItems.map((item) => {
        const winners = getWinningMousepads(mousepads, item.accessor);
        const leadValue = winners.length > 0 ? item.accessor(winners[0]) : 0;

        return (
          <Card key={item.key} className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">{item.label}</CardTitle>
              <CardDescription>{leadValue}/10 lead score</CardDescription>
            </CardHeader>
            <CardContent>
              {winners.map((mousepad) => {
                const color = getDefaultColorway(mousepad).color;

                return (
                  <div
                    key={mousepad.slug}
                    className="flex items-center gap-2 rounded-2xl border border-border bg-background/80 p-3"
                  >
                    <span
                      className="size-3 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-sm font-medium text-foreground truncate">
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
