import { cn } from "@/lib/utils";

/**
 * Light shared wrapper for generous "homepage air" panels (rounded-2xl p-6/8 bg-card/40 border).
 * Introduced per OQ3 user decision ("Introduce light shared SiteSection / ContentPanel").
 * Use for major list/detail sections to unify with homepage panels (PopularComparisons, FinderPanel, etc.).
 * No heavy props — simple passthrough + optional className.
 * Density Preservation Rules (from design): do NOT use on micro cards/grids that must retain current internal density (e.g. mousepad grid gap-4, finder-option p-4, StatPill, etc.).
 * See finalized design doc for full rules, before/after, and when to prefer outer vs. direct.
 */
export function SiteSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/40 p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
