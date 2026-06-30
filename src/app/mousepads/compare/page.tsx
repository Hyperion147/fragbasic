import type { Metadata } from "next";
import { Suspense } from "react";
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
                <div className="page-hero flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
                        <h1 className="page-title-compact mt-4">
                            Compare mousepads side by side.
                        </h1>
                        <p className="mt-4 rounded-lg border border-sky-300/40 bg-sky-400/10 px-4 py-3 text-sm leading-6 text-sky-100">
                            Note: Feel labels are relative to other pads in the
                            database. Mouse skates, humidity, wear, and surface
                            type can change how a pad feels on your desk.
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
                                iconOnly
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Compare up to 3 mousepads of your choice
                        </p>
                    </div>
                </div>
            </section>

            <section className="page-section">
                <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading comparison filters...</div>}>
                    <ComparisonBrowser
                        comparisons={comparisons}
                        tags={getComparisonTagOptions(
                            comparisons.map((entry) => entry.comparison),
                        )}
                    />
                </Suspense>
            </section>
        </main>
    );
}
