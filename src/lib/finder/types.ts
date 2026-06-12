import type { Mousepad } from "@/types/mousepad";

export type PreviousPadFeel =
  | "muddy"
  | "controlled"
  | "balanced"
  | "fast"
  | "too-fast"
  | "rough"
  | "smooth"
  | "unknown";

export type DesiredFeel =
  | "more-control"
  | "slightly-more-control"
  | "same"
  | "slightly-faster"
  | "much-faster";

export type TexturePreference =
  | "smooth"
  | "balanced"
  | "textured"
  | "no-preference";

export type FinderSensitivity = "low" | "medium" | "high";

export type MatchLabel = "Best match" | "Strong match" | "Situational pick";

export interface FinderInput {
  games: string[];
  sensitivity: FinderSensitivity;
  previousPadFeel?: PreviousPadFeel;
  desiredFeel: DesiredFeel;
  texturePreference?: TexturePreference;
  humidityConcern?: boolean;
}

export interface FinderResult {
  mousepad: Mousepad;
  score: number;
  matchLabel: MatchLabel;
  reasons: string[];
  tradeoffs: string[];
}
