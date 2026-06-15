import type { Metadata } from "next";
import { ComparisonBrowser } from "@/components/compare/comparison-browser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    getComparisonTagOptions,
    getPublishedComparisons,
} from "@/lib/comparisons";
import { getMousepadBySlug } from "@/lib/mousepads";
import Link from "next/link";
import { ClientShareButton } from "@/components/ClientShareButton";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Mousepad Comparisons",
    description:
        "Read published mousepad comparisons and compare FPS pads side by side across speed, control, stopping power, and feel.",
    path: "/mousepads/compare",
    keywords: [
        "mousepad comparison",
        "artisan zero vs lgg saturn pro",
        "mousepad compare tool",
        "fps pad comparison",
    ],
});

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
            <section className="border-b border-border bg-background">
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10 flex items-end justify-between">
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
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/mousepads/compare/universal">Universal Compare</Link>
                            </Button>
                            <ClientShareButton href="/mousepads/compare" label="Share hub" />
                        </div>
                        <p className="text-sm text-muted-foreground">Compare up to 3 mousepads of your choice</p>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                <ComparisonBrowser
                    comparisons={comparisons}
                    tags={getComparisonTagOptions(
                        comparisons.map((entry) => entry.comparison),
                    )}
                />
            </section>
        </main>
    );
}
