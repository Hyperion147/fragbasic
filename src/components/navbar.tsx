"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowRight,
    ChevronRight,
    Gauge,
    Grid2x2,
    Menu,
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
        <header className="sticky top-0 z-40 shadow-[inset_0_-1px_0_color-mix(in_srgb,var(--foreground)_6%,transparent)] backdrop-blur-xl">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-10">
                <Link href="/" className="group flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Fragbasic"
                        width={195}
                        height={449}
                        className="size-10 transition-opacity group-hover:opacity-88"
                    />
                    <p className="text-lg font-semibold leading-none tracking-tight lg:text-[1.2rem]">
                        FRAGBASIC
                        <span className="ml-0.5 text-[10px] font-semibold text-secondary-foreground">
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
                    <NavigationMenuTrigger
                        data-active={pathname.startsWith("/mousepads") || pathname.startsWith("/best")}
                        className="px-3 py-1.5"
                    >
                        Mousepads
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[min(880px,calc(100vw-4rem))] overflow-hidden rounded-lg bg-card/72 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
                            <div className="grid grid-cols-[1.12fr_1.38fr_1.05fr]">
                                <div className="p-5 shadow-[inset_-1px_0_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
                                    <MousepadsMenuHeading title="Mousepads" />
                                    <div className="mt-4 space-y-2.5">
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

                                <div className="p-5 shadow-[inset_-1px_0_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
                                    <MousepadsMenuHeading title="Popular comparisons" />
                                    <div className="mt-4 space-y-1.5">
                                        {comparisonLinks.map((item) => (
                                            <NavigationMenuLink
                                                key={item.title}
                                                asChild
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex justify-between rounded-md px-2 py-2 text-sm leading-5 text-foreground/76 hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] hover:text-foreground focus:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
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

                                <div className="p-5">
                                    <MousepadsMenuHeading title="Best pages" />
                                    <div className="mt-4 space-y-4">
                                        <div className="space-y-1.5">
                                            {bestGuideLinks.map((item) => (
                                                <NavigationMenuLink
                                                    key={item.href}
                                                    asChild
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="flex items-center justify-between rounded-md px-2 py-2 text-sm leading-5 text-foreground/78 hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] hover:text-foreground focus:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
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
                    <NavigationMenuTrigger
                        data-active={pathname.startsWith("/accessories")}
                        className="px-3 py-1.5"
                    >
                        Accessories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[420px] overflow-hidden rounded-lg bg-card/72 p-5 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
                            <MousepadsMenuHeading title="Accessories" />
                            <div className="mt-4 space-y-2.5">
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
                                "brand-nav-link px-3 py-1.5 text-foreground/80",
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
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
                className="flex w-full items-start gap-3 rounded-md px-2 py-2.5 hover:bg-[color:color-mix(in_srgb,var(--brand)_8%,transparent)] focus:bg-[color:color-mix(in_srgb,var(--brand)_8%,transparent)]"
            >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-white/[0.035] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_6%,transparent)]">
                    <Icon className="size-4 text-brand-hover" />
                </span>
                <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-semibold leading-5 text-foreground">
                        {title}
                        {badge ? (
                            <span className="rounded-sm bg-[color:color-mix(in_srgb,var(--brand)_16%,transparent)] px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-brand-hover">
                                {badge}
                            </span>
                        ) : null}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground/92">
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
                    className="right-0 left-auto max-w-[100vw] w-[min(92vw,23rem)] overflow-hidden border-transparent bg-background/98 p-0 shadow-[inset_1px_0_0_color-mix(in_srgb,var(--foreground)_6%,transparent)] backdrop-blur-xl"
                >
                    <SheetTitle className="sr-only">Site navigation</SheetTitle>
                    <div className="px-4 py-5 shadow-[inset_0_-1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
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
                                    <p className="text-lg font-semibold leading-none tracking-tight">
                                        FRAGBASIC
                                        <span className="ml-0.5 text-[10px] font-semibold text-secondary-foreground">
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
                                    className="inline-flex min-h-18 flex-col justify-between rounded-lg bg-[color:color-mix(in_srgb,var(--brand)_12%,transparent)] p-3 text-sm font-semibold leading-5 text-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand-hover)_24%,transparent)]"
                                >
                                    <Gauge className="size-4 text-brand-hover" />
                                    <span className="mt-3 leading-tight">{compareLabel}</span>
                                </Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link
                                    href="/mousepads"
                                    className="inline-flex min-h-18 flex-col justify-between rounded-lg soft-panel p-3 text-sm font-semibold leading-5 text-foreground"
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
                                        className="group rounded-lg soft-panel"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-3 [&::-webkit-details-marker]:hidden">
                                            <span
                                                className={cn(
                                                    "flex size-8 shrink-0 items-center justify-center rounded-md bg-background/70 text-muted-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_6%,transparent)]",
                                                    activeSection &&
                                                        "text-brand-hover shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand-hover)_28%,transparent)]",
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

                                        <nav className="grid gap-1 px-2 py-2 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
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
                                                                "flex items-center rounded-md px-3 py-2.5 text-sm leading-5 text-foreground/80 transition-colors hover:bg-background/70 hover:text-foreground",
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

                        <div className="mt-6 rounded-lg soft-panel p-4">
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
