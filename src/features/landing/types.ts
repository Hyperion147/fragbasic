export type BrandPreview = {
  slug: string;
  name: string;
  count: number;
};

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
  brandCount: number;
  comparisonCount: number;
  brands: BrandPreview[];
  comparisons: ComparisonPreview[];
};
