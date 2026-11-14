import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import { AiFaq } from "@/components/seo/ai-blocks";
import { PopularSearches } from "@/components/seo/related-links";
import {
  getMousepadBrandOptions,
  getMousepadCategoryOptions,
} from "@/lib/mousepads";
import { mousepadFaqs, mousepadLinkGroups } from "@/lib/seo-content";
import {
  buildCollectionJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";
import { getPublicLatestAdded } from "@/server/catalog/latest-added";
import { getPublicMousepads } from "@/server/catalog/pads";
import type { MousepadCategory } from "@/types/mousepad";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
    title: "Gaming Mousepad Database & Reviews",
    description:
        "Browse FPS mousepads — cloth, hybrid, control, and speed pads — by stopping power, humidity resistance, price, and India availability.",
    path: "/mousepads",
    keywords: [
        ...seoKeywords.mousepads,
        ...seoKeywords.bestLists,
        ...seoKeywords.games,
        ...seoKeywords.questions,
    ],
});

type MousepadsPageProps = {
    searchParams?: Promise<{
        category?: string;
    }>;
};

export default async function MousepadsPage({ searchParams }: MousepadsPageProps) {
    const [mousepads, latestAdded] = await Promise.all([
        getPublicMousepads(),
        getPublicLatestAdded(),
    ]);
    const params = searchParams ? await searchParams : undefined;
    const brands = getMousepadBrandOptions(mousepads);
    const categories = getMousepadCategoryOptions(mousepads);
    const initialCategory = categories.some(
        (option) => option.value === params?.category,
    )
        ? (params?.category as MousepadCategory)
        : undefined;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <JsonLd
                data={buildCollectionJsonLd({
                    name: "FragBasic Mousepad Database",
                    description:
                        "Browse FPS mousepads by speed, control, stopping power, surface feel, humidity resistance, and India availability.",
                    path: "/mousepads",
                    itemCount: mousepads.length,
                })}
            />
            <JsonLd data={buildFaqJsonLd(mousepadFaqs)} />
            <section className="border-b border-border bg-background">
                <div className="page-hero">
                    <div className="max-w-5xl">
                        <SiteBreadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Mousepads" },
                            ]}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">
                                Mousepad database
                            </Badge>
                            <Badge variant="outline">
                                {mousepads.length} models tracked
                            </Badge>
                        </div>

                        <h1 className="page-title mt-5">
                            Browse gaming mousepads by feel, surface, and India
                            availability.
                        </h1>
                    </div>
                </div>
            </section>

            <section className="page-section">
                <SiteSection>
                    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading mousepad filters...</div>}>
                        <MousepadBrowser
                            mousepads={mousepads}
                            brands={brands}
                            categories={categories}
                            initialCategory={initialCategory}
                            latestAddedSlugs={latestAdded.mousepads}
                        />
                    </Suspense>
                </SiteSection>
            </section>

            <section className="page-section border-t border-border">
                <SiteSection>
                    <div className="space-y-6">
                        <AiFaq items={mousepadFaqs} />
                        <PopularSearches
                            title="Popular mousepad searches"
                            description="Jump straight to the game, feel, review, or comparison you are looking for."
                            groups={mousepadLinkGroups}
                        />
                    </div>
                </SiteSection>
            </section>
        </main>
    );
}
