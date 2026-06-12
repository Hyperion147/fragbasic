import { ComparisonCard } from "@/components/compare/comparison-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MousepadComparison } from "@/data/comparisons";
import type { Mousepad } from "@/types/mousepad";

type Entry = {
  comparison: MousepadComparison;
  left: Mousepad;
  right: Mousepad;
};

type Props = {
  comparisons: Entry[];
  brandName: string;
};

export function BrandComparisons({ comparisons, brandName }: Props) {
  return (
    <section className="space-y-4">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight">
          Popular comparisons
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Published matchups involving {brandName}, with same-brand battles
          surfaced ahead of cross-brand comparisons.
        </p>
      </div>

      {comparisons.length > 0 ? (
        <div className="grid gap-4">
          {comparisons.map(({ comparison, left, right }) => (
            <ComparisonCard
              key={comparison.slug}
              comparison={comparison}
              left={left}
              right={right}
            />
          ))}
        </div>
      ) : (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl tracking-tight">
              No published comparisons yet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This brand does not have a published comparison entry yet, but
              the mousepads are still available in the broader compare tools.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
