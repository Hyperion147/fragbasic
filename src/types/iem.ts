export type IemDriverType =
  | "single-dd"
  | "dual-dd"
  | "hybrid"
  | "planar"
  | "ba"
  | "tribrid";

export type IemSoundSignature =
  | "neutral-bright"
  | "neutral"
  | "warm-neutral"
  | "v-shape"
  | "mild-v"
  | "bass-boosted";

export type IemGame =
  | "valorant"
  | "cs2"
  | "apex"
  | "rainbow-six-siege"
  | "overwatch"
  | "general-fps"
  | "music";

export type IemAvailability = "in-stock" | "limited" | "import-only" | "unknown";

export type IemRatingConfidence = "community" | "personal-tested" | "estimated";

export interface IemRatings {
  fragbasic: number;
  community: number;
  fps: number;
  music: number;
  value: number;
  imaging: number;
  clarity: number;
  bass: number;
  soundstage: number;
  comfort: number;
  build: number;
  ratingConfidence: IemRatingConfidence;
}

export interface IemSoundProfile {
  label: string;
  description: string;
  bass: number;
  mids: number;
  treble: number;
  warmth: number;
  brightness: number;
}

export interface IemSpec {
  driver: string;
  impedance: string;
  sensitivity: string;
  frequencyResponse: string;
  connector: string;
  cableType: string;
  cableTermination: string;
  shellMaterial: string;
  nozzleMaterial: string;
  detachableCable: boolean;
  mic: boolean;
  weightPerEarpiece?: string;
}

export interface IemBuyingInfo {
  priceInr?: number;
  priceUsd?: number;
  availability: IemAvailability;
  shipsFrom?: string;
  warranty?: string;
  stores: Array<{
    label: string;
    url?: string;
  }>;
}

export interface IemCommunityReview {
  reviewCount: number;
  sourceCount: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  platforms: Array<{
    name: string;
    score: number;
  }>;
  positives: string[];
  negatives: string[];
}

export interface IemTestSetup {
  source: string;
  motherboard?: string;
  testedGames: IemGame[];
  testingDuration: string;
}

export interface IemOfficialReview {
  summary: string;
  verdict: string;
  testSetup: IemTestSetup;
}

export interface IemFrequencyPoint {
  hz: string;
  db: number;
  target: number;
}

export interface Iem {
  id: string;
  slug: string;
  brand: string;
  name: string;
  shortName: string;
  subtitle: string;
  driverType: IemDriverType;
  soundSignature: IemSoundSignature;
  priceTier: "under-2000" | "under-5000" | "midrange" | "premium";
  communitySummary: string;
  ratings: IemRatings;
  soundProfile: IemSoundProfile;
  specs: IemSpec;
  buying: IemBuyingInfo;
  officialReview: IemOfficialReview;
  communityReview: IemCommunityReview;
  frequencyResponse: IemFrequencyPoint[];
  bestFor: IemGame[];
  pros: string[];
  cons: string[];
  avoidIf: string[];
  tags: string[];
  images: {
    main: string;
  };
  sources: Array<{
    label: string;
    type: "official" | "store" | "reddit" | "review" | "personal";
    url?: string;
  }>;
  updatedAt: string;
}
