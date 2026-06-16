import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Scale,
  Sparkles,
  SquareStack,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  mousepadCount: number;
  glasspadCount: number;
  bestPageCount: number;
  comparisonCount: number;
};

type Destination = {
  title: "Mousepads" | "Glasspads" | "Best" | "Compare";
  href: string;
  description: string;
  statLabel: string;
  icon: typeof Boxes;
  accent: string;
};

const destinations: readonly Destination[] = [
  {
    title: "Mousepads",
    href: "/mousepads",
    description:
      "Browse the full cloth-pad database and narrow the field by feel, game fit, and brand.",
    statLabel: "Tracked pads",
    icon: Boxes,
    accent: "from-white/6 to-transparent",
  },
  {
    title: "Glasspads",
    href: "/mousepads/glasspads",
    description:
      "Go straight to the hard-surface lineup when speed, cleanliness, and climate stability matter.",
    statLabel: "Dedicated lineup",
    icon: SquareStack,
    accent: "from-[color:color-mix(in_srgb,var(--brand)_18%,transparent)] to-transparent",
  },
  {
    title: "Best",
    href: "/best",
    description:
      "Use curated shortlists for control, speed, tac FPS, glass, and humid-room consistency.",
    statLabel: "Guide routes",
    icon: Sparkles,
    accent: "from-white/6 to-transparent",
  },
  {
    title: "Compare",
    href: "/mousepads/compare",
    description:
      "Read published matchups or build your own side-by-side set when the shortlist gets tight.",
    statLabel: "Published writeups",
    icon: Scale,
    accent: "from-[color:color-mix(in_srgb,var(--brand)_14%,transparent)] to-transparent",
  },
] as const;

export function PagesShowcaseSection({
  mousepadCount,
  glasspadCount,
  bestPageCount,
  comparisonCount,
}: Props) {
  const stats = [
    {
      label: "Mousepads",
      value: mousepadCount.toString(),
      icon: Boxes,
    },
    {
      label: "Glasspads",
      value: glasspadCount.toString(),
      icon: SquareStack,
    },
    {
      label: "Best guides",
      value: bestPageCount.toString(),
      icon: Sparkles,
    },
    {
      label: "Published comparisons",
      value: comparisonCount.toString(),
      icon: Scale,
    },
  ];

  return (
    <section className="space-y-5">
      <div className="text-start mb-8">
        <Badge
          variant="outline"
          className="rounded-md px-3 py-1 uppercase tracking-[0.18em] text-[11px] text-brand-hover"
        >
          Core pages
        </Badge>
        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Start where the question starts.
        </h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {destinations.map((item) => {
          const Icon = item.icon;
          const value =
            item.title === "Mousepads"
              ? mousepadCount
              : item.title === "Glasspads"
                ? glasspadCount
                : item.title === "Best"
                  ? bestPageCount
                  : comparisonCount;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/70 p-6 transition-colors hover:border-[color-mix(in_srgb,var(--brand-hover)_48%,transparent)] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--brand-glow)_12%,transparent)]"
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-linear-to-b opacity-90",
                  item.accent,
                )}
              />
              <div className="relative flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--brand-hover)_28%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-brand-hover">
                  <Icon className="size-5" />
                </span>
                <div className="text-right">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {item.statLabel}
                  </p>
                </div>
              </div>

              <div className="relative mt-8">
                <h3 className="text-3xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[30ch] text-base leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="relative mt-auto pt-8">

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 bg-background/92 px-5 py-5"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--brand-hover)_24%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-brand-hover">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
