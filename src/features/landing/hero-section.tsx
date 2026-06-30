import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, CircleDot, Crosshair } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  mousepadCount: number;
};

export function HeroSection({ mousepadCount }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="relative z-10 grid w-full gap-6 md:min-h-130 md:grid-cols-[0.92fr_1.08fr] md:gap-8">
        <div className="flex flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 md:ml-10 md:px-6 md:py-0 lg:ml-20 lg:px-8">
          <Badge
            variant="outline"
            className="w-fit gap-2 rounded-md bg-background/60 px-3 py-2 text-[10px] uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.16em]"
          >
            <span className="size-2 rounded-full bg-[color:var(--brand)]" />
            Competitive gaming gear database
          </Badge>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tighter text-foreground sm:text-5xl md:mt-6 md:text-7xl">
            Find the gear that matches how you play.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:mt-6 md:text-lg">
            In-depth data. Real-world experience. No fluff. Just gear that
            fits.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/mousepads/compare/universal">
                Compare Gear
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/mousepads">Browse Mousepads</Link>
            </Button>
          </div>

          <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 md:mt-8 lg:flex lg:flex-wrap lg:items-center lg:gap-4">
            <Metric icon={CheckCircle2} label={`${mousepadCount} mousepads`} />
            <Metric icon={CircleDot} label="Product-first browsing" />
            <Metric icon={Crosshair} label="Community + personal data" />
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
}: {
  icon: typeof CheckCircle2;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="size-4" />
      {label}
    </span>
  );
}
