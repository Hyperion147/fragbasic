import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import {
  getAllMousepads,
  getMousepadBrandOptions,
  getMousepadCategoryOptions,
} from "@/lib/mousepads";

export default function MousepadsPage() {
    const mousepads = getAllMousepads();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border bg-background">
                <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
                    <div className="max-w-4xl">
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
                        brands={getMousepadBrandOptions(mousepads)}
                        categories={getMousepadCategoryOptions(mousepads)}
                    />
                </SiteSection>
            </section>
        </main>
    );
}
