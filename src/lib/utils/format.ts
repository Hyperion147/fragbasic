import type { MousepadSize } from "@/types/mousepad";

export function formatValue(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Alias kept for compatibility with existing imports from mousepads lib */
export const formatMousepadValue = formatValue;

export function formatPrice(price?: number): string {
  if (!price) {
    return "Price unknown";
  }

  return `Rs ${price.toLocaleString("en-IN")}`;
}

export function formatSize(
  size?: Pick<MousepadSize, "label" | "width" | "height" | "thickness" | "unit">
): string {
  if (!size) return "Unknown";

  return `${size.label} - ${size.width} x ${size.height}${size.unit}`;
}
