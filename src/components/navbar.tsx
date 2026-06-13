"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowRight,
    ChevronRight,
    Gauge,
    Grid2x2,
    Menu,
    Search,
    Shield,
    Sparkles,
    Star,
    Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    href: `/brands/${brand.slug}`,
}));

const directNavItems = [
    { label: "Compare", href: "/compare" },
    { label: "Guides", href: "/guides" },
    { label: "Finder", href: "/mousepads/finder" },
];

const mobileNavItems = [
    { label: "Mousepads", href: "/mousepads" },
    { label: "Universal Compare", href: "/compare/universal" },
    { label: "Brands", href: "/brands/artisan" },
    ...directNavItems,
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
        body: "Browse all mousepads",
        href: "/mousepads",
        icon: Grid2x2,
    },
    {
        title: "Speed-Control Spectrum",
        body: "See all pads on the scale",
        href: "/mousepads",
        icon: Gauge,
    },
    {
        title: "Best Mousepads",
        body: "Curated best lists",
        href: "/mousepads",
        icon: Star,
    },
    {
        title: "New Releases",
        body: "Latest mousepads",
        href: "/mousepads",
        icon: Sparkles,
        badge: "New",
    },
] as const;
const feelLinks = [
    {
        title: "Control",
        body: "More stopping power",
        href: "/mousepads",
        icon: Shield,
    },
    {
        title: "Balanced",
        body: "Even speed & control",
        href: "/mousepads",
        icon: Gauge,
    },
    {
        title: "Speed",
        body: "More glide & fast feel",
        href: "/mousepads",
        icon: Zap,
    },
] as const;
const comparisonLinks = [
    {
        title: "Artisan Zero vs LGG Saturn Pro",
        href: "/compare/artisan-zero-soft-vs-lgg-saturn-pro-soft",
    },
    {
        title: "Zowie G-SR-SE vs Xraypad Aqua Control II",
        href: "/compare",
    },
    {
        title: "Artisan Hien vs SteelSeries QcK Heavy",
        href: "/compare",
    },
    {
        title: "LGG Saturn Pro vs Artisan Type-99",
        href: "/compare/lgg-saturn-pro-soft-vs-artisan-type-99-soft",
    },
] as const;

export function SiteNavbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/88 backdrop-blur-xl px-20">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-8">
                <Link href="/" className="group flex items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-wide">
                        FRAGBASIC
                        <span className="text-xs text-secondary-foreground">
                            .FUN
                        </span>
                    </h1>
                </Link>

                <DesktopNavigation pathname={pathname} />

                <div className="hidden items-center gap-3 md:flex">
                    <div className="relative w-64">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            aria-label="Search mousepads"
                            placeholder="Search mousepads..."
                            className="h-10 rounded-xl border-border bg-background/70 pl-9 text-sm"
                        />
                    </div>
                    <Button size="sm" asChild>
                        <Link href="/mousepads/finder">Finder</Link>
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
                    <NavigationMenuTrigger>Mousepads</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[1040px] overflow-hidden rounded-2xl border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
                            <div className="grid grid-cols-[1.1fr_1fr_1.2fr_1fr_1.15fr]">
                                <div className="border-r border-border p-5">
                                    <MousepadsMenuHeading title="Mousepads" />
                                    <div className="mt-5 space-y-2">
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

                                <div className="border-r border-border/70 p-5">
                                    <MousepadsMenuHeading title="Browse by feel" />
                                    <div className="mt-5 space-y-4">
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

                                <div className="border-r border-border/70 p-5">
                                    <MousepadsMenuHeading title="Popular comparisons" />
                                    <div className="mt-5 space-y-4">
                                        {comparisonLinks.map((item) => (
                                            <NavigationMenuLink
                                                key={item.title}
                                                asChild
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="rounded-md px-0 py-0 text-sm leading-6 text-foreground/78 hover:bg-transparent hover:text-foreground focus:bg-transparent flex justify-between"
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
                                        className="mt-6"
                                    >
                                        <Link href="/compare">
                                            View all comparisons
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="border-r border-border/70 p-5">
                                    <MousepadsMenuHeading title="Top brands" />
                                    <div className="mt-5 space-y-1">
                                        {brandLinks.map((item) => (
                                            <NavigationMenuLink
                                                key={item.href}
                                                asChild
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center justify-between rounded-md px-0 py-2 text-base font-semibold uppercase tracking-[0.18em] text-foreground/85 hover:bg-transparent hover:text-foreground focus:bg-transparent"
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
                                        className="mt-6"
                                    >
                                        <Link href="/brands/artisan">
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
                                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/12 to-transparent" />
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
                                "px-3",
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
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/72">
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
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-white/[0.03]">
                    <Icon className="size-4 text-foreground/82" />
                </span>
                <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        {title}
                        {badge ? (
                            <span className="rounded-md border border-border px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-foreground/76">
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
                className="flex items-start gap-3 rounded-lg px-0 py-1 hover:bg-transparent focus:bg-transparent"
            >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border/80">
                    <Icon className="size-3.5 text-foreground/84" />
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
                            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-card">
                                <span className="text-sm font-semibold text-primary">
                                    F
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    FragBasic
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    FPS gear lab
                                </p>
                            </div>
                        </Link>

                        <nav className="grid gap-2">
                            {mobileNavItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant="ghost"
                                    className="justify-start"
                                    asChild
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </Button>
                            ))}
                        </nav>

                        <div className="grid gap-2 border-t border-border pt-4">
                            {brandLinks.map((item) => (
                                <Button
                                    key={item.href}
                                    variant="outline"
                                    className="justify-start"
                                    asChild
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
