import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { SectionHeader } from "@/features/landing/section-header";
import type { ComparisonPreview } from "@/features/landing/types";

type Props = {
  comparisons: ComparisonPreview[];
};

export function PopularComparisonsSection({ comparisons }: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card/40 p-6 md:p-8">
      <SectionHeader
        title="Popular Comparisons"
        href="/mousepads/compare"
        action="View all comparisons"
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/mousepads/compare/${comparison.slug}`}
            className="group grid min-h-[148px] grid-cols-[1fr_auto_1fr] overflow-hidden rounded-xl border border-border bg-background/70 transition-colors hover:border-primary/55"
          >
            <CompareSide
              name={comparison.leftName}
              image={comparison.leftImage}
              color={comparison.leftColor}
            />
            <div className="z-10 flex items-center justify-center px-4">
              <span className="rounded-full text-xs font-semibold tracking-[0.5px]">
                VS
              </span>
            </div>
            <CompareSide
              name={comparison.rightName}
              image={comparison.rightImage}
              color={comparison.rightColor}
              align="right"
            />
            <div className="col-span-3 flex gap-2 px-5 pb-2">
              {comparison.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-md text-[10px] tracking-[0.5px]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CompareSide({
  name,
  image,
  color,
  align,
}: {
  name: string;
  image: string;
  color: string;
  align?: "right";
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-[180px] items-end overflow-hidden p-5 text-base font-semibold md:p-6",
        align === "right" ? "justify-end text-right" : "",
      )}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent 70%)`,
        }}
      />
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 28vw"
        className={cn(
          "object-contain p-5 opacity-95 transition-transform duration-300 group-hover:scale-105",
          align === "right" ? "object-right" : "object-left",
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background via-background/75 to-transparent" />
      <span className="relative z-10 max-w-[14ch] text-sm leading-5 font-semibold text-foreground md:text-base">
        {name}
      </span>
    </div>
  );
}
