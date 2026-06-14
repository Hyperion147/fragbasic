import type { Mousepad } from "@/types/mousepad";

export const glassMousepads: Mousepad[] = [
  // Phantom
  {
    id: "tekkusai-phantom",
    slug: "tekkusai-phantom",

    brand: "Tekkusai",
    name: "Phantom",
    series: "Glass",

    category: "glass",
    surface: "glass",
    base: "unknown",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 5,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "clear",
      colorways: [
        {
          name: "Clear",
          slug: "clear",
          color: "#e8e8e8",
          available: true,
        },
      ],
    },

    feel: {
      speed: 9.6,
      control: 3.2,
      stoppingPower: 2.8,
      staticFriction: 2.0,
      dynamicFriction: 9.8,
      microAdjustments: 9.3,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 9,
      washable: true,
      notes: "Glass pads offer near-perfect consistency regardless of conditions. Requires specific mouse skates (usually glass or dot skates) for best results.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 3,
      sleeveFriendly: false,
      noiseLevel: "medium",
    },

    recommendedFor: {
      games: ["apex", "overwatch", "fortnite", "general-fps"],
      aimStyles: ["tracking", "switching"],
      sensitivity: ["low", "medium", "high"],
    },

    avoidIf: [
      "You mainly play tac FPS and need stopping power",
      "You dislike hard surfaces or glass feel",
      "You use standard cloth skates",
    ],

    price: {
      usd: 115,
      inr: 10500,
    },

    availability: {
      global: true,
      india: "import-only",
      stores: ["specialty importers"],
      notes: "Premium glass pads are import-only and relatively expensive in India.",
    },

    images: {
      main: "/mousepads/glasspads/phantom.jpg",
    },

    personal: {
      owned: false,
      tested: false,
      notes: "High-end glass option frequently discussed in speed/glass communities.",
      pros: [
        "Extremely fast and consistent",
        "Durable surface",
        "Excellent for tracking and large swipes",
      ],
      cons: [
        "Very little stopping power",
        "Requires glass-compatible skates",
        "Can feel cold/harsh on skin",
        "Expensive",
      ],
    },

    communityConsensus: {
      summary:
        "Tekkusai Phantom is a fast, high-quality glass pad favored by players who have adapted to glass and want maximum glide freedom with good build.",
      commonComparisons: ["Wallhack SP-005", "Skypad", "Artisan Raiden (for speed reference)"],
      strengths: [
        "Top-tier speed and tracking performance",
        "Very consistent in all conditions",
        "Premium construction",
      ],
      weaknesses: [
        "Extremely fast — not for everyone",
        "Glass-specific maintenance and skates needed",
        "High price point",
      ],
    },

    sources: [
      {
        label: "Tekkusai official / retailer listings",
        type: "official",
      },
      {
        label: "r/MousepadReview glass pad tier lists and discussions",
        type: "reddit",
      },
    ],
  },

  // Singularity
  {
    id: "tekkusai-singularity",
    slug: "tekkusai-singularity",

    brand: "Tekkusai",
    name: "Singularity",
    series: "Glass",

    category: "glass",
    surface: "glass",
    base: "unknown",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 5,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "black",
      colorways: [
        {
          name: "Black",
          slug: "black",
          color: "#1f1f1f",
          available: true,
        },
      ],
    },

    feel: {
      speed: 9.3,
      control: 3.8,
      stoppingPower: 3.5,
      staticFriction: 2.5,
      dynamicFriction: 9.5,
      microAdjustments: 9.0,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 9,
      washable: true,
      notes: "Slightly more controlled glass surface than pure speed glass pads while retaining excellent consistency.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 4,
      sleeveFriendly: false,
      noiseLevel: "medium",
    },

    recommendedFor: {
      games: ["apex", "overwatch", "general-fps"],
      aimStyles: ["tracking", "switching", "micro-adjustments"],
      sensitivity: ["low", "medium", "high"],
    },

    avoidIf: [
      "You rely on cloth stopping power",
      "You have not tried glass before",
    ],

    price: {
      usd: 110,
      inr: 10000,
    },

    availability: {
      global: true,
      india: "import-only",
      stores: ["import sellers"],
      notes: "High-end import item.",
    },

    images: {
      main: "/mousepads/glasspads/singularity.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes: "Slightly more forgiving glass option in the Tekkusai lineup.",
      pros: [
        "Fast yet slightly more controllable than pure speed glass",
        "Excellent durability and consistency",
      ],
      cons: [
        "Still requires adaptation and special skates",
        "Premium pricing",
      ],
    },

    communityConsensus: {
      summary:
        "Singularity offers a touch more control than the fastest glass pads while keeping the signature glass consistency and speed. Popular among players transitioning to or preferring glass.",
      commonComparisons: ["Wallhack SP-005", "Tekkusai Phantom", "Skypad glass"],
      strengths: [
        "Great speed with a hint more control",
        "Top tier build and consistency",
        "Good for tracking and switching",
      ],
      weaknesses: [
        "Glass learning curve",
        "Expensive",
        "Limited stopping power",
      ],
    },

    sources: [
      {
        label: "Tekkusai retailer and community discussions",
        type: "official",
      },
      {
        label: "Glass mousepad reviews on r/MousepadReview",
        type: "reddit",
      },
    ],
  },

  // Sp005
  {
    id: "wallhack-sp-005",
    slug: "wallhack-sp-005",

    brand: "Wallhack",
    name: "SP-005",
    series: "SP Glass",

    category: "glass",
    surface: "glass",
    base: "unknown",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 5,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "black",
      colorways: [
        {
          name: "Black",
          slug: "black",
          color: "#111111",
          available: true,
        },
        {
          name: "Clear",
          slug: "clear",
          color: "#f0f0f0",
          available: true,
        },
      ],
    },

    feel: {
      speed: 9.4,
      control: 4.0,
      stoppingPower: 3.8,
      staticFriction: 2.8,
      dynamicFriction: 9.6,
      microAdjustments: 9.1,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 9.5,
      washable: true,
      notes: "One of the most recommended glass pads for players new to glass. Offers excellent speed with usable control for adapted users.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 4,
      sleeveFriendly: false,
      noiseLevel: "medium",
    },

    recommendedFor: {
      games: ["apex", "overwatch", "fortnite", "general-fps"],
      aimStyles: ["tracking", "switching"],
      sensitivity: ["low", "medium", "high"],
    },

    avoidIf: [
      "You have never used a glass pad before without trying cheaper options first",
      "Your games require strong stopping power",
    ],

    price: {
      usd: 95,
      inr: 8800,
    },

    availability: {
      global: true,
      india: "import-only",
      stores: ["Wallhack direct", "import sellers"],
      notes: "Popular glass pad with growing importer support.",
    },

    images: {
      main: "/mousepads/glasspads/wh-sp005.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes: "Often called the 'safest' premium glass recommendation in recent community discussions.",
      pros: [
        "Excellent balance of speed and some control for glass",
        "Premium feel and build",
        "Very consistent",
      ],
      cons: [
        "Pricey",
        "Requires specific skates and technique",
        "Shows fingerprints and needs regular cleaning",
      ],
    },

    communityConsensus: {
      summary:
        "The Wallhack SP-005 (successor to earlier SkyPAD models) is one of the most discussed and recommended glass pads. It provides fast, smooth glide with more stopping power than pure speed glass while remaining highly consistent.",
      commonComparisons: ["Tekkusai Phantom", "Skypad", "Wallhack VA-005"],
      strengths: [
        "Great all-round glass performance",
        "Good build quality and edges",
        "Popular and well-supported choice",
      ],
      weaknesses: [
        "Still very fast compared to cloth",
        "Glass-specific drawbacks (skates, cleaning, feel)",
        "Higher cost",
      ],
    },

    sources: [
      {
        label: "Wallhack official SP-005 page",
        type: "official",
        url: "https://wallhack.com/",
      },
      {
        label: "Multiple r/MousepadReview glass pad threads and reviews",
        type: "reddit",
      },
      {
        label: "ProSettings and community glass pad coverage",
        type: "review",
      },
    ],
  },

  // The Return of Midori
  {
  id: "midori-the-return-glass",
  slug: "midori-the-return-glass",

  brand: "Midori",
  name: "The Return",
  series: "Glass Edition",

  category: "glass",
  surface: "glass",
  base: "silicone",
  softness: "hard",

  sizes: [
    {
      label: "XL",
      width: 500,
      height: 500,
      thickness: 2.7,
      unit: "mm",
    },
  ],

  visuals: {
    defaultColorway: "the-return",
    colorways: [
      {
        name: "The Return",
        slug: "the-return",
        color: "#465246",
        available: true,
      },
    ],
  },

  feel: {
    speed: 8.6,
    control: 4.2,
    stoppingPower: 4.8,
    staticFriction: 2.8,
    dynamicFriction: 1.8,
    microAdjustments: 9.8,
    ratingConfidence: "community",
  },

  environment: {
    humidityResistance: 10,
    sweatResistance: 10,
    dustHairResistance: 9,
    washable: true,
    notes:
      "Uncoated glass surface provides exceptional consistency across temperature and humidity changes. Easily cleaned with warm soapy water.",
  },

  texture: {
    feel: "smooth",
    skinComfort: 9,
    sleeveFriendly: true,
    noiseLevel: "quiet",
  },

  recommendedFor: {
    games: [
      "apex",
      "overwatch",
      "fortnite",
      "general-fps",
    ],
    aimStyles: [
      "tracking",
      "switching",
    ],
    sensitivity: ["low", "medium"],
  },

  avoidIf: [
    "You want cloth-like stopping power",
    "You primarily play tactical FPS and rely on friction for control",
    "You dislike hard glass surfaces",
    "You prefer slower glass pads",
  ],

  price: {
    usd: 120,
    inr: 12500,
  },

  availability: {
    global: true,
    india: "limited",
    stores: [
      "Claw Gears",
      "Midori",
      "MaxGaming",
    ],
    notes:
      "Limited run serialized release (001/500). Availability depends on regional stock and restocks.",
  },

  images: {
    main: "/mousepads/glasspads/midori-the-return.webp",
  },

  personal: {
    owned: false,
    tested: false,
    notes:
      "Community impressions consistently place it as a smooth, premium glass pad with strong glide and excellent comfort characteristics. Frequently described as more skin-friendly than SP-004 while maintaining comparable speed.",
    pros: [
      "Extremely smooth glide",
      "Outstanding micro-adjustments",
      "Very skin-friendly for a glass surface",
      "Minimal humidity impact",
      "Low debris accumulation",
      "Premium build quality",
      "Large 500x500 format",
    ],
    cons: [
      "Hard glass surface is not for everyone",
      "Requires good mouse control",
      "Limited production run",
      "Premium pricing",
      "Less forgiving than cloth pads",
    ],
  },

  communityConsensus: {
    summary:
      "The Return is a premium limited-edition glass pad that combines high glide, excellent smoothness, and unusually strong comfort characteristics. Most users view it as a fast glass surface that remains controllable through texture design rather than friction-heavy stopping power.",

    commonComparisons: [
      "Wallhack SP-004",
      "Skypad 4.0",
      "InfinityMice Tora",
      "Tekkusai Phantom",
      "Pulsar Superglide",
    ],

    strengths: [
      "Excellent tracking performance",
      "Effortless micro-adjustments",
      "Very smooth surface feel",
      "Highly resistant to humidity and sweat",
      "Less debris buildup than many glass pads",
      "Premium artwork and construction",
    ],

    weaknesses: [
      "Still too fast for many tac-FPS players",
      "Requires adaptation if coming from cloth",
      "Limited availability",
      "High price point",
    ],
  },

  sources: [
    {
      label: "Midori official product listing",
      type: "official",
    },
    {
      label: "Claw Gears product page",
      type: "official",
    },
    {
      label: "MaxGaming product page",
      type: "official",
    },
    {
      label: "r/MousepadReview owner discussions",
      type: "reddit",
    },
    {
      label: "Community review by dc0da",
      type: "review",
    },
  ],
}
];
