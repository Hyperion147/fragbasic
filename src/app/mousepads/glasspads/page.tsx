import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import { getAllMousepads } from "@/lib/mousepads";

export default function GlasspadsPage() {
  const glasspads = getAllMousepads().filter(
    (mousepad) => mousepad.category === "glass",
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-background">
        <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-sky-300 text-slate-950">Glasspads</Badge>
              <Badge variant="outline">
                {glasspads.length} model{glasspads.length === 1 ? "" : "s"} tracked
              </Badge>
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
              Browse dedicated glasspads in one place.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              Fast surfaces, glass-specific tradeoffs, and the current tracked
              lineup without mixing them into the cloth-first mousepad browser.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <SiteSection>
          <MousepadBrowser
            mousepads={glasspads}
            categories={[]}
            searchOnly
          />
        </SiteSection>
      </section>
    </main>
  );
}
