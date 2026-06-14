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
    glassSurfaceFinish: "unknown",
    glassSurfaceFinishNotes:
      "Retailer listings mention micro-texture and Japanese glass, but do not clearly confirm whether the surface is coated or fully uncoated.",
    base: "rubber",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 500,
        height: 450,
        thickness: 2.5,
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
      speed: 9.4,
      control: 3.6,
      stoppingPower: 4.2,
      staticFriction: 2.0,
      dynamicFriction: 1.6,
      microAdjustments: 9.4,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 9,
      washable: true,
      notes: "Glass pads offer near-perfect consistency regardless of conditions. Phantom's micro-textured surface adds a bit more feedback and stopping than raw slick glass, while still working well with sleeves. Requires specific mouse skates for best results.",
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 4,
      sleeveFriendly: true,
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
      notes: "High-end glass option positioned as very fast, with a lightly textured tactile feel instead of a completely slick raw-glass surface.",
      pros: [
        "Extremely fast and consistent",
        "Durable surface",
        "More tactile than ultra-slick raw glass",
        "Excellent for tracking and large swipes",
      ],
      cons: [
        "Still offers limited stopping power compared to cloth",
        "Requires glass-compatible skates",
        "Can feel cold/harsh on skin",
        "Expensive",
      ],
    },

    communityConsensus: {
      summary:
        "Tekkusai Phantom is a very fast, high-quality glass pad favored by players who want maximum glide freedom with a touch of tactile feedback and more controlled stops than the slickest glass surfaces.",
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
        url: "https://ausmodshop.com/products/tekkusai-phantom-glass-mouse-pad",
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
    glassSurfaceFinish: "unknown",
    glassSurfaceFinishNotes:
      "Current product descriptions emphasize tempered glass and a balanced smooth surface, but do not clearly state a coated or uncoated finish.",
    base: "rubber",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 3,
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
      speed: 8.2,
      control: 4.8,
      stoppingPower: 4.6,
      staticFriction: 3.1,
      dynamicFriction: 2.5,
      microAdjustments: 9.0,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 9,
      washable: true,
      notes: "A more balanced glass surface than pure speed options while retaining excellent consistency. Works well with sleeves, which many glass-pad users prefer for smoother arm glide.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 6,
      sleeveFriendly: true,
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
      notes: "A slightly more forgiving glass option in the Tekkusai lineup, with a balanced smooth surface and stronger desk stability from the full-length rubber base.",
      pros: [
        "Fast yet meaningfully more controllable than pure speed glass",
        "Excellent durability and consistency",
      ],
      cons: [
        "Still requires adaptation and special skates",
        "Premium pricing",
      ],
    },

    communityConsensus: {
      summary:
        "Singularity offers a more balanced glass experience than the fastest options while keeping the signature consistency and low-friction feel. It is one of the safer transition picks for players curious about glass.",
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
        url: "https://www.fumo-collection.com/en/products/tekkusai-singularity",
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
    glassSurfaceFinish: "coated",
    glassSurfaceFinishNotes:
      "Wallhack's FAQ describes a special glass-etching process that creates a layer on the surface, and the official SP-005 page describes a subtle surface texture with speed-oriented glide.",
    base: "silicone",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 2.5,
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
      ],
    },

    feel: {
      speed: 8.7,
      control: 4.0,
      stoppingPower: 3.8,
      staticFriction: 2.8,
      dynamicFriction: 2.6,
      microAdjustments: 9.1,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 9.5,
      washable: true,
      notes: "The official SP-005 page positions it as a fast, speed-oriented glass surface with subtle texture, a low-profile build, and a concave silicone base grid for full desk stability. Works well with sleeves for comfort and consistency.",
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 5,
      sleeveFriendly: true,
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
      usd: 129,
    },

    availability: {
      global: true,
      india: "import-only",
      stores: ["Wallhack direct", "import sellers"],
      notes: "Officially sold by Wallhack globally; India availability still depends on direct import or third-party sellers.",
    },

    images: {
      main: "/mousepads/glasspads/wh-sp005.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes: "Often called the 'safest' premium glass recommendation in recent community discussions, partly because the etched surface feels more controlled and less wild than the fastest slick-glass options.",
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
        label: "Wallhack official SP-005 Black page",
        type: "official",
        url: "https://wallhack.com/en-int/products/sp-005-black",
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
  glassSurfaceFinish: "uncoated",
  glassSurfaceFinishNotes:
    "Official Midori retailer listings explicitly describe The Return as using an uncoated glass surface for stable glide and high consistency.",
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
      "Uncoated glass surface provides exceptional consistency across temperature and humidity changes. Works well with sleeves and is easily cleaned with warm soapy water.",
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
},

  // ZPAD V1 XL
  {
    id: "zpad-v1-xl",
    slug: "zpad-v1-xl",

    brand: "Z PAD",
    name: "V1 XL",
    series: "Glass Mouse Pad",

    category: "glass",
    surface: "glass",
    glassSurfaceFinish: "uncoated",
    glassSurfaceFinishNotes:
      "The public product page clearly positions this as a glass mouse pad, and a long-term owner review specifically describes it as uncoated. The official page does not appear to publish coating language directly, so the finish is anchored mainly by the user review.",
    base: "rubber",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 3,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "custom-design",
      colorways: [
        {
          name: "Custom Design",
          slug: "custom-design",
          color: "#1f1f1f",
          image: "/mousepads/others/z-pad.webp",
          available: true,
        },
      ],
    },

    feel: {
      speed: 8.0,
      control: 4.0,
      stoppingPower: 4.0,
      staticFriction: 3.0,
      dynamicFriction: 2.0,
      microAdjustments: 9.0,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 9,
      dustHairResistance: 7,
      washable: true,
      notes:
        "Community testing describes the pad as highly consistent over long use with excellent resistance to sweat and environmental slowdown, which matches what you would expect from a hard glass surface.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 8,
      sleeveFriendly: true,
      noiseLevel: "medium",
    },

    recommendedFor: {
      games: ["apex", "overwatch", "general-fps"],
      aimStyles: ["tracking", "switching", "micro-adjustments"],
      sensitivity: ["low", "medium", "high"],
    },

    avoidIf: [
      "You mainly play tactical FPS and want more stopping power",
      "You dislike hard glass surfaces",
      "You want cloth-like friction feedback",
      "You prefer slower glass options",
    ],

    price: {
      usd: 30,
      inr: 2700,
    },

    availability: {
      global: false,
      india: "available",
      stores: ["ZPAD official"],
      notes:
        "Official ZPAD India storefront lists the XL V1 product page. The page fetched on June 14, 2026 showed the item as out of stock, so practical availability may depend on restocks.",
    },

    images: {
      main: "/mousepads/others/z-pad.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "This profile is anchored by one detailed long-term owner review and the official ZPAD storefront copy. It looks like a budget-friendly speed-leaning glass option aimed at smooth glide and tracking rather than tactical stopping power. The exact physical dimensions were not clearly exposed on the public product page during this pass, so the listed XL size should be treated as a conservative inferred placeholder until directly verified.",
      pros: [
        "Fast glide for the price",
        "Excellent micro-adjustment freedom",
        "Very strong humidity consistency",
        "Good sleeve compatibility",
        "Strong value in India",
      ],
      cons: [
        "Limited stopping power for tac FPS",
        "Hard glass surface will not suit everyone",
        "Custom-print workflow may vary in print quality",
        "Public specs are still relatively sparse",
      ],
    },

    communityConsensus: {
      summary:
        "ZPAD V1 XL appears to be an affordable Indian glass pad built around speed, smoothness, and tracking freedom. The available evidence points to a fast, low-friction surface that performs well in humid conditions and makes the most sense for aim training and tracking-heavy shooters.",
      commonComparisons: [
        "Wallhack SP-005",
        "SkyPAD / Wallhack glass pads",
        "budget glass pads",
      ],
      strengths: [
        "Fast smooth glide",
        "Excellent for tracking and aim training",
        "Very high humidity resistance",
        "Strong price-to-performance value",
      ],
      weaknesses: [
        "Not ideal for Valorant or CS-style stopping",
        "Sparse official spec sheet",
        "Glass learning curve still applies",
      ],
    },

    sources: [
      {
        label: "ZPAD official XL V1 product page",
        type: "official",
        url: "https://zpad.in/product/custom-glass-mouse-pad-xl-size/",
      },
      {
        label: "ZPAD official homepage",
        type: "official",
        url: "https://zpad.in/",
      },
      {
        label: "Z PAD Instagram brand page",
        type: "official",
        url: "https://www.instagram.com/zpad.in/",
      },
      {
        label: "Community review by bl4ckholeyt",
        type: "review",
      },
    ],
  }
];
