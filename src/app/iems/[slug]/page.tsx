import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  Cable,
  CheckCircle2,
  CircleDollarSign,
  CircleOff,
  Gamepad2,
  Link as LinkIcon,
  MessageCircle,
  Mic,
  PackageCheck,
  Plug,
  Radio,
  ScanSearch,
  Share2,
  ShieldCheck,
  Star,
  Volume2,
  Weight,
  XCircle,
} from "lucide-react";

import { ClientShareButton } from "@/components/ClientShareButton";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatIemAvailability,
  formatIemDriverType,
  formatIemGame,
  formatIemPrice,
  formatIemRating,
  formatIemSoundSignature,
  getAllIems,
  getIemBySlug,
  getIemFullName,
  getIemScoreTone,
} from "@/lib/iems";
import { buildMetadata } from "@/lib/seo";
import type { Iem, IemFrequencyPoint } from "@/types/iem";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllIems().map((iem) => ({
    slug: iem.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const iem = getIemBySlug(slug);

  if (!iem) {
    return {};
  }

  return buildMetadata({
    title: `${getIemFullName(iem)} Review & FPS Scores`,
    description: `${getIemFullName(iem)} IEM review with imaging, clarity, soundstage, comfort, sound signature, specs, and India buying notes on FragBasic.`,
    path: `/iems/${iem.slug}`,
    keywords: [
      getIemFullName(iem),
      `${getIemFullName(iem)} review`,
      `${getIemFullName(iem)} gaming`,
      `${getIemFullName(iem)} valorant`,
      "IEM review",
      "gaming IEM",
    ],
  });
}

export default async function IemPage({ params }: Props) {
  const { slug } = await params;
  const iem = getIemBySlug(slug);

  if (!iem) {
    notFound();
  }

  return (
    <main
      className="min-h-screen bg-background text-foreground"
    >
      <section className="border-b border-border bg-[radial-gradient(circle_at_78%_18%,color-mix(in_srgb,var(--iem-glow)_12%,transparent),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]">
        <div className="w-full px-4 pt-8 md:px-6 lg:px-8 xl:px-10">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "IEMs", href: "/iems" },
              { label: getIemFullName(iem) },
            ]}
          />
        </div>

        <div
          id="overview"
          className="grid w-full gap-10 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.88fr)] lg:px-8 xl:px-10"
        >
          <div className="flex flex-col justify-end">
            <div className="flex flex-wrap gap-2">
              <AccentPill>Under {iem.priceTier === "under-2000" ? "INR 2,000" : "INR 5,000"}</AccentPill>
              <Badge variant="outline">{formatIemSoundSignature(iem.soundSignature)}</Badge>
              <Badge variant="outline">{formatIemDriverType(iem.driverType)}</Badge>
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
              {getIemFullName(iem)}
            </h1>

            <p className="mt-3 text-lg text-muted-foreground">{iem.subtitle}</p>

            <div className="mt-4 flex items-center gap-3">
              <StarRating />
              <p className="text-sm text-muted-foreground">
                {formatIemRating(iem.ratings.community)} ({iem.communityReview.reviewCount.toLocaleString("en-IN")} reviews)
              </p>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
              {iem.communitySummary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="mr-2 text-4xl font-semibold tracking-tight">
                {formatIemPrice(iem)}
              </p>
              <AccentPill>{formatIemAvailability(iem.buying.availability)}</AccentPill>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {iem.buying.stores.map((store) => (
                <StorePill key={store.label} label={store.label} href={store.url} />
              ))}
              <Button variant="outline" size="icon" asChild>
                <Link href={iem.images.main} aria-label="Open product image">
                  <LinkIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-border bg-card/45 lg:min-h-[500px]">
            <Image
              src={iem.images.main}
              alt={getIemFullName(iem)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background/42 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <div className="w-full space-y-8 px-4 py-8 md:px-6 md:py-10 lg:px-8 xl:px-10">
        <ScorePanel iem={iem} />

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr_0.72fr]">
          <ReviewCard iem={iem} />
          <RatingBreakdown iem={iem} />
          <VerdictCard iem={iem} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <FrequencyCard points={iem.frequencyResponse} />
          <SoundSignatureCard iem={iem} />
        </section>

        <CommunityPanel iem={iem} />

        <section id="specs" className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <SpecsCard iem={iem} />
          <BuyingCard iem={iem} />
        </section>

        <FinalFitPanel iem={iem} />

        <footer className="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Last updated: {formatReadableDate(iem.updatedAt)}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Share:</span>
            <ClientShareButton href={`/iems/${iem.slug}`} label="Share IEM" />
            <Button variant="outline" size="icon" aria-label="Share link">
              <Share2 className="size-4" />
            </Button>
          </div>
        </footer>
      </div>
    </main>
  );
}

function AccentPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[color:color-mix(in_srgb,var(--iem-hover)_24%,transparent)] bg-[color:color-mix(in_srgb,var(--iem)_16%,transparent)] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--iem-hover)]">
      {children}
    </span>
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-1 text-[color:var(--iem-hover)]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-4 fill-current" />
      ))}
    </div>
  );
}

function StorePill({ label, href }: { label: string; href?: string }) {
  const className =
    "inline-flex items-center gap-2 rounded-lg border border-border bg-background/65 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-[color:color-mix(in_srgb,var(--iem-hover)_38%,transparent)]";

  if (href) {
    return (
      <Link href={href} className={className}>
        <PackageCheck className="size-4 text-[color:var(--iem-hover)]" />
        {label}
      </Link>
    );
  }

  return (
    <span className={className}>
      <PackageCheck className="size-4 text-[color:var(--iem-hover)]" />
      {label}
    </span>
  );
}

function ScorePanel({ iem }: { iem: Iem }) {
  const scores = [
    { label: "FragBasic Score", value: iem.ratings.fragbasic, note: "Editor's choice" },
    { label: "Community Score", value: iem.ratings.community, note: `Based on ${formatCompact(iem.communityReview.reviewCount)}+ reviews` },
    { label: "FPS Score", value: iem.ratings.fps, note: getIemScoreTone(iem.ratings.fps) },
    { label: "Music Score", value: iem.ratings.music, note: getIemScoreTone(iem.ratings.music) },
    { label: "Value Score", value: iem.ratings.value, note: getIemScoreTone(iem.ratings.value) },
  ];

  return (
    <section className="grid gap-4 rounded-xl border border-border bg-card/55 p-5 lg:grid-cols-[repeat(5,minmax(0,1fr))_260px]">
      {scores.map((score) => (
        <div key={score.label} className="border-border lg:border-r lg:pr-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {score.label}
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">
            {formatIemRating(score.value)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">/10</span>
          </p>
          <p className="mt-3 text-xs font-semibold text-[color:var(--iem-hover)]">
            {score.note}
          </p>
        </div>
      ))}
      <div className="flex items-center justify-center">
        <IemRadar iem={iem} />
      </div>
    </section>
  );
}

function IemRadar({ iem }: { iem: Iem }) {
  const axes = [
    { label: "Imaging", value: iem.ratings.imaging },
    { label: "Clarity", value: iem.ratings.clarity },
    { label: "Bass", value: iem.ratings.bass },
    { label: "Soundstage", value: iem.ratings.soundstage },
    { label: "Comfort", value: iem.ratings.comfort },
    { label: "Build", value: iem.ratings.build },
  ];
  const center = 82;
  const radius = 54;
  const polygon = axes
    .map((axis, index) => {
      const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
      const pointRadius = radius * (axis.value / 10);
      return `${center + Math.cos(angle) * pointRadius},${center + Math.sin(angle) * pointRadius}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 164 164" className="h-40 w-40">
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={axes
            .map((_, index) => {
              const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
              return `${center + Math.cos(angle) * radius * scale},${center + Math.sin(angle) * radius * scale}`;
            })
            .join(" ")}
          fill="none"
          stroke="color-mix(in srgb, var(--iem-hover) 20%, transparent)"
          strokeWidth="1"
        />
      ))}
      {axes.map((axis, index) => {
        const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
        const x = center + Math.cos(angle) * (radius + 20);
        const y = center + Math.sin(angle) * (radius + 20);

        return (
          <g key={axis.label}>
            <line
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * radius}
              y2={center + Math.sin(angle) * radius}
              stroke="color-mix(in srgb, var(--iem-hover) 18%, transparent)"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {axis.label}
            </text>
          </g>
        );
      })}
      <polygon
        points={polygon}
        fill="color-mix(in srgb, var(--iem) 22%, transparent)"
        stroke="var(--iem-hover)"
        strokeWidth="2"
      />
    </svg>
  );
}

function ReviewCard({ iem }: { iem: Iem }) {
  return (
    <section className="rounded-xl border border-border bg-card/50 p-6">
      <SectionKicker icon={ShieldCheck} label="Official review" />
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        {iem.officialReview.summary}
      </p>

      <div className="mt-6 rounded-lg border border-border bg-background/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
          Test setup
        </p>
        <div className="mt-4 grid gap-2 text-sm">
          <InfoRow label="Source" value={iem.officialReview.testSetup.source} />
          {iem.officialReview.testSetup.motherboard ? (
            <InfoRow label="Motherboard" value={iem.officialReview.testSetup.motherboard} />
          ) : null}
          <InfoRow
            label="Tested games"
            value={iem.officialReview.testSetup.testedGames.map(formatIemGame).join(", ")}
          />
          <InfoRow label="Testing duration" value={iem.officialReview.testSetup.testingDuration} />
        </div>
      </div>
    </section>
  );
}

function RatingBreakdown({ iem }: { iem: Iem }) {
  const ratings = [
    ["Imaging", iem.ratings.imaging],
    ["Clarity", iem.ratings.clarity],
    ["Bass", iem.ratings.bass],
    ["Soundstage", iem.ratings.soundstage],
    ["Comfort", iem.ratings.comfort],
    ["Build quality", iem.ratings.build],
  ] as const;

  return (
    <section className="rounded-xl border border-border bg-card/50 p-6">
      <SectionKicker icon={Activity} label="Score breakdown" />
      <div className="mt-5 space-y-4">
        {ratings.map(([label, value]) => (
          <ScoreBar key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  );
}

function VerdictCard({ iem }: { iem: Iem }) {
  return (
    <section className="rounded-xl border border-border bg-card/50 p-6">
      <SectionKicker icon={CheckCircle2} label="Verdict" />
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        {iem.officialReview.verdict}
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-[color:color-mix(in_srgb,var(--iem)_18%,transparent)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--iem-hover)]">
        <CheckCircle2 className="size-4" />
        Recommended
      </div>
    </section>
  );
}

function FrequencyCard({ points }: { points: IemFrequencyPoint[] }) {
  return (
    <section className="rounded-xl border border-border bg-card/50 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SectionKicker icon={Radio} label="Frequency response" />
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-7 bg-[color:var(--iem-hover)]" />
            {points.length ? "IEM" : "Measured"}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-7 border-t border-dashed border-muted-foreground" />
            Target
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-background/60 p-4">
        <svg viewBox="0 0 720 300" className="h-[260px] w-full">
          {Array.from({ length: 7 }).map((_, index) => (
            <line
              key={`h-${index}`}
              x1="42"
              x2="690"
              y1={36 + index * 36}
              y2={36 + index * 36}
              stroke="rgba(255,255,255,0.06)"
            />
          ))}
          {points.map((point, index) => (
            <g key={point.hz}>
              <line
                x1={42 + index * (648 / Math.max(1, points.length - 1))}
                x2={42 + index * (648 / Math.max(1, points.length - 1))}
                y1="36"
                y2="252"
                stroke="rgba(255,255,255,0.045)"
              />
              <text
                x={42 + index * (648 / Math.max(1, points.length - 1))}
                y="282"
                textAnchor="middle"
                className="fill-muted-foreground text-[12px]"
              >
                {point.hz}
              </text>
            </g>
          ))}
          {[-15, -10, -5, 0, 5, 10, 15].map((db, index) => (
            <text
              key={db}
              x="8"
              y={256 - index * 36}
              className="fill-muted-foreground text-[11px]"
            >
              {db > 0 ? `+${db}` : db}
            </text>
          ))}
          <path
            d={buildFrequencyPath(points, "target")}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
          <path
            d={buildFrequencyPath(points, "db")}
            fill="none"
            stroke="var(--iem-hover)"
            strokeWidth="3"
          />
        </svg>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Approximate public-graph style visualization for fast comparison.
      </p>
    </section>
  );
}

function SoundSignatureCard({ iem }: { iem: Iem }) {
  const profile = iem.soundProfile;
  const rows = [
    ["Bass", profile.bass],
    ["Mids", profile.mids],
    ["Treble", profile.treble],
    ["Warmth", profile.warmth],
    ["Brightness", profile.brightness],
  ] as const;

  return (
    <section className="rounded-xl border border-border bg-card/50 p-6">
      <SectionKicker icon={Volume2} label="Sound signature" />
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">{profile.label}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {profile.description}
      </p>
      <div className="mt-6 space-y-4">
        {rows.map(([label, value]) => (
          <FivePointBar key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  );
}

function CommunityPanel({ iem }: { iem: Iem }) {
  const review = iem.communityReview;

  return (
    <section id="community" className="rounded-xl border border-border bg-card/50 p-6">
      <SectionKicker icon={MessageCircle} label="Community review aggregated" />
      <p className="mt-2 text-sm text-muted-foreground">
        Based on {review.reviewCount.toLocaleString("en-IN")} reviews from {review.sourceCount} sources.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1fr_1fr_1fr]">
        <div className="rounded-xl border border-border bg-background/45 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Overall sentiment
          </p>
          <p className="mt-4 text-5xl font-semibold text-[color:var(--iem-hover)]">
            {formatIemRating(iem.ratings.community)}
            <span className="text-sm text-muted-foreground"> /10</span>
          </p>
          <p className="mt-3 text-sm font-semibold text-[color:var(--iem-hover)]">
            Very positive
          </p>
          <div className="mt-6 space-y-3">
            <SentimentBar label="Positive" value={review.sentiment.positive} />
            <SentimentBar label="Neutral" value={review.sentiment.neutral} muted />
            <SentimentBar label="Negative" value={review.sentiment.negative} danger />
          </div>
        </div>

        <div>
          <PanelLabel>Breakdown by platform</PanelLabel>
          <div className="mt-5 space-y-4">
            {review.platforms.map((platform) => (
              <ScoreBar key={platform.name} label={platform.name} value={platform.score} />
            ))}
          </div>
        </div>

        <ListColumn title="Most mentioned positives" items={review.positives} positive />
        <ListColumn title="Most mentioned negatives" items={review.negatives} />
      </div>
    </section>
  );
}

function SpecsCard({ iem }: { iem: Iem }) {
  const specs = [
    { icon: Radio, label: "Driver", value: iem.specs.driver },
    { icon: Activity, label: "Impedance", value: iem.specs.impedance },
    { icon: ScanSearch, label: "Sensitivity", value: iem.specs.sensitivity },
    { icon: Activity, label: "Frequency response", value: iem.specs.frequencyResponse },
    { icon: Plug, label: "Connector", value: iem.specs.connector },
    { icon: Cable, label: "Cable type", value: iem.specs.cableType },
    { icon: Plug, label: "Cable termination", value: iem.specs.cableTermination },
    { icon: PackageCheck, label: "Shell material", value: iem.specs.shellMaterial },
    { icon: PackageCheck, label: "Nozzle material", value: iem.specs.nozzleMaterial },
    { icon: Cable, label: "Detachable cable", value: iem.specs.detachableCable ? "Yes" : "No" },
    { icon: Mic, label: "Mic", value: iem.specs.mic ? "Yes" : "No" },
    { icon: Weight, label: "Weight", value: iem.specs.weightPerEarpiece ?? "Unknown" },
  ];

  return (
    <section className="rounded-xl border border-border bg-card/50 p-6">
      <SectionKicker icon={ScanSearch} label="Key specifications" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {specs.map((spec) => (
          <div key={`${spec.label}-${spec.value}`} className="grid grid-cols-[24px_1fr] gap-3">
            <spec.icon className="mt-0.5 size-4 text-[color:var(--iem-hover)]" />
            <div>
              <p className="text-xs text-muted-foreground">{spec.label}</p>
              <p className="mt-1 text-sm text-foreground">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BuyingCard({ iem }: { iem: Iem }) {
  return (
    <section className="rounded-xl border border-border bg-card/50 p-6">
      <SectionKicker icon={CircleDollarSign} label="Buying info" />
      <div className="mt-6 space-y-3">
        <InfoRow label="Price in India" value={`${formatIemPrice(iem)} approx`} />
        <InfoRow label="Availability" value={formatIemAvailability(iem.buying.availability)} />
        <InfoRow label="Ships from" value={iem.buying.shipsFrom ?? "Unknown"} />
        <InfoRow label="Warranty" value={iem.buying.warranty ?? "Seller dependent"} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {iem.buying.stores.map((store) => (
          <AccentPill key={store.label}>{store.label}</AccentPill>
        ))}
      </div>
    </section>
  );
}

function FinalFitPanel({ iem }: { iem: Iem }) {
  return (
    <section className="grid gap-6 rounded-xl border border-border bg-card/50 p-6 lg:grid-cols-[1fr_1fr_1fr_1fr_0.9fr]">
      <ListColumn title="Pros" items={iem.pros} positive />
      <ListColumn title="Cons" items={iem.cons} />
      <ListColumn title="Best for" items={iem.bestFor.map(formatIemGame)} positive icon={Gamepad2} />
      <ListColumn title="Avoid if" items={iem.avoidIf} icon={CircleOff} />
      <div>
        <PanelLabel>Tags</PanelLabel>
        <div className="mt-5 flex flex-wrap gap-2">
          {iem.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionKicker({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-[color:var(--iem-hover)]" />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
        {label}
      </p>
    </div>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
      {children}
    </p>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[120px_1fr_52px] items-center gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[color:var(--iem-hover)]"
          style={{ width: `${Math.max(0, Math.min(100, value * 10))}%` }}
        />
      </div>
      <span className="text-right text-foreground">{formatIemRating(value)}/10</span>
    </div>
  );
}

function FivePointBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[88px_1fr_44px] items-center gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[color:var(--iem-hover)]"
          style={{ width: `${Math.max(0, Math.min(100, value * 20))}%` }}
        />
      </div>
      <span className="text-right text-foreground">{value}/5</span>
    </div>
  );
}

function SentimentBar({
  label,
  value,
  muted = false,
  danger = false,
}: {
  label: string;
  value: number;
  muted?: boolean;
  danger?: boolean;
}) {
  const color = danger ? "bg-red-400" : muted ? "bg-yellow-300" : "bg-[color:var(--iem-hover)]";

  return (
    <div className="grid grid-cols-[72px_1fr_38px] items-center gap-3 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-right text-foreground">{value}%</span>
    </div>
  );
}

function ListColumn({
  title,
  items,
  positive = false,
  icon: Icon,
}: {
  title: string;
  items: string[];
  positive?: boolean;
  icon?: typeof Gamepad2;
}) {
  const DefaultIcon = positive ? CheckCircle2 : XCircle;
  const ListIcon = Icon ?? DefaultIcon;

  return (
    <div>
      <PanelLabel>{title}</PanelLabel>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
            <ListIcon
              className={
                positive
                  ? "mt-0.5 size-4 shrink-0 text-[color:var(--iem-hover)]"
                  : "mt-0.5 size-4 shrink-0 text-red-400"
              }
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildFrequencyPath(points: IemFrequencyPoint[], key: "db" | "target") {
  const width = 648;
  const left = 42;
  const top = 36;
  const height = 216;
  const minDb = -15;
  const maxDb = 15;

  return points
    .map((point, index) => {
      const x = left + index * (width / Math.max(1, points.length - 1));
      const normalized = (point[key] - minDb) / (maxDb - minDb);
      const y = top + height - normalized * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return value.toString();
}

function formatReadableDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
