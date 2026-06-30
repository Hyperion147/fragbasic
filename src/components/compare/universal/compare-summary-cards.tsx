import { MetricBar } from "@/components/data-display";
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
    <div className="overflow-x-auto bg-card/35 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <table className="data-table min-w-[760px]">
        <thead>
          <tr>
            <th>Signal</th>
            <th>Leader</th>
            <th>Score</th>
            <th>Read</th>
          </tr>
        </thead>
        <tbody>
      {resolvedItems.map((item) => {
        const winners = getWinningMousepads(mousepads, item.accessor);
        const leadValue = winners.length > 0 ? item.accessor(winners[0]) : 0;

        return (
          <tr key={item.key}>
            <td className="font-medium text-foreground">{item.label}</td>
            <td>
              <div className="flex flex-wrap gap-2">
                {winners.map((mousepad) => {
                  const color = getDefaultColorway(mousepad).color;

                  return (
                    <span
                      key={mousepad.slug}
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <span
                        className="size-2.5 shrink-0 border border-border"
                        style={{ backgroundColor: color }}
                      />
                      {getMousepadFullName(mousepad)}
                    </span>
                  );
                })}
              </div>
            </td>
            <td>
              <MetricBar value={leadValue} className="w-40" />
            </td>
            <td className="text-muted-foreground">
              {item.valueLabel(leadValue)}
              {useUniversalFeel && item.key === "speed" ? " feel" : ""}
            </td>
          </tr>
        );
      })}
        </tbody>
      </table>
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
