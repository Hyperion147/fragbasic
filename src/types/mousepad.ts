export type MousepadCategory =
  | "speed"
  | "balanced"
  | "control"
  | "mudpad"

export type MousepadSurface =
  | "cloth"
  | "hybrid"
  | "glass"
  | "hard"

export type MousepadBase =
  | "poron"
  | "rubber"
  | "silicone"
  | "other"

export type MousepadSoftness =
  | "xsoft"
  | "soft"
  | "mid"
  | "firm"

export type GameType =
  | "valorant"
  | "cs2"
  | "apex"
  | "overwatch"
  | "fortnite"
  | "general-fps"

export type ClimateRating =
  | "poor"
  | "average"
  | "good"
  | "excellent"

export interface MousepadSize {
  label: string
  width: number
  height: number
  thickness: number
  unit: "mm"
}

export interface MousepadFriction {
  staticFriction: number // initial movement resistance
  dynamicFriction: number // glide speed
  stoppingPower: number // ability to stop precisely
  control: number
  speed: number
}

export interface MousepadDurability {
  coating: "none" | "light" | "noticeable" | "unknown"
  humidityResistance: ClimateRating
  dustResistance: ClimateRating
  wearResistance: ClimateRating
  washable: boolean
}

export interface MousepadPrice {
  usd?: number
  inr?: number
  eur?: number
}

export interface MousepadPersonalNotes {
  owned: boolean
  tested: boolean
  testingDuration?: string
  mainGamesTested?: GameType[]
  notes: string
  pros: string[]
  cons: string[]
}

export interface Mousepad {
  id: string
  slug: string

  name: string
  brand: string
  series?: string

  category: MousepadCategory
  surface: MousepadSurface
  base: MousepadBase
  softness: MousepadSoftness

  sizes: MousepadSize[]

  friction: MousepadFriction
  durability: MousepadDurability

  texture: {
    feel: "smooth" | "slightly-textured" | "rough"
    skinComfort: number
    armSleeveFriendly: boolean
  }

  recommendedFor: {
    games: GameType[]
    aimStyle: ("tracking" | "flicking" | "micro-adjustments")[]
    sensitivity: ("low" | "medium" | "high")[]
  }

  price: MousepadPrice

  availability: {
    global: boolean
    india: boolean
    notes?: string
  }

  images: {
    main: string
    gallery?: string[]
  }

  personal: MousepadPersonalNotes

  affiliate?: {
    amazon?: string
    official?: string
    maxgaming?: string
    mechanicalkeyboards?: string
  }

  createdAt: string
  updatedAt: string
}