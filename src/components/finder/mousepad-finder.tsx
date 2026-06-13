"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { FinderForm, type FinderFormValue } from "@/components/finder/finder-form";
import { FinderResults } from "@/components/finder/finder-results";
import {
  mapSensitivityBandToFinderValue,
  toggleGameSelection,
} from "@/lib/finder/input";
import { recommendMousepads } from "@/lib/finder/recommendMousepads";
import type { FinderInput } from "@/lib/finder/types";
import type { Mousepad } from "@/types/mousepad";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    formatMousepadValue,
    getMousepadFullName,
} from "@/lib/mousepads";
import { MousepadCard } from "@/components/mousepads/mousepad-card";

type Props = {
    mousepads: Mousepad[];
};

const defaultFormValue: FinderFormValue = {
    games: [],
    sensitivityBand: "medium", // Updated default to "medium/balanced" per common recommendation (30-45 cm/360 sweet spot across Gamingsmart, RJN, pro data, guides)
    desiredFeel: "slightly-more-control",
    texturePreference: "balanced",
    humidityConcern: false,
};

export function MousepadFinder({ mousepads }: Props) {
    const [value, setValue] = useState<FinderFormValue>(defaultFormValue);
    const resultsRef = useRef<HTMLDivElement | null>(null);
    const deferredInput = useDeferredValue(value);

    // Saved pads via localStorage
    const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'results' | 'saved'>('results');

    useEffect(() => {
        const stored = localStorage.getItem('fragbasic_saved_pads');
        if (stored) {
            try {
                setSavedSlugs(JSON.parse(stored));
            } catch {}
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('fragbasic_saved_pads', JSON.stringify(savedSlugs));
    }, [savedSlugs]);

    const savedSet = useMemo(() => new Set(savedSlugs), [savedSlugs]);

    const toggleSave = (slug: string) => {
        setSavedSlugs((prev) => {
            if (prev.includes(slug)) {
                return prev.filter((s) => s !== slug);
            }
            if (prev.length >= maxSaved) {
                return prev;
            }
            return [...prev, slug];
        });
    };

    const savedMousepads = useMemo(
        () => mousepads.filter((p) => savedSet.has(p.slug)),
        [mousepads, savedSet]
    );

    const maxSaved = 4;
    const canSaveMore = savedSlugs.length < maxSaved;
    const hasGames = value.games.length > 0;

    const finderInput = useMemo<FinderInput>(
        () => ({
            games:
                deferredInput.games.length > 0 ? deferredInput.games : ["Other"],
            sensitivity: mapSensitivityBandToFinderValue(
                deferredInput.sensitivityBand
            ),
            desiredFeel: deferredInput.desiredFeel,
            texturePreference: deferredInput.texturePreference,
            humidityConcern: deferredInput.humidityConcern,
        }),
        [deferredInput]
    );

    const recommendations = useMemo(
        () =>
            deferredInput.games.length > 0
                ? recommendMousepads(finderInput, mousepads, { limit: 10 })
                : [],
        [deferredInput, finderInput, mousepads]
    );

    const topResults = recommendations.slice(0, 5);
    const honorableMentions = recommendations.slice(5, 10).map((entry) => entry.mousepad);

    return (
        <div className="space-y-12">
            <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
                <div>
                    <FinderForm
                        value={value}
                        onToggleGame={(game) =>
                            setValue((current) => ({
                                ...current,
                                games: toggleGameSelection(current.games, game),
                            }))
                        }
                        onSensitivityChange={(sensitivityBand) =>
                            setValue((current) => ({
                                ...current,
                                sensitivityBand,
                            }))
                        }
                        onDesiredFeelChange={(desiredFeel) =>
                            setValue((current) => ({
                                ...current,
                                desiredFeel,
                            }))
                        }
                        onTextureChange={(texturePreference) =>
                            setValue((current) => ({
                                ...current,
                                texturePreference,
                            }))
                        }
                        onHumidityChange={() =>
                            setValue((current) => ({
                                ...current,
                                humidityConcern: !current.humidityConcern,
                            }))
                        }
                        onSubmit={() =>
                            resultsRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            })
                        }
                    />
                </div>

                <div ref={resultsRef} className="relative">
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'results' | 'saved')} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4 rounded-none">
                            <TabsTrigger value="results" className="rounded-none">Results</TabsTrigger>
                            <TabsTrigger value="saved" className="rounded-none">
                                Saved pads ({savedSlugs.length}/{maxSaved})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="results" className="mt-0">
                            <FinderResults 
                                results={hasGames ? topResults : []} 
                                onToggleSave={toggleSave}
                                isSaved={(slug) => savedSet.has(slug)}
                                gamesSelected={hasGames}
                                canSaveMore={canSaveMore}
                            />
                        </TabsContent>

                        <TabsContent value="saved" className="mt-0">
                            {savedMousepads.length > 0 ? (
                                <div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {savedMousepads.map((pad) => (
                                            <div key={pad.slug} className="relative">
                                                <MousepadCard pad={pad} />
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    className="absolute top-2 right-2 h-6 w-6 rounded-full z-10"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleSave(pad.slug);
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    {savedSlugs.length >= maxSaved && (
                                        <p className="text-center text-xs text-muted-foreground pt-2">
                                            Max 4 pads saved. Remove one to add more.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <Card className="p-8 text-center border-dashed">
                                    <div className="mx-auto max-w-xs space-y-3">
                                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border bg-background/60">
                                            <Bookmark className="size-6 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-xl font-semibold tracking-tight">No saved pads yet</h3>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            Click the bookmark icon on any recommendation in the Results tab to build your personal collection.
                                        </p>
                                    </div>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {honorableMentions.length > 0 && (
                <section className="space-y-5">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Honorable mentions
                        </p>
                        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                            Other pads worth a look
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {honorableMentions.map((mousepad) => {
                            return (
                                <Link
                                    key={mousepad.slug}
                                    href={`/mousepads/${mousepad.slug}`}
                                    className="group"
                                >
                                    <Card className="h-full p-5 transition-all">
                                        <div
                                            className="relative h-36 overflow-hidden"
                                        >
                                            <Image
                                                src={mousepad.images.main}
                                                alt={getMousepadFullName(mousepad)}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 240px"
                                                className="object-contain p-4 group-hover:scale-125 transition-transform duration-300"
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold tracking-tight">
                                            {getMousepadFullName(mousepad)}
                                        </h3>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {formatMousepadValue(mousepad.category)} -{" "}
                                            {mousepad.environment.humidityResistance >= 8
                                                ? "strong humidity performance"
                                                : "solid all-round fit"}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-violet-200">
                                            View details
                                            <ArrowRight className="size-4" />
                                        </span>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
