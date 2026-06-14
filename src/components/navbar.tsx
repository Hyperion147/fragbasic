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
    { label: "GlassPads", href: "/mousepads/glasspads" },
    { label: "Compare", href: "/mousepads/compare" },
    { label: "Brands", href: "/mousepads/brands" },
];

const mobileNavItems = [
    { label: "All Mousepads", href: "/mousepads" },
    { label: "GlassPads", href: "/mousepads/glasspads" },
    { label: "Universal Compare", href: "/mousepads/compare/universal" },
    { label: "Finder", href: "/mousepads/finder" },
    { label: "Compare Hub", href: "/mousepads/compare" },
    { label: "Brands", href: "/mousepads/brands" },
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
                                        <Link href="/mousepads/compare">
                                            View all comparisons
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="border-r border-border/70 p-4 w-60">
                                    <MousepadsMenuHeading title="Top brands" />
                                    <div className="mt-4 space-y-4">

                                        <div className="space-y-2">
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
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="mt-4 w-full align-bottom"
                                    >
                                        <Link href="/mousepads/brands">
                                            View all brands
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
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
                                item.href === "/mousepads/glasspads"
                                    ? "text-sky-100"
                                    : "",
                                isActivePath(pathname, item.href)
                                    ? "bg-muted text-foreground"
                                    : ""
                            )}
                        >
                            <Link href={item.href}>
                                <span
                                    className={cn(
                                        item.href ===
                                            "/mousepads/glasspads" &&
                                            "glasspads-wave-link",
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
