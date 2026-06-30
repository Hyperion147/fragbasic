import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Activity,
    Cable,
    CheckCircle2,
    ChevronDown,
    CircleDollarSign,
    CircleOff,
    Gamepad2,
    Link as LinkIcon,
    Mic,
    PackageCheck,
    Plug,
    Radio,
    ScanSearch,
    ShieldCheck,
    Star,
    Weight,
    XCircle,
} from "lucide-react";

import { ClientShareButton } from "@/components/ClientShareButton";
import { JsonLd } from "@/components/json-ld";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTooltip } from "@/components/ui/tooltip";
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
import { buildMetadata, buildProductJsonLd } from "@/lib/seo";
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
    const fullName = getIemFullName(iem);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <JsonLd
                data={buildProductJsonLd({
                    name: fullName,
                    description: `${iem.subtitle} ${iem.communitySummary}`,
                    path: `/iems/${iem.slug}`,
                    image: iem.images.main,
                    brand: iem.brand,
                    price: iem.buying.priceInr,
                    availability: getIemSchemaAvailability(
                        iem.buying.availability,
                    ),
                    category: "gaming IEM",
                })}
            />
            <section className="border-b border-border bg-[radial-gradient(circle_at_78%_18%,color-mix(in_srgb,var(--iem-glow)_12%,transparent),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]">
                <div className="w-full px-4 pt-6 md:px-6 lg:px-8 xl:px-10">
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
                    className="grid w-full gap-8 px-4 py-8 md:px-6 md:py-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.88fr)] lg:px-8 xl:px-10"
                >
                    <div className="min-w-0 flex flex-col justify-end">
                        <div className="flex flex-wrap gap-2">
                            <AccentPill>
                                Under{" "}
                                {iem.priceTier === "under-2000"
                                    ? "INR 2,000"
                                    : "INR 5,000"}
                            </AccentPill>
                            <Badge variant="outline">
                                {formatIemSoundSignature(iem.soundSignature)}
                            </Badge>
                            <Badge variant="outline">
                                {formatIemDriverType(iem.driverType)}
                            </Badge>
                        </div>

                        <h1 className="page-title mt-5 max-w-4xl">
                            {getIemFullName(iem)}
                        </h1>

                        <p className="body-copy mt-3">
                            {iem.subtitle}
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                            <StarRating />
                        </div>

                        <p className="body-copy mt-4 max-w-2xl">
                            {iem.communitySummary}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <p className="mr-2 text-2xl font-semibold">
                                {formatIemPrice(iem)}
                            </p>
                            <AccentPill>
                                {formatIemAvailability(iem.buying.availability)}
                            </AccentPill>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {iem.buying.stores.map((store) => (
                                <StorePill
                                    key={store.label}
                                    label={store.label}
                                    href={store.url}
                                />
                            ))}
                            <IconTooltip label="Open product image">
                                <Button variant="outline" size="icon" asChild>
                                    <Link
                                        href={iem.images.main}
                                        aria-label="Open product image"
                                    >
                                        <LinkIcon className="size-4" />
                                    </Link>
                                </Button>
                            </IconTooltip>
                        </div>
                    </div>

                    <div className="relative min-h-[360px] min-w-0 overflow-hidden rounded-xl soft-panel lg:min-h-[500px]">
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

            <div className="page-section space-y-6">
                <IemDisclosure title="Quick verdict" defaultOpen>
                    <ScorePanel iem={iem} />
                </IemDisclosure>

                <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)]">
                    <IemDisclosure title="Review summary">
                        <ReviewCard iem={iem} />
                    </IemDisclosure>
                    <IemDisclosure title="Score breakdown">
                        <RatingBreakdown iem={iem} />
                    </IemDisclosure>
                </section>

                <IemDisclosure title="Frequency response" defaultOpen>
                    <FrequencyGraphCard iem={iem} />
                </IemDisclosure>

                <section
                    id="specs"
                    className="grid gap-6 lg:grid-cols-[1fr_380px]"
                >
                    <IemDisclosure title="Key specifications">
                        <SpecsCard iem={iem} />
                    </IemDisclosure>
                    <IemDisclosure title="Buying info">
                        <BuyingCard iem={iem} />
                    </IemDisclosure>
                </section>

                <IemDisclosure title="Fit guide">
                    <FinalFitPanel iem={iem} />
                </IemDisclosure>

                <footer className="flex flex-col gap-4 pt-6 text-sm text-muted-foreground soft-divider-top md:flex-row md:items-center md:justify-between">
                    <p>Last updated: {formatReadableDate(iem.updatedAt)}</p>
                    <div className="flex flex-wrap items-center gap-3">
                        <span>Share:</span>
                        <ClientShareButton
                            href={`/iems/${iem.slug}`}
                            label="Share IEM"
                            iconOnly
                        />
                    </div>
                </footer>
            </div>
        </main>
    );
}

function AccentPill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-md border border-[color-mix(in_srgb,var(--iem-hover)_24%,transparent)] bg-[color-mix(in_srgb,var(--iem)_16%,transparent)] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-iem-hover">
            {children}
        </span>
    );
}

function getIemSchemaAvailability(availability: Iem["buying"]["availability"]) {
    if (availability === "in-stock") {
        return "InStock";
    }

    if (availability === "limited") {
        return "LimitedAvailability";
    }

    return undefined;
}

function StarRating() {
    return (
        <div className="flex items-center gap-1 text-iem-hover">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" />
            ))}
        </div>
    );
}

function StorePill({ label, href }: { label: string; href?: string }) {
    const className =
        "inline-flex items-center gap-2 rounded-lg border border-transparent bg-background/65 px-4 py-2 text-sm font-semibold text-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_7%,transparent)] transition-colors hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--iem-hover)_30%,transparent)]";

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

function IemDisclosure({
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
            className="group data-panel"
        >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-foreground sm:px-5">
                {title}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-3 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-4">{children}</div>
        </details>
    );
}

function ScorePanel({ iem }: { iem: Iem }) {
    const scores = [
        { label: "FPS", value: iem.ratings.fps, note: "Competitive placement" },
        { label: "Imaging", value: iem.ratings.imaging, note: "Positioning" },
        { label: "Value", value: iem.ratings.value, note: "Price performance" },
    ];

    return (
        <section className="grid gap-5 soft-panel p-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
                <SectionKicker icon={CheckCircle2} label="Quick verdict" />
                <h2 className="section-title mt-4">
                    {getIemScoreTone(iem.ratings.fragbasic)}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {iem.officialReview.verdict}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                    {iem.bestFor.slice(0, 4).map((game) => (
                        <Badge key={game} variant="outline">
                            {formatIemGame(game)}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                {scores.map((score) => (
                    <div
                        key={score.label}
                        className="soft-surface p-3"
                    >
                        <p className="compact-label font-semibold">
                            {score.label}
                        </p>
                        <p className="mt-3 text-xl font-semibold">
                            {formatIemScoreLabel(score.value)}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {formatIemRating(score.value)}/10
                        </p>
                        <p className="mt-2 text-xs font-semibold text-iem-hover">
                            {score.note}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ReviewCard({ iem }: { iem: Iem }) {
    return (
        <section className="soft-panel p-4">
            <SectionKicker icon={ShieldCheck} label="Review summary" />
            <h2 className="panel-title mt-4">
                What stands out
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {iem.officialReview.summary}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <ListBlock
                    title="Best parts"
                    items={iem.pros.slice(0, 3)}
                    positive
                />
                <ListBlock title="Watch outs" items={iem.cons.slice(0, 3)} />
            </div>

            <div className="mt-6 grid gap-3 rounded-lg soft-surface p-4 text-sm md:grid-cols-2">
                <InfoRow
                    label="Source"
                    value={iem.officialReview.testSetup.source}
                />
                <InfoRow
                    label="Games"
                    value={iem.officialReview.testSetup.testedGames
                        .map(formatIemGame)
                        .join(", ")}
                />
                {iem.officialReview.testSetup.motherboard ? (
                    <InfoRow
                        label="Motherboard"
                        value={iem.officialReview.testSetup.motherboard}
                    />
                ) : null}
                <InfoRow
                    label="Test time"
                    value={iem.officialReview.testSetup.testingDuration}
                />
            </div>
        </section>
    );
}

function ListBlock({
    title,
    items,
    positive = false,
}: {
    title: string;
    items: string[];
    positive?: boolean;
}) {
    const Icon = positive ? CheckCircle2 : XCircle;

    return (
        <div className="rounded-lg soft-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                {title}
            </p>
            <ul className="mt-4 space-y-3">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                        <Icon
                            className={
                                positive
                                    ? "mt-0.5 size-4 shrink-0 text-iem-hover"
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

function RatingBreakdown({ iem }: { iem: Iem }) {
    const ratings = [
        ["Clarity", iem.ratings.clarity],
        ["Soundstage", iem.ratings.soundstage],
        ["Bass", iem.ratings.bass],
        ["Comfort", iem.ratings.comfort],
        ["Build", iem.ratings.build],
        ["Music", iem.ratings.music],
    ] as const;

    return (
        <section className="soft-panel p-4">
            <SectionKicker icon={Activity} label="Score breakdown" />
            <div className="mt-5 space-y-4">
                {ratings.map(([label, value]) => (
                    <ScoreBar key={label} label={label} value={value} compact />
                ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Overall:{" "}
                <span className="font-semibold text-foreground">
                    {formatIemScoreLabel(iem.ratings.fragbasic)}
                </span>{" "}
                ({formatIemRating(iem.ratings.fragbasic)}/10).
            </p>
        </section>
    );
}

function FrequencyGraphCard({ iem }: { iem: Iem }) {
    const graph = iem.frequencyGraph;

    return (
        <section className="soft-panel p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <SectionKicker
                    icon={Radio}
                    label="Measured frequency response"
                />
            </div>

            {graph ? (
                <>
                    <FrequencyResponseChart
                        points={graph.points}
                        target={graph.target}
                        label={iem.shortName}
                    />
                    {graph.note ? (
                        <p className="mt-4 text-sm leading-6 text-muted-foreground">
                            {graph.note}
                        </p>
                    ) : null}
                </>
            ) : (
                <div className="mt-6 rounded-lg bg-background/55 p-6 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_6%,transparent)]">
                    <h2 className="panel-title">
                        No verified graph yet
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        I am not showing an approximated curve for this model. A
                        measured graph will appear here once it has a confident
                        source match.
                    </p>
                </div>
            )}
        </section>
    );
}

function FrequencyResponseChart({
    points,
    target,
    label,
}: {
    points: IemFrequencyPoint[];
    target: IemFrequencyPoint[];
    label: string;
}) {
    const width = 960;
    const height = 430;
    const padding = { top: 34, right: 28, bottom: 50, left: 54 };
    const minHz = 20;
    const maxHz = 20000;
    const minDb = -10;
    const maxDb = 12;
    const frequencyTicks = [
        20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000,
    ];
    const dbTicks = [-10, -5, 0, 5, 10];
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const graphPath = buildFrequencyPath(points, {
        minHz,
        maxHz,
        minDb,
        maxDb,
        chartWidth,
        chartHeight,
        left: padding.left,
        top: padding.top,
    });
    const targetPath = buildFrequencyPath(target, {
        minHz,
        maxHz,
        minDb,
        maxDb,
        chartWidth,
        chartHeight,
        left: padding.left,
        top: padding.top,
    });

    return (
        <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-lg soft-surface scrollbar-none [&::-webkit-scrollbar]:hidden">
            <div className="relative w-240 max-w-none md:w-full">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    role="img"
                    aria-label={`${label} measured frequency response graph`}
                    className="h-[min(64vh,560px)] min-h-[360px] w-full"
                >
                    <rect width={width} height={height} fill="transparent" />
                    {dbTicks.map((db) => {
                        const y = frequencyY(db, {
                            minDb,
                            maxDb,
                            chartHeight,
                            top: padding.top,
                        });

                        return (
                            <g key={db}>
                                <line
                                    x1={padding.left}
                                    x2={width - padding.right}
                                    y1={y}
                                    y2={y}
                                    stroke="rgba(255,255,255,0.08)"
                                />
                                <text
                                    x={padding.left - 12}
                                    y={y + 4}
                                    textAnchor="end"
                                    className="fill-muted-foreground text-[12px]"
                                >
                                    {db > 0 ? `+${db}` : db}
                                </text>
                            </g>
                        );
                    })}
                    {frequencyTicks.map((hz) => {
                        const x = frequencyX(hz, {
                            minHz,
                            maxHz,
                            chartWidth,
                            left: padding.left,
                        });

                        return (
                            <g key={hz}>
                                <line
                                    x1={x}
                                    x2={x}
                                    y1={padding.top}
                                    y2={height - padding.bottom}
                                    stroke="rgba(255,255,255,0.055)"
                                />
                                <text
                                    x={x}
                                    y={height - 18}
                                    textAnchor="middle"
                                    className="fill-muted-foreground text-[12px]"
                                >
                                    {formatFrequencyTick(hz)}
                                </text>
                            </g>
                        );
                    })}
                    <text
                        x={padding.left - 36}
                        y={padding.top - 12}
                        className="fill-muted-foreground text-[12px]"
                    >
                        dB
                    </text>
                    <path
                        d={targetPath}
                        fill="none"
                        stroke="rgba(255,255,255,0.5)"
                        strokeDasharray="9 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                    />
                    <path
                        d={graphPath}
                        fill="none"
                        stroke="var(--iem-hover)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.2"
                    />
                    {points.map((point) => (
                        <circle
                            key={`${point.hz}-${point.db}`}
                            cx={frequencyX(point.hz, {
                                minHz,
                                maxHz,
                                chartWidth,
                                left: padding.left,
                            })}
                            cy={frequencyY(point.db, {
                                minDb,
                                maxDb,
                                chartHeight,
                                top: padding.top,
                            })}
                            r="2.2"
                            fill="var(--iem-hover)"
                        />
                    ))}
                    <g
                        transform={`translate(${padding.left}, ${padding.top - 14})`}
                    >
                        <line
                            x1="0"
                            x2="28"
                            y1="0"
                            y2="0"
                            stroke="var(--iem-hover)"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <text
                            x="38"
                            y="4"
                            className="fill-foreground text-[13px]"
                        >
                            {label}
                        </text>
                        <text
                            x="148"
                            y="4"
                            className="fill-muted-foreground text-[13px]"
                        >
                            Harman IE 2019 v2
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    );
}

function SpecsCard({ iem }: { iem: Iem }) {
    const specs = [
        { icon: Radio, label: "Driver", value: iem.specs.driver },
        { icon: Activity, label: "Impedance", value: iem.specs.impedance },
        {
            icon: ScanSearch,
            label: "Sensitivity",
            value: iem.specs.sensitivity,
        },
        {
            icon: Activity,
            label: "Frequency response",
            value: iem.specs.frequencyResponse,
        },
        { icon: Plug, label: "Connector", value: iem.specs.connector },
        { icon: Cable, label: "Cable type", value: iem.specs.cableType },
        {
            icon: Plug,
            label: "Cable termination",
            value: iem.specs.cableTermination,
        },
        {
            icon: PackageCheck,
            label: "Shell material",
            value: iem.specs.shellMaterial,
        },
        {
            icon: PackageCheck,
            label: "Nozzle material",
            value: iem.specs.nozzleMaterial,
        },
        {
            icon: Cable,
            label: "Detachable cable",
            value: iem.specs.detachableCable ? "Yes" : "No",
        },
        { icon: Mic, label: "Mic", value: iem.specs.mic ? "Yes" : "No" },
        {
            icon: Weight,
            label: "Weight",
            value: iem.specs.weightPerEarpiece ?? "Unknown",
        },
    ];

    return (
        <section className="soft-panel p-4">
            <SectionKicker icon={ScanSearch} label="Key specifications" />
            <div className="mt-5 overflow-hidden soft-surface">
                <table className="data-table">
                    <tbody>
                        {specs.map((spec) => (
                            <tr key={`${spec.label}-${spec.value}`}>
                                <td className="w-10">
                                    <spec.icon className="size-4 text-[color:var(--iem-hover)]" />
                                </td>
                                <td className="w-1/3 text-xs uppercase text-muted-foreground">
                                    {spec.label}
                                </td>
                                <td className="font-medium text-foreground">
                                    {spec.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function BuyingCard({ iem }: { iem: Iem }) {
    return (
        <section className="soft-panel p-4">
            <SectionKicker icon={CircleDollarSign} label="Buying info" />
            <div className="mt-6 space-y-3">
                <InfoRow
                    label="Price in India"
                    value={`${formatIemPrice(iem)} approx`}
                />
                <InfoRow
                    label="Availability"
                    value={formatIemAvailability(iem.buying.availability)}
                />
                <InfoRow
                    label="Ships from"
                    value={iem.buying.shipsFrom ?? "Unknown"}
                />
                <InfoRow
                    label="Warranty"
                    value={iem.buying.warranty ?? "Seller dependent"}
                />
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
        <section className="grid gap-6 soft-panel p-4 lg:grid-cols-[1fr_1fr_1fr_1fr_0.9fr]">
            <ListColumn title="Pros" items={iem.pros} positive />
            <ListColumn title="Cons" items={iem.cons} />
            <ListColumn
                title="Best for"
                items={iem.bestFor.map(formatIemGame)}
                positive
                icon={Gamepad2}
            />
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

function ScoreBar({
    label,
    value,
    compact = false,
}: {
    label: string;
    value: number;
    compact?: boolean;
}) {
    return (
        <div
            className={
                compact
                    ? "grid grid-cols-[96px_1fr_74px] items-center gap-3 text-sm"
                    : "grid grid-cols-[120px_1fr_82px] items-center gap-4 text-sm"
            }
        >
            <span className="text-muted-foreground">{label}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-[color:var(--iem-hover)]"
                    style={{
                        width: `${Math.max(0, Math.min(100, value * 10))}%`,
                    }}
                />
            </div>
            <span className="text-right text-foreground">
                {formatIemScoreLabel(value)}
                <span className="block text-[11px] text-muted-foreground">
                    {formatIemRating(value)}/10
                </span>
            </span>
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
                    <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
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

function buildFrequencyPath(
    points: IemFrequencyPoint[],
    scale: FrequencyChartScale,
) {
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

function frequencyX(
    hz: number,
    scale: Pick<FrequencyChartScale, "minHz" | "maxHz" | "chartWidth" | "left">,
) {
    const min = Math.log10(scale.minHz);
    const max = Math.log10(scale.maxHz);
    const value = Math.log10(Math.max(scale.minHz, Math.min(scale.maxHz, hz)));

    return scale.left + ((value - min) / (max - min)) * scale.chartWidth;
}

function frequencyY(
    db: number,
    scale: Pick<FrequencyChartScale, "minDb" | "maxDb" | "chartHeight" | "top">,
) {
    const normalized =
        (Math.max(scale.minDb, Math.min(scale.maxDb, db)) - scale.minDb) /
        (scale.maxDb - scale.minDb);

    return scale.top + scale.chartHeight - normalized * scale.chartHeight;
}

function formatFrequencyTick(hz: number) {
    if (hz >= 1000) {
        return `${hz / 1000}k`;
    }

    return hz.toString();
}

function formatIemScoreLabel(value: number) {
    if (value >= 9) {
        return "Excellent";
    }

    if (value >= 8.25) {
        return "Very strong";
    }

    if (value >= 7.25) {
        return "Good";
    }

    if (value >= 6.25) {
        return "Fair";
    }

    return "Limited";
}

function formatReadableDate(value: string) {
    return new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));
}
