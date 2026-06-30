import { cn } from "@/lib/utils";

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
        "data-panel p-3 md:p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
