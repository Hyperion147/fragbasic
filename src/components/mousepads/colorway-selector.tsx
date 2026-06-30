"use client"

import { IconTooltip } from "@/components/ui/tooltip"
import type { Mousepad } from "@/types/mousepad"

type Props = {
  mousepad: Mousepad
}

export function ColorwaySelector({
  mousepad,
}: Props) {
  return (
    <div className="flex gap-2">
      {mousepad.visuals.colorways.map(
        (colorway) => (
          <IconTooltip key={colorway.slug} label={colorway.name}>
            <button
              className="size-6 rounded-full border border-border"
              style={{
                backgroundColor: colorway.color,
              }}
              aria-label={colorway.name}
            />
          </IconTooltip>
        )
      )}
    </div>
  )
}
