import Image from "next/image";
import { Gamepad2, SlidersHorizontal, Sparkles } from "lucide-react";

export function WhySection() {
  return (
    <section className="grid overflow-hidden rounded-2xl border border-border bg-card/40 md:grid-cols-[0.68fr_1fr]">
      <div className="relative min-h-[420px] bg-card">
        <Image
          src="/why-this-exist.png"
          alt="Desk setup preview"
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>
      <div className="flex h-full flex-col justify-center p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Why this exists
        </p>
        <h2 className="mt-3 text-5xl font-semibold tracking-tight">
          Real data. Real experience.
        </h2>
        <p className="mt-5 max-w-xl text-2xl leading-relaxed text-muted-foreground">
          I have spent years testing gear, reading forums, and learning what
          actually matters in game. This site is built to make that knowledge
          easy to find and actually useful.
        </p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
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
