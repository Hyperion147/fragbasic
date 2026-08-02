import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Headphones,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  formatIemDriverType,
  formatIemPrice,
  formatIemRating,
  formatIemSoundSignature,
  getIemFullName,
} from "@/lib/iems";
import {
  formatFeelLabel,
  formatMousepadValue,
  getMousepadFullName,
} from "@/lib/mousepads";
import { cn } from "@/lib/utils";
import type { Iem } from "@/types/iem";
import type { Mousepad } from "@/types/mousepad";

type Props = {
  pads?: Mousepad[];
  iems?: Iem[];
};

export function LatestAddedSection({ pads = [], iems = [] }: Props) {
  const visiblePads = pads.slice(0, 3);
  const visibleIems = iems.slice(0, 3);
  const hasPads = visiblePads.length > 0;
  const hasIems = visibleIems.length > 0;

  if (!hasPads && !hasIems) {
    return null;
  }

  const both = hasPads && hasIems;

  return (
    <section className="space-y-5 md:space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge
            variant="outline"
            className="gap-2 rounded-md px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-brand-hover sm:text-[11px] sm:tracking-[0.18em]"
          >
            <Sparkles className="size-3.5" />
            Latest added
          </Badge>

          <h2 className="mt-3 max-w-5xl text-balance text-2xl font-semibold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:mt-5 md:text-5xl">
            <span className="sm:hidden">Fresh additions.</span>
            <span className="hidden sm:inline">
              Fresh to join the database.
            </span>
          </h2>
          <p className="mt-3 hidden max-w-2xl text-sm text-muted-foreground sm:block sm:text-base">
            Just-in community data, side by side — surfaces on the left, audio on
            the right.
          </p>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden rounded-xl border border-white/8 bg-white/8",
          both ? "lg:grid-cols-2" : "grid-cols-1",
        )}
      >
        {hasPads ? (
          <CategoryColumn
            icon={Boxes}
            title="Mousepads"
            href="/mousepads"
            action="Browse pads"
            count={visiblePads.length}
            showDivider={both}
          >
            {visiblePads.map((pad, index) => (
              <LatestMousepadCard
                key={pad.slug}
                pad={pad}
                featured={index === 0}
              />
            ))}
          </CategoryColumn>
        ) : null}

        {hasIems ? (
          <CategoryColumn
            icon={Headphones}
            title="IEMs"
            href="/iems"
            action="Browse IEMs"
            count={visibleIems.length}
          >
            {visibleIems.map((iem, index) => (
              <LatestIemCard
                key={iem.slug}
                iem={iem}
                featured={index === 0}
              />
            ))}
          </CategoryColumn>
        ) : null}
      </div>
    </section>
  );
}

function CategoryColumn({
  icon: Icon,
  title,
  href,
  action,
  count,
  showDivider = false,
  children,
}: {
  icon: typeof Boxes;
  title: string;
  href: string;
  action: string;
  count: number;
  showDivider?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col bg-[#0d0d11]",
        showDivider && "border-b border-white/8 lg:border-b-0 lg:border-r",
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-brand-hover">
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-[11px] text-muted-foreground">
              {count} new {count === 1 ? "entry" : "entries"}
            </p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand-hover transition-colors hover:text-foreground sm:text-sm"
        >
          {action}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-3.5 sm:p-4">
        {children}
      </div>
    </div>
  );
}

function LatestMousepadCard({
  pad,
  featured = false,
}: {
  pad: Mousepad;
  featured?: boolean;
}) {
  const glassFinishLabel =
    pad.category === "glass" && pad.glassSurfaceFinish
      ? pad.glassSurfaceFinish === "unknown"
        ? "Finish unknown"
        : `${formatMousepadValue(pad.glassSurfaceFinish)} glass`
      : null;

  return (
    <Link
      href={`/mousepads/${pad.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-lg bg-card/55 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)] transition-all duration-300",
        "hover:bg-card/80",
        featured
          ? "flex-col sm:min-h-[17rem]"
          : "flex-row items-stretch gap-0",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-background/60",
          featured
            ? "aspect-[16/10] w-full sm:aspect-auto sm:min-h-[10.5rem]"
            : "w-[6.5rem] sm:w-[7.5rem]",
        )}
      >
        <Image
          src={pad.images.main}
          alt={getMousepadFullName(pad)}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 24vw, 90vw"
              : "(min-width: 1024px) 8vw, 30vw"
          }
          className={cn(
            "object-contain transition-transform duration-500 group-hover:scale-[1.04]",
            featured ? "p-5 sm:p-6" : "p-2.5 sm:p-3",
          )}
        />
        {featured ? (
          <Badge className="absolute left-3 top-3 rounded-md bg-brand-hover text-[10px] uppercase tracking-[0.14em] text-black">
            Latest
          </Badge>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0d0d11]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:from-transparent" />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          featured ? "p-4 sm:p-5" : "justify-center p-3 sm:px-4 sm:py-3.5",
        )}
      >
        <div className="flex flex-wrap gap-1.5">
          <Badge className="text-black">
            {formatMousepadValue(pad.category)}
          </Badge>
          <Badge variant="outline">{formatMousepadValue(pad.surface)}</Badge>
          {glassFinishLabel ? (
            <Badge
              variant="outline"
              className="border-sky-300/70 bg-sky-200/10 text-sky-100"
            >
              {glassFinishLabel}
            </Badge>
          ) : null}
        </div>

        <div className={cn(featured ? "mt-3" : "mt-2")}>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
            {pad.brand}
          </p>
          <h3
            className={cn(
              "font-semibold leading-tight tracking-tight text-foreground",
              featured
                ? "mt-1 text-xl sm:text-2xl"
                : "mt-0.5 line-clamp-1 text-sm sm:text-base",
            )}
          >
            {pad.name}
          </h3>
        </div>

        {featured ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {pad.communityConsensus.summary}
          </p>
        ) : null}

        <div
          className={cn(
            "grid gap-1.5",
            featured
              ? "mt-4 grid-cols-2 sm:grid-cols-4"
              : "mt-2.5 grid-cols-2",
          )}
        >
          <StatChip
            label="Control"
            value={formatFeelLabel(pad.feel.control, "control")}
            compact={!featured}
          />
          <StatChip
            label="Glide"
            value={formatFeelLabel(pad.feel.speed, "speed")}
            compact={!featured}
          />
          {featured ? (
            <>
              <StatChip
                label="Stop"
                value={formatFeelLabel(pad.feel.stoppingPower, "stoppingPower")}
              />
              <StatChip
                label="Micro"
                value={formatFeelLabel(
                  pad.feel.microAdjustments,
                  "microAdjustments",
                )}
              />
            </>
          ) : null}
        </div>

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-3",
            featured
              ? "pt-4 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]"
              : "pt-2.5",
          )}
        >
          <span className="truncate text-xs text-muted-foreground">
            {formatMousepadValue(pad.texture.feel)} feel
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand-hover sm:text-sm">
            View
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function LatestIemCard({
  iem,
  featured = false,
}: {
  iem: Iem;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/iems/${iem.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-lg bg-card/55 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)] transition-all duration-300",
        "hover:bg-card/80",
        featured
          ? "flex-col sm:min-h-[17rem]"
          : "flex-row items-stretch gap-0",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-background/60",
          featured
            ? "aspect-[16/10] w-full sm:aspect-auto sm:min-h-[10.5rem]"
            : "w-[6.5rem] sm:w-[7.5rem]",
        )}
      >
        <Image
          src={iem.images.main}
          alt={getIemFullName(iem)}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 24vw, 90vw"
              : "(min-width: 1024px) 8vw, 30vw"
          }
          className={cn(
            "transition-transform duration-500 group-hover:scale-[1.04]",
            featured
              ? "object-cover object-right"
              : "object-contain p-2.5 sm:p-3",
          )}
        />
        {featured ? (
          <Badge className="absolute left-3 top-3 rounded-md bg-brand-hover text-[10px] uppercase tracking-[0.14em] text-black">
            Latest
          </Badge>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0d0d11]/40 to-transparent opacity-70" />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          featured ? "p-4 sm:p-5" : "justify-center p-3 sm:px-4 sm:py-3.5",
        )}
      >
        <div className="flex flex-wrap gap-1.5">
          <Badge className="text-black">
            {formatIemSoundSignature(iem.soundSignature)}
          </Badge>
          <Badge variant="outline">{formatIemDriverType(iem.driverType)}</Badge>
          {featured ? (
            <Badge variant="outline">{formatIemPrice(iem)}</Badge>
          ) : null}
        </div>

        <div className={cn(featured ? "mt-3" : "mt-2")}>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
            {iem.brand}
          </p>
          <div className="flex items-end gap-2">
            <h3
            className={cn(
              "font-semibold leading-tight tracking-tight text-foreground",
              featured
                ? "text-xl sm:text-2xl"
                : "line-clamp-1 text-sm sm:text-base",
            )}
          >
            {iem.name}
          </h3>
          {featured ? (
            <p className="text-sm font-medium text-brand-hover">
              {iem.soundProfile.label}
            </p>
          ) : null}
          </div>
        </div>

        {featured ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {iem.communitySummary}
          </p>
        ) : null}

        <div
          className={cn(
            "grid gap-1.5",
            featured
              ? "mt-4 grid-cols-3"
              : "mt-2.5 grid-cols-2",
          )}
        >
          <StatChip
            label="FPS"
            value={formatIemRating(iem.ratings.fps)}
            compact={!featured}
          />
          <StatChip
            label={featured ? "Music" : "Value"}
            value={formatIemRating(
              featured ? iem.ratings.music : iem.ratings.value,
            )}
            compact={!featured}
          />
          {featured ? (
            <StatChip
              label="Value"
              value={formatIemRating(iem.ratings.value)}
            />
          ) : null}
        </div>

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-3",
            featured
              ? "pt-4 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent)]"
              : "pt-2.5",
          )}
        >
          <span className="truncate text-xs text-muted-foreground">
            {featured
              ? `Score ${formatIemRating(iem.ratings.fragbasic)}`
              : formatIemPrice(iem)}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand-hover sm:text-sm">
            View
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatChip({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md bg-background/65 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)]",
        compact ? "px-2 py-1.5" : "px-2.5 py-2",
      )}
    >
      <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
        {label}
      </p>
      <p
        className={cn(
          "font-semibold leading-tight text-foreground",
          compact ? "mt-0.5 text-xs sm:text-sm" : "mt-1 text-sm",
        )}
      >
        {value}
      </p>
    </div>
  );
}
