import type { Metadata } from "next";
import { Suspense } from "react";

import { JsonLd } from "@/components/json-ld";
import { IemBrowser } from "@/components/iems/iem-browser";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { SiteSection } from "@/components/SiteSection";
import { Badge } from "@/components/ui/badge";
import { AiFaq } from "@/components/seo/ai-blocks";
import { PopularSearches } from "@/components/seo/related-links";
import { getPublicIems } from "@/server/catalog/iems";
import { getPublicLatestAdded } from "@/server/catalog/latest-added";
import { iemFaqs, iemLinkGroups } from "@/lib/seo-content";
import {
  buildCollectionJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Gaming IEM Database for FPS",
  description:
    "Browse gaming IEMs ranked by imaging, clarity, soundstage, comfort, tuning, and value. Find the best IEMs for VALORANT, CS2, and footsteps.",
  path: "/iems",
  keywords: [
    ...seoKeywords.iems,
    ...seoKeywords.games,
    ...seoKeywords.questions,
  ],
});

export default async function IemsPage() {
  const [iems, latestAdded] = await Promise.all([
    getPublicIems(),
    getPublicLatestAdded(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={buildCollectionJsonLd({
          name: "FragBasic IEM Database",
          description:
            "Browse gaming IEMs by imaging, clarity, soundstage, comfort, tuning, value, and India buying notes.",
          path: "/iems",
          itemCount: iems.length,
        })}
      />
      <JsonLd data={buildFaqJsonLd(iemFaqs)} />
      <section className="relative overflow-hidden border-b border-border bg-background">

        <div className="page-hero relative">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "IEMs" },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="text-black">IEM database</Badge>
              <Badge variant="outline">{iems.length} IEMs tracked</Badge>
              <Badge variant="outline">FPS focused</Badge>
            </div>

            <h1 className="page-title mt-5 max-w-5xl">
              Browse IEMs by imaging, tuning, and value.
            </h1>
          </div>
        </div>
      </section>

      <section id="iems" className="page-section">
        <SiteSection>
          <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading IEM filters...</div>}>
            <IemBrowser iems={iems} latestAddedSlugs={latestAdded.iems} />
          </Suspense>
        </SiteSection>
      </section>

      <section className="page-section border-t border-border">
        <SiteSection>
          <div className="space-y-6">
            <AiFaq items={iemFaqs} />
            <PopularSearches
              title="Popular IEM searches"
              description="Find an IEM by game, budget, sound signature, or comparison."
              groups={iemLinkGroups}
            />
          </div>
        </SiteSection>
      </section>
    </main>
  );
}
