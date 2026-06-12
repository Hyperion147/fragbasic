"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
    ArrowRight,
    CheckCircle2,
    CircleDot,
    Crosshair,
    Gamepad2,
    Keyboard,
    Monitor,
    Mouse,
    SlidersHorizontal,
    Sparkles,
    Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BrandPreview = {
    slug: string;
    name: string;
    count: number;
};

type BrandPanelEntry = {
    slug: string;
    name: string;
    countLabel: string;
    href: string;
    logoSrc: string;
    logoAlt: string;
};

type ComparisonPreview = {
    slug: string;
    leftName: string;
    rightName: string;
    tags: string[];
    leftColor: string;
    rightColor: string;
};

type Props = {
    mousepadCount: number;
    brandCount: number;
    brands: BrandPreview[];
    comparisons: ComparisonPreview[];
};

const gearCategories = [
    {
        title: "Mousepads",
        countLabel: "Tracked products",
        href: "/mousepads",
        icon: Target,
        tone: "from-zinc-950 via-zinc-900 to-neutral-800",
    },
    {
        title: "Mice",
        countLabel: "Coming soon",
        href: "/mousepads",
        icon: Mouse,
        tone: "from-neutral-950 via-zinc-900 to-stone-800",
    },
    {
        title: "Keyboards",
        countLabel: "Coming soon",
        href: "/mousepads",
        icon: Keyboard,
        tone: "from-zinc-950 via-neutral-900 to-slate-800",
    },
    {
        title: "Monitors",
        countLabel: "Coming soon",
        href: "/mousepads",
        icon: Monitor,
        tone: "from-neutral-950 via-stone-950 to-zinc-800",
    },
] as const;

const games = ["Valorant", "CS2", "Apex", "More"] as const;
const preferences = ["More Control", "Balanced", "More Speed"] as const;
const visualSpectrumPads = [
    { name: "QcK", color: "#75d66d" },
    { name: "G-SR-SE\nGris", color: "#58c37a" },
    { name: "Saturn\nPro", color: "#4fd19a" },
    { name: "Zero\nSoft", color: "#35d6bf" },
    { name: "AC Zero", color: "#35c9df" },
    { name: "Equate\nPlus V2", color: "#34abea" },
    { name: "AC II", color: "#3f86f5" },
    { name: "Hyperion", color: "#6858ff" },
    { name: "Otsu\nSoft", color: "#9367f2" },
    { name: "Hien", color: "#c15ac7" },
    { name: "Neptune", color: "#d44d91" },
    { name: "Raiden", color: "#ff755e" },
] as const;
const brandLogoMap = {
    artisan: "/brands-logo/artisan-logo.png",
    lgg: "/brands-logo/lgg-logo.png",
    steelseries: "/brands-logo/steelseries-logo.png",
    xraypad: "/brands-logo/xraypad-logo.png",
    zowie: "/brands-logo/zowie-logo.png",
} as const;
const featuredBrandEntries: BrandPanelEntry[] = [
    {
        slug: "pulsar",
        name: "Pulsar",
        countLabel: "1 collab product",
        href: "/mousepads/pulsar-lgg-hyperion-soft",
        logoSrc: "/brands-logo/pulsar-logo.png",
        logoAlt: "Pulsar logo",
    },
];

export function HomeExperience({
    mousepadCount,
    brandCount,
    brands,
    comparisons,
}: Props) {
    const [activeGame, setActiveGame] =
        useState<(typeof games)[number]>("Valorant");
    const [activePreference, setActivePreference] =
        useState<(typeof preferences)[number]>("Balanced");

    const finderResults = useMemo(() => {
        if (activePreference === "More Speed") {
            return ["Aqua Control II", "LGG Neptune", "Raiden"];
        }

        if (activePreference === "More Control") {
            return ["Saturn Pro", "AC Zero", "QcK Heavy"];
        }

        if (activeGame === "Apex") {
            return ["Hyperion", "Hayate Otsu", "AC Plus"];
        }

        return ["Artisan Zero", "Saturn Pro", "AC Zero"];
    }, [activeGame, activePreference]);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Hero mousepadCount={mousepadCount} brandCount={brandCount} />

            <div className="w-full space-y-4 px-4 py-4 md:px-6 lg:px-8">
                <GearGrid mousepadCount={mousepadCount} />
                <PopularComparisons comparisons={comparisons} />
                <FinderPanel
                    activeGame={activeGame}
                    activePreference={activePreference}
                    results={finderResults}
                    onGameChange={setActiveGame}
                    onPreferenceChange={setActivePreference}
                />
                <BrandsPanel brands={brands} />
                <SpectrumPanel />
                <WhyPanel />
            </div>
        </main>
    );
}

function Hero({
    mousepadCount,
    brandCount,
}: {
    mousepadCount: number;
    brandCount: number;
}) {
    return (
        <section className="relative overflow-hidden border-b border-border bg-background">
            <div className="relative z-10 grid min-h-130 w-full gap-8 md:grid-cols-[0.92fr_1.08fr]">
                <div className="flex flex-col justify-center ml-20 py-24 md:py-40 px-4 md:px-6 lg:px-8">
                    <Badge
                        variant="outline"
                        className="w-fit gap-2 rounded-md bg-background/60 px-3 py-2 text-[11px] uppercase tracking-[0.16em]"
                    >
                        <span className="size-2 rounded-full bg-emerald-400" />
                        Competitive gaming gear database
                    </Badge>

                    <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-normal text-foreground md:text-7xl">
                        Find the gear that matches how you play.
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                        In-depth data. Real-world experience. No fluff. Just
                        gear that fits.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button size="lg" asChild>
                            <Link href="/compare/universal">
                                Compare Gear
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/mousepads">Browse Mousepads</Link>
                        </Button>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <Metric
                            icon={CheckCircle2}
                            label={`${mousepadCount} mousepads`}
                        />
                        <Metric
                            icon={CircleDot}
                            label={`${brandCount} brands`}
                        />
                        <Metric
                            icon={Crosshair}
                            label="Community + personal data"
                        />
                    </div>
                </div>

                <div className="relative hidden md:block ">
                    <Image
                        src="/hero-bg.png"
                        alt="hero-bg"
                        width="1080"
                        height="1920"
                    />
                </div>
            </div>
        </section>
    );
}

function Metric({
    icon: Icon,
    label,
}: {
    icon: typeof CheckCircle2;
    label: string;
}) {
    return (
        <span className="inline-flex items-center gap-2">
            <Icon className="size-4" />
            {label}
        </span>
    );
}

function GearGrid({ mousepadCount }: { mousepadCount: number }) {
    return (
        <section className="grid gap-3 md:grid-cols-4">
            {gearCategories.map((item) => {
                const Icon = item.icon;
                const countLabel =
                    item.title === "Mousepads"
                        ? `${mousepadCount} products`
                        : item.countLabel;

                return (
                    <div key={item.title}>
                        <Link
                            href={item.href}
                            className={cn(
                                "group relative block min-h-56 overflow-hidden rounded-lg border border-border bg-gradient-to-br p-6",
                                item.tone,
                            )}
                        >
                            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:6px_6px]" />
                            <Icon className="absolute right-6 bottom-6 size-28 text-white/10 transition-transform duration-300 group-hover:scale-110" />
                            <div className="relative">
                                <h2 className="text-2xl font-semibold tracking-normal">
                                    {item.title}
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {countLabel}
                                </p>
                                <p className="mt-6 inline-flex items-center gap-2 text-sm">
                                    Explore
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </p>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </section>
    );
}

function PopularComparisons({
    comparisons,
}: {
    comparisons: ComparisonPreview[];
}) {
    return (
        <section className="rounded-lg border border-border bg-card/40 p-4">
            <SectionHeader
                title="Popular Comparisons"
                href="/compare"
                action="View all comparisons"
            />
            <div className="mt-3 grid gap-3 md:grid-cols-3">
                {comparisons.map((comparison) => (
                    <Link
                        key={comparison.slug}
                        href={`/compare/${comparison.slug}`}
                        className="group grid min-h-36 grid-cols-[1fr_auto_1fr] overflow-hidden rounded-lg border border-border bg-background/65 transition-colors hover:border-primary/55"
                    >
                        <CompareSide
                            name={comparison.leftName}
                            color={comparison.leftColor}
                        />
                        <div className="z-10 flex items-center justify-center px-3">
                            <span className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold">
                                VS
                            </span>
                        </div>
                        <CompareSide
                            name={comparison.rightName}
                            color={comparison.rightColor}
                            align="right"
                        />
                        <div className="col-span-3 flex gap-2 px-4 pb-3">
                            {comparison.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="rounded-md text-[10px]"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function CompareSide({
    name,
    color,
    align,
}: {
    name: string;
    color: string;
    align?: "right";
}) {
    return (
        <div
            className={cn(
                "relative flex items-center p-5 text-base font-semibold",
                align === "right" ? "justify-end text-right" : "",
            )}
        >
            <div
                className="absolute inset-0 opacity-25"
                style={{
                    background: `linear-gradient(135deg, ${color}, transparent 70%)`,
                }}
            />
            <span className="relative">{name}</span>
        </div>
    );
}

function FinderPanel({
    activeGame,
    activePreference,
    results,
    onGameChange,
    onPreferenceChange,
}: {
    activeGame: (typeof games)[number];
    activePreference: (typeof preferences)[number];
    results: string[];
    onGameChange: (game: (typeof games)[number]) => void;
    onPreferenceChange: (preference: (typeof preferences)[number]) => void;
}) {
    return (
        <section className="grid gap-5 rounded-lg border border-border bg-card/40 p-5 lg:grid-cols-[1.05fr_1fr_1fr_1.2fr]">
            <div>
                <h2 className="text-2xl font-semibold tracking-normal">
                    Not sure what to choose?
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Answer a few quick questions and get mousepads that fit your
                    playstyle.
                </p>
                <Button className="mt-6" asChild>
                    <Link href="/compare/universal">
                        Find your mousepad
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>

            <FinderStep label="Step 1" title="What do you play?">
                {games.map((game) => (
                    <FinderButton
                        key={game}
                        active={activeGame === game}
                        label={game}
                        onClick={() => onGameChange(game)}
                    />
                ))}
            </FinderStep>

            <FinderStep label="Step 2" title="What do you prefer?">
                {preferences.map((preference) => (
                    <FinderButton
                        key={preference}
                        active={activePreference === preference}
                        label={preference}
                        onClick={() => onPreferenceChange(preference)}
                    />
                ))}
            </FinderStep>

            <FinderStep label="Step 3" title="Get recommendations">
                <div className="grid grid-cols-3 gap-2">
                    {results.map((result, index) => (
                        <motion.div
                            key={result}
                            layout
                            className="rounded-lg border border-border bg-background/75 p-3"
                        >
                            <div className="h-12 rounded-md bg-gradient-to-br from-zinc-800 to-black" />
                            <p className="mt-2 truncate text-xs font-medium">
                                {result}
                            </p>
                            <p className="text-[11px] text-emerald-400">
                                {95 - index * 3}% match
                            </p>
                        </motion.div>
                    ))}
                </div>
            </FinderStep>
        </section>
    );
}

function FinderStep({
    label,
    title,
    children,
}: {
    label: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <Badge variant="outline" className="rounded-md text-[10px]">
                {label}
            </Badge>
            <h3 className="mt-4 text-base font-semibold tracking-normal">
                {title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">{children}</div>
        </div>
    );
}

function FinderButton({
    active,
    label,
    onClick,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "rounded-full border px-3 py-2 text-xs transition-colors",
                active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background/75 text-muted-foreground hover:text-foreground",
            )}
        >
            {label}
        </button>
    );
}

function BrandsPanel({ brands }: { brands: BrandPreview[] }) {
    const brandEntries: BrandPanelEntry[] = [
        ...brands.map((brand) => ({
            slug: brand.slug,
            name: brand.name,
            countLabel: `${brand.count} products`,
            href: `/brands/${brand.slug}`,
            logoSrc:
                brandLogoMap[brand.slug as keyof typeof brandLogoMap] ?? "",
            logoAlt: `${brand.name} logo`,
        })),
        ...featuredBrandEntries,
    ].filter((brand) => brand.logoSrc);

    return (
        <section className="relative overflow-hidden rounded-lg border border-border bg-card/40 p-5">
            
            <div className="relative">
                <SectionHeader
                    title="All Brands"
                    href="/brands/artisan"
                    action="View brands"
                />
                <div className="mt-5 grid gap-2 md:grid-cols-3 xl:grid-cols-6">
                    {brandEntries.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={brand.href}
                            className="group px-3 py-4 text-center"
                        >
                            <div className="relative flex h-14 items-center justify-center">
                                <Image
                                    src={brand.logoSrc}
                                    alt={brand.logoAlt}
                                    width={260}
                                    height={88}
                                    className="w-auto object-contain brightness-[1.08] contrast-[1.02] invert"
                                />
                            </div>
                            <p className="mt-8 text-xs text-muted-foreground transition-colors group-hover:text-foreground/72">
                                {brand.countLabel}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SpectrumPanel() {
    return (
        <section className="overflow-hidden rounded-lg border border-border bg-card/40 p-5">
            <SectionHeader
                title="The Speed-Control Spectrum"
                href="/mousepads"
                action="Explore all mousepads"
            />

            <div className="mt-7 overflow-x-auto pb-2">
                <div className="relative min-w-[980px] px-3 pt-3 pb-3">
                    <div className="absolute top-[19px] right-3 left-3 h-0.5 rounded-full bg-gradient-to-r from-lime-300 via-cyan-300 via-45% via-blue-400 via-65% via-violet-500 via-78% via-pink-500 to-orange-400 shadow-[0_0_18px_rgba(99,224,173,0.45)]" />

                    <div className="flex w-full items-start gap-5 w-full">
                        <div className="flex justify-between w-full">
                            {visualSpectrumPads.map((pad) => (
                                <div
                                    key={pad.name}
                                    className="relative flex flex-col items-center"
                                >
                                    <span
                                        className="relative z-10 size-4 rounded-full border-2 border-background ring-2 ring-white/35 shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                                        style={{ backgroundColor: pad.color }}
                                    />
                                    <span className="mt-5 whitespace-pre-line text-center text-sm font-medium leading-5 text-foreground/88">
                                        {pad.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-full items-end justify-between">
                        <div className="text-left">
                            <p className="text-sm font-bold uppercase tracking-[0.14em]">
                                Control
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                More stopping power
                            </p>
                        </div>
                        <div className="flex justify-center pt-3">
                            <Button variant="outline" asChild>
                                <Link href="/mousepads">
                                    Show all mousepads
                                </Link>
                            </Button>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold uppercase tracking-[0.14em]">
                                Speed
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                More glide
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WhyPanel() {
    return (
        <section className="grid overflow-hidden rounded-lg border border-border bg-card/40 md:grid-cols-[0.7fr_1fr]">
            <div className="relative min-h-106 bg-gradient-to-br from-zinc-900 via-neutral-950 to-stone-900">
                <Image src="/why-this-exist.png" alt="why-this-exist" fill  />
            </div>
            <div className="p-8 justify-center h-full flex flex-col">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    Why this exists
                </p>
                <h2 className="mt-2 text-5xl font-semibold tracking-normal">
                    Real data. Real experience.
                </h2>
                <p className="mt-4 max-w-xl text-2xl leading-8 text-muted-foreground">
                    I have spent years testing gear, reading forums, and
                    learning what actually matters in game. This site is built
                    to make that knowledge easy to find and actually useful.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <Metric icon={Sparkles} label="Tested by me" />
                    <Metric icon={Gamepad2} label="Community insights" />
                    <Metric icon={SlidersHorizontal} label="Always updating" />
                </div>
            </div>
        </section>
    );
}

function SectionHeader({
    title,
    href,
    action,
}: {
    title: string;
    href: string;
    action: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-normal">{title}</h2>
            <Button variant="ghost" size="sm" asChild>
                <Link href={href}>
                    {action}
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
        </div>
    );
}
