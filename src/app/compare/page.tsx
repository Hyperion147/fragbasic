import { ComparisonBrowser } from "@/components/compare/comparison-browser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    getComparisonTagOptions,
    getPublishedComparisons,
} from "@/lib/comparisons";
import { getMousepadBySlug } from "@/lib/mousepads";
import Link from "next/link";

export default function CompareIndexPage() {
    const comparisons = getPublishedComparisons()
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
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex items-end justify-between">
                    <div className="max-w-3xl">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">
                                Compare mousepads
                            </Badge>
                            <Badge variant="outline">
                                {comparisons.length} published matchup
                                {comparisons.length === 1 ? "" : "s"}
                            </Badge>
                        </div>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                            Popular head-to-head comparisons
                        </h2>
                    </div>
                    <div className="items-center gap-2 flex flex-col items-end">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/compare/universal">Universal Compare</Link>
                        </Button>
                        <p>Compare upto 3 mousepads of your choice</p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
                <div className="max-w-7xl">
                    <ComparisonBrowser
                        comparisons={comparisons}
                        tags={getComparisonTagOptions(
                            comparisons.map((entry) => entry.comparison),
                        )}
                    />
                </div>
            </section>
        </main>
    );
}
