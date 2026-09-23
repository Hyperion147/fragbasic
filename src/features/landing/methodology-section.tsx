import Link from "next/link";
import { ArrowUpRight, Crosshair, GitCompareArrows, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Define your feel",
    body: "Start with control, speed, stopping power, and the games you actually play.",
    icon: SlidersHorizontal,
  },
  {
    number: "02",
    title: "Compare the trade-offs",
    body: "Put products side by side and see where texture, glide, climate, and value diverge.",
    icon: GitCompareArrows,
  },
  {
    number: "03",
    title: "Choose with confidence",
    body: "Use the verdict and community context to make a shortlist that fits your setup.",
    icon: Crosshair,
  },
] as const;

export function MethodologySection() {
  return (
    <>
      <section className="overflow-hidden border border-white/7 bg-[#101014] sm:hidden">
        <div className="col-span-2 border-b border-white/7 p-4">
          <p className="text-[10px] font-medium uppercase text-brand-hover">The FragBasic method</p>
          <h2 className="mt-2 text-2xl font-semibold leading-none tracking-[-.04em]">
            From question to choice.
          </h2>
        </div>
        <div className="grid grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className="group flex min-h-40 flex-col border-b border-white/7 p-4 odd:border-r"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/30">{step.number}</span>
                  <Icon className="size-4 text-white/45" />
                </div>
                <h3 className="mt-auto max-w-[10ch] text-base font-semibold leading-tight tracking-[-.025em]">
                  {step.title}
                </h3>
              </article>
            );
          })}
          <Link
            href="/mousepads/compare/universal"
            className="group flex min-h-40 flex-col justify-between bg-brand p-4 text-white"
          >
            <ArrowUpRight className="ml-auto size-5" />
            <span className="max-w-[9ch] text-base font-semibold leading-tight">Compare your picks</span>
          </Link>
        </div>
      </section>

      <section className="hidden overflow-hidden rounded-[1.75rem] border border-white/7 bg-[#101014] sm:block">
      <div className="grid border-b border-white/7 lg:grid-cols-[.8fr_1.2fr]">
        <div className="p-6 sm:p-8 lg:p-12">
          <p className="text-xs font-medium uppercase text-brand-hover">The FragBasic method</p>
          <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-6xl">
            From rabbit hole to right choice.
          </h2>
        </div>
        <div className="flex items-end border-t border-white/7 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-12">
          <p className="max-w-2xl text-base leading-7 text-white/52 sm:text-lg sm:leading-8">
            Specs tell only half the story. We translate technical details and player experience into a repeatable research flow that makes every trade-off visible.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <article
              key={step.number}
              className="group relative min-h-72 border-b border-white/7 p-6 transition-colors hover:bg-white/[.025] sm:p-8 lg:border-b-0 lg:p-10 [&:not(:last-child)]:lg:border-r"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/30">{step.number} / 03</span>
                <span className="flex size-10 items-center justify-center rounded-full border border-white/8 bg-white/[.025] text-white/55 transition-all duration-300 group-hover:border-brand-hover/30 group-hover:text-brand-hover">
                  <Icon className="size-4" />
                </span>
              </div>
              <h3 className="mt-16 text-2xl font-semibold tracking-[-.025em]">{step.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/45 sm:text-base sm:leading-7">{step.body}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-brand-hover transition-all duration-500 group-hover:w-full" />
            </article>
          );
        })}
      </div>

      <Link
        href="/mousepads/compare/universal"
        className="group flex items-center justify-between gap-5 border-t border-white/7 bg-brand px-6 py-5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover hover:text-black sm:px-10"
      >
        Try the universal comparison tool
        <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
      </section>
    </>
  );
}
