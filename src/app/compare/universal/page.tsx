import { UniversalCompare } from "@/components/compare/universal/universal-compare";
import { getAllMousepads } from "@/lib/mousepads";

export default function UniversalComparePage() {
  const allMousepads = getAllMousepads();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <UniversalCompare allMousepads={allMousepads} />
      </section>
    </main>
  );
}
