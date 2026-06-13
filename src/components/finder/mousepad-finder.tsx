"use client";

import { useDeferredValue, useMemo, useRef } from "react";

import { FinderForm, type FinderFormValue } from "@/components/finder/finder-form";
import { FinderResults } from "@/components/finder/finder-results";
import {
  mapSensitivityBandToFinderValue,
  toggleGameSelection,
} from "@/lib/finder/input";
import { recommendMousepads } from "@/lib/finder/recommendMousepads";
import type { FinderInput } from "@/lib/finder/types";
import type { Mousepad } from "@/types/mousepad";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    formatMousepadValue,
    getMousepadFullName,
} from "@/lib/mousepads";

type Props = {
    mousepads: Mousepad[];
};

const defaultFormValue: FinderFormValue = {
    games: [],
    sensitivityBand: "medium", // Updated default to "medium/balanced" per common recommendation (30-45 cm/360 sweet spot across Gamingsmart, RJN, pro data, guides)
    desiredFeel: "slightly-more-control",
    texturePreference: "balanced",
    humidityConcern: false,
    perGameSens: {},
};

export function MousepadFinder({ mousepads }: Props) {
    const [value, setValue] = useState<FinderFormValue>(defaultFormValue);
    const resultsRef = useRef<HTMLDivElement | null>(null);
    const deferredInput = useDeferredValue(value);

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
                            setValue((current) => {
                                const newGames = toggleGameSelection(current.games, game);
                                const newPer = { ...(current.perGameSens || {}) };
                                Object.keys(newPer).forEach((k) => {
                                    if (!newGames.includes(k)) {
                                        delete newPer[k];
                                    }
                                });
                                return {
                                    ...current,
                                    games: newGames,
                                    perGameSens: newPer,
                                };
                            })
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
                        onUpdatePerGameSens={(game, sens) =>
                            setValue((current) => {
                                const nextSens = { ...(current.perGameSens || {}) };
                                if (sens === undefined || Number.isNaN(sens)) {
                                    delete nextSens[game];
                                } else {
                                    nextSens[game] = sens;
                                }
                                return {
                                    ...current,
                                    perGameSens: nextSens,
                                };
                            })
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
                    <div
                        className={cn(
                            value.games.length === 0 && "blur-sm opacity-40 pointer-events-none"
                        )}
                    >
                        <FinderResults results={value.games.length > 0 ? topResults : []} />
                    </div>
                    {value.games.length === 0 && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <p className="text-center text-base font-medium text-muted-foreground">
                                select atleast 1 game to see results
                            </p>
                        </div>
                    )}
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
