import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Headphones,
  Sparkles,
  SquareStack,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  mousepadCount: number;
  glasspadCount: number;
  iemCount: number;
  bestPageCount: number;
};

type Destination = {
  title: "Mousepads" | "Glasspads" | "IEMs" | "Best";
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
    title: "IEMs",
    href: "/iems",
    description:
      "Browse in-ear monitors by tuning, imaging, comfort, and FPS audio fit.",
    statLabel: "Audio picks",
    icon: Headphones,
    accent: "from-[color:color-mix(in_srgb,var(--brand)_14%,transparent)] to-transparent",
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
] as const;

export function PagesShowcaseSection({
  mousepadCount,
  glasspadCount,
  iemCount,
  bestPageCount,
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
      label: "IEMs",
      value: iemCount.toString(),
      icon: Headphones,
    },
    {
      label: "Best guides",
      value: bestPageCount.toString(),
      icon: Sparkles,
    },
  ];

  return (
    <section className="space-y-5">
      <div className="mb-6 text-start md:mb-8">
        <Badge
          variant="outline"
          className="rounded-md px-3 py-1 uppercase tracking-[0.14em] text-[10px] text-brand-hover sm:text-[11px] sm:tracking-[0.18em]"
        >
          Core pages
        </Badge>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:mt-5 md:text-6xl">
          Start where the question starts.
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
        {destinations.map((item) => {
          const Icon = item.icon;
          const value =
            item.title === "Mousepads"
              ? mousepadCount
              : item.title === "Glasspads"
                ? glasspadCount
                : item.title === "IEMs"
                  ? iemCount
                  : bestPageCount;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/70 p-4 transition-colors hover:border-[color-mix(in_srgb,var(--brand-hover)_48%,transparent)] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--brand-glow)_12%,transparent)] sm:p-5 lg:p-6"
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
                  <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {value}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.16em]">
                    {item.statLabel}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 md:mt-8">
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {item.title}
                </p>
                <p className="mt-3 max-w-[30ch] text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
                  {item.description}
                </p>
              </div>

              <div className="relative mt-auto pt-6 md:pt-8">

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 bg-background/92 px-3 py-4 sm:gap-4 sm:px-5 sm:py-5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--brand-hover)_24%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-brand-hover sm:size-10">
                <Icon className="size-4 sm:size-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
