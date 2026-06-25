import type { Metadata } from "next";
import { ComparisonBrowser } from "@/components/compare/comparison-browser";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
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
    title: "Mousepad Comparisons and Side-by-Side Matchups",
    description:
        "Read published mousepad comparisons and compare FPS pads side by side across speed, control, stopping power, glide feel, and game fit.",
    path: "/mousepads/compare",
    keywords: [
        "mousepad comparison",
        "artisan zero vs lgg saturn pro",
        "mousepad compare tool",
        "fps pad comparison",
        "mousepad vs mousepad",
        "compare mousepads side by side",
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
                        <SiteBreadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Mousepads", href: "/mousepads" },
                                { label: "Compare" },
                            ]}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">
                                Compare mousepads
                            </Badge>
                            <Badge variant="outline">
                                {comparisons.length} published matchup
                                {comparisons.length === 1 ? "" : "s"}
                            </Badge>
                        </div>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                            Compare mousepads side by side.
                        </h1>
                        <p className="mt-4 rounded-lg border border-sky-300/40 bg-sky-400/10 px-4 py-3 text-sm leading-6 text-sky-100">
                            Note: Glasspad and mousepad ratings use different
                            feel scales. Treat these numbers as comparison
                            values, not absolute product ratings.
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/mousepads/compare/universal">
                                    Universal Compare
                                </Link>
                            </Button>
                            <ClientShareButton
                                href="/mousepads/compare"
                                label="Share hub"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Compare up to 3 mousepads of your choice
                        </p>
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
