import { ComparisonBrowser } from "@/components/compare/comparison-browser";
import { Badge } from "@/components/ui/badge";
import {
  getAllComparisons,
  getComparisonTagOptions,
} from "@/lib/comparisons";
import { getMousepadBySlug } from "@/lib/mousepads";

export default function CompareIndexPage() {
  const comparisons = getAllComparisons()
    .map((comparison) => {
      const left = getMousepadBySlug(comparison.leftSlug);
      const right = getMousepadBySlug(comparison.rightSlug);

      if (!left || !right) {
        return null;
      }

      return {
        comparison,
        left,
        right,
      };
    })
    .filter((entry) => entry !== null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,oklch(0.28_0.05_215/0.38),transparent_35%),linear-gradient(180deg,oklch(0.22_0.02_224),oklch(0.21_0.02_224))]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <Badge className="text-black">Compare mousepads</Badge>
              <Badge variant="outline">
                {comparisons.length} tracked matchups
              </Badge>
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
              Find the matchup that actually answers your buying question.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Browse every available comparison, then filter by tags like
              Control, Speed, Tracking, or Tac FPS to get to the matchup you
              actually care about.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <ComparisonBrowser
          comparisons={comparisons}
          tags={getComparisonTagOptions(
            comparisons.map((entry) => entry.comparison)
          )}
        />
      </section>
    </main>
  );
}
