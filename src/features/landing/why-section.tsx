import Image from "next/image";
import { Gamepad2, SlidersHorizontal, Sparkles } from "lucide-react";

import { IconTooltip } from "@/components/ui/tooltip";

export function WhySection() {
  return (
    <section className="grid overflow-hidden rounded-lg bg-card/40 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_4%,transparent)] md:grid-cols-[0.68fr_1fr]">
      <div className="relative min-h-[240px] bg-card sm:min-h-[320px] md:min-h-[420px]">
        <Image
          src="/why-this-exist.png"
          alt="Desk setup preview"
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
      </div>
      <div className="flex h-full flex-col justify-center p-5 sm:p-8 md:p-10">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-sm sm:tracking-[0.2em]">
          Why this exists
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Real data. Real experience.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:mt-5 md:text-xl">
          I have spent years testing gear, reading forums, and learning what
          actually matters in game. This site is built to make that knowledge
          easy to find and actually useful.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground md:mt-8 md:gap-5">
          <Metric icon={Sparkles} label="Tested by me" tooltip="Firsthand notes are included where available." />
          <Metric icon={Gamepad2} label="Community insights" tooltip="Community consensus helps catch patterns one desk cannot." />
          <Metric icon={SlidersHorizontal} label="Always updating" tooltip="The database is meant to evolve as more products and notes are added." />
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  tooltip,
}: {
  icon: typeof Sparkles;
  label: string;
  tooltip: string;
}) {
  return (
    <IconTooltip label={tooltip}>
      <span className="inline-flex cursor-help items-center gap-2 rounded-md bg-background/45 px-3 py-2 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_4%,transparent)]">
        <Icon className="size-4 text-brand-hover" />
        {label}
      </span>
    </IconTooltip>
  );
}
