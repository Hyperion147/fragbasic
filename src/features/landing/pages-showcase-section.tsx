import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  Headphones,
  Sparkles,
  SquareStack,
} from "lucide-react";

type Props = {
  mousepadCount: number;
  glasspadCount: number;
  iemCount: number;
  bestPageCount: number;
};

type Destination = {
  title: string;
  eyebrow: string;
  href: string;
  description: string;
  statLabel: string;
  icon: typeof Boxes;
};

const destinations: readonly Destination[] = [
  {
    title: "Mousepads",
    eyebrow: "Find your surface",
    href: "/mousepads",
    description:
      "Filter the full cloth-pad database by real glide, stopping power, texture, game fit, and availability.",
    statLabel: "pads mapped",
    icon: Boxes,
  },
  {
    title: "Glasspads",
    eyebrow: "Explore pure speed",
    href: "/mousepads/glasspads",
    description:
      "Compare hard surfaces where speed, consistency, finish, and climate stability matter most.",
    statLabel: "glass surfaces",
    icon: SquareStack,
  },
  {
    title: "IEMs",
    eyebrow: "Hear the difference",
    href: "/iems",
    description:
      "Research in-ear monitors through imaging, clarity, tuning, comfort, and competitive FPS performance.",
    statLabel: "audio picks",
    icon: Headphones,
  },
  {
    title: "Best lists",
    eyebrow: "Skip to the shortlist",
    href: "/best",
    description:
      "Start with focused picks for control, speed, tactical FPS, glass, and difficult room conditions.",
    statLabel: "expert guides",
    icon: Sparkles,
  },
] as const;

export function PagesShowcaseSection({
  mousepadCount,
  glasspadCount,
  iemCount,
  bestPageCount,
}: Props) {
  const values = [mousepadCount, glasspadCount, iemCount, bestPageCount];

  return (
    <section className="relative isolate overflow-hidden border-y border-white/8 bg-[#0b0b0f]">

      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
        {destinations.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex min-h-52 flex-col overflow-hidden border-b border-white/8 p-4 transition-colors duration-500 odd:border-r hover:bg-[color:color-mix(in_srgb,var(--brand)_9%,transparent)] sm:min-h-[25rem] sm:p-8 xl:min-h-[31rem] xl:border-b-0 xl:border-r xl:p-10 xl:last:border-r-1 xl:first:border-l-1"
            >
              <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand-hover transition-transform duration-500 group-hover:scale-x-100" />
              <div className="absolute -right-20 -top-20 size-56 rounded-full bg-brand/0 blur-[70px] transition-colors duration-500 group-hover:bg-brand/16" />

              <div className="relative flex items-start justify-between gap-4">
                <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[.025] text-white/55 transition-all duration-500 group-hover:border-brand-hover/30 group-hover:bg-brand/12 group-hover:text-brand-hover sm:size-12">
                  <Icon className="size-4 sm:size-5" />
                </span>
                <span className="font-mono text-[10px] text-white/24 sm:text-xs">
                  0{index + 1} / 04
                </span>
              </div>

              <div className="relative mt-8 sm:mt-16 xl:mt-24">
                <p className="hidden text-[10px] font-medium uppercase text-brand-hover sm:block sm:text-xs">
                  {item.eyebrow}
                </p>
                <h3 className="text-lg font-semibold tracking-[-.04em] text-white sm:mt-3 sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 hidden max-w-sm text-sm leading-6 text-white/45 sm:block sm:text-base sm:leading-7">
                  {item.description}
                </p>
              </div>

              <div className="relative mt-auto flex items-end justify-between gap-3 pt-5 sm:gap-5 sm:pt-12">
                <div>
                  <p className="text-2xl font-semibold leading-none tracking-[-.055em] text-white sm:text-5xl">
                    {values[index]}
                  </p>
                  <p className="mt-2 hidden text-[10px] font-medium uppercase text-white/32 sm:block sm:text-xs">
                    {item.statLabel}
                  </p>
                </div>
                <span className="flex size-8 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black sm:size-11">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
