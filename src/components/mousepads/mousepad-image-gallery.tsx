import Image from "next/image"

type Props = {
  brand: string
  name: string
  image: string
}

export function MousepadImageGallery({ brand, name, image }: Props) {
  if (!image) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-background/60">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={`${brand} ${name}`}
          fill
          sizes="(min-width: 768px) 42vw, 100vw"
          className="object-contain p-4"
          priority
        />
      </div>
    </div>
  )
}
