import type { Metadata } from "next";
import { Layers3 } from "lucide-react";
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
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.inner}>
          <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Mousepads", href: "/mousepads" }, { label: "Finder" }]} />
          <h1>Mousepad <span>finder.</span></h1>
          <p>Dial in your glide, games and budget. Compare the three closest picks for your setup.</p>
          <div className={styles.heroFoot}>
            <span><Layers3 size={16} aria-hidden="true" /> {pads.length} pads in the catalog</span>
            <a href="#matches">View matches</a>
          </div>
        </div>
      </header>
      <div className={styles.workspace}>
        <FinderForm key={JSON.stringify(prefs)} prefs={prefs} />
        <FinderResults {...results} prefs={prefs} products={pads.map((pad) => ({ slug: pad.slug, name: getMousepadFullName(pad) }))} />
      </div>
    </main>
  );
}
