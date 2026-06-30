import type { Metadata } from "next";
import { Suspense } from "react";

import { IemBrowser } from "@/components/iems/iem-browser";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { SiteSection } from "@/components/SiteSection";
import { Badge } from "@/components/ui/badge";
import { getAllIems } from "@/lib/iems";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "IEM Database for FPS Games",
  description:
    "Browse FragBasic's IEM database for FPS games, with imaging, clarity, soundstage, comfort, tuning, value, and India buying notes.",
  path: "/iems",
  keywords: [
    "gaming IEMs",
    "best IEMs for valorant",
    "best IEMs for CS2",
    "IEM database",
    "budget IEMs India",
    "FPS earphones",
  ],
});

export default function IemsPage() {
  const iems = getAllIems();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-background">

        <div className="relative w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
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

            <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
              Browse IEMs by imaging, tuning, and value.
            </h1>
          </div>
        </div>
      </section>

      <section id="iems" className="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8 xl:px-10">
        <SiteSection>
          <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading IEM filters...</div>}>
            <IemBrowser iems={iems} />
          </Suspense>
        </SiteSection>
      </section>
    </main>
  );
}
