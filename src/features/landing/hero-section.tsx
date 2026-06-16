import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, CircleDot, Crosshair } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  mousepadCount: number;
  brandCount: number;
};

export function HeroSection({ mousepadCount, brandCount }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="relative z-10 grid min-h-130 w-full gap-8 md:grid-cols-[0.92fr_1.08fr]">
        <div className="ml-20 flex flex-col justify-center px-4 md:px-6 lg:px-8">
          <Badge
            variant="outline"
            className="w-fit gap-2 rounded-md bg-background/60 px-3 py-2 text-[11px] uppercase tracking-[0.16em]"
          >
            <span className="size-2 rounded-full bg-[color:var(--brand)]" />
            Competitive gaming gear database
          </Badge>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground md:text-7xl">
            Find the gear that matches how you play.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            In-depth data. Real-world experience. No fluff. Just gear that
            fits.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/mousepads/compare/universal">
                Compare Gear
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/mousepads">Browse Mousepads</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Metric icon={CheckCircle2} label={`${mousepadCount} mousepads`} />
            <Metric icon={CircleDot} label={`${brandCount} brands`} />
            <Metric icon={Crosshair} label="Community + personal data" />
          </div>
        </div>

        <div className="relative hidden md:block">
          <Image
            src="/hero-bg.png"
            alt="hero background"
            width="1080"
            height="1920"
            loading="eager"
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
