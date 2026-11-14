import { connection } from "next/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import { UniversalCompare } from "@/components/compare/universal/universal-compare";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { AiFaq } from "@/components/seo/ai-blocks";
import { mousepadCompareFaqs } from "@/lib/seo-content";
import {
  buildFaqJsonLd,
  buildMetadata,
  seoKeywords,
} from "@/lib/seo";
import { getPublicPads } from "@/server/catalog/pads";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Compare Mousepads Side by Side",
  description:
    "Compare 2-3 mousepads side by side on speed, control, stopping power, micro-adjustments, texture, and humidity resistance.",
  path: "/mousepads/compare/universal",
  keywords: [
    ...seoKeywords.comparisons,
    ...seoKeywords.mousepads,
    ...seoKeywords.glasspads,
  ],
});

export default async function UniversalComparePage() {
  // Render the URL-dependent comparison on the server instead of replacing
  // a small static Suspense fallback after hydration.
  await connection();
  const allMousepads = await getPublicPads();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd data={buildFaqJsonLd(mousepadCompareFaqs)} />
      <section className="page-section">
        <div className="mb-6">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mousepads", href: "/mousepads" },
              { label: "Compare", href: "/mousepads/compare" },
              { label: "Universal Compare" },
            ]}
          />
        </div>
        <h1 className="page-title-compact mb-6">Compare mousepads side by side.</h1>
        <p className="mb-6 max-w-3xl text-muted-foreground">
          Compare up to three cloth mousepads or glasspads by speed, control,
          stopping power, texture, and humidity resistance. Select your pads below
          to see their specs and feel ratings together.
        </p>
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading comparison tools...</div>}>
          <UniversalCompare allMousepads={allMousepads} />
        </Suspense>
      </section>

      <section className="page-section border-t border-border">
        <div className="mx-auto max-w-7xl">
          <AiFaq items={mousepadCompareFaqs} />
        </div>
      </section>
    </main>
  );
}
