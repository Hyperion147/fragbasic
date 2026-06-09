// src/data/mousepads.ts

import type { Mousepad } from "@/types/mousepad"

export const mousepads: Mousepad[] = [
  {
    id: "artisan-zero-soft",
    slug: "artisan-zero-soft",

    name: "Zero Soft",
    brand: "Artisan",
    series: "Zero",

    category: "control",
    surface: "cloth",
    base: "poron",
    softness: "soft",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 4,
        unit: "mm",
      },
    ],

    friction: {
      staticFriction: 7.5,
      dynamicFriction: 6.5,
      stoppingPower: 8.5,
      control: 9,
      speed: 6,
    },

    durability: {
      coating: "none",
      humidityResistance: "good",
      dustResistance: "average",
      wearResistance: "excellent",
      washable: true,
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 7,
      armSleeveFriendly: true,
    },

    recommendedFor: {
      games: ["valorant", "cs2", "general-fps"],
      aimStyle: ["micro-adjustments", "flicking"],
      sensitivity: ["low", "medium"],
    },

    price: {
      usd: 65,
      inr: 6500,
    },

    availability: {
      global: true,
      india: false,
      notes: "Usually imported through third-party sellers.",
    },

    images: {
      main: "/mousepads/artisan-zero-soft/main.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Known as one of the safest premium control pads for tactical FPS. Needs personal testing before final verdict.",
      pros: ["Excellent control", "Great stopping power", "Premium base"],
      cons: ["Expensive", "Can collect dust/hair", "Hard to buy in India"],
    },

    createdAt: "2026-06-09",
    updatedAt: "2026-06-09",
  },
]