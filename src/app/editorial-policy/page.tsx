import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy, Methodology & Disclosures",
  description: "How FragBasic sources FPS gear specifications, labels personal testing and community impressions, maintains reviews, and handles commercial links.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return <main className="page-section mx-auto w-full max-w-4xl">
    <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Editorial policy" }]} />
    <h1 className="page-title mt-6">How FragBasic researches gear.</h1>
    <p className="body-copy mt-5">FragBasic helps FPS players compare trade-offs in mousepads, glasspads, IEMs and mouse skates. A catalog listing does not mean we have personally tested that product.</p>
    <div className="mt-10 space-y-10 text-base leading-8 text-muted-foreground [&_h2]:mb-3 [&_h2]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
      <section id="who"><h2>Who maintains the database</h2>
        <p>FragBasic is maintained by <a href="https://github.com/Hyperion147" rel="me">Hyperion147</a>, the project maintainer. The editorial byline “FragBasic” identifies the site’s editorial work, rather than a separate team of laboratory reviewers. You can also find the maintainer through the <a href="https://x.com/suryansu87" rel="me">public X profile</a> linked on this site.</p>
      </section>
      <section><h2>How evidence is labeled</h2>
        <p>Official sources describe manufacturer specifications. Store sources provide buying context. Community sources describe other users’ reported experience. Estimated ratings are judgments with limited evidence. A “personal testing recorded” label appears only when that product’s catalog explicitly records personal testing. Source-based profiles and comparisons are editorial summaries, not independent laboratory measurements.</p>
        <p>For mousepads, personal testing notes can include ownership, duration and games played. For IEMs, the rating confidence and any recorded test setup provide context. A setup description alone is not proof of personal testing; the confidence label governs that distinction.</p>
      </section>
      <section><h2>How comparisons and scores work</h2>
        <p>Scores use a relative zero-to-ten scale within this database. Speed, control and stopping power describe different qualities; a higher speed score is not a universal quality score. Surface wear, skates, pressure, humidity, fit, hearing and source equipment can change experience. IEM sound profiles and FPS scores express editorial interpretation unless a cited measurement says otherwise.</p>
        <p>Best lists explain a use case and the reasons for each pick. They are not a complete test of every product on the market. Internet sources can establish specifications and reported experience; they cannot establish that FragBasic personally tested a product.</p>
      </section>
      <section><h2>Prices, availability and source checks</h2>
        <p>Prices and India availability are reference information and can change between edits. Confirm price, stock, warranty and shipping with the seller before buying. Product pages link to source material where available. Manufacturer documentation takes precedence for specifications; conflicting community impressions are treated as uncertainty rather than averaged into a claimed measurement.</p>
      </section>
      <section><h2>Updates and corrections</h2>
        <p>Product and guide pages show the catalog record’s last edit date. That timestamp can reflect a factual correction, an image change or an editorial edit; it does not mean the product was retested. Buying guides do not automatically acquire a new year in their title. New testing should describe the setup and duration in the record.</p>
        <p>Use the <a href="https://forms.gle/5b1QejGptx63eQHw9">community submission form</a> to report a correction. Include the product, the disputed field and a source link. Existing claims remain subject to correction when better evidence appears.</p>
      </section>
      <section><h2>Commercial links and independence</h2>
        <p>A store or manufacturer link is a research or buying reference, not a claim that FragBasic sells the product. Prices and offers belong to the linked seller. Commercial relationships, including affiliate commissions or supplied review samples, must be disclosed next to the relevant recommendation when applicable. An undisclosed relationship must not be inferred from a link alone. Paid placement must not determine a score or an editorial ranking.</p>
      </section>
      <section><h2>Review history</h2>
        <p><time dateTime="2026-11-14">14 November 2026</time>: published this policy, clarified evidence labels and catalog edit dates, and removed automatic year rollover from buying-guide titles.</p>
        <p><Link href="/mousepads">Explore the catalog</Link> or <Link href="/mousepads/guides">read a buying guide</Link>.</p>
      </section>
    </div>
  </main>;
}
