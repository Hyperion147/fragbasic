"use client";

import { useDeferredValue, useMemo, useRef } from "react";

import { FinderForm, type FinderFormValue } from "@/components/finder/finder-form";
import { FinderResults } from "@/components/finder/finder-results";
import { recommendMousepads } from "@/lib/finder/recommendMousepads";
import type { FinderInput } from "@/lib/finder/types";
import type { Mousepad } from "@/types/mousepad";
import { useState } from "react";

type Props = {
    mousepads: Mousepad[];
};

const defaultFormValue: FinderFormValue = {
    games: ["Valorant", "CS2"],
    sensitivityBand: "high",
    desiredFeel: "slightly-more-control",
    previousPadFeel: "controlled",
    texturePreference: "balanced",
    humidityConcern: false,
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
            previousPadFeel: deferredInput.previousPadFeel,
            texturePreference: deferredInput.texturePreference,
            humidityConcern: deferredInput.humidityConcern,
        }),
        [deferredInput]
    );

    const recommendations = useMemo(
        () => recommendMousepads(finderInput, mousepads, { limit: 10 }),
        [finderInput, mousepads]
    );

    const topResults = recommendations.slice(0, 5);
    const honorableMentions = recommendations.slice(5, 10).map((entry) => entry.mousepad);

    return (
        <div className="space-y-10">
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
                <FinderForm
                    value={value}
                    onToggleGame={(game) =>
                        setValue((current) => ({
                            ...current,
                            games: toggleGame(current.games, game),
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
                    onPreviousFeelChange={(previousPadFeel) =>
                        setValue((current) => ({
                            ...current,
                            previousPadFeel,
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

                <div ref={resultsRef}>
                    <FinderResults
                        results={topResults}
                        honorableMentions={honorableMentions}
                    />
                </div>
            </div>
        </div>
    );
}

function toggleGame(selectedGames: string[], game: string) {
    if (selectedGames.includes(game)) {
        return selectedGames.filter((selectedGame) => selectedGame !== game);
    }

    if (selectedGames.length >= 3) {
        return selectedGames;
    }

    return [...selectedGames, game];
}

function mapSensitivityBandToFinderValue(
    sensitivityBand: FinderFormValue["sensitivityBand"]
): FinderInput["sensitivity"] {
    if (sensitivityBand === "low") {
        return "high";
    }

    if (sensitivityBand === "high") {
        return "low";
    }

    return "medium";
}
