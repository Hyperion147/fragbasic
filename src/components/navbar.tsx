"use client";
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
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";

const directNavItems = [
    { label: "GlassPads", href: "/mousepads/glasspads" },
    { label: "IEMs", href: "/iems" },
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
] as const;
const accessoryMenuLinks: Array<{
    title: string;
    body: string;
    href: string;
    icon: typeof Sparkles;
    badge?: string;
}> = [
    {
        title: "Mouse Skates",
        body: "Fast-to-slow skate spectrum and material guide",
        href: "/accessories/mouse-skates",
        icon: Sparkles,
        badge: "New",
    },
    {
        title: "Browse Skates",
        body: "Filter by company, material, fastest, and slowest",
        href: "/accessories/mouse-skates/browse",
        icon: Grid2x2,
    },
    {
        title: "Compare Skates",
        body: "Pick 2-3 skates for a skate-specific matchup",
        href: "/accessories/mouse-skates/compare",
        icon: Gauge,
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
const bestGuideLinks = [
    {
        title: "Best mousepads home",
        href: "/best",
    },
    {
        title: "Best control mousepads",
        href: "/best/control-mousepads",
    },
    {
        title: "Best speed mousepads",
        href: "/best/speed-mousepads",
    },
    {
        title: "Best VALORANT mousepads",
        href: "/best/valorant-mousepads",
    },
    {
        title: "Best CS2 mousepads",
        href: "/best/cs2-mousepads",
    },
] as const;

export function SiteNavbar() {
    const pathname = usePathname();
    const compareHref = pathname.startsWith("/iems")
        ? "/iems/compare"
        : "/mousepads/compare/universal";
    const compareLabel = pathname.startsWith("/iems")
        ? "IEM Compare"
        : "Universal Compare";

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-10">
                <Link href="/" className="group flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Fragbasic"
                        width={195}
                        height={449}
                        className="size-10 transition-opacity group-hover:opacity-88"
                    />
                    <p className="text-xl font-semibold lg:text-[1.25rem]">
                        FRAGBASIC
                        <span className="text-xs text-secondary-foreground">
                            .FUN
                        </span>
                    </p>
                </Link>

                <DesktopNavigation pathname={pathname} />

                <div className="hidden items-center gap-4 md:flex">
                    {pathname === "/" ? (
                        <Button size="sm" variant="outline" asChild>
                            <Link href="https://forms.gle/5b1QejGptx63eQHw9">
                                <Sparkles className="size-4" />
                                Submit a Review
                            </Link>
                        </Button>
                    ) : null}
                    <Button size="sm" asChild>
                        <Link href={compareHref}>
                            <Gauge className="size-4" />
                            {compareLabel}
                        </Link>
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
                    <NavigationMenuTrigger className="px-3 py-1.5 tracking-tight">
                        Mousepads
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-full overflow-hidden rounded-3xl border border-border bg-card/40 ring-1 ring-border/50 shadow-2xl shadow-black/10">
                            <div className="grid grid-cols-[1.1fr_1fr_1.2fr_1fr]">
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

                                <div className="border-r border-border/70 p-4 w-60">
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

                                <div className="border-r border-border/70 p-4 w-90">
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
                                        className="mt-4 w-full"
                                    >
                                        <Link href="/mousepads/compare/universal">
                                            Open Universal Compare
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="border-r border-border/70 p-4 w-60">
                                    <MousepadsMenuHeading title="Best pages" />
                                    <div className="mt-4 space-y-4">
                                        <div className="space-y-2">
                                            {bestGuideLinks.map((item) => (
                                                <NavigationMenuLink
                                                    key={item.href}
                                                    asChild
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="flex items-center justify-between rounded-md px-0 py-1.5 text-sm text-foreground/85 hover:bg-transparent hover:text-foreground focus:bg-transparent"
                                                    >
                                                        <span>{item.title}</span>
                                                        <ChevronRight className="size-4 text-muted-foreground" />
                                                    </Link>
                                                </NavigationMenuLink>
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="mt-4 w-full align-bottom"
                                    >
                                        <Link href="/best">
                                            Open best pages
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-3 py-1.5 tracking-tight">
                        Accessories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[420px] overflow-hidden rounded-3xl border border-border bg-card/40 p-4 ring-1 ring-border/50 shadow-2xl shadow-black/10">
                            <MousepadsMenuHeading title="Accessories" />
                            <div className="mt-4 space-y-3">
                                {accessoryMenuLinks.map((item) => (
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
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {directNavItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                            asChild
                            className={cn(
                                navigationMenuTriggerStyle,
                                "brand-nav-link px-3 py-1.5 tracking-tight text-foreground/80",
                            )}
                        >
                            <Link
                                href={item.href}
                                data-active={isActivePath(pathname, item.href)}
                            >
                                <span
                                    className={cn(
                                        item.href === "/mousepads/glasspads" &&
                                            "glasspads-wave-link",
                                        item.href === "/iems" &&
                                            "iems-wave-link",
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function MousepadsMenuHeading({ title }: { title: string }) {
    return (
        <p className="compact-label">
            {title}
        </p>
    );
}

function isActivePath(pathname: string, href: string) {
    if (href === "/") {
        return pathname === "/";
    }

    if (href === "/iems" && pathname.startsWith("/iems/compare")) {
        return false;
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
                className="flex items-start gap-3 rounded-xl px-0 py-1.5 hover:bg-transparent focus:bg-transparent w-90"
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
    const compareHref = pathname.startsWith("/iems")
        ? "/iems/compare"
        : "/mousepads/compare/universal";
    const compareLabel = pathname.startsWith("/iems")
        ? "Compare IEMs"
        : "Universal Compare";
    const mobileSections = [
        {
            title: "Mousepads",
            icon: Grid2x2,
            items: [
                { label: "All Mousepads", href: "/mousepads" },
                { label: "GlassPads", href: "/mousepads/glasspads" },
                { label: "Universal Compare", href: "/mousepads/compare/universal" },
                { label: "Best mousepads home", href: "/best" },
                ...bestGuideLinks
                    .filter((item) => item.href !== "/best")
                    .map((item) => ({
                        label: item.title,
                        href: item.href,
                    })),
            ],
        },
        {
            title: "IEMs",
            icon: Zap,
            items: [
                { label: "Browse IEMs", href: "/iems" },
                { label: "Compare IEMs", href: "/iems/compare" },
            ],
        },
        {
            title: "Accessories",
            icon: Sparkles,
            items: [
                { label: "Mouse Skates", href: "/accessories/mouse-skates" },
                { label: "Browse Skates", href: "/accessories/mouse-skates/browse" },
                { label: "Compare Skates", href: "/accessories/mouse-skates/compare" },
            ],
        },
    ] as const;

    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Open navigation"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="w-[min(92vw,23rem)] overflow-hidden border-border bg-background/98 p-0 backdrop-blur-xl"
                >
                    <SheetTitle className="sr-only">Site navigation</SheetTitle>
                    <div className="border-b border-border px-4 py-5">
                        <SheetClose asChild>
                            <Link href="/" className="flex items-center gap-3">
                                <Image
                                    src="/logo.png"
                                    alt="Fragbasic"
                                    width={195}
                                    height={449}
                                    className="size-10"
                                />
                                <div>
                                    <p className="text-lg font-semibold tracking-tight">
                                        FRAGBASIC
                                        <span className="text-[10px] text-secondary-foreground">
                                            .FUN
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Gear data and compare tools
                                    </p>
                                </div>
                            </Link>
                        </SheetClose>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="grid grid-cols-2 gap-2">
                            <SheetClose asChild>
                                <Link
                                    href={compareHref}
                                    className="inline-flex min-h-18 flex-col justify-between rounded-xl border border-[color:color-mix(in_srgb,var(--brand-hover)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--brand)_12%,transparent)] p-3 text-sm font-semibold text-foreground"
                                >
                                    <Gauge className="size-4 text-brand-hover" />
                                    <span className="mt-3 leading-tight">{compareLabel}</span>
                                </Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link
                                    href="/mousepads"
                                    className="inline-flex min-h-18 flex-col justify-between rounded-xl border border-border bg-card/70 p-3 text-sm font-semibold text-foreground"
                                >
                                    <Grid2x2 className="size-4 text-muted-foreground" />
                                    <span className="mt-3 leading-tight">Browse Products</span>
                                </Link>
                            </SheetClose>
                        </div>

                        <div className="mt-6 space-y-3">
                            {mobileSections.map((section) => {
                                const SectionIcon = section.icon;
                                const activeSection = section.items.some((item) =>
                                    isActivePath(pathname, item.href),
                                );

                                return (
                                    <details
                                        key={section.title}
                                        open={activeSection}
                                        className="group rounded-xl border border-border bg-card/45"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-3 [&::-webkit-details-marker]:hidden">
                                            <span
                                                className={cn(
                                                    "flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background/70 text-muted-foreground",
                                                    activeSection &&
                                                        "border-[color:color-mix(in_srgb,var(--brand-hover)_32%,transparent)] text-brand-hover",
                                                )}
                                            >
                                                <SectionIcon className="size-4" />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-semibold text-foreground">
                                                    {section.title}
                                                </span>
                                                <span className="block text-[11px] text-muted-foreground">
                                                    {section.items.length} links
                                                </span>
                                            </span>
                                            <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                                        </summary>

                                        <nav className="grid gap-1 border-t border-border/70 px-2 py-2">
                                            {section.items.map((item) => {
                                                const active = isActivePath(pathname, item.href);

                                                return (
                                                    <SheetClose
                                                        key={`${section.title}-${item.href}`}
                                                        asChild
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            className={cn(
                                                                "flex items-center rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-background/70 hover:text-foreground",
                                                                active &&
                                                                    "bg-[color:color-mix(in_srgb,var(--brand)_14%,transparent)] font-semibold text-foreground",
                                                            )}
                                                        >
                                                            <span className="min-w-0 flex-1 truncate">
                                                                {item.label}
                                                            </span>
                                                        </Link>
                                                    </SheetClose>
                                                );
                                            })}
                                        </nav>
                                    </details>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-xl border border-border bg-card/50 p-4">
                            <p className="text-sm font-semibold text-foreground">
                                Submit a product or review
                            </p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Help keep the database useful with fresh gear notes.
                            </p>
                            <SheetClose asChild>
                                <Link
                                    href="https://forms.gle/5b1QejGptx63eQHw9"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-hover"
                                >
                                    Submit review
                                    <ArrowRight className="size-4" />
                                </Link>
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
