import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import { latestAddedMousepadSlugs } from "@/data/latest-added";
import {
  getAllMousepads,
  getMousepadBrandOptions,
  getMousepadCategoryOptions,
} from "@/lib/mousepads";
import { buildCollectionJsonLd, buildMetadata } from "@/lib/seo";
import type { MousepadCategory } from "@/types/mousepad";

const browseMousepads = getAllMousepads().filter(
    (mousepad) => mousepad.category !== "glass",
);

export const metadata: Metadata = buildMetadata({
    title: "Mousepad Database for FPS Games",
    description:
        "Browse FragBasic's mousepad database for FPS games, with cloth and hybrid pads sorted by speed, control, stopping power, surface feel, and India availability.",
    path: "/mousepads",
    keywords: [
        "mousepad reviews",
        "mousepad database",
        "cloth mousepads",
        "hybrid mousepads",
        "control mousepads",
        "speed mousepads",
        "best fps mousepads",
        "mousepads india",
    ],
});

type MousepadsPageProps = {
    searchParams?: Promise<{
        category?: string;
    }>;
};

export default async function MousepadsPage({ searchParams }: MousepadsPageProps) {
    const mousepads = browseMousepads;
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
            <section className="border-b border-border bg-background">
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
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

                        <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                            Browse pads by feel, surface, and India
                            availability.
                        </h1>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                <SiteSection>
                    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading mousepad filters...</div>}>
                        <MousepadBrowser
                            mousepads={mousepads}
                            brands={brands}
                            categories={categories}
                            initialCategory={initialCategory}
                            latestAddedSlugs={latestAddedMousepadSlugs}
                        />
                    </Suspense>
                </SiteSection>
            </section>
        </main>
    );
}
