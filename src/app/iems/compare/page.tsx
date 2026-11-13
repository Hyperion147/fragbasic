import type { Metadata } from "next";
import { Suspense } from "react";

import { IemCompare } from "@/components/iems/iem-compare";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { SiteSection } from "@/components/SiteSection";
import { Badge } from "@/components/ui/badge";
import { AiFaq } from "@/components/seo/ai-blocks";
import { getPublicIems } from "@/server/catalog/iems";
import { iemCompareFaqs } from "@/lib/seo-content";
import {
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Compare Gaming IEMs Side by Side",
  description:
    "Compare two gaming IEMs side by side for FPS imaging, clarity, soundstage, comfort, tuning, and value. Find the better IEM for VALORANT and CS2.",
  path: "/iems/compare",
  keywords: [
    ...seoKeywords.iems,
    ...seoKeywords.comparisons,
    ...seoKeywords.questions,
  ],
});

export default async function IemComparePage() {
  const iems = await getPublicIems();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd data={buildFaqJsonLd(iemCompareFaqs)} />
      <section className="border-b border-border bg-background">
        <div className="page-hero">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "IEMs", href: "/iems" },
                { label: "Compare" },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="text-black">IEM compare</Badge>
              <Badge variant="outline">Two at a time</Badge>
            </div>
            <h1 className="page-title-compact mt-5">
              Compare two IEMs side by side.
            </h1>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SiteSection>
          <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading IEM comparison...</div>}>
            <IemCompare iems={iems} />
          </Suspense>
        </SiteSection>
      </section>

      <section className="page-section border-t border-border">
        <SiteSection>
          <AiFaq items={iemCompareFaqs} />
        </SiteSection>
      </section>
    </main>
  );
}
