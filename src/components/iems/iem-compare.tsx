"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Activity,
  ChevronDown,
  CheckCircle2,
  CircleDollarSign,
  CircleOff,
  Gamepad2,
  PackageCheck,
  Radio,
  ScanSearch,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatIemAvailability,
  formatIemDriverType,
  formatIemGame,
  formatIemPrice,
  formatIemRating,
  formatIemSoundSignature,
  getIemFullName,
  getIemScoreTone,
} from "@/lib/iems";
import type { Iem, IemFrequencyPoint } from "@/types/iem";

type Props = {
  iems: Iem[];
};

const leftColor = "var(--iem-hover)";
const rightColor = "rgb(56 189 248)";

export function IemCompare({ iems }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedLeft = searchParams.get("left");
  const requestedRight = searchParams.get("right");
  const { leftSlug, rightSlug } = getValidComparePair({
    iems,
    requestedLeft,
    requestedRight,
  });
  const left = iems.find((iem) => iem.slug === leftSlug) ?? iems[0];
  const right = iems.find((iem) => iem.slug === rightSlug && iem.slug !== leftSlug) ?? iems[1];

  const replacePair = useCallback((nextLeft: string, nextRight: string) => {
    const params = new URLSearchParams();
    params.set("left", nextLeft);
    params.set("right", nextRight);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);

  useEffect(() => {
    if (!leftSlug || !rightSlug) {
      return;
    }

    if (requestedLeft !== leftSlug || requestedRight !== rightSlug) {
      replacePair(leftSlug, rightSlug);
    }
  }, [leftSlug, replacePair, requestedLeft, requestedRight, rightSlug]);

  const handleLeftChange = (nextLeft: string) => {
    const nextRight =
      nextLeft === rightSlug
        ? iems.find((iem) => iem.slug !== nextLeft)?.slug ?? rightSlug
        : rightSlug;
    replacePair(nextLeft, nextRight);
  };

  const handleRightChange = (nextRight: string) => {
    replacePair(leftSlug, nextRight);
  };

  if (!left || !right) {
    return null;
  }

  return (
    <div className="space-y-8">
      <Card className="bg-card/90 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <IemSelect
            label="First IEM"
            value={left.slug}
            iems={iems}
            blockedSlug={right.slug}
            onChange={handleLeftChange}
          />
          <IemSelect
            label="Second IEM"
            value={right.slug}
            iems={iems}
            blockedSlug={left.slug}
            onChange={handleRightChange}
          />
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <CompareProductCard iem={left} color={leftColor} />
        <CompareProductCard iem={right} color={rightColor} />
      </section>

      <CompareDisclosure title="Quick verdict" defaultOpen>
        <CompareVerdict left={left} right={right} />
      </CompareDisclosure>

      <CompareDisclosure title="Overlapping frequency response" defaultOpen>
        <OverlayFrequencyGraph left={left} right={right} />
      </CompareDisclosure>

      <section className="grid gap-6 lg:grid-cols-2">
        <CompareDisclosure title={`${left.shortName} score breakdown`}>
          <RatingBreakdown iem={left} color={leftColor} />
        </CompareDisclosure>
        <CompareDisclosure title={`${right.shortName} score breakdown`}>
          <RatingBreakdown iem={right} color={rightColor} />
        </CompareDisclosure>
      </section>

      <CompareDisclosure title="Comparison matrix">
        <ComparisonMatrix left={left} right={right} />
      </CompareDisclosure>

      <section className="grid gap-6 lg:grid-cols-2">
        <CompareDisclosure title={`${left.shortName} review summary`}>
          <ReviewCard iem={left} />
        </CompareDisclosure>
        <CompareDisclosure title={`${right.shortName} review summary`}>
          <ReviewCard iem={right} />
        </CompareDisclosure>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <CompareDisclosure title={`${left.shortName} specifications`}>
          <SpecsCard iem={left} />
        </CompareDisclosure>
        <CompareDisclosure title={`${right.shortName} specifications`}>
          <SpecsCard iem={right} />
        </CompareDisclosure>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <CompareDisclosure title={`${left.shortName} buying info`}>
          <BuyingCard iem={left} />
        </CompareDisclosure>
        <CompareDisclosure title={`${right.shortName} buying info`}>
          <BuyingCard iem={right} />
        </CompareDisclosure>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <CompareDisclosure title={`${left.shortName} fit guide`}>
          <FinalFitCard iem={left} />
        </CompareDisclosure>
        <CompareDisclosure title={`${right.shortName} fit guide`}>
          <FinalFitCard iem={right} />
        </CompareDisclosure>
      </section>
    </div>
  );
}

function IemSelect({
  label,
  value,
  iems,
  blockedSlug,
  onChange,
}: {
  label: string;
  value: string;
  iems: Iem[];
  blockedSlug: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {iems.map((iem) => (
            <SelectItem key={iem.slug} value={iem.slug} disabled={iem.slug === blockedSlug}>
              {getIemFullName(iem)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function CompareDisclosure({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl soft-panel"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-foreground sm:px-5">
        {title}
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="p-3 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-4">{children}</div>
    </details>
  );
}

function CompareProductCard({ iem, color }: { iem: Iem; color: string }) {
  return (
    <Card className="overflow-hidden bg-card/90">
      <div className="relative aspect-[16/9] bg-background/60">
        <Image
          src={iem.images.main}
          alt={getIemFullName(iem)}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 80vw"
          className="object-cover object-right"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge className="text-black">{formatIemSoundSignature(iem.soundSignature)}</Badge>
          <Badge variant="outline">{formatIemDriverType(iem.driverType)}</Badge>
          <Badge variant="outline">{formatIemPrice(iem)}</Badge>
        </div>
        <h2 className="panel-title mt-4">{getIemFullName(iem)}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{iem.communitySummary}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <MiniScore label="FPS" value={iem.ratings.fps} color={color} />
          <MiniScore label="Imaging" value={iem.ratings.imaging} color={color} />
          <MiniScore label="Value" value={iem.ratings.value} color={color} />
        </div>
        <div className="mt-5 flex items-center justify-between pt-4 soft-divider-top">
          <div>
            <p className="compact-label">Verdict</p>
            <p className="mt-1 font-semibold" style={{ color }}>
              {getIemScoreTone(iem.ratings.fragbasic)}
            </p>
          </div>
          <Link href={`/iems/${iem.slug}`} className="text-sm font-semibold text-brand-hover">
            View detail
          </Link>
        </div>
      </div>
    </Card>
  );
}

function CompareVerdict({ left, right }: { left: Iem; right: Iem }) {
  const fpsWinner = left.ratings.fps >= right.ratings.fps ? left : right;
  const musicWinner = left.ratings.music >= right.ratings.music ? left : right;
  const valueWinner = left.ratings.value >= right.ratings.value ? left : right;

  return (
    <Card className="bg-card/90 p-6">
      <SectionKicker icon={ShieldCheck} label="Quick verdict" />
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <VerdictTile label="FPS edge" value={getIemFullName(fpsWinner)} />
        <VerdictTile label="Music edge" value={getIemFullName(musicWinner)} />
        <VerdictTile label="Value edge" value={getIemFullName(valueWinner)} />
      </div>
    </Card>
  );
}

function VerdictTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg soft-surface p-4">
      <p className="compact-label">{label}</p>
      <p className="mt-2 text-lg font-semibold leading-6 text-foreground">{value}</p>
    </div>
  );
}

function OverlayFrequencyGraph({ left, right }: { left: Iem; right: Iem }) {
  const leftGraph = left.frequencyGraph;
  const rightGraph = right.frequencyGraph;

  if (!leftGraph || !rightGraph) {
    return (
      <Card className="bg-card/80 p-6 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_6%,transparent)]">
        <SectionKicker icon={Radio} label="Frequency response" />
        <p className="mt-4 text-sm text-muted-foreground">
          A measured overlay will appear once both IEMs have local graph points.
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-card/90 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SectionKicker icon={Radio} label="Overlapping frequency response" />
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <LegendSwatch color={leftColor} label={left.shortName} />
          <LegendSwatch color={rightColor} label={right.shortName} />
          <LegendSwatch dashed color="rgba(255,255,255,0.55)" label="Harman IE 2019 v2" />
        </div>
      </div>
      <FrequencyOverlayChart
        leftLabel={left.shortName}
        rightLabel={right.shortName}
        leftPoints={leftGraph.points}
        rightPoints={rightGraph.points}
        target={leftGraph.target}
      />
    </Card>
  );
}

function FrequencyOverlayChart({
  leftLabel,
  rightLabel,
  leftPoints,
  rightPoints,
  target,
}: {
  leftLabel: string;
  rightLabel: string;
  leftPoints: IemFrequencyPoint[];
  rightPoints: IemFrequencyPoint[];
  target: IemFrequencyPoint[];
}) {
  const width = 960;
  const height = 440;
  const padding = { top: 38, right: 30, bottom: 52, left: 54 };
  const minHz = 20;
  const maxHz = 20000;
  const minDb = -10;
  const maxDb = 12;
  const frequencyTicks = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
  const dbTicks = [-10, -5, 0, 5, 10];
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const scale = { minHz, maxHz, minDb, maxDb, chartWidth, chartHeight, left: padding.left, top: padding.top };
  const bands = getCompareFrequencyBandSummaries(leftPoints, rightPoints);

  return (
    <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-lg soft-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="relative w-[900px] max-w-none md:w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${leftLabel} and ${rightLabel} frequency response comparison`}
        className="h-[min(64vh,560px)] min-h-[380px] w-full"
      >
        <rect width={width} height={height} fill="transparent" />
        {dbTicks.map((db) => {
          const y = frequencyY(db, scale);

          return (
            <g key={db}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
              <text x={padding.left - 12} y={y + 4} textAnchor="end" className="fill-muted-foreground text-[12px]">
                {db > 0 ? `+${db}` : db}
              </text>
            </g>
          );
        })}
        {frequencyTicks.map((hz) => {
          const x = frequencyX(hz, scale);

          return (
            <g key={hz}>
              <line x1={x} x2={x} y1={padding.top} y2={height - padding.bottom} stroke="rgba(255,255,255,0.055)" />
              <text x={x} y={height - 18} textAnchor="middle" className="fill-muted-foreground text-[12px]">
                {formatFrequencyTick(hz)}
              </text>
            </g>
          );
        })}
        <text x={padding.left - 36} y={padding.top - 12} className="fill-muted-foreground text-[12px]">
          dB
        </text>
        <path
          d={buildFrequencyPath(target, scale)}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeDasharray="9 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.3"
        />
        <path
          d={buildFrequencyPath(leftPoints, scale)}
          fill="none"
          stroke={leftColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.4"
        />
        <path
          d={buildFrequencyPath(rightPoints, scale)}
          fill="none"
          stroke={rightColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.4"
        />
        {leftPoints.map((point) => (
          <circle key={`left-${point.hz}`} cx={frequencyX(point.hz, scale)} cy={frequencyY(point.db, scale)} r="2" fill={leftColor} />
        ))}
        {rightPoints.map((point) => (
          <circle key={`right-${point.hz}`} cx={frequencyX(point.hz, scale)} cy={frequencyY(point.db, scale)} r="2" fill={rightColor} />
        ))}
      </svg>
      </div>
      <div className="pointer-events-none pb-4 px-24 grid grid-cols-6 gap-2">
        {bands.map((band) => (
          <CompareFrequencyBandCard
            key={band.label}
            band={band}
            leftLabel={leftLabel}
            rightLabel={rightLabel}
          />
        ))}
      </div>
    </div>
  );
}

function RatingBreakdown({ iem, color }: { iem: Iem; color: string }) {
  const ratings = [
    ["Clarity", iem.ratings.clarity],
    ["Soundstage", iem.ratings.soundstage],
    ["Bass", iem.ratings.bass],
    ["Comfort", iem.ratings.comfort],
    ["Build", iem.ratings.build],
    ["Music", iem.ratings.music],
  ] as const;

  return (
    <Card className="bg-card/90 p-6">
      <SectionKicker icon={Activity} label={`${iem.shortName} score breakdown`} />
      <div className="mt-5 space-y-4">
        {ratings.map(([label, value]) => (
          <ScoreBar key={label} label={label} value={value} color={color} />
        ))}
      </div>
    </Card>
  );
}

function ComparisonMatrix({ left, right }: { left: Iem; right: Iem }) {
  const rows = [
    ["Overall", formatIemRating(left.ratings.fragbasic), formatIemRating(right.ratings.fragbasic)],
    ["FPS", formatIemRating(left.ratings.fps), formatIemRating(right.ratings.fps)],
    ["Imaging", formatIemRating(left.ratings.imaging), formatIemRating(right.ratings.imaging)],
    ["Clarity", formatIemRating(left.ratings.clarity), formatIemRating(right.ratings.clarity)],
    ["Soundstage", formatIemRating(left.ratings.soundstage), formatIemRating(right.ratings.soundstage)],
    ["Bass", formatIemRating(left.ratings.bass), formatIemRating(right.ratings.bass)],
    ["Comfort", formatIemRating(left.ratings.comfort), formatIemRating(right.ratings.comfort)],
    ["Build", formatIemRating(left.ratings.build), formatIemRating(right.ratings.build)],
    ["Value", formatIemRating(left.ratings.value), formatIemRating(right.ratings.value)],
    ["Driver", formatIemDriverType(left.driverType), formatIemDriverType(right.driverType)],
    ["Tuning", formatIemSoundSignature(left.soundSignature), formatIemSoundSignature(right.soundSignature)],
    ["Price", formatIemPrice(left), formatIemPrice(right)],
    ["Mic", left.specs.mic ? "Yes" : "No", right.specs.mic ? "Yes" : "No"],
  ] as const;

  return (
    <Card className="overflow-hidden bg-card/90">
      <div className="grid min-w-[720px] grid-cols-[150px_1fr_1fr] bg-background/50 text-sm font-semibold text-foreground soft-divider-bottom">
        <div className="p-4 text-muted-foreground">Metric</div>
        <div className="p-4">{left.shortName}</div>
        <div className="p-4">{right.shortName}</div>
      </div>
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {rows.map(([label, leftValue, rightValue]) => (
          <div
            key={label}
            className="grid min-w-[720px] grid-cols-[150px_1fr_1fr] text-sm shadow-[inset_0_-1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] last:shadow-none"
          >
            <div className="bg-background/35 p-4 text-muted-foreground">{label}</div>
            <div className="p-4 text-foreground">{leftValue}</div>
            <div className="p-4 text-foreground">{rightValue}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReviewCard({ iem }: { iem: Iem }) {
  return (
    <Card className="bg-card/90 p-6">
      <SectionKicker icon={ShieldCheck} label={`${iem.shortName} review summary`} />
      <h2 className="panel-title mt-4">What stands out</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{iem.officialReview.summary}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ListBlock title="Best parts" items={iem.pros.slice(0, 3)} positive />
        <ListBlock title="Watch outs" items={iem.cons.slice(0, 3)} />
      </div>
    </Card>
  );
}

function SpecsCard({ iem }: { iem: Iem }) {
  const specs = [
    ["Driver", iem.specs.driver],
    ["Impedance", iem.specs.impedance],
    ["Sensitivity", iem.specs.sensitivity],
    ["Frequency response", iem.specs.frequencyResponse],
    ["Connector", iem.specs.connector],
    ["Cable type", iem.specs.cableType],
    ["Cable termination", iem.specs.cableTermination],
    ["Shell material", iem.specs.shellMaterial],
    ["Nozzle material", iem.specs.nozzleMaterial],
    ["Detachable cable", iem.specs.detachableCable ? "Yes" : "No"],
    ["Mic", iem.specs.mic ? "Yes" : "No"],
    ["Weight", iem.specs.weightPerEarpiece ?? "Unknown"],
  ] as const;

  return (
    <Card className="bg-card/90 p-6">
      <SectionKicker icon={ScanSearch} label={`${iem.shortName} specifications`} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {specs.map(([label, value]) => (
          <InfoRow key={label} label={label} value={value} />
        ))}
      </div>
    </Card>
  );
}

function BuyingCard({ iem }: { iem: Iem }) {
  return (
    <Card className="bg-card/90 p-6">
      <SectionKicker icon={CircleDollarSign} label={`${iem.shortName} buying info`} />
      <div className="mt-6 space-y-3">
        <InfoRow label="Price" value={`${formatIemPrice(iem)} approx`} />
        <InfoRow label="Availability" value={formatIemAvailability(iem.buying.availability)} />
        <InfoRow label="Ships from" value={iem.buying.shipsFrom ?? "Unknown"} />
        <InfoRow label="Warranty" value={iem.buying.warranty ?? "Seller dependent"} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {iem.buying.stores.map((store) => (
          <Badge key={store.label} variant="outline">
            {store.label}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

function FinalFitCard({ iem }: { iem: Iem }) {
  return (
    <Card className="bg-card/90 p-6">
      <SectionKicker icon={PackageCheck} label={`${iem.shortName} fit guide`} />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <ListBlock title="Pros" items={iem.pros} positive />
        <ListBlock title="Cons" items={iem.cons} />
        <ListBlock title="Best for" items={iem.bestFor.map(formatIemGame)} positive icon={Gamepad2} />
        <ListBlock title="Avoid if" items={iem.avoidIf} icon={CircleOff} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {iem.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

function MiniScore({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-lg soft-surface p-3">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold" style={{ color }}>
        {formatIemScoreLabel(value)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{formatIemRating(value)}/10</p>
    </div>
  );
}

function ListBlock({
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
    <div className="rounded-lg soft-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
            <ListIcon className={positive ? "mt-0.5 size-4 shrink-0 text-[color:var(--iem-hover)]" : "mt-0.5 size-4 shrink-0 text-red-400"} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="grid grid-cols-[96px_1fr_74px] items-center gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.max(0, Math.min(100, value * 10))}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-right text-foreground">
        {formatIemScoreLabel(value)}
        <span className="block text-[11px] text-muted-foreground">{formatIemRating(value)}/10</span>
      </span>
    </div>
  );
}

function SectionKicker({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-[color:var(--iem-hover)]" />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">{label}</p>
    </div>
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

function LegendSwatch({
  color,
  label,
  dashed = false,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={dashed ? "h-0.5 w-7 border-t" : "h-0.5 w-7 rounded-full"}
        style={dashed ? { borderColor: color, borderTopStyle: "dashed" } : { backgroundColor: color }}
      />
      {label}
    </span>
  );
}

type FrequencyChartScale = {
  minHz: number;
  maxHz: number;
  minDb: number;
  maxDb: number;
  chartWidth: number;
  chartHeight: number;
  left: number;
  top: number;
};

type CompareFrequencyBandSummary = {
  label: string;
  range: string;
  leftValue: number;
  rightValue: number;
};

const frequencyBands = [
  { label: "Sub-bass", range: "20-60 Hz", min: 20, max: 60 },
  { label: "Mid-bass", range: "60-200 Hz", min: 60, max: 200 },
  { label: "Mids", range: "200 Hz-1 kHz", min: 200, max: 1000 },
  { label: "Upper mids", range: "1-4 kHz", min: 1000, max: 4000 },
  { label: "Treble", range: "4-10 kHz", min: 4000, max: 10000 },
  { label: "Air", range: "10-20 kHz", min: 10000, max: 20000 },
];

function CompareFrequencyBandCard({
  band,
  leftLabel,
  rightLabel,
}: {
  band: CompareFrequencyBandSummary;
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <div className="min-w-0 rounded-md bg-background/88 p-2 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_7%,transparent),0_10px_24px_rgba(0,0,0,0.10)] backdrop-blur-sm">
      <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {band.label}
      </p>
      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{band.range}</p>
      <div className="mt-2 space-y-1 text-[10px]">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-muted-foreground">{leftLabel}</span>
          <span className="font-semibold" style={{ color: leftColor }}>
            {formatFrequencyBandTone(band.leftValue)} {formatSignedDb(band.leftValue)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-muted-foreground">{rightLabel}</span>
          <span className="font-semibold" style={{ color: rightColor }}>
            {formatFrequencyBandTone(band.rightValue)} {formatSignedDb(band.rightValue)}
          </span>
        </div>
      </div>
    </div>
  );
}

function getCompareFrequencyBandSummaries(
  leftPoints: IemFrequencyPoint[],
  rightPoints: IemFrequencyPoint[],
) {
  return frequencyBands.map((band) => ({
    label: band.label,
    range: band.range,
    leftValue: averageDbInRange(leftPoints, band.min, band.max),
    rightValue: averageDbInRange(rightPoints, band.min, band.max),
  }));
}

function averageDbInRange(points: IemFrequencyPoint[], minHz: number, maxHz: number) {
  const matching = points.filter((point) => point.hz >= minHz && point.hz <= maxHz);
  const sampled = matching.length > 0 ? matching : points;
  const total = sampled.reduce((sum, point) => sum + point.db, 0);

  return Number((total / Math.max(1, sampled.length)).toFixed(1));
}

function formatFrequencyBandTone(value: number) {
  if (value >= 7) return "Very high";
  if (value >= 4) return "High";
  if (value >= 1.5) return "Lifted";
  if (value >= -1.5) return "Neutral";
  if (value >= -4) return "Relaxed";
  return "Recessed";
}

function formatSignedDb(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)} dB`;
}

function buildFrequencyPath(points: IemFrequencyPoint[], scale: FrequencyChartScale) {
  const coordinates = points.map((point) => ({
    x: frequencyX(point.hz, scale),
    y: frequencyY(point.db, scale),
  }));

  if (!coordinates.length) {
    return "";
  }

  if (coordinates.length === 1) {
    return `M ${coordinates[0].x.toFixed(1)} ${coordinates[0].y.toFixed(1)}`;
  }

  return coordinates.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    }

    const previous = coordinates[index - 1];
    const previousControl = coordinates[Math.max(0, index - 2)];
    const next = coordinates[Math.min(coordinates.length - 1, index + 1)];
    const smoothing = 0.18;
    const controlOne = {
      x: previous.x + (point.x - previousControl.x) * smoothing,
      y: previous.y + (point.y - previousControl.y) * smoothing,
    };
    const controlTwo = {
      x: point.x - (next.x - previous.x) * smoothing,
      y: point.y - (next.y - previous.y) * smoothing,
    };

    return `${path} C ${controlOne.x.toFixed(1)} ${controlOne.y.toFixed(1)}, ${controlTwo.x.toFixed(1)} ${controlTwo.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }, "");
}

function frequencyX(hz: number, scale: Pick<FrequencyChartScale, "minHz" | "maxHz" | "chartWidth" | "left">) {
  const min = Math.log10(scale.minHz);
  const max = Math.log10(scale.maxHz);
  const value = Math.log10(Math.max(scale.minHz, Math.min(scale.maxHz, hz)));

  return scale.left + ((value - min) / (max - min)) * scale.chartWidth;
}

function frequencyY(db: number, scale: Pick<FrequencyChartScale, "minDb" | "maxDb" | "chartHeight" | "top">) {
  const normalized = (Math.max(scale.minDb, Math.min(scale.maxDb, db)) - scale.minDb) / (scale.maxDb - scale.minDb);

  return scale.top + scale.chartHeight - normalized * scale.chartHeight;
}

function formatFrequencyTick(hz: number) {
  if (hz >= 1000) {
    return `${hz / 1000}k`;
  }

  return hz.toString();
}

function formatIemScoreLabel(value: number) {
  if (value >= 9) return "Excellent";
  if (value >= 8.25) return "Very strong";
  if (value >= 7.25) return "Good";
  if (value >= 6.25) return "Fair";
  return "Limited";
}

function getValidSlug(slug: string | null, iems: Iem[]) {
  if (!slug) {
    return null;
  }

  return iems.some((iem) => iem.slug === slug) ? slug : null;
}

function getValidComparePair({
  iems,
  requestedLeft,
  requestedRight,
}: {
  iems: Iem[];
  requestedLeft: string | null;
  requestedRight: string | null;
}) {
  const fallbackLeft = iems[0]?.slug ?? "";
  const leftSlug = getValidSlug(requestedLeft, iems) ?? fallbackLeft;
  const rightOptions = iems.filter((iem) => iem.slug !== leftSlug);
  const rightSlug =
    getValidSlug(requestedRight, rightOptions) ??
    rightOptions[0]?.slug ??
    leftSlug;

  return { leftSlug, rightSlug };
}
