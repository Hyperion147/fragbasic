import type { Metadata } from "next";
import { Suspense } from "react";
import { UniversalCompare } from "@/components/compare/universal/universal-compare";
import { getAllMousepads } from "@/lib/mousepads";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Universal Mousepad Compare",
  description:
    "Build your own 2-3 mousepad matchup on FragBasic and compare speed, control, stopping power, micro-adjustments, and environment resistance.",
  path: "/mousepads/compare/universal",
  keywords: [
    "universal mousepad compare",
    "compare mousepads side by side",
    "glasspad vs cloth pad",
    "mousepad stats comparison",
  ],
});

export default function UniversalComparePage() {
  const allMousepads = getAllMousepads();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 xl:px-10">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading comparison tools...</div>}>
          <UniversalCompare allMousepads={allMousepads} />
        </Suspense>
      </section>
    </main>
  );
}
