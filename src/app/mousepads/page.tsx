import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import {
  getAllMousepads,
  getMousepadCategoryOptions,
} from "@/lib/mousepads";
import type { MousepadCategory } from "@/types/mousepad";

type MousepadsPageProps = {
    searchParams?: Promise<{
        category?: string;
    }>;
};

export default async function MousepadsPage({ searchParams }: MousepadsPageProps) {
    const mousepads = getAllMousepads();
    const params = searchParams ? await searchParams : undefined;
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
                        categories={categories}
                        initialCategory={initialCategory}
                    />
                </SiteSection>
            </section>
        </main>
    );
}
