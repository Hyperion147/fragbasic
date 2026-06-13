"use client";

import { Droplets } from "lucide-react";

import { FinderOptionCard } from "@/components/finder/finder-option-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type FinderSensitivityBand = "low" | "medium" | "high";
export type FinderDesiredStep =
    | "more-control"
    | "slightly-more-control"
    | "same"
    | "slightly-faster"
    | "much-faster";

export type FinderFormValue = {
    games: string[];
    sensitivityBand: FinderSensitivityBand;
    desiredFeel: FinderDesiredStep;
    texturePreference: "smooth" | "balanced" | "textured" | "no-preference";
    humidityConcern: boolean;
};

type Props = {
    value: FinderFormValue;
    onToggleGame: (game: string) => void;
    onSensitivityChange: (sensitivity: FinderSensitivityBand) => void;
    onDesiredFeelChange: (value: FinderDesiredStep) => void;
    onTextureChange: (value: FinderFormValue["texturePreference"]) => void;
    onHumidityChange: () => void;
    onSubmit: () => void;
};

const gameOptions: Array<{
    title: string;
    iconSrc?: string;
}> = [
    { title: "Valorant", iconSrc: "/games-icon/valo-icon.png" },
    { title: "CS2", iconSrc: "/games-icon/cs2-icon.png" },
    { title: "Apex", iconSrc: "/games-icon/apex-icon.png" },
    { title: "Overwatch 2" },
    { title: "The Finals" },
    { title: "Fortnite" },
    { title: "Rainbow Six Siege" },
    { title: "Other", iconSrc: "/games-icon/more-icon.png" },
];

const sensitivityOptions: Array<{
    title: FinderSensitivityBand;
    display: string;
    body: string;
}> = [
    {
        title: "low",
        display: "High Sensitivity",
        body: "< 30 cm/360 (wrist aiming, precise micro)",
    },
    {
        title: "medium",
        display: "Medium / Balanced",
        body: "30-45 cm/360 (recommended for most players)",
    },
    {
        title: "high",
        display: "Low Sensitivity",
        body: "> 45 cm/360 (arm aiming, large tracking)",
    },
];

const desiredSteps: Array<{
    value: FinderDesiredStep;
    title: string;
}> = [
    { value: "more-control", title: "More Control" },
    { value: "slightly-more-control", title: "Slightly More Control" },
    { value: "same", title: "Balanced" },
    { value: "slightly-faster", title: "Slightly Faster" },
    { value: "much-faster", title: "Much Faster" },
];

const textureOptions: Array<{
    title: string;
    value: FinderFormValue["texturePreference"];
}> = [
    { title: "Smooth", value: "smooth" },
    { title: "Balanced", value: "balanced" },
    { title: "Textured", value: "textured" },
    { title: "No preference", value: "no-preference" },
];

export function FinderForm({
    value,
    onToggleGame,
    onSensitivityChange,
    onDesiredFeelChange,
    onTextureChange,
    onHumidityChange,
    onSubmit,
}: Props) {
    return (
        <Card className="border-border bg-card/90 p-8 shadow-xl shadow-black/10">
            <div className="space-y-12">
                <section className="space-y-4">
                    <SectionHeading
                        badge="1. Your Playstyle"
                        title="Tell us about the games you play"
                    />
                    <p className="text-sm text-muted-foreground">
                        Primary games. Select up to 3.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {gameOptions.map((option) => {
                            const selected = value.games.includes(option.title);
                            const disabled =
                                !selected && value.games.length >= 3;

                            return (
                                <FinderOptionCard
                                    key={option.title}
                                    active={selected}
                                    disabled={disabled}
                                    title={option.title}
                                    iconSrc={option.iconSrc}
                                    onClick={() => onToggleGame(option.title)}
                                />
                            );
                        })}
                    </div>

                    <div className="text-xl text-muted-foreground">
                        Select your sensitivity
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {sensitivityOptions.map((option) => (
                            <button
                                key={option.title}
                                type="button"
                                onClick={() =>
                                    onSensitivityChange(option.title)
                                }
                                className={cn(
                                    "rounded-3xl border p-6 text-left transition-all",
                                    value.sensitivityBand === option.title
                                        ? "border-violet-400/60 bg-violet-400/10"
                                        : "border-border bg-background/60 hover:border-foreground/20",
                                )}
                            >
                                <p className="text-base font-semibold text-foreground">
                                    {option.display}
                                </p>
                                <p className="mt-1.5 text-sm text-muted-foreground">
                                    {option.body}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <SectionHeading
                        badge="2. Your Preferences"
                        title="How do you want your mousepad to feel?"
                    />

                    <div className="rounded-3xl border border-border bg-background/60 p-6">
                        <p className="mb-4 text-sm font-medium text-muted-foreground">
                            Desired glide feel
                        </p>
                        <div className="relative">
                            <div className="absolute top-2 left-0 right-0 h-0.5 bg-border" />
                            <div className="relative grid grid-cols-5 gap-1">
                                {desiredSteps.map((step) => (
                                    <button
                                        key={step.value}
                                        type="button"
                                        onClick={() =>
                                            onDesiredFeelChange(step.value)
                                        }
                                        className="flex flex-col items-center gap-3 text-center"
                                    >
                                        <span
                                            className={cn(
                                                "relative z-10 flex size-5 items-center justify-center rounded-full border-2 bg-background transition-all",
                                                value.desiredFeel === step.value
                                                    ? "border-violet-400 bg-violet-400"
                                                    : "border-border",
                                            )}
                                        >
                                            {value.desiredFeel ===
                                                step.value && (
                                                <span className="size-2 rounded-full bg-white" />
                                            )}
                                        </span>
                                        <span
                                            className={cn(
                                                "text-xs leading-tight font-medium",
                                                value.desiredFeel === step.value
                                                    ? "text-foreground"
                                                    : "text-muted-foreground",
                                            )}
                                        >
                                            {step.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <ChipGroup
                        label="Texture preference"
                        options={textureOptions}
                        activeValue={value.texturePreference}
                        onChange={(nextValue) =>
                            onTextureChange(
                                nextValue as FinderFormValue["texturePreference"],
                            )
                        }
                    />
                </section>

                <section className="space-y-6">
                    <SectionHeading
                        badge="3. Environment"
                        title="Any conditions we should factor in?"
                    />

                    <button
                        type="button"
                        onClick={onHumidityChange}
                        className={cn(
                            "w-full rounded-3xl border p-7 text-left transition-all",
                            value.humidityConcern
                                ? "border-violet-400/60 bg-violet-400/10"
                                : "border-border bg-background/60 hover:border-foreground/20",
                        )}
                    >
                        <div className="flex items-start gap-5">
                            <span
                                className={cn(
                                    "mt-1 flex size-12 shrink-0 items-center justify-center rounded-2xl border",
                                    value.humidityConcern
                                        ? "border-violet-400/50 bg-violet-400/15 text-violet-200"
                                        : "border-border bg-background/80 text-foreground/85",
                                )}
                            >
                                <Droplets className="size-5" />
                            </span>
                            <span>
                                <span className="block text-lg font-semibold text-foreground">
                                    High humidity environment
                                </span>
                                <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                                    I play in a very humid or sweaty
                                    environment.
                                </span>
                            </span>
                        </div>
                    </button>
                </section>
            </div>
        </Card>
    );
}

function SectionHeading({ badge, title }: { badge: string; title: string }) {
    return (
        <div className="space-y-2">
            <Badge variant="outline" className="rounded-md text-[10px]">
                {badge}
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
    );
}

function ChipGroup({
    label,
    options,
    activeValue,
    onChange,
}: {
    label: string;
    options: ReadonlyArray<{ title: string; value: string }>;
    activeValue: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <div className="flex flex-wrap gap-3">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "rounded-full border px-4 py-2.5 text-sm transition-all",
                            activeValue === option.value
                                ? "border-violet-400/55 bg-violet-400/10 text-foreground"
                                : "border-border bg-background/55 text-muted-foreground hover:border-foreground/15 hover:text-foreground",
                        )}
                    >
                        {option.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
