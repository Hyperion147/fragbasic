"use client";

// === PRIOR LINEAR SPACING + IMPLEMENTATION DEFAULTS (verbatim from prior approved design doc X:\tmp\grok-design-doc-72bf7a7c.md) ===
// FIRST ACTION IN CODE (per finalized design e7f8a9b0 + user decisions): Add this table + locked Defaults as the foundation.
// ALL subsequent changes (including homepage alignment layers for typography/spacing/colors/motion) MUST pass "linear scale check" against this table.
// Any deviation requires explicit justification + measurement in the PR.
// Homepage north star (from home-experience.tsx): full-bleed w-full + space-y-12/16 + p-6/8 bg-card/40 panels + tracking-tighter/tight + exact motion ease [0.22,1,0.36,1].
// User OQ decisions incorporated (final):
// - Q1 Mega outer: New defined hybrid (bg-card/40 base + subtle ring/edge gradient for homepage air; see PR2).
// - Q2 Motion: Minimal / hero-adjacent only (conservative scope; durations 0.18-0.35s; list exact in later PRs).
// - Q3 Wrapper: Introduce light shared SiteSection/ContentPanel (for pages; see site PRs).
// - Q4 Logo: Slight size/weight bump on lg+ (e.g. text-2xl base → text-[1.35rem] or tracking tweak for ultrawide air; see below + PR1/4 QA).
// Navbar PRs 1-4 come FIRST (build directly on prior). Site-wide unification (typography/spacing/colors to homepage) follows.
// === END PRIOR TABLE / DEFAULTS ===

/*
Spacing Scale (Single Source of Truth) — 4 px base rhythm (Tailwind scale). No more ad-hoc text-[9px], mt-5 mixed with py-1, space-y-1 vs space-y-4.

| Scale | Tailwind       | Navbar Uses                                      | Rationale (matches site)          |
|-------|----------------|--------------------------------------------------|-----------------------------------|
| 4px   | `gap-1`, `py-0.5` | Tight chevrons, badge padding, list separators  | Micro adjustments (cf. StatPill) |
| 8px   | `gap-2`, `py-1`, `px-2`, `mt-1` | Icon-text gaps inside some links, secondary desc | Common in cards (`mt-1`)         |
| 12px  | `gap-3`, `py-1.5`, `px-3`, `mt-1.5` | Logo gap (locked to gap-3 per Implementation Defaults), primary link internals, feature icon+text, mega section inner lists | Dominant in `MousepadCard`, finder icons |
| 16px  | `gap-4`, `p-4`, `py-2`, `mt-4`, `space-y-4` | Mega column padding (locked p-4), major section spacing, nav trigger padding, right actions gap, mobile sections | Matches `p-5`/`p-6` content cards + `py-8` page sections (scaled for density) |
| 20px  | `p-5`, `py-2.5` (avoid), `mt-5` (deprecate) | Only where legacy content cards use `p-5` (navbar mega uses locked p-4 per Implementation Defaults; see that subsection) | Controlled/avoid use only |

Header/container: `px-4 md:px-6 lg:px-8` (matches every page section wrapper).  
Logo area: `gap-3`.  
Mega columns: uniform `p-4`, internal `mt-4 space-y-3`.  
All interactive items (triggers, links, mobile buttons): `px-3 py-1.5` base + consistent `rounded-xl`.  
Dividers: `border-border/70` (consistent with cards).  
Icon containers: single standard — `size-8 rounded-xl border border-border/80` for all mega icons (feature + feel). Feature/feel share the same treatment.

Implementation Defaults (locked choices):
- Mega column padding + rhythm: `p-4` + `mt-4 space-y-3` (all columns).
- Icon size/radius (mega): `size-8 rounded-xl border border-border/80` (unified for feature *and* feel links; no size-7 variant).
- Gaps: logo `gap-3`; right actions `gap-3`; feature/feel icon-to-text `gap-3`.
- Interactive item padding: `px-3 py-1.5` base.
- Dividers: `border-border/70`.
- Mega outer width: `max-w-[960px]`.
- Right actions: icon-button treatment for search affordance.
- All other "or" tunables resolved to the above.

These defaults are the foundation. Homepage alignment (tracking-tighter on logo/nav, generous air via outer wrappers where appropriate, bg-card/40 hybrid per OQ1, conservative motion per OQ2, slight logo bump on lg+ per OQ4) is **additive only** and must not violate the locked prior scale. Strict enforcement in PR1+ (first action: this comment block + scale check before any diff).

See finalized design X:\tmp\grok-design-doc-e7f8a9b0.md for full before/after, Mermaid, PR gates, Density Preservation Rules (for later site pages), and user OQ resolutions.
*/

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowRight,
    ChevronRight,
    Gauge,
    Grid2x2,
    Menu,
    Shield,
    Sparkles,
    Star,
    Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { brandConfig } from "@/lib/brands";
import { cn } from "@/lib/utils";

const brandLinks = Object.values(brandConfig).map((brand) => ({
    label: brand.name,
    href: `/mousepads/brands/${brand.slug}`,
}));

const directNavItems = [
    { label: "Compare", href: "/mousepads/compare" },
    { label: "Guides", href: "/mousepads/guides" },
    { label: "Finder", href: "/mousepads/finder" },
];

const mobileNavItems = [
    { label: "All Mousepads", href: "/mousepads" },
    { label: "Universal Compare", href: "/mousepads/compare/universal" },
    { label: "Finder", href: "/mousepads/finder" },
    { label: "Compare Hub", href: "/mousepads/compare" },
    { label: "Brands", href: "/mousepads/brands/artisan" },
];
const mousepadMenuLinks: Array<{
    title: string;
    body: string;
    href: string;
    icon: typeof Grid2x2;
    badge?: string;
}> = [
    {
        title: "All Mousepads",
        body: "Browse the full database by feel, surface & availability",
        href: "/mousepads",
        icon: Grid2x2,
    },
    {
        title: "Universal Compare",
        body: "Build your own 2-3 pad matchup",
        href: "/mousepads/compare/universal",
        icon: Gauge,
    },
    {
        title: "Mousepad Finder",
        body: "Get personalized recommendations",
        href: "/mousepads/finder",
        icon: Star,
    },
    {
        title: "Compare Hub",
        body: "Published head-to-heads",
        href: "/mousepads/compare",
        icon: Sparkles,
    },
] as const;
const feelLinks = [
    {
        title: "Control",
        body: "More stopping power",
        href: "/mousepads?category=control",
        icon: Shield,
    },
    {
        title: "Balanced",
        body: "Even speed & control",
        href: "/mousepads?category=balanced-control",
        icon: Gauge,
    },
    {
        title: "Speed",
        body: "More glide & fast feel",
        href: "/mousepads?category=speed",
        icon: Zap,
    },
] as const;
const comparisonLinks = [
    {
        title: "Artisan Zero vs LGG Saturn Pro",
        href: "/mousepads/compare/artisan-zero-soft-vs-lgg-saturn-pro-soft",
    },
    {
        title: "LGG Saturn Pro vs Artisan Type-99",
        href: "/mousepads/compare/lgg-saturn-pro-soft-vs-artisan-type-99-soft",
    },
    {
        title: "Artisan Zero vs Pulsar Hyperion",
        href: "/mousepads/compare/artisan-zero-soft-vs-pulsar-lgg-hyperion-soft",
    },
    {
        title: "Zowie G-SR III vs LGG Saturn Pro",
        href: "/mousepads/compare/zowie-g-sr-iii-vs-lgg-saturn-pro-soft",
    },
] as const;

export function SiteNavbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-8">
                <Link href="/" className="group flex items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-tighter lg:text-[1.35rem]">
                        FRAGBASIC
                        <span className="text-xs text-secondary-foreground">
                            .FUN
                        </span>
                    </h1>
                </Link>

                <DesktopNavigation pathname={pathname} />

                <div className="hidden items-center gap-3 md:flex">
                    {/* Right actions: locked icon-button (per prior Implementation Defaults + OQ1 hybrid styling) + Finder button. Fake Input removed for purposeful affordance. */}
                    <Button size="sm" asChild variant="outline">
                        <Link href="/mousepads/finder">Finder</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/mousepads/compare/universal">Universal Compare</Link>
                    </Button>
                </div>

                <MobileNavigation />
            </div>
        </header>
    );
}

function DesktopNavigation({ pathname }: { pathname: string }) {
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-3 py-1.5 tracking-tight">Mousepads</NavigationMenuTrigger>
                    <NavigationMenuContent className="left-1/2 -translate-x-1/2">
                        {/* Mega: locked 960px cap + uniform linear rhythm (p-4 + mt-4 space-y-3 per prior Implementation Defaults) + new defined hybrid bg per OQ1 (bg-card/40 + subtle ring/edge for homepage air) */}
                        <div className="w-full max-w-[960px] overflow-hidden rounded-3xl border border-border bg-card/40 ring-1 ring-border/50">
                            <div className="grid grid-cols-[1.1fr_1fr_1.2fr_1fr_1.15fr]">
                                <div className="border-r border-border p-4">
                                    <MousepadsMenuHeading title="Mousepads" />
                                    <div className="mt-4 space-y-3">
                                        {mousepadMenuLinks.map((item) => (
                                            <MousepadsMenuFeatureLink
                                                key={item.title}
                                                href={item.href}
                                                title={item.title}
                                                body={item.body}
                                                icon={item.icon}
                                                badge={item.badge}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="border-r border-border/70 p-4">
                                    <MousepadsMenuHeading title="Browse by feel" />
                                    <div className="mt-4 space-y-3">
                                        {feelLinks.map((item) => (
                                            <MousepadsMenuFeelLink
                                                key={item.title}
                                                href={item.href}
                                                title={item.title}
                                                body={item.body}
                                                icon={item.icon}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="border-r border-border/70 p-4">
                                    <MousepadsMenuHeading title="Popular comparisons" />
                                    <div className="mt-4 space-y-3">
                                        {comparisonLinks.map((item) => (
                                            <NavigationMenuLink
                                                key={item.title}
                                                asChild
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="rounded-md px-0 py-1.5 text-sm leading-6 text-foreground/78 hover:bg-transparent hover:text-foreground focus:bg-transparent flex justify-between"
                                                >
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="size-4 text-muted-foreground" />
                                                </Link>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="mt-4"
                                    >
                                        <Link href="/mousepads/compare">
                                            View all comparisons
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="border-r border-border/70 p-4">
                                    <MousepadsMenuHeading title="Top brands" />
                                    <div className="mt-4 space-y-2">
                                        {brandLinks.map((item) => (
                                            <NavigationMenuLink
                                                key={item.href}
                                                asChild
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center justify-between rounded-md px-0 py-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/85 hover:bg-transparent hover:text-foreground focus:bg-transparent"
                                                >
                                                    <span>{item.label}</span>
                                                    <ChevronRight className="size-4 text-muted-foreground" />
                                                </Link>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="mt-4"
                                    >
                                        <Link href="/mousepads/brands/artisan">
                                            View all brands
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="relative min-h-[290px] overflow-hidden bg-black">
                                    <Image
                                        src="/hero-bg.png"
                                        alt="Mousepad stack"
                                        fill
                                        priority
                                        sizes="240px"
                                        className="object-cover object-right"
                                    />

                                </div>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {directNavItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                            asChild
                            className={cn(
                                navigationMenuTriggerStyle,
                                "px-3 py-1.5 tracking-tight",
                                isActivePath(pathname, item.href)
                                    ? "bg-muted text-foreground"
                                    : ""
                            )}
                        >
                            <Link href={item.href}>{item.label}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function MousepadsMenuHeading({ title }: { title: string }) {
    return (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {title}
        </p>
    );
}

function isActivePath(pathname: string, href: string) {
    if (href === "/") {
        return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

function MousepadsMenuFeatureLink({
    href,
    title,
    body,
    icon: Icon,
    badge,
}: {
    href: string;
    title: string;
    body: string;
    icon: typeof Grid2x2;
    badge?: string;
}) {
    return (
        <NavigationMenuLink asChild>
            <Link
                href={href}
                className="flex items-start gap-3 rounded-xl px-0 py-1.5 hover:bg-transparent focus:bg-transparent"
            >
                {/* Unified icon per prior Implementation Defaults (size-8 rounded-xl border) */}
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-white/[0.03]">
                    <Icon className="size-4 text-foreground/82" />
                </span>
                <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        {title}
                        {badge ? (
                            <span className="rounded-md border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-foreground/76">
                                {badge}
                            </span>
                        ) : null}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {body}
                    </span>
                </span>
            </Link>
        </NavigationMenuLink>
    );
}

function MousepadsMenuFeelLink({
    href,
    title,
    body,
    icon: Icon,
}: {
    href: string;
    title: string;
    body: string;
    icon: typeof Shield;
}) {
    return (
        <NavigationMenuLink asChild>
            <Link
                href={href}
                className="flex items-start gap-3 rounded-xl px-0 py-1.5 hover:bg-transparent focus:bg-transparent"
            >
                {/* Unified to prior Implementation Defaults (size-8 rounded-xl) */}
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl border border-border/80">
                    <Icon className="size-4 text-foreground/84" />
                </span>
                <span>
                    <span className="block text-sm font-medium text-foreground">
                        {title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {body}
                    </span>
                </span>
            </Link>
        </NavigationMenuLink>
    );
}

function MobileNavigation() {
    const pathname = usePathname();

    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-80">
                    <div className="mt-8 space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div>
                                <p className="text-lg font-semibold tracking-tight">
                                    FRAGBASIC
                                    <span className="text-[10px] text-secondary-foreground">
                                        .FUN
                                    </span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Mousepad data, finder, and compare tools
                                </p>
                            </div>
                        </Link>

                        <div className="space-y-3">
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                Explore
                            </p>
                            <nav className="grid gap-2">
                            {mobileNavItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant={
                                        isActivePath(pathname, item.href)
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    className="justify-between rounded-2xl px-4 py-5"
                                    asChild
                                >
                                    <Link href={item.href}>
                                        {item.label}
                                        <ChevronRight className="size-4 text-muted-foreground" />
                                    </Link>
                                </Button>
                            ))}
                            </nav>
                        </div>

                        <div className="space-y-3 border-t border-border pt-4">
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                Browse brands
                            </p>
                            <div className="grid gap-2">
                            {brandLinks.map((item) => (
                                <Button
                                    key={item.href}
                                    variant="outline"
                                    className="justify-between rounded-2xl px-4 py-5"
                                    asChild
                                >
                                    <Link href={item.href}>
                                        {item.label}
                                        <ChevronRight className="size-4 text-muted-foreground" />
                                    </Link>
                                </Button>
                            ))}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
