"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerGroups = [
    {
        title: "Explore",
        links: [
            { label: "All mousepads", href: "/mousepads" },
            { label: "Glasspads", href: "/mousepads/glasspads" },
            { label: "IEMs", href: "/iems" },
            { label: "Mouse skates", href: "/accessories/mouse-skates" },
        ],
    },
    {
        title: "Research",
        links: [
            {
                label: "Universal compare",
                href: "/mousepads/compare/universal",
            },
            { label: "Popular comparisons", href: "/mousepads/compare" },
            { label: "Compare IEMs", href: "/iems/compare" },
            { label: "Best gear lists", href: "/best" },
        ],
    },
    {
        title: "Community",
        links: [
            {
                label: "Submit a review",
                href: "https://forms.gle/5b1QejGptx63eQHw9",
            },
            { label: "Follow on X", href: "https://x.com/suryansu87" },
        ],
    },
] as const;

export function SiteFooter() {

    return (
        <footer className="landing-noise relative isolate overflow-hidden border-y border-white/8 bg-[#08080b] text-white">
            <div className="grid border-y border-white/8 sm:grid-cols-3 lg:border-l lg:border-t-0 px-6">
                {footerGroups.map((group) => (
                    <section
                        key={group.title}
                        className="border-b border-white/8 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:p-7 sm:last:border-r-0 lg:p-9"
                    >
                        <p className="text-[10px] font-semibold uppercase text-white/32 sm:text-xs">
                            {group.title}
                        </p>
                        <nav className="mt-6 space-y-4">
                            {group.links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group flex items-center justify-between gap-3 text-sm text-white/66 transition-colors hover:text-white sm:text-[15px]"
                                >
                                    {link.label}
                                    <ArrowUpRight className="size-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                                </Link>
                            ))}
                        </nav>
                    </section>
                ))}
            </div>

            <div className="flex flex-col gap-4 px-5 py-6 text-xs text-white/32 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12 xl:px-16">
                <p>© 2026 FragBasic. Independent FPS gear research.</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span>No sponsored rankings</span>
                    <span>Built in India</span>
                    <Link
                        href="/sitemap.xml"
                        className="transition-colors hover:text-white"
                    >
                        Sitemap
                    </Link>
                </div>
            </div>

            <p
                aria-hidden="true"
                className="select-none overflow-hidden border-t border-white/8 px-3 pb-2 pt-4 text-center text-[clamp(4.5rem,14.4vw,17rem)] font-semibold leading-[.72] tracking-[-.085em] text-white/[.035]"
            >
                FRAGBASIC
            </p>
        </footer>
    );
}
