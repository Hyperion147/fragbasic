"use client";

import { IconTooltip } from "@/components/ui/tooltip";
import { getMouseSkateVisual } from "@/lib/accessories/mouse-skates";
import { cn } from "@/lib/utils";
import type { MouseSkate } from "@/types/accessory";

export function MouseSkateDot({
  skate,
  size = "md",
  className,
}: {
  skate: MouseSkate;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const visual = getMouseSkateVisual(skate);
  const sizeClass = {
    sm: "size-10",
    md: "size-16",
    lg: "size-24",
  }[size];

  return (
    <IconTooltip label={`${skate.name}: ${visual.colorName}`}>
      <div
        className={cn(
          "relative shrink-0 rounded-full border border-white/25 shadow-2xl shadow-black/35",
          sizeClass,
          className,
        )}
        style={{
          background: `linear-gradient(135deg, ${visual.secondaryHex}, ${visual.primaryHex})`,
        }}
        role="img"
        tabIndex={0}
        aria-label={`${skate.name} skate color ${visual.colorName}`}
      >
        <span className="absolute inset-[18%] rounded-full border border-white/10 bg-white/5" />
        <span className="absolute right-[16%] bottom-[12%] h-[18%] w-[46%] rounded-full bg-black/25 blur-sm" />
      </div>
    </IconTooltip>
  );
}
