import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { FinderForm } from "@/components/finder/finder-form";
import { FinderResults } from "@/components/finder/finder-results";
import { buildMetadata } from "@/lib/seo";
import { getMousepadFullName } from "@/lib/mousepads";
import { findMousepads, readFinderPreferences } from "@/lib/mousepads/finder";
import { getPublicPads } from "@/server/catalog/pads";
import styles from "@/components/finder/finder.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Mousepad Finder for FPS Players",
  description: "Find cloth, hybrid and glass mousepads for your games, preferred glide, desk conditions and INR budget. Compare the closest matches side by side.",
  path: "/mousepads/finder",
});

export default async function FinderPage({ searchParams }: PageProps<"/mousepads/finder">) {
  const [query, pads] = await Promise.all([searchParams, getPublicPads()]);
  const prefs = readFinderPreferences(query);
  const results = findMousepads(pads, prefs);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="page-hero">
          <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Mousepads", href: "/mousepads" }, { label: "Finder" }]} />
          <Badge variant="outline">{pads.length} models tracked</Badge>
          <h1 className="page-title mt-5">Mousepad finder</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Choose how you want your pad to feel. Compare the three closest matches for your games and budget.</p>
          <a className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium xl:hidden" href="#matches">View matches <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </header>
      <div className={`page-section ${styles.workspace}`}>
        <FinderForm key={JSON.stringify(prefs)} prefs={prefs} />
        <FinderResults {...results} prefs={prefs} products={pads.map((pad) => ({ slug: pad.slug, name: getMousepadFullName(pad) }))} />
      </div>
    </main>
  );
}
