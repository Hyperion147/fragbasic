"use client";

import type { LucideIcon } from "lucide-react";
import {
    Activity,
    CircleHelp,
    Crosshair,
    Droplets,
    Shield,
    Sparkles,
    Swords,
    Target,
    Zap,
} from "lucide-react";

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
    previousPadFeel:
        | "muddy"
        | "controlled"
        | "balanced"
        | "fast"
        | "too-fast"
        | "rough"
        | "smooth"
        | "unknown";
    texturePreference: "smooth" | "balanced" | "textured" | "no-preference";
    humidityConcern: boolean;
};

type Props = {
    value: FinderFormValue;
    onToggleGame: (game: string) => void;
    onSensitivityChange: (sensitivity: FinderSensitivityBand) => void;
    onDesiredFeelChange: (value: FinderDesiredStep) => void;
    onPreviousFeelChange: (value: FinderFormValue["previousPadFeel"]) => void;
    onTextureChange: (value: FinderFormValue["texturePreference"]) => void;
    onHumidityChange: () => void;
    onSubmit: () => void;
};

const gameOptions: Array<{
    title: string;
    icon: LucideIcon;
}> = [
    { title: "Valorant", icon: Target },
    { title: "CS2", icon: Crosshair },
    { title: "Apex", icon: Zap },
    { title: "Overwatch 2", icon: Activity },
    { title: "The Finals", icon: Sparkles },
    { title: "Fortnite", icon: Swords },
    { title: "Rainbow Six Siege", icon: Shield },
    { title: "Other", icon: CircleHelp },
];

const sensitivityOptions: Array<{
    title: FinderSensitivityBand;
    display: string;
    body: string;
}> = [
    { title: "low", display: "Low", body: "< 30 cm/360" },
    { title: "medium", display: "Medium", body: "30-45 cm/360" },
    { title: "high", display: "High", body: "> 45 cm/360" },
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

const previousFeelOptions: Array<{
    title: string;
    value: FinderFormValue["previousPadFeel"];
}> = [
    { title: "Muddy / Slow", value: "muddy" },
    { title: "Controlled", value: "controlled" },
    { title: "Balanced", value: "balanced" },
    { title: "Fast", value: "fast" },
    { title: "Too Fast", value: "too-fast" },
    { title: "Rough / Abrasive", value: "rough" },
    { title: "Smooth", value: "smooth" },
    { title: "Not sure", value: "unknown" },
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
    onPreviousFeelChange,
    onTextureChange,
    onHumidityChange,
    onSubmit,
}: Props) {
    return (
        <Card className="border-border bg-card/90 p-6 shadow-xl shadow-black/10">
            <div className="space-y-8">
                <section className="space-y-4">
                    <SectionHeading
                        badge="1. Your Playstyle"
                        title="Tell us about the games you play"
                    />

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
                                    icon={option.icon}
                                    onClick={() => onToggleGame(option.title)}
                                />
                            );
                        })}
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Primary games. Select up to 3.
                    </p>

                    <div className="grid gap-3 md:grid-cols-3">
                        {sensitivityOptions.map((option) => (
                            <button
                                key={option.title}
                                type="button"
                                onClick={() => onSensitivityChange(option.title)}
                                className={cn(
                                    "rounded-2xl border px-4 py-4 text-left transition-all",
                                    value.sensitivityBand === option.title
                                        ? "border-violet-400/55 bg-violet-400/10"
                                        : "border-border bg-background/55 hover:border-foreground/15"
                                )}
                            >
                                <p className="text-sm font-medium text-foreground">
                                    {option.display}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {option.body}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <SectionHeading
                        badge="2. Your Preferences"
                        title="How do you want your mousepad to feel?"
                    />

                    <div className="rounded-2xl border border-border bg-background/55 p-4">
                        <div className="relative px-2 pt-1">
                            <div className="absolute top-4 left-4 right-4 h-px bg-border" />
                            <div className="relative grid grid-cols-5 gap-2">
                                {desiredSteps.map((step) => (
                                    <button
                                        key={step.value}
                                        type="button"
                                        onClick={() => onDesiredFeelChange(step.value)}
                                        className="flex flex-col items-center gap-3 text-center"
                                    >
                                        <span
                                            className={cn(
                                                "relative z-10 size-3 rounded-full border bg-background transition-all",
                                                value.desiredFeel === step.value
                                                    ? "border-violet-300 bg-violet-300 shadow-[0_0_0_4px_rgba(167,139,250,0.12)]"
                                                    : "border-border"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "text-[11px] leading-4 text-muted-foreground",
                                                value.desiredFeel === step.value
                                                    ? "text-foreground"
                                                    : ""
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
                        label="Previous mousepad feel"
                        options={previousFeelOptions}
                        activeValue={value.previousPadFeel}
                        onChange={(nextValue) =>
                            onPreviousFeelChange(
                                nextValue as FinderFormValue["previousPadFeel"]
                            )
                        }
                    />

                    <ChipGroup
                        label="Texture preference"
                        options={textureOptions}
                        activeValue={value.texturePreference}
                        onChange={(nextValue) =>
                            onTextureChange(
                                nextValue as FinderFormValue["texturePreference"]
                            )
                        }
                    />
                </section>

                <section className="space-y-4">
                    <SectionHeading
                        badge="3. Environment"
                        title="Any conditions we should factor in?"
                    />

                    <button
                        type="button"
                        onClick={onHumidityChange}
                        className={cn(
                            "w-full rounded-2xl border p-5 text-left transition-all",
                            value.humidityConcern
                                ? "border-violet-400/55 bg-violet-400/10"
                                : "border-border bg-background/55 hover:border-foreground/15"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <span
                                className={cn(
                                    "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border",
                                    value.humidityConcern
                                        ? "border-violet-400/40 bg-violet-400/12 text-violet-100"
                                        : "border-border bg-background/75 text-foreground/82"
                                )}
                            >
                                <Droplets className="size-4" />
                            </span>
                            <span>
                                <span className="block text-sm font-medium text-foreground">
                                    High humidity environment
                                </span>
                                <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                                    I play in a very humid or sweaty environment.
                                </span>
                            </span>
                        </div>
                    </button>
                </section>

                <div className="space-y-3 pt-2">
                    <Button
                        type="button"
                        className="h-12 w-full rounded-2xl"
                        onClick={onSubmit}
                    >
                        Find My Mousepads
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                        Takes 2 seconds · 100% free
                    </p>
                </div>
            </div>
        </Card>
    );
}

function SectionHeading({
    badge,
    title,
}: {
    badge: string;
    title: string;
}) {
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
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "rounded-full border px-3 py-2 text-xs transition-all",
                            activeValue === option.value
                                ? "border-violet-400/55 bg-violet-400/10 text-foreground"
                                : "border-border bg-background/55 text-muted-foreground hover:border-foreground/15 hover:text-foreground"
                        )}
                    >
                        {option.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
