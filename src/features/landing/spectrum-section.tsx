import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Gauge,
  Scale,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const spectrumPads = [
  {
    name: "QcK Heavy",
    slug: "steelseries-qck-heavy",
    image: "/mousepads/steelseries/qck-heavy.webp",
    category: "Control",
    control: 9.2,
    speed: 2.0,
  },
  {
    name: "G-SR-SE Gris",
    slug: "zowie-g-sr-se-gris",
    image: "/mousepads/zowie/gsr-se-gris.png",
    category: "Control",
    control: 8.3,
    speed: 3.6,
  },
  {
    name: "Saturn Pro",
    slug: "lgg-saturn-pro-soft",
    image: "/mousepads/lgg/saturn-red.png",
    category: "Control",
    control: 7.2,
    speed: 3.6,
  },
  {
    name: "Zero Soft",
    slug: "artisan-zero-soft",
    image: "/mousepads/artisan/zero-black.png",
    category: "Balanced",
    control: 6.0,
    speed: 5.8,
  },
  {
    name: "AC Zero",
    slug: "xraypad-aqua-control-zero",
    image: "/mousepads/xraypad/aqua-control-zero.png",
    category: "Balanced",
    control: 5.2,
    speed: 6.4,
  },
  {
    name: "Equate Plus V2",
    slug: "xraypad-equate-plus-v2",
    image: "/mousepads/xraypad/eq-plus-v2.png",
    category: "Balanced",
    control: 4.6,
    speed: 6.8,
  },
  {
    name: "AC II",
    slug: "xraypad-aqua-control-ii",
    image: "/mousepads/xraypad/aqua-control-2.webp",
    category: "Speed",
    control: 4.0,
    speed: 7.2,
  },
  {
    name: "Hyperion",
    slug: "pulsar-lgg-hyperion-soft",
    image: "/mousepads/lgg/hyperion-blue.png",
    category: "Speed",
    control: 3.4,
    speed: 7.8,
  },
  {
    name: "Otsu Soft",
    slug: "artisan-hayate-otsu-soft",
    image: "/mousepads/artisan/hayate-otsu-v2-red.png",
    category: "Speed",
    control: 2.9,
    speed: 8.2,
  },
  {
    name: "Hien",
    slug: "artisan-hien-soft",
    image: "/mousepads/artisan/hien-red.png",
    category: "Speed",
    control: 2.4,
    speed: 8.6,
  },
  {
    name: "Neptune",
    slug: "lgg-neptune-pro-soft",
    image: "/mousepads/lgg/neptune-pro.png",
    category: "Speed",
    control: 2.0,
    speed: 9.0,
  },
  {
    name: "Raiden",
    slug: "artisan-raiden-soft",
    image: "/mousepads/artisan/raiden-orange.png",
    category: "Speed",
    control: 1.6,
    speed: 9.4,
  },
] as const;

const spectrumNotes = [
  {
    title: "More Control",
    text: "Higher friction for stopping power and precise micro-corrections.",
    icon: SlidersHorizontal,
  },
  {
    title: "Balanced",
    text: "The middle ground for players who need stability without losing glide.",
    icon: Scale,
  },
  {
    title: "More Speed",
    text: "Lower friction for fast tracking, wide swipes, and effortless movement.",
    icon: Gauge,
  },
] as const;

export function SpectrumSection() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card/40 p-5 md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-brand-hover">
            Mousepad feel map
          </p>
          <h2 className="mt-3 max-w-4xl text-4xl font-semibold md:text-6xl">
            The Speed-Control Spectrum
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button variant="outline" asChild>
            <Link href="/mousepads/compare/universal">
              <Scale className="size-4" />
              Compare surfaces
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/mousepads">
              Explore all mousepads
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto pb-3">
        <div className="min-w-[1120px]">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-1 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="inline-flex items-center gap-2 text-brand-glow">
              <ArrowLeft className="size-4" />
              More Control
            </span>
            <div className="h-px bg-linear-to-r from-[color:color-mix(in_srgb,var(--brand-glow)_68%,transparent)] via-[color:color-mix(in_srgb,var(--brand-hover)_58%,transparent)] to-[color:color-mix(in_srgb,var(--foreground)_34%,transparent)] shadow-[0_0_18px_color-mix(in_srgb,var(--brand-glow)_20%,transparent)]" />
            <span className="inline-flex items-center gap-2 text-foreground">
              More Speed
              <ArrowRight className="size-4" />
            </span>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-3">
            {spectrumPads.map((pad, index) => (
              <Link
                key={pad.slug}
                href={`/mousepads/${pad.slug}`}
                className="group relative flex min-h-[300px] flex-col rounded-lg border border-border bg-background/70 p-3 transition-colors hover:border-[color:color-mix(in_srgb,var(--brand-hover)_46%,transparent)] hover:bg-background hover:shadow-[0_0_24px_color-mix(in_srgb,var(--brand-glow)_10%,transparent)]"
              >
                <span className="absolute top-[-32px] left-1/2 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--brand-glow)_72%,transparent)] bg-background shadow-[0_0_18px_color-mix(in_srgb,var(--brand-glow)_30%,transparent)]">
                  <span
                    className="size-1.5 rounded-full bg-brand-glow"
                    style={{ opacity: 0.35 + index / 18 }}
                  />
                </span>

                <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted/30">
                  <Image
                    src={pad.image}
                    alt={pad.name}
                    fill
                    sizes="110px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold leading-6 text-foreground">
                    {pad.name}
                  </h3>
                  <span className="mt-3 w-fit rounded-md border border-[color:color-mix(in_srgb,var(--brand-hover)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--brand)_14%,transparent)] px-2 py-1 text-xs font-semibold text-brand-glow">
                    {pad.category}
                  </span>

                  <div className="mt-auto space-y-3 pt-5">
                    <Score label="Control" value={pad.control} />
                    <Score label="Speed" value={pad.speed} strong />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
        {spectrumNotes.map((note) => {
          const Icon = note.icon;

          return (
            <div
              key={note.title}
              className="flex gap-4 bg-background/80 px-5 py-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[color:color-mix(in_srgb,var(--brand-hover)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--brand)_10%,transparent)] text-brand-hover">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold">{note.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {note.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/mousepads">
            Show all mousepads
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function Score({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{label}</span>
        <span className={strong ? "font-semibold text-foreground" : ""}>
          {value.toFixed(1)}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={
            strong
              ? "h-full rounded-full bg-brand-hover"
              : "h-full rounded-full bg-brand-glow/70"
          }
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}
