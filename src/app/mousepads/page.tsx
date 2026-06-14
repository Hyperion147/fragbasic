import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import {
  getAllMousepads,
  getMousepadBrandOptions,
  getMousepadCategoryOptions,
} from "@/lib/mousepads";
import { buildMetadata } from "@/lib/seo";
import type { MousepadCategory } from "@/types/mousepad";

const browseMousepads = getAllMousepads().filter(
    (mousepad) => mousepad.category !== "glass",
);

export const metadata: Metadata = buildMetadata({
    title: "Mousepad Database",
    description:
        "Browse FragBasic's mousepad database for cloth and hybrid FPS pads by feel, speed, control, stopping power, and India availability.",
    path: "/mousepads",
    keywords: [
        "mousepad reviews",
        "mousepad database",
        "cloth mousepads",
        "control mousepads",
        "speed mousepads",
    ],
    images: browseMousepads.map((mousepad) => mousepad.images.main),
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
            <section className="border-b border-border bg-background">
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                    <div className="max-w-5xl">
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
                    <MousepadBrowser
                        mousepads={mousepads}
                        brands={brands}
                        categories={categories}
                        initialCategory={initialCategory}
                    />
                </SiteSection>
            </section>
        </main>
    );
}
