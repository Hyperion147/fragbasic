"use client"

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
          <button
            key={colorway.slug}
            className="size-6 rounded-full border border-border"
            style={{
              backgroundColor:
                colorway.primary,
            }}
            title={colorway.name}
          />
        )
      )}
    </div>
  )
}