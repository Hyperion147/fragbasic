import type { Metadata } from "next";
import { Suspense } from "react";
import { ComparisonBrowser } from "@/components/compare/comparison-browser";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getComparisonTagOptions } from "@/lib/comparisons";
import Link from "next/link";
import { ClientShareButton } from "@/components/ClientShareButton";
import { AiFaq } from "@/components/seo/ai-blocks";
import { mousepadCompareFaqs } from "@/lib/seo-content";
import {
    buildFaqJsonLd,
    buildMetadata,
    seoKeywords,
} from "@/lib/seo";
import { getPublicComparisons } from "@/server/catalog/comparisons";
import { getPublicPads } from "@/server/catalog/pads";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
    title: "Mousepad Comparisons: X vs Y Matchups",
    description:
        "Compare Artisan Zero vs LGG Saturn Pro, ATK Crimson vs Wallhack SP-005, and more FPS mousepad matchups across speed, control, and feel.",
    path: "/mousepads/compare",
    keywords: [
        ...seoKeywords.comparisons,
        ...seoKeywords.mousepads,
        ...seoKeywords.glasspads,
        ...seoKeywords.questions,
    ],
});

export default async function CompareIndexPage() {
    const [pads, publishedComparisons] = await Promise.all([
        getPublicPads(),
        getPublicComparisons(),
    ]);
    const padsBySlug = new Map(pads.map((pad) => [pad.slug, pad]));
    const comparisons = publishedComparisons
        .map((comparison) => {
            const left = padsBySlug.get(comparison.leftSlug);
            const right = padsBySlug.get(comparison.rightSlug);

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
            <JsonLd data={buildFaqJsonLd(mousepadCompareFaqs)} />
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

            <section className="page-section border-t border-border">
                <AiFaq items={mousepadCompareFaqs} />
            </section>
        </main>
    );
}
