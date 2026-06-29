import type { Mousepad } from "@/types/mousepad";

export type ComparisonPreview = {
  slug: string;
  leftName: string;
  rightName: string;
  leftImage: string;
  rightImage: string;
  tags: string[];
  leftColor: string;
  rightColor: string;
};

export type LandingProps = {
  mousepadCount: number;
  glasspadCount: number;
  bestPageCount: number;
  comparisonCount: number;
  comparisons: ComparisonPreview[];
  latestAdded?: Mousepad[];
};
