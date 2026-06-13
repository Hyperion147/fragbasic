"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";

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
    href: `/brands/${brand.slug}`,
}));

const directNavItems = [
    { label: "Compare", href: "/compare" },
    { label: "Guides", href: "/guides" },
    { label: "Finder", href: "/compare/universal" },
];

const mobileNavItems = [
    { label: "Mousepads", href: "/mousepads" },
    { label: "Universal Compare", href: "/compare/universal" },
    { label: "Brands", href: "/brands/artisan" },
    ...directNavItems,
];

export function SiteNavbar() {
    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/88 backdrop-blur-xl px-20">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-8">
                <Link href="/" className="group flex items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-wide">
                        FRAGBASIC<span className="text-xs text-secondary-foreground">.FUN</span>
                    </h1>
                </Link>

                <DesktopNavigation />

                <div className="hidden items-center gap-2 md:flex">
                    <Button size="sm" asChild>
                        <Link href="/compare/universal">Compare pads</Link>
                    </Button>
                </div>

                <MobileNavigation />
            </div>
        </header>
    );
}

function DesktopNavigation() {
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Mousepads</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[520px] gap-2 p-2 md:grid-cols-[1fr_1fr]">
                            <NavigationFeatureLink
                                href="/mousepads"
                                title="Browse Database"
                                body="Filter every tracked pad by brand, surface, availability, and feel."
                            />
                            <NavigationFeatureLink
                                href="/compare/universal"
                                title="Universal Compare"
                                body="Pick up to three pads and compare feel, speed, and environment behavior."
                            />
                            <NavigationFeatureLink
                                href="/compare"
                                title="Head-to-Head"
                                body="Read curated comparison pages for popular matchups."
                            />
                            <NavigationFeatureLink
                                href="/mousepads"
                                title="Finder"
                                body="Start with your playstyle and narrow down the right surface."
                            />
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[420px] gap-1 p-2">
                            {brandLinks.map((item) => (
                                <NavigationMenuLink key={item.href} asChild>
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-between"
                                    >
                                        <span>{item.label}</span>
                                        <span className="text-xs text-muted-foreground">
                                            View lineup
                                        </span>
                                    </Link>
                                </NavigationMenuLink>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {directNavItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                            asChild
                            className={cn(navigationMenuTriggerStyle, "px-3")}
                        >
                            <Link href={item.href}>{item.label}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function NavigationFeatureLink({
    href,
    title,
    body,
}: {
    href: string;
    title: string;
    body: string;
}) {
    return (
        <NavigationMenuLink asChild>
            <Link
                href={href}
                className="min-h-28 rounded-lg border border-border bg-background/75 p-4"
            >
                <p className="font-medium text-foreground">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {body}
                </p>
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
