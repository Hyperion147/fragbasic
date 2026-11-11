import type { Iem, IemSoundSignature } from "@/types/iem";

export function getIemFullName(iem: Pick<Iem, "brand" | "name">) {
  return `${iem.brand} ${iem.name}`;
}

export function formatIemSoundSignature(signature: IemSoundSignature) {
  const labels: Record<IemSoundSignature, string> = {
    "neutral-bright": "Neutral Bright",
    neutral: "Neutral",
    "warm-neutral": "Warm Neutral",
    "v-shape": "V-Shape",
    "mild-v": "Mild V",
    "bass-boosted": "Bass Boosted",
  };

  return labels[signature];
}
