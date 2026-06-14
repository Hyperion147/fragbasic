"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { brandConfig } from "@/lib/brands";
import RectTipComp from "./ui/rect-tip";

const primaryLinks = [
    { label: "All Mousepads", href: "/mousepads" },
    { label: "Finder", href: "/mousepads/finder" },
    { label: "Compare", href: "/mousepads/compare" },
    { label: "Universal Compare", href: "/mousepads/compare/universal" },
] as const;

const browseLinks = [
    { label: "Glasspads", href: "/mousepads/glasspads" },
    { label: "Control", href: "/mousepads?category=control" },
    { label: "Balanced", href: "/mousepads?category=balanced-control" },
    { label: "Speed", href: "/mousepads?category=speed" },
] as const;

const brandLinks = Object.values(brandConfig).map((brand) => ({
    label: brand.name,
    href: `/mousepads/brands/${brand.slug}`,
}));

export function SiteFooter() {
    const reduceMotion = useReducedMotion();

    return (
        <footer className="mt-20 w-full bg-background">
            <div className="w-full px-4 py-14 md:px-8 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <FooterReveal delay={0.08} reduceMotion={reduceMotion}>
                        <div className="space-y-6">
                            <Link href="/" className="group block">
                                <Image
                                    src="/footer.png"
                                    alt="Fragbasic"
                                    width={1695}
                                    height={449}
                                    className="h-auto w-full max-w-[280px] invert transition-opacity group-hover:opacity-88"
                                />
                            </Link>

                            <div className="max-w-2xl space-y-4">
                                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                                    Browse mousepad data, compare matchups, and
                                    jump into the real finder when you want a
                                    recommendation instead of a guess.
                                </p>

                                <Link
                                    href="/mousepads/finder"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                                >
                                    Open finder
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </FooterReveal>

                    <FooterReveal delay={0.16} reduceMotion={reduceMotion}>
                        <div className="grid gap-8 sm:grid-cols-3">
                            <FooterLinkGroup
                                title="Explore"
                                links={primaryLinks}
                            />
                            <FooterLinkGroup
                                title="Browse"
                                links={browseLinks}
                            />
                            <FooterLinkGroup
                                title="Brands"
                                links={brandLinks}
                            />
                        </div>
                    </FooterReveal>
                </div>

                <FooterReveal delay={0.22} reduceMotion={reduceMotion}>
                    <div className="mt-12 mr-12 lg:mr-40 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between font-heading">
                        <p>
                            FRAGBASIC.FUN helps players research mousepads
                            faster.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <Link href="https://cal.com/suryansu/15min">
                                Hire me :
                            </Link>
                            <RectTipComp
                                heading="@x.com/suryansu87"
                                description="Drop a follow!"
                                photo="/profile.jpg"
                                width="w-48"
                                link="https://x.com/suryansu87"
                                className="text-xs font-medium bg-background"
                            />
                        </div>
                    </div>
                </FooterReveal>
            </div>
        </footer>
    );
}

function FooterReveal({
    children,
    delay = 0,
    reduceMotion,
}: {
    children: ReactNode;
    delay?: number;
    reduceMotion: boolean | null;
}) {
    if (reduceMotion) {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
                duration: 1,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

function FooterLinkGroup({
    title,
    links,
}: {
    title: string;
    links: ReadonlyArray<{ label: string; href: string }>;
}) {
    return (
        <section>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {title}
            </p>
            <div className="mt-4 space-y-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="block text-sm text-foreground/88 transition-opacity hover:opacity-70"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </section>
    );
}
