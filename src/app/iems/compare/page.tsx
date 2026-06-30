import type { Metadata } from "next";
import { Suspense } from "react";

import { IemCompare } from "@/components/iems/iem-compare";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { SiteSection } from "@/components/SiteSection";
import { Badge } from "@/components/ui/badge";
import { getAllIems } from "@/lib/iems";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare IEMs",
  description:
    "Compare two IEMs side by side for FPS gaming, music, tuning, imaging, comfort, value, and specs on FragBasic.",
  path: "/iems/compare",
  keywords: [
    "compare IEMs",
    "gaming IEM comparison",
    "best IEM for FPS comparison",
    "IEM side by side",
  ],
});

export default function IemComparePage() {
  const iems = getAllIems();

  return (
    <main className="min-h-screen bg-background text-foreground">
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
    </main>
  );
}
