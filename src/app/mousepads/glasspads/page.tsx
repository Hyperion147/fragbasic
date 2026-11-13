import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { MousepadBrowser } from "@/components/mousepads/mousepad-browser";
import { SiteSection } from "@/components/SiteSection";
import { AiFaq } from "@/components/seo/ai-blocks";
import { PopularSearches } from "@/components/seo/related-links";
import { glasspadFaqs, glasspadLinkGroups } from "@/lib/seo-content";
import {
  buildCollectionJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";
import { getPublicLatestAdded } from "@/server/catalog/latest-added";
import { getPublicGlasspads } from "@/server/catalog/pads";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Glass Mousepad Database & Reviews",
  description:
    "Compare glass mousepads by speed, control, surface finish, skate compatibility, and humidity resistance for VALORANT, CS2, and tracking FPS.",
  path: "/mousepads/glasspads",
  keywords: [
    ...seoKeywords.glasspads,
    ...seoKeywords.bestLists,
    ...seoKeywords.comparisons,
    ...seoKeywords.questions,
  ],
});

const glasspadExtraFaqs = glasspadFaqs.slice(3);

export default async function GlasspadsPage() {
  const [glasspads, latestAdded] = await Promise.all([
    getPublicGlasspads(),
    getPublicLatestAdded(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={buildCollectionJsonLd({
          name: "FragBasic Glass Mousepad Database",
          description:
            "Browse dedicated glass mousepads with fast surfaces, glass-specific tradeoffs, and FPS-focused buying notes.",
          path: "/mousepads/glasspads",
          itemCount: glasspads.length,
        })}
      />
      <JsonLd data={buildFaqJsonLd(glasspadFaqs)} />
      <section className="border-b border-border bg-background">
        <div className="page-hero">
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

            <h1 className="page-title mt-5">
              Browse dedicated glass mousepads in one place.
            </h1>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SiteSection>
          <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading glasspad filters...</div>}>
            <MousepadBrowser
              mousepads={glasspads}
              categories={[]}
              searchOnly
              latestAddedSlugs={latestAdded.glasspads}
            />
          </Suspense>
        </SiteSection>
      </section>

      <section className="page-section border-t border-border">
        <div className="max-w-4xl">
          <Badge variant="outline">Glasspad review notes</Badge>
          <h2 className="section-title mt-4">
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

      <section className="page-section border-t border-border">
        <SiteSection>
          <div className="space-y-6">
            <AiFaq items={glasspadExtraFaqs} />
            <PopularSearches
              title="Popular glasspad searches"
              description="Go from the glass-vs-cloth question to a specific review, matchup, or skate recommendation."
              groups={glasspadLinkGroups}
            />
          </div>
        </SiteSection>
      </section>
    </main>
  );
}
