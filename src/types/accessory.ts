export type MouseSkateMaterial =
  | "ptfe"
  | "hardened-ptfe"
  | "uhmwpe"
  | "glass"
  | "titanium";

export type MouseSkateShape = "dots" | "donuts" | "mouse-specific";

export type MouseSkateSurfaceFit = "excellent" | "good" | "usable" | "avoid";

export type MouseSkateRatingConfidence =
  | "official"
  | "community"
  | "estimated";

export interface MouseSkateRatings {
  speed: number;
  control: number;
  stoppingPower: number;
  smoothness: number;
  noiseControl: number;
  durability: number;
  glassCompatibility: number;
  ratingConfidence: MouseSkateRatingConfidence;
}

export interface MouseSkate {
  id: string;
  slug: string;
  brand: string;
  name: string;
  series: string;
  material: MouseSkateMaterial;
  shape: MouseSkateShape;
  thicknessMm?: number;
  diameterMm?: number;
  quantity?: string;
  visual?: {
    colorName: string;
    primaryHex: string;
    secondaryHex?: string;
    textHex?: string;
  };
  ratings: MouseSkateRatings;
  surfaceFit: {
    cloth: MouseSkateSurfaceFit;
    hybrid: MouseSkateSurfaceFit;
    glass: MouseSkateSurfaceFit;
    plastic: MouseSkateSurfaceFit;
    coated: MouseSkateSurfaceFit;
  };
  bestFor: string[];
  avoidIf: string[];
  notes: string;
  communitySummary: string;
  sources: Array<{
    label: string;
    type: "official" | "store" | "reddit" | "review";
    url?: string;
  }>;
}
