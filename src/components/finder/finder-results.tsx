import Link from "next/link";
import { ChevronDown, Scale, SearchX } from "lucide-react";
import Image from "@/components/optimized-image";
import { formatConfidenceLabel } from "@/lib/mousepads/calibration";
import { formatValue } from "@/lib/utils/format";
import { feels, type FinderMatch, type FinderPreferences } from "@/lib/mousepads/finder";
import { MatchesHeading } from "./finder-navigation";
import { FinderShortlist, SavePad } from "./finder-shortlist";
import styles from "./finder.module.css";

const rupees = new Intl.NumberFormat("en-IN", { currency: "INR", style: "currency", maximumFractionDigits: 0 });

function ResultCard({ match, rank }: { match: FinderMatch; rank: number }) {
  const { pad, feel, reasons, tradeoff } = match;
  const url = `/mousepads/${pad.slug}`;
  return (
    <li className={styles.result}>
      <div className={styles.product}>
        <Image alt="" src={pad.images.main} fill sizes="(max-width: 550px) 100vw, 180px" className={styles.productImage} />
        <span className={styles.rank} aria-hidden="true">{String(rank).padStart(2, "0")}</span>
      </div>
      <div className={styles.resultBody}>
        <div className={styles.productMeta}>
          <span>{pad.brand} · {formatValue(pad.surface)}</span>
          <strong>{pad.price.inr && pad.price.inr > 0 ? rupees.format(pad.price.inr) : "INR price unknown"}</strong>
        </div>
        <h3><Link href={url}>{pad.name}<span className="sr-only"> by {pad.brand}, product profile</span></Link></h3>
        <p className={styles.reason}>{reasons.join(" ")}</p>
        <div className={styles.actions}>
          <dl className={styles.metrics}>
            <div><dt>Glide</dt><dd>{feel.speed.toFixed(1)}<small>/10</small></dd></div>
            <div><dt>Stop</dt><dd>{feel.stoppingPower.toFixed(1)}<small>/10</small></dd></div>
          </dl>
          <SavePad slug={pad.slug} name={pad.name} />
        </div>
        <details className={styles.notes}>
          <summary>Tradeoffs &amp; evidence <ChevronDown size={15} aria-hidden="true" /></summary>
          <p>{tradeoff || "This profile has no recorded tradeoff."}</p>
          <p>Feel ratings · {formatConfidenceLabel(pad.feel.ratingConfidence)}</p>
          <Link href={url}>Read the full profile</Link>
        </details>
      </div>
    </li>
  );
}

export function FinderResults({ matches, count, prefs, products }: {
  matches: FinderMatch[]; count: number; prefs: FinderPreferences; products: { slug: string; name: string }[];
}) {
  const total = products.length;
  const compare = new URLSearchParams({ pads: matches.map(({ pad }) => pad.slug).join(",") });
  return (
    <section aria-labelledby="matches" className={styles.results}>
      <div className={styles.resultsHeading}>
        <div>
          <MatchesHeading criteria={JSON.stringify(prefs)} />
          <p>{count ? `${feels[prefs.feel]} glide · Showing ${matches.length} of ${count} eligible pads` : "0 eligible pads"}</p>
        </div>
        {matches.length > 1 && <Link href={`/mousepads/compare/universal?${compare}`} className={styles.compare}>
          <Scale size={17} aria-hidden="true" /> Compare these {matches.length}
        </Link>}
      </div>
      <FinderShortlist products={products}>
        {matches.length > 0 ? (
          <ol className={styles.list} aria-label="Mousepads ranked by fit">
            {matches.map((match, index) => <ResultCard key={match.pad.slug} match={match} rank={index + 1} />)}
          </ol>
        ) : (
          <div className={styles.empty}>
            <SearchX aria-hidden="true" size={28} />
            <h3>{total ? "No pads meet these limits" : "The catalog is empty"}</h3>
            <p>{!total ? "Picks will appear here when mousepads are published." : prefs.invalidBudget
              ? "Use a positive whole number for your budget." : "Try a higher budget, another surface, or a wider availability setting."}</p>
            {total > 0 && <a href="#preferences">Adjust preferences</a>}
          </div>
        )}
      </FinderShortlist>
      <details className={styles.method}>
        <summary>How are these ranked? <ChevronDown size={16} aria-hidden="true" /></summary>
        <p>We first apply your price, surface and availability limits. A budget excludes pads without a recorded INR price. Glide, control and stopping power carry the most weight. Selected games, sensitivity, texture and humidity refine the order.</p>
        <p>{prefs.surface === "any" ? "Glide and stop use the catalog’s cross-surface scale so cloth and glass can be compared together." : "With a single surface selected, glide and stop use its native feel ratings."} Prices and stock reflect catalog entries. <Link href="/editorial-policy">Editorial methodology</Link></p>
      </details>
    </section>
  );
}
