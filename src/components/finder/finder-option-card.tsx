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
    onClick,
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "group rounded-2xl border p-4 text-left transition-all duration-200",
                active
                    ? "border-violet-400/55 bg-violet-400/10 shadow-[0_0_0_1px_rgba(167,139,250,0.18)]"
                    : "border-border bg-background/60 hover:border-foreground/15 hover:bg-background/78",
                disabled ? "cursor-not-allowed opacity-40" : "",
            )}
        >
            <div className="flex items-center gap-4">
                <span className="block text-sm font-medium text-foreground">
                    {title}
                </span>
            </div>
        </button>
    );
}
