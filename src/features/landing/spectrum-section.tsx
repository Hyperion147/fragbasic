import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/features/landing/section-header";

const visualSpectrumPads = [
  { name: "QcK", color: "#75d66d" },
  { name: "G-SR-SE\nGris", color: "#58c37a" },
  { name: "Saturn\nPro", color: "#4fd19a" },
  { name: "Zero\nSoft", color: "#35d6bf" },
  { name: "AC Zero", color: "#35c9df" },
  { name: "Equate\nPlus V2", color: "#34abea" },
  { name: "AC II", color: "#3f86f5" },
  { name: "Hyperion", color: "#6858ff" },
  { name: "Otsu\nSoft", color: "#9367f2" },
  { name: "Hien", color: "#c15ac7" },
  { name: "Neptune", color: "#d44d91" },
  { name: "Raiden", color: "#ff755e" },
] as const;

export function SpectrumSection() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card/40 p-6 md:p-8">
      <SectionHeader
        title="The Speed-Control Spectrum"
        href="/mousepads"
        action="Explore all mousepads"
      />

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="relative min-w-[980px] px-4 pt-4 pb-4">
          <div className="absolute top-[22px] right-4 left-4 h-0.5 rounded-full bg-gradient-to-r from-lime-300 via-cyan-300 via-45% via-blue-400 via-65% via-violet-500 via-78% via-pink-500 to-orange-400 shadow-[0_0_18px_rgba(99,224,173,0.45)]" />

          <div className="flex w-full items-start gap-6">
            <div className="flex w-full justify-between">
              {visualSpectrumPads.map((pad) => (
                <Link
                  key={pad.name}
                  href="/mousepads"
                  className="relative flex flex-col items-center"
                >
                  <span
                    className="relative z-10 size-4 rounded-full border-2 border-background ring-2 ring-white/35 shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                    style={{ backgroundColor: pad.color }}
                  />
                  <span className="mt-6 whitespace-pre-line text-center text-sm font-medium leading-5 text-foreground/88">
                    {pad.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-full items-end justify-between pt-2">
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                Control
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                More stopping power
              </p>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/mousepads">Show all mousepads</Link>
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                Speed
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                More glide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
