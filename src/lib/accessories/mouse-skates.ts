import type { MouseSkate, MouseSkateMaterial, MouseSkateSurfaceFit } from "@/types/accessory";

export function getMouseSkateFullName(skate: MouseSkate) {
  return `${skate.brand} ${skate.name}`;
}

export function formatMouseSkateRating(value: number) {
  return value.toFixed(1);
}

export function formatMouseSkateMaterial(material: MouseSkateMaterial) {
  const labels: Record<MouseSkateMaterial, string> = {
    ptfe: "PTFE",
    "hardened-ptfe": "Hardened PTFE",
    uhmwpe: "UHMWPE",
    glass: "Glass",
    titanium: "Titanium",
  };

  return labels[material];
}

export function getMouseSkateSurfaceFitClass(fit: MouseSkateSurfaceFit) {
  if (fit === "excellent") {
    return "border-emerald-400/40 bg-emerald-400/10 text-emerald-200";
  }

  if (fit === "good") {
    return "border-sky-300/40 bg-sky-300/10 text-sky-200";
  }

  if (fit === "usable") {
    return "border-amber-300/45 bg-amber-300/10 text-amber-100";
  }

  return "border-rose-300/45 bg-rose-300/10 text-rose-100";
}

export function getMouseSkateVisual(skate: MouseSkate) {
  return {
    colorName: skate.visual?.colorName ?? "Skate color",
    primaryHex: skate.visual?.primaryHex ?? "#8b5cf6",
    secondaryHex: skate.visual?.secondaryHex ?? "#c4b5fd",
    textHex: skate.visual?.textHex ?? "#0f172a",
  };
}
