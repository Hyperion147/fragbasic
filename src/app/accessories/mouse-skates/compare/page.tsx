import type { Metadata } from "next";
import { Suspense } from "react";

import { MouseSkateCompare } from "@/components/accessories/mouse-skates/mouse-skate-compare";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AiFaq } from "@/components/seo/ai-blocks";
import {
  mouseSkateCompareFaqs,
} from "@/lib/seo-content";
import {
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";
import { getPublicMouseSkates } from "@/server/catalog/accessories";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Compare Mouse Skates Side by Side",
  description:
    "Compare mouse skates side by side on speed, control, stopping power, durability, noise, and surface fit for cloth and glass pads.",
  path: "/accessories/mouse-skates/compare",
  keywords: [
    ...seoKeywords.skates,
    ...seoKeywords.comparisons,
    ...seoKeywords.questions,
  ],
});

type CompareMouseSkatesPageProps = {
  searchParams?: Promise<{
    left?: string;
  }>;
};

export default async function CompareMouseSkatesPage({
  searchParams,
}: CompareMouseSkatesPageProps) {
  const skates = await getPublicMouseSkates();
  const params = searchParams ? await searchParams : undefined;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd data={buildFaqJsonLd(mouseSkateCompareFaqs)} />
      <section className="border-b border-border bg-background">
        <div className="page-hero">
          <div className="max-w-5xl">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Accessories", href: "/accessories/mouse-skates" },
                { label: "Compare skates" },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-sky-300 text-slate-950">Compare</Badge>
              <Badge variant="outline">
                {skates.length} skate{skates.length === 1 ? "" : "s"} available
              </Badge>
            </div>

            <h1 className="page-title-compact mt-5">
              Compare mouse skates side by side.
            </h1>
          </div>
        </div>
      </section>

      <section className="page-section">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading skate comparison...</div>}>
          <MouseSkateCompare skates={skates} initialLeftSlug={params?.left} />
        </Suspense>
      </section>

      <section className="page-section border-t border-border">
        <AiFaq items={mouseSkateCompareFaqs} />
      </section>
    </main>
  );
}
