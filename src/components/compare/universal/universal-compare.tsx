"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Copy, Scale, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { CompareSummaryCards } from "@/components/compare/universal/compare-summary-cards";
import { MousepadSelector } from "@/components/compare/universal/mousepad-selector";
import { MultiEnvironmentChart } from "@/components/compare/universal/multi-environment-chart";
import { MultiFeelChart } from "@/components/compare/universal/multi-feel-chart";
import { MultiPositionChart } from "@/components/compare/universal/multi-position-chart";
import { SelectedMousepadStrip } from "@/components/compare/universal/selected-mousepad-strip";
import { UniversalProductGrid } from "@/components/compare/universal/universal-product-grid";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getMousepadBySlug } from "@/lib/mousepads";
import type { Mousepad } from "@/types/mousepad";

type Props = {
    allMousepads: Mousepad[];
};

const DEFAULT_SELECTED_SLUGS = [
    "artisan-zero-soft",
    "pulsar-lgg-hyperion-soft",
    "lgg-saturn-pro-soft",
] as const;

const MAX_SELECTED = 3;
const LAST_COMPARE_STORAGE_KEY = "fragbasic_last_mousepad_compare";

export function UniversalCompare({ allMousepads }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const padsParam = searchParams.get("pads");
    const hasPadsParam = searchParams.has("pads");
    const didCheckStoredSelection = useRef(false);

    const urlSelectedSlugs = useMemo(() => {
        if (padsParam === null) {
            return [];
        }

        return padsParam
            .split(",")
            .map((slug) => slug.trim())
            .filter(Boolean)
            .slice(0, MAX_SELECTED)
            .filter((slug) => getMousepadBySlug(slug));
    }, [padsParam]);

    const [query, setQuery] = useState("");
    const selectedSlugs = useMemo(
        () =>
            hasPadsParam
                ? urlSelectedSlugs
                : [],
        [hasPadsParam, urlSelectedSlugs],
    );

    const selectedMousepads = useMemo(
        () =>
            selectedSlugs
                .map((slug) =>
                    allMousepads.find((mousepad) => mousepad.slug === slug),
                )
                .filter(
                    (mousepad): mousepad is Mousepad => mousepad !== undefined,
                ),
        [allMousepads, selectedSlugs],
    );

    const canCompare = selectedMousepads.length >= 2;

    const replaceUrl = useCallback((slugs: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("pads", slugs.join(","));

        const nextQuery = params.toString();
        router.replace(
            nextQuery ? `?${nextQuery}` : "/mousepads/compare/universal",
            {
                scroll: false,
            },
        );
    }, [router, searchParams]);

    useEffect(() => {
        if (hasPadsParam || didCheckStoredSelection.current) {
            return;
        }

        didCheckStoredSelection.current = true;

        try {
            const stored = window.localStorage.getItem(LAST_COMPARE_STORAGE_KEY);
            const parsed = stored ? JSON.parse(stored) : null;
            const storedSlugs = Array.isArray(parsed)
                ? parsed
                      .filter((slug): slug is string => typeof slug === "string")
                      .filter((slug) => getMousepadBySlug(slug))
                      .slice(0, MAX_SELECTED)
                : [];

            if (storedSlugs.length > 0) {
                replaceUrl(storedSlugs);
                return;
            }
        } catch {
            // Ignore malformed localStorage and fall back to starter pads.
        }

        replaceUrl(DEFAULT_SELECTED_SLUGS.filter((slug) => getMousepadBySlug(slug)));
    }, [hasPadsParam, replaceUrl]);

    useEffect(() => {
        if (!hasPadsParam) {
            return;
        }

        try {
            window.localStorage.setItem(
                LAST_COMPARE_STORAGE_KEY,
                JSON.stringify(selectedSlugs),
            );
        } catch {
            // localStorage can fail in private or restricted contexts.
        }
    }, [hasPadsParam, selectedSlugs]);

    function handleAdd(mousepad: Mousepad) {
        if (
            selectedSlugs.includes(mousepad.slug) ||
            selectedSlugs.length >= MAX_SELECTED
        ) {
            return;
        }

        const next = [...selectedSlugs, mousepad.slug];
        replaceUrl(next);
        setQuery("");
    }

    function handleRemove(slug: string) {
        const next = selectedSlugs.filter((item) => item !== slug);
        replaceUrl(next);
    }

    // Copy current page URL (now contains the exact selection)
    const [copied, setCopied] = useState(false);
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Fallback for very old browsers
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        }
    };

    const selectionCount = selectedSlugs.length;

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card className="border-border bg-card">
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-black">
                                Universal compare
                            </Badge>
                            <Badge variant="outline">Up to three pads</Badge>
                            <Badge variant="outline" className="font-mono">
                                {selectionCount}/3 selected
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectionCount > 0 && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        replaceUrl([]);
                                    }}
                                >
                                    Clear set
                                </Button>
                            )}
                            {canCompare && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCopyLink}
                                    className="gap-2"
                                >
                                    <Copy className="size-3.5" />
                                    {copied
                                        ? "Copied!"
                                        : "Copy link to this set"}
                                </Button>
                            )}
                        </div>
                    </div>
                    <CardTitle className="mt-4 text-2xl tracking-tight sm:text-4xl md:text-5xl">
                        Build your own mousepad matchup.
                    </CardTitle>
                    <p className="mt-3 rounded-lg border border-sky-300/40 bg-sky-400/10 px-3 py-2 text-xs leading-5 text-sky-100 sm:mt-4 sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                        Feel labels are relative to the pads in this database.
                        Use them as buying guidance, not lab measurements:
                        skates, humidity, wear, and surface type can shift the
                        feel on your desk.
                    </p>
                </CardHeader>
            </Card>

            <MousepadSelector
                allMousepads={allMousepads}
                selectedSlugs={selectedSlugs}
                query={query}
                maxSelected={MAX_SELECTED}
                onQueryChange={setQuery}
                onAdd={handleAdd}
            />

            {selectedMousepads.length > 0 ? (
                <SelectedMousepadStrip
                    mousepads={selectedMousepads}
                    onRemove={handleRemove}
                />
            ) : null}

            {canCompare ? (
                <>
                    <CompareDisclosure title="Summary" defaultOpen>
                        <CompareSummaryCards mousepads={selectedMousepads} />
                    </CompareDisclosure>
                    <CompareDisclosure title="Selected products">
                        <UniversalProductGrid mousepads={selectedMousepads} />
                    </CompareDisclosure>
                    <CompareDisclosure title="Feel chart" defaultOpen>
                        <MultiFeelChart mousepads={selectedMousepads} />
                    </CompareDisclosure>
                    <CompareDisclosure title="Position chart">
                        <MultiPositionChart mousepads={selectedMousepads} />
                    </CompareDisclosure>
                    <CompareDisclosure title="Desk conditions">
                        <MultiEnvironmentChart mousepads={selectedMousepads} />
                    </CompareDisclosure>
                </>
            ) : (
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl tracking-tight">
                            {selectionCount === 0
                                ? "Select 2–3 mousepads above to start comparing"
                                : "Add one more mousepad to start comparing"}
                        </CardTitle>
                        <CardDescription>
                            {selectionCount === 0
                                ? "Use the search below, or load one of these popular starter sets for a quick comparison."
                                : "Universal comparison becomes useful once at least two pads are in the set."}
                        </CardDescription>
                    </CardHeader>

                    {selectionCount === 0 && (
                        <CardContent className="pb-4">
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {
                                        label: "Classic balanced",
                                        slugs: [
                                            "artisan-zero-soft",
                                            "pulsar-lgg-hyperion-soft",
                                            "lgg-saturn-pro-soft",
                                        ] as const,
                                    },
                                    {
                                        label: "Control focus",
                                        slugs: [
                                            "lgg-saturn-pro-soft",
                                            "artisan-type-99-soft",
                                            "zowie-g-sr-iii",
                                        ] as const,
                                    },
                                    {
                                        label: "Speed & tracking",
                                        slugs: [
                                            "artisan-raiden-soft",
                                            "lgg-neptune-pro-soft",
                                            "wallhack-sp-005",
                                        ] as const,
                                    },
                                ].map((preset) => (
                                    <Button
                                        key={preset.label}
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const valid = preset.slugs.filter(
                                                (s) => getMousepadBySlug(s),
                                            );
                                            replaceUrl(valid);
                                        }}
                                    >
                                        {preset.label}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    )}

                    <CardContent className="grid gap-3 p-4 sm:p-6 md:grid-cols-3">
                        <HintCard
                            icon={<SlidersHorizontal className="size-4" />}
                            title="Feel breakdown"
                            body="See glide, control, stopping, start feel, moving friction, and small corrections together."
                        />
                        <HintCard
                            icon={<Scale className="size-4" />}
                            title="Glide lane"
                            body="Read the set from controlled on the left to faster, easier glide on the right."
                        />
                        <HintCard
                            icon={<ShieldCheck className="size-4" />}
                            title="Desk conditions"
                            body="Check humidity, sweat, and dust or hair handling without digging through a table."
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function HintCard({
    icon,
    title,
    body,
}: {
    icon: React.ReactNode;
    title: string;
    body: string;
}) {
    return (
        <div className="rounded-3xl border border-border bg-background/80 px-4 py-4">
            <div className="inline-flex rounded-full border border-border bg-card p-2">
                {icon}
            </div>
            <p className="mt-3 font-medium text-foreground">{title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {body}
            </p>
        </div>
    );
}

function CompareDisclosure({
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
            className="group rounded-xl border border-border bg-card/45"
        >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3 py-2.5 text-sm font-semibold text-foreground sm:px-5 sm:py-3">
                {title}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-border p-2 sm:p-4">{children}</div>
        </details>
    );
}
