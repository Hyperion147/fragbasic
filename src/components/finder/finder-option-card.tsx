"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
    active: boolean;
    disabled?: boolean;
    title: string;
    body?: string;
    icon?: LucideIcon;
    iconSrc?: string;
    onClick: () => void;
};

export function FinderOptionCard({
    active,
    disabled = false,
    title,
    body,
    icon: Icon,
    iconSrc,
    onClick,
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "group rounded-2xl border p-2 text-left transition-all duration-200",
                active
                    ? "border-violet-400/55 bg-violet-400/10 shadow-[0_0_0_1px_rgba(167,139,250,0.18)]"
                    : "border-border bg-background/60 hover:border-foreground/15 hover:bg-background/78",
                disabled ? "cursor-not-allowed opacity-40" : ""
            )}
        >
            <div className="flex items-center gap-4">
                {iconSrc ? (
                    <span
                        className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-colors",
                            active
                                ? "border-violet-400/40 bg-violet-400/12"
                                : "border-border bg-background/80"
                        )}
                    >
                        <img src={iconSrc} alt="" className="h-5 w-5 object-contain invert" />
                    </span>
                ) : Icon ? (
                    <span
                        className={cn(
                            "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-colors",
                            active
                                ? "border-violet-400/40 bg-violet-400/12 text-violet-100"
                                : "border-border bg-background/80 text-foreground/82"
                        )}
                    >
                        <Icon className="size-4" />
                    </span>
                ) : null}

                <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                        {title}
                    </span>
                    {body ? (
                        <span className="mt-1.5 block text-sm leading-5 text-muted-foreground">
                            {body}
                        </span>
                    ) : null}
                </span>
            </div>
        </button>
    );
}
