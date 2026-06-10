export type MousepadCategory =
  | "mud"
  | "control"
  | "balanced-control"
  | "balanced-speed"
  | "speed"
  | "glass"

export type MousepadSurface =
  | "cloth"
  | "hybrid"
  | "glass"
  | "hard"

export type MousepadBase =
  | "poron"
  | "rubber"
  | "silicone"
  | "polyurethane"
  | "unknown"

export type MousepadSoftness =
  | "xsoft"
  | "soft"
  | "mid"
  | "firm"
  | "hard"
  | "unknown"

export type MousepadGame =
  | "valorant"
  | "cs2"
  | "apex"
  | "overwatch"
  | "fortnite"
  | "general-fps"

export type AimStyle =
  | "micro-adjustments"
  | "flicking"
  | "tracking"
  | "switching"

export type Sensitivity =
  | "low"
  | "medium"
  | "high"

export type RatingConfidence =
  | "official"
  | "community"
  | "personal-tested"
  | "estimated"

export type IndiaAvailability =
  | "available"
  | "limited"
  | "import-only"
  | "unavailable"
  | "unknown"

export interface MousepadSize {
  label: string
  width: number
  height: number
  thickness?: number
  unit: "mm"
}

export interface MousepadFeelRating {
  speed: number
  control: number
  stoppingPower: number
  staticFriction: number
  dynamicFriction: number
  microAdjustments: number
  ratingConfidence: RatingConfidence
}

export interface MousepadEnvironment {
  humidityResistance: number
  sweatResistance: number
  dustHairResistance: number
  washable: boolean
  notes?: string
}

export interface MousepadTexture {
  feel: "smooth" | "slightly-textured" | "textured" | "rough"
  skinComfort: number
  sleeveFriendly: boolean
  noiseLevel: "quiet" | "medium" | "loud"
}

export interface MousepadPrice {
  usd?: number
  inr?: number
  eur?: number
}

export interface MousepadAvailability {
  global: boolean
  india: IndiaAvailability
  stores?: string[]
  notes?: string
}

export interface MousepadPersonalNotes {
  owned: boolean
  tested: boolean
  testingDuration?: string
  mainGamesTested?: MousepadGame[]
  notes?: string
  pros?: string[]
  cons?: string[]
}

export interface MousepadSource {
  label: string
  type: "official" | "store" | "reddit" | "review" | "personal"
  url?: string
}
export interface MousepadColorway {
  name: string
  slug: string
  primary: string
  secondary?: string
  accent?: string
  image?: string
  available: boolean
}
export interface MousepadVisuals {
  defaultColorway: string
  colorways: MousepadColorway[]
}

export interface Mousepad {
  id: string
  slug: string

  brand: string
  name: string
  series?: string

  category: MousepadCategory
  surface: MousepadSurface
  base: MousepadBase
  softness: MousepadSoftness

  sizes: MousepadSize[]

  feel: MousepadFeelRating
  environment: MousepadEnvironment
  texture: MousepadTexture

  recommendedFor: {
    games: MousepadGame[]
    aimStyles: AimStyle[]
    sensitivity: Sensitivity[]
  }

  avoidIf?: string[]

  price: MousepadPrice
  availability: MousepadAvailability

  visuals: MousepadVisuals

  images: {
    main: string
    gallery?: string[]
  }

  personal: MousepadPersonalNotes

  affiliate?: {
    official?: string
    amazon?: string
    waimers?: string
    genesispc?: string
    maxgaming?: string
    other?: string
  }

  sources: MousepadSource[]

  createdAt: string
  updatedAt: string
}