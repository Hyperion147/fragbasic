import Image from "next/image";
import { Gamepad2, RefreshCw, ScanSearch } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Hands-on where possible",
    body: "Firsthand testing notes are separated clearly from sourced and community data.",
    icon: Gamepad2,
  },
  {
    number: "02",
    title: "Patterns over hype",
    body: "Repeated community experience matters more than one loud opinion or a spec sheet.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Always getting sharper",
    body: "Profiles evolve as products, long-term impressions, and better evidence arrive.",
    icon: RefreshCw,
  },
] as const;

export function WhySection() {
  return (
    <section className="landing-noise relative isolate overflow-hidden border-y border-white/8 bg-[#0a0a0e]">
      <div className="landing-hero-lines absolute inset-0 -z-10 opacity-15" />

      <div className="grid grid-cols-2 sm:hidden">
        <article className="flex min-h-40 flex-col border-b border-r border-white/8 bg-brand/[.06] p-4">
          <p className="text-[9px] font-semibold uppercase text-brand-hover">Why this exists</p>
          <h2 className="mt-auto text-xl font-semibold leading-[1.05] tracking-[-.04em] text-white">
            Real data.<span className="block text-brand-hover">Real experience.</span>
          </h2>
        </article>
        {principles.map((principle, index) => {
          const Icon = principle.icon;
          return (
            <article
              key={principle.number}
              className={`flex min-h-40 flex-col border-white/8 p-4 ${index === 0 ? "border-b" : ""} ${index === 1 ? "border-r" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-white/25">{principle.number}</span>
                <Icon className="size-4 text-brand-hover" />
              </div>
              <h3 className="mt-auto text-sm font-semibold leading-tight text-white">{principle.title}</h3>
            </article>
          );
        })}
      </div>

      <div className="hidden sm:grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[28rem] overflow-hidden border-b border-white/8 sm:min-h-[36rem] lg:min-h-[48rem] lg:border-b-0 lg:border-r">
          <Image
            src="/why-this-exist.png"
            alt="A focused desktop gaming setup used to research competitive gear"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,11,.9)_0%,transparent_42%),linear-gradient(90deg,transparent_68%,rgba(8,8,11,.28)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8 lg:p-10">
            <div>
              <p className="text-[10px] font-semibold uppercase text-brand-hover sm:text-xs">
                The desk behind the database
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/58">
                Built by a player who would rather understand the difference than buy the hype.
              </p>
            </div>
            <span className="hidden font-mono text-[10px] text-white/25 sm:block">
              FRAGBASIC / 2026
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-1 p-6 sm:p-9 lg:p-12 xl:p-16">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase text-brand-hover sm:text-xs">
              <span className="size-1.5 rounded-full bg-brand-hover shadow-[0_0_12px_var(--brand-glow)]" />
              Why this exists
            </p>

            <h2 className="mt-4 text-[clamp(2rem,5vw,6rem)] font-semibold text-white">
              Real data.
              <span className="block text-brand-hover">Real experience.</span>
            </h2>

            <div className="grid gap-6 xl:grid-cols-[1fr_.65fr] mt-8">
              <p className="max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                I spent years testing gear, reading forums, and learning which
                differences actually show up in game. FragBasic turns that work
                into clear profiles and comparisons you can use.
              </p>
              <p className="border-l border-brand-hover/30 pl-5 text-lg font-medium leading-7 tracking-[-.025em] text-white/82 sm:text-xl sm:leading-8 items-end flex">
                The goal isn&apos;t more gear. It&apos;s the right gear.
              </p>
            </div>
          </div>

          <div className="grid border-t border-white/8 sm:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.number}
                  className="group border-b border-white/8 p-5 transition-colors hover:bg-brand/[.055] last:border-b-0 sm:border-b-0 sm:border-r sm:p-6 sm:last:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/24">
                      {principle.number}
                    </span>
                    <Icon className="size-4 text-white/32 transition-colors group-hover:text-brand-hover" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-[-.02em] text-white">
                    {principle.title}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
