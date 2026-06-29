import type { Metadata } from "next";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import { latestAddedGlasspadSlugs } from "@/data/latest-added";
import { getAllMousepads } from "@/lib/mousepads";
import { buildMetadata } from "@/lib/seo";

const glasspads = getAllMousepads().filter(
  (mousepad) => mousepad.category === "glass",
);

export const metadata: Metadata = buildMetadata({
  title: "Glass Mousepad Database",
  description:
    "Browse FragBasic's glass mousepad database with fast surfaces, glass-specific tradeoffs, and tracked models for competitive FPS players who want speed and consistency.",
  path: "/mousepads/glasspads",
  keywords: [
    "glasspads",
    "glass mousepads",
    "glass mousepad database",
    "wallhack sp-005 review",
    "tekkusai phantom",
    "best glasspads for fps",
    "best glass mousepads",
  ],
});

export default function GlasspadsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-background">
        <div className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Mousepads", href: "/mousepads" },
                { label: "Glasspads" },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-sky-300 text-slate-950">Glasspads</Badge>
              <Badge variant="outline">
                {glasspads.length} model{glasspads.length === 1 ? "" : "s"} tracked
              </Badge>
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
              Browse dedicated glass mousepads in one place.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              Fast surfaces, glass-specific tradeoffs, and the current tracked
              lineup without mixing them into the cloth-first mousepad browser.
              Useful when you want low-friction aiming, easier cleaning, and
              better humidity consistency.
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
            latestAddedSlugs={latestAddedGlasspadSlugs}
          />
        </SiteSection>
      </section>

      <section className="w-full border-t border-border px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <div className="max-w-4xl">
          <Badge variant="outline">Glasspad review notes</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            What to know before choosing a glasspad.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="border border-border bg-card/70 p-5">
            <h3 className="text-lg font-semibold">
              Are glasspads good for FPS games?
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Glasspads are strong for tracking-heavy FPS games because they
              offer very low friction, consistent glide, and excellent humidity
              resistance. Tactical FPS players should check whether they can
              handle the lower stopping power.
            </p>
          </article>

          <article className="border border-border bg-card/70 p-5">
            <h3 className="text-lg font-semibold">
              How are they different from cloth?
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Glass mousepads use a hard surface that stays fast and easy to
              clean. Cloth mousepads usually provide more natural stopping
              power, softness, and surface feedback under the hand.
            </p>
          </article>

          <article className="border border-border bg-card/70 p-5">
            <h3 className="text-lg font-semibold">
              Do glasspads need special skates?
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Glasspads work best with skates suited to hard surfaces. Skate
              choice changes speed, noise, stopping power, and comfort more
              noticeably than it does on many cloth pads.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
