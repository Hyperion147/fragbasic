import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import {
  getAllMousepads,
  getMousepadBrandOptions,
} from "@/lib/mousepads";

export default function MousepadsPage() {
    const mousepads = getAllMousepads();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="border-b border-border  bg-[radial-gradient(circle_at_top_left,oklch(0.28_0.05_215/0.38),transparent_35%),linear-gradient(180deg,oklch(0.22_0.02_224),oklch(0.21_0.02_224))]">
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
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

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <MousepadBrowser
          mousepads={mousepads}
          brands={getMousepadBrandOptions(mousepads)}
        />
      </section>
        </main>
    );
}
