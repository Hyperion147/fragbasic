import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMousepadValue } from "@/lib/mousepads";
import type { BrandSlug } from "@/lib/brands";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  brand: {
    slug: BrandSlug;
    name: string;
  };
  summary: string;
  controlAverage: number;
  speedAverage: number;
  availableInIndiaCount: number;
  strongestCategory: Mousepad["category"];
  cheapestPad: Mousepad;
  totalPads: number;
};

export function BrandOverview({
  brand,
  summary,
  controlAverage,
  speedAverage,
  availableInIndiaCount,
  strongestCategory,
  cheapestPad,
  totalPads,
}: Props) {
  return (
    <section className="border-b border-border bg-background">
      <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <Badge className="text-black">{brand.name}</Badge>
            <Badge variant="outline">
              {totalPads} model{totalPads === 1 ? "" : "s"} tracked
            </Badge>
          </div>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
            {brand.name} mousepads
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {summary}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewStat
            label="Average control"
            value={`${controlAverage}/10`}
            note="Lineup-wide feel"
          />
          <OverviewStat
            label="Average speed"
            value={`${speedAverage}/10`}
            note="Across tracked pads"
          />
          <OverviewStat
            label="India-friendly options"
            value={`${availableInIndiaCount}/${totalPads}`}
            note="Available or limited"
          />
          <OverviewStat
            label="Best entry point"
            value={cheapestPad.name}
            note={formatValueLine(
              formatMousepadValue(strongestCategory),
              cheapestPad.price.inr
                ? `Rs ${cheapestPad.price.inr.toLocaleString("en-IN")}`
                : "Price varies"
            )}
          />
        </div>
      </div>
    </section>
  );
}

function OverviewStat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}

function formatValueLine(left: string, right: string) {
  return `${left} lean / ${right}`;
}
