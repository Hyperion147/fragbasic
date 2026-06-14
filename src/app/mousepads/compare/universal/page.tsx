import { Suspense } from "react";
import { UniversalCompare } from "@/components/compare/universal/universal-compare";
import { getAllMousepads } from "@/lib/mousepads";

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
