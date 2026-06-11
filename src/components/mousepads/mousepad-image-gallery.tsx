"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type Props = {
  brand: string
  name: string
  images: string[]
}

export function MousepadImageGallery({ brand, name, images }: Props) {
  const galleryImages = images.filter(Boolean)
  const [activeImage, setActiveImage] = useState(galleryImages[0])

  if (!activeImage) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-border bg-background/60">
        <div className="relative aspect-square">
          <Image
            src={activeImage}
            alt={`${brand} ${name}`}
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-contain p-4"
            priority
          />
        </div>
      </div>

      {galleryImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {galleryImages.map((image, index) => {
            const isActive = image === activeImage

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-2xl border bg-background/60 transition-all",
                  isActive
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/50"
                )}
                aria-pressed={isActive}
                aria-label={`View ${brand} ${name} image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${brand} ${name} thumbnail ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
