import Image from "next/image";
import { Gamepad2, SlidersHorizontal, Sparkles } from "lucide-react";

export function WhySection() {
  return (
    <section className="grid overflow-hidden rounded-2xl border border-border bg-card/40 md:grid-cols-[0.68fr_1fr]">
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
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Real data. Real experience.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-xl sm:leading-relaxed md:mt-5 md:text-2xl">
          I have spent years testing gear, reading forums, and learning what
          actually matters in game. This site is built to make that knowledge
          easy to find and actually useful.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground md:mt-8 md:gap-5">
          <Metric icon={Sparkles} label="Tested by me" />
          <Metric icon={Gamepad2} label="Community insights" />
          <Metric icon={SlidersHorizontal} label="Always updating" />
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
}: {
  icon: typeof Sparkles;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="size-4" />
      {label}
    </span>
  );
}
