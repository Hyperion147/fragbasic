import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, CircleDot, Crosshair } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTooltip } from "@/components/ui/tooltip";

type Props = {
  mousepadCount: number;
};

export function HeroSection({ mousepadCount }: Props) {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-background shadow-[inset_0_-1px_0_color-mix(in_srgb,var(--foreground)_6%,transparent)]">
      <div className="relative z-10 grid min-h-[calc(100svh-4rem)] w-full gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
        <div className="flex flex-col justify-center px-4 py-12 sm:px-6 md:ml-10 md:px-6 md:py-0 lg:ml-20 lg:px-8">
          <Badge
            variant="outline"
            className="w-fit gap-2 rounded-md bg-background/60 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-brand-hover sm:text-[11px] sm:tracking-[0.16em]"
          >
            <span className="size-2 rounded-full bg-[color:var(--brand)]" />
            Competitive gaming gear database
          </Badge>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:mt-7 md:text-6xl lg:text-7xl">
            Find the gear that matches how you play.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:mt-6 md:text-lg md:leading-8">
            In-depth data. Real-world experience. No fluff. Just gear that
            fits.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-9">
            <IconTooltip label="Build a side-by-side mousepad comparison from the database.">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/mousepads/compare/universal">
                  Compare Gear
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </IconTooltip>
            <IconTooltip label="Open the full mousepad browser with filters for feel, surface, and availability.">
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/mousepads">Browse Mousepads</Link>
              </Button>
            </IconTooltip>
          </div>

          <div className="mt-8 grid max-w-2xl gap-2.5 text-sm text-muted-foreground sm:grid-cols-3 md:mt-10">
            <Metric
              icon={CheckCircle2}
              label={`${mousepadCount} mousepads`}
              tooltip="Tracked mousepads with surface, feel, availability, and use-case data."
            />
            <Metric
              icon={CircleDot}
              label="Product-first browsing"
              tooltip="Browse actual products and tables first, not marketing copy."
            />
            <Metric
              icon={Crosshair}
              label="Community + personal data"
              tooltip="Notes combine personal testing, community consensus, and source links."
            />
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden sm:min-h-[340px] md:min-h-full">
          <Image
            src="/hero-bg.png"
            alt="hero background"
            fill
            sizes="(max-width: 768px) 100vw, 54vw"
            loading="eager"
            className="object-cover object-center md:object-contain md:object-right"
          />
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
  icon: typeof CheckCircle2;
  label: string;
  tooltip: string;
}) {
  return (
    <IconTooltip label={tooltip}>
      <span className="inline-flex min-h-11 cursor-help items-center gap-2 rounded-md bg-card/45 px-3 py-2 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_4%,transparent)]">
        <Icon className="size-4 text-brand-hover" />
        <span className="leading-5">{label}</span>
      </span>
    </IconTooltip>
  );
}
