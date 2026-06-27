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
    glassSurfaceFinish: "uncoated",
    glassSurfaceFinishNotes:
      "Retailer listings mention micro-texture and Japanese glass, but do not clearly confirm whether the surface is coated or fully uncoated.",
    coatingDurability:
      "No public coating-wear window found during the June 2026 refresh; treated as a durable glass surface until the finish is confirmed more explicitly.",
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
          image: "/mousepads/glasspads/phantom.jpg",
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
    glassSurfaceFinish: "uncoated",
    glassSurfaceFinishNotes:
      "Current product descriptions emphasize tempered glass and a balanced smooth surface, but do not clearly state a coated or uncoated finish.",
    coatingDurability:
      "No public coating-wear window found during the June 2026 refresh; current listings frame it as a durable tempered-glass surface.",
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
          image: "/mousepads/glasspads/singularity.webp",
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
    coatingDurability:
      "Wallhack positions the etched glass surface as durable; no short coating-life replacement window was found during the June 2026 refresh.",
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
          image: "/mousepads/glasspads/wh-sp005.webp",
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
      range: {
        minUsd: 129,
        maxUsd: 129,
      },
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
  coatingDurability:
    "Uncoated glass surface; no coating wear window applies based on current retailer wording.",
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
        image: "/mousepads/glasspads/midori-the-return.webp",
        available: true,
      },
    ],
  },

  feel: {
    speed: 8.0,
    control: 4.6,
    stoppingPower: 5.0,
    staticFriction: 2.4,
    dynamicFriction: 3.0,
    microAdjustments: 9.5,
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
    inr: 13000,
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
      "Community impressions consistently place it as a smooth, premium glass pad with strong glide and excellent comfort characteristics. PURPLE's submitted review called it the best balanced uncoated glasspad for cloth-to-glass transitions, while noting that the base grip can be weak on some desks.",
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
      "Base grip may not stick firmly to every desk",
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
      label: "PURPLE community review submitted June 2026",
      type: "personal",
    },
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
    coatingDurability:
      "Community review evidence describes it as uncoated; no coating wear window applies if that finish is accurate.",
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
      },
      {
        label: "ZPAD official homepage",
        type: "official",
      },
      {
        label: "Z PAD Instagram brand page",
        type: "official",
      },
      {
        label: "Community review by bl4ckholeyt",
        type: "review",
      },
    ],
  },

  // InfinityMice Tora
  {
    id: "infinitymice-tora",
    slug: "infinitymice-tora",

    brand: "InfinityMice",
    name: "Tora",
    series: "Limited Edition Glass Mousepad",

    category: "glass",
    surface: "glass",
    glassSurfaceFinish: "uncoated",
    glassSurfaceFinishNotes:
      "InfinityMice's official page lists the Tora as non-coated and non-glossy. Retailer listings describe a matte glass surface with a balanced/control-oriented glide.",
    coatingDurability:
      "Official listing describes the surface as non-coated, so there is no coating wear window to track.",
    base: "unknown",
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
      defaultColorway: "tora",
      colorways: [
        {
          name: "Tora",
          slug: "tora",
          color: "#373f3f",
          image: "/mousepads/glasspads/infinitymice-tora.jpg",
          available: false,
        },
      ],
    },

    feel: {
      speed: 6.6,
      control: 7.4,
      stoppingPower: 6.4,
      staticFriction: 4.8,
      dynamicFriction: 4.1,
      microAdjustments: 8.7,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 7,
      washable: true,
      notes:
        "The hard glass surface should remain very consistent through humidity and sweat. One owner impression noted dust can cling more than expected, so it is not scored as the cleanest glasspad despite strong environmental consistency.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 10,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "general-fps"],
      aimStyles: ["precision", "micro-adjustments", "flicking"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want a very fast glasspad",
      "You rely on low-LOD sensor settings that can be picky on glass",
      "You want an easy-to-buy in-stock product",
      "You prefer textured glass feedback",
    ],

    price: {
      usd: 89.99,
      inr: 15000,
    },

    availability: {
      global: true,
      india: "import-only",
      stores: ["InfinityMice", "MaxGaming", "Respawn Gaming Tech"],
      notes:
        "Official and retailer pages list Tora as sold out during the June 2026 research pass. India access is likely import or resale only; the INR value reflects the submitted purchase price rather than official local MSRP.",
    },

    images: {
      main: "/mousepads/glasspads/infinitymice-tora.jpg",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Added from cync3_'s submitted review and cross-checked against current official and retailer specs. The submitted review rated it as very control-oriented for glass and closer to cloth speed than most glasspads. They also reported sensor tracking issues at low LOD that were resolved by increasing mouse LOD.",
      pros: [
        "Controlled glide for a glasspad",
        "Excellent sleeve friendliness",
        "Very smooth skin feel",
        "Strong tactical FPS fit compared with faster glass",
        "Non-coated glass surface",
      ],
      cons: [
        "Still a hard glass surface",
        "Not ideal for players chasing maximum glass speed",
        "May need higher mouse LOD on some sensors",
        "Sold-out limited product",
        "Import pricing can be high in India",
      ],
    },

    communityConsensus: {
      summary:
        "InfinityMice Tora is a limited non-coated glasspad positioned around balanced/control glide rather than raw speed. In the FragBasic glass scale it sits near the controlled end, making it a better tactical FPS candidate than many faster glasspads while still keeping glass consistency and smoothness.",
      commonComparisons: [
        "ATK Crimson",
        "Tekkusai Singularity",
        "Wallhack SP-005",
        "Midori The Return",
        "Pulsar Superglide",
      ],
      strengths: [
        "More controlled than most glasspads",
        "Smooth non-glossy surface",
        "Excellent sleeve and skin comfort",
        "Balanced glide for tactical and fast-paced shooters",
        "Stable full custom-blend base",
      ],
      weaknesses: [
        "Limited edition and currently sold out",
        "Sensor LOD can matter on some setups",
        "Still has less natural braking than cloth control pads",
        "Base material is described as custom blend by InfinityMice and silicone by one retailer",
      ],
    },

    sources: [
      {
        label: "cync3_ community review submitted June 2026",
        type: "personal",
      },
      {
        label: "InfinityMice official Tora product page",
        type: "official",
      },
      {
        label: "MaxGaming InfinityMice Tora listing",
        type: "store",
      },
      {
        label: "Respawn Gaming Tech Tora listing",
        type: "store",
      },
      {
        label: "Community Tora owner discussion",
        type: "reddit",
      },
      {
        label: "Fresh Reviews glasspad coverage featuring Tora",
        type: "review",
      },
    ],
  },

  // Xraypad NOD CR-X1
  {
    id: "xraypad-nod-cr-x1",
    slug: "xraypad-nod-cr-x1",

    brand: "Xraypad",
    name: "NOD CR-X1",
    series: "NOD Glass Mousepad",

    category: "glass",
    surface: "glass",
    glassSurfaceFinish: "uncoated",
    glassSurfaceFinishNotes:
      "CR-X1 is the coating-free Control Edition, positioned around permanent consistency, more controlled glide, and a safer cloth-to-glass transition.",
    coatingDurability: "Coating-free surface; positioned as the permanent consistency option.",
    base: "silicone",
    softness: "hard",

    sizes: [
      {
        label: "L",
        width: 490,
        height: 420,
        thickness: 2,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "mian",
      colorways: [
        {
          name: "Mian",
          slug: "mian",
          color: "#d8edf7",
          image: "/mousepads/glasspads/xraypad-nod-x1.jpg",
          available: true,
        },
        {
          name: "Armory Crate",
          slug: "armory-crate",
          color: "#2d3440",
          available: true,
        },
      ],
    },

    feel: {
      speed: 7.7,
      control: 5.9,
      stoppingPower: 5.8,
      staticFriction: 3.7,
      dynamicFriction: 3.3,
      microAdjustments: 9.0,
      ratingConfidence: "estimated",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 8,
      washable: true,
      notes:
        "The tempered glass surface is listed as waterproof, sweat-proof, oil-resistant, wipe-clean, and designed around a fine sensor-optimized micro-texture that avoids grease, scratching, and sticky glide.",
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 7,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "general-fps"],
      aimStyles: ["precision", "micro-adjustments", "flicking"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want the fastest possible glass glide",
      "You mainly play tracking-heavy games and prefer very low initial friction",
      "You dislike thin hard pads",
      "You do not want to maintain a glass surface or use suitable skates",
    ],

    price: {
      usd: 81.95,
      inr: 12999,
      range: {
        minUsd: 81.95,
        maxUsd: 116.95,
      },
    },

    availability: {
      global: true,
      india: "limited",
      stores: ["Xraypad", "NMPC India", "MaxGaming"],
      notes:
        "X-Raypad indexed pricing runs from US$81.95 to US$116.95 across the NOD X1 line. NMPC India lists Rs. 12,999 as a sold-out/pre-order listing. Stock may vary by finish and artwork.",
    },

    includedAccessories: [
      "Jade Air skates",
      "Obsidian Air silent skates",
      "Sleeve/case",
      "Cleaning cloth",
    ],

    images: {
      main: "/mousepads/glasspads/xraypad-nod-x1.jpg",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Added from current store specs rather than long-term community testing. Xraypad positions CR-X1 for gaming and professional precision use where control, stopping power, and long-term consistency matter more than maximum glass speed.",
      pros: [
        "Coating-free permanent consistency positioning",
        "More controlled than the SP speed edition",
        "Better fit for Valorant, CS2, and tactical shooters",
        "Very thin 2 mm tempered glass build",
        "CNC 45-degree bevel should reduce wrist edge discomfort",
        "Silicone base for desk stability",
      ],
      cons: [
        "Early product with limited community consensus",
        "Not as fast as SP-X1",
        "Glass learning curve still applies",
        "Premium India pricing",
      ],
    },

    communityConsensus: {
      summary:
        "Xraypad NOD CR-X1 is the control-focused, coating-free version of the NOD X1 glasspad line. Store copy positions it as the better pick for Valorant, CS2, tactical shooters, and cloth-to-glass transitions because it prioritizes control, stopping power, and long-term consistency over maximum speed.",
      commonComparisons: [
        "ATK Crimson",
        "InfinityMice Tora",
        "Wallhack SP-005",
        "control glass pads",
      ],
      strengths: [
        "Coating-free surface",
        "More controlled glide for glass",
        "Permanent consistency positioning",
        "Slim tempered glass construction",
        "Fine micro-texture with low noise",
        "Silicone base and beveled edge",
      ],
      weaknesses: [
        "Not enough long-term owner data yet",
        "Still fast and hard compared with cloth",
        "Less suited to players chasing maximum speed",
        "Availability depends on pre-order and regional stock",
      ],
    },

    sources: [
      {
        label: "X-Raypad official NOD X1 product page",
        type: "official",
      },
      {
        label: "NMPC India NOD 2mm Slim Glass Mousepad listing",
        type: "store",
      },
      {
        label: "MaxGaming Xraypad NOD CR-X1 listing",
        type: "store",
      },
    ],
  },

  // Xraypad NOD SP-X1
  {
    id: "xraypad-nod-sp-x1",
    slug: "xraypad-nod-sp-x1",

    brand: "Xraypad",
    name: "NOD SP-X1",
    series: "NOD Glass Mousepad",

    category: "glass",
    surface: "glass",
    glassSurfaceFinish: "coated",
    glassSurfaceFinishNotes:
      "SP-X1 is the nano / oleophobic hard-coated Speed Edition, positioned around near-zero initial friction and very fast glide.",
    coatingDurability: "Some listings describe SP coating life around 6-12 months under normal use.",
    base: "silicone",
    softness: "hard",

    sizes: [
      {
        label: "L",
        width: 490,
        height: 420,
        thickness: 2,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "mian",
      colorways: [
        {
          name: "Mian",
          slug: "mian",
          color: "#d8edf7",
          image: "/mousepads/glasspads/xraypad-nod-x1.jpg",
          available: true,
        },
        {
          name: "Armory Crate",
          slug: "armory-crate",
          color: "#2d3440",
          available: true,
        },
      ],
    },

    feel: {
      speed: 9.0,
      control: 4.2,
      stoppingPower: 4.3,
      staticFriction: 2.6,
      dynamicFriction: 2.0,
      microAdjustments: 9.4,
      ratingConfidence: "estimated",
    },

    environment: {
      humidityResistance: 10,
      sweatResistance: 10,
      dustHairResistance: 8,
      washable: true,
      notes:
        "The tempered glass surface is listed as waterproof, sweat-proof, oil-resistant, wipe-clean, and designed around a fine sensor-optimized micro-texture that avoids grease, scratching, and sticky glide.",
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 7,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["apex", "quake", "overwatch", "fortnite", "general-fps"],
      aimStyles: ["tracking", "switching", "micro-adjustments"],
      sensitivity: ["low", "medium", "high"],
    },

    avoidIf: [
      "You mainly play tactical shooters and rely on stopping power",
      "You want coating-free permanent consistency",
      "You dislike very fast glass glide",
      "You do not want to maintain a glass surface or use suitable skates",
    ],

    price: {
      usd: 104.99,
      inr: 12999,
      gbp: 89.99,
      range: {
        minUsd: 81.95,
        maxUsd: 116.95,
      },
    },

    availability: {
      global: true,
      india: "limited",
      stores: ["Xraypad", "NMPC India", "MaxGaming", "Esports Gear UK"],
      notes:
        "X-Raypad indexed pricing runs from US$81.95 to US$116.95 across the NOD X1 line. MaxGaming lists L size at $104.99 as a pre-order, NMPC India lists Rs. 12,999 as a sold-out/pre-order listing, and Esports Gear UK lists the SP Armoury Crate variant at GBP89.99 as a pre-order with an early July ETA.",
    },

    includedAccessories: [
      "Jade Air skates",
      "Obsidian Air silent skates",
      "Sleeve/case",
      "Cleaning cloth",
    ],

    images: {
      main: "/mousepads/glasspads/xraypad-nod-x1.jpg",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Added from current store specs rather than long-term community testing. Xraypad positions SP-X1 for gaming and professional precision use where speed, near-zero initial friction, tracking, and fast glide matter more than permanent coating-free consistency.",
      pros: [
        "Very fast nano / oleophobic hard-coated glide",
        "Near-zero initial friction positioning",
        "Better fit for Apex, Quake, Overwatch, and tracking-heavy games",
        "Very thin 2 mm tempered glass build",
        "CNC 45-degree bevel should reduce wrist edge discomfort",
        "Silicone base for desk stability",
      ],
      cons: [
        "Early product with limited community consensus",
        "Coating life is described as finite",
        "Less controlled than CR-X1",
        "Not the safer pick for tactical FPS stopping power",
        "Glass learning curve still applies",
      ],
    },

    communityConsensus: {
      summary:
        "Xraypad NOD SP-X1 is the speed-focused, nano / oleophobic hard-coated version of the NOD X1 glasspad line. Store copy positions it as the better pick for Apex, Quake, Overwatch, tracking-heavy games, low-DPI aimers, and players who want very fast glide, with coating life described by some listings as roughly 6-12 months under normal use.",
      commonComparisons: [
        "Wallhack SP-005",
        "Pulsar Superglide",
        "Tekkusai Phantom",
        "speed glass pads",
      ],
      strengths: [
        "Very fast glide",
        "Near-zero initial friction positioning",
        "Strong tracking-game fit",
        "Slim tempered glass construction",
        "Fine micro-texture with low noise",
        "Silicone base and beveled edge",
      ],
      weaknesses: [
        "Not enough long-term owner data yet",
        "SP coating longevity is finite compared with CR",
        "Less stopping power than CR-X1",
        "Availability depends on pre-order and regional stock",
      ],
    },

    sources: [
      {
        label: "X-Raypad official NOD X1 product page",
        type: "official",
      },
      {
        label: "NMPC India NOD 2mm Slim Glass Mousepad listing",
        type: "store",
      },
      {
        label: "MaxGaming Xraypad NOD SP-X1 listing",
        type: "store",
      },
      {
        label: "Esports Gear UK Xraypad NOD SP Armoury Crate listing",
        type: "store",
      },
    ],
  },

  // ATK Crimson
  {
    id: "atk-crimson",
    slug: "atk-crimson",

    brand: "ATK",
    name: "Crimson",
    series: "Tempered Glass Mouse Pad",

    category: "glass",
    surface: "glass",
    glassSurfaceFinish: "uncoated",
    glassSurfaceFinishNotes:
      "ATK social posts describe Crimson as coating-free, while Indian retailer listings describe a micro-etched ultra-clear tempered glass surface. Store listings do not use the word uncoated directly, so the finish is anchored by ATK's launch copy and community discussion.",
    coatingDurability:
      "ATK launch/community wording positions Crimson as coating-free; no finite coating-life window was found during the June 2026 refresh.",
    base: "polyurethane",
    softness: "hard",

    sizes: [
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 3.5,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "crimson",
      colorways: [
        {
          name: "Crimson",
          slug: "crimson",
          color: "#b51f31",
          image: "/mousepads/glasspads/atk-crimson.webp",
          available: true,
        },
      ],
    },

    feel: {
      speed: 7.1,
      control: 6.8,
      stoppingPower: 7.2,
      staticFriction: 4.2,
      dynamicFriction: 4.8,
      microAdjustments: 9.0,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 10.0,
      sweatResistance: 10.0,
      dustHairResistance: 7.0,
      washable: true,
      notes:
        "The submitted community review rates humidity and sweat resistance at 10/10, which lines up with expectations for a hard glass surface. Dust and hair resistance is still lower than the cleanest premium glass pads because debris can be more noticeable on the micro-etched surface.",
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 8.0,
      sleeveFriendly: true,
      noiseLevel: "medium",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "general-fps"],
      aimStyles: ["micro-adjustments", "precision", "flicking"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want a very fast glass pad",
      "You dislike anime-style artwork on your setup",
      "You want a widely available non-limited product",
      "You prefer soft cloth feedback under your wrist",
    ],

    price: {
      usd: 90,
      inr: 6000,
      range: {
        minUsd: 90,
        maxUsd: 90,
      },
    },

    availability: {
      global: true,
      india: "available",
      stores: ["RyuGear", "Altf4gear", "NMPC India", "ATK Store", "MaxGaming"],
      notes:
        "Indian retailers list Crimson around Rs. 5,499-5,999. RyuGear showed in-stock units during the June 2026 research pass, while Altf4gear listed it as a pre-order.",
    },

    images: {
      main: "/mousepads/glasspads/atk-crimson.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Added from mnjx's submitted Discord review and cross-checked against current retailer specs. The submitted ratings framed Crimson as a very controlled glass pad; the displayed feel scores are normalized to FragBasic's existing scale so it sits as controlled glass rather than slower-than-cloth mud.",
      pros: [
        "Very strong stopping power for glass",
        "Excellent micro-adjustments",
        "Outstanding humidity and sweat consistency",
        "Good sleeve compatibility",
        "Available through Indian retailers",
      ],
      cons: [
        "Slower and more controlled than common speed-first glass pads",
        "Limited-edition availability can shift quickly",
        "Base material is described differently across community notes and retailer specs",
        "Dust and hair are still noticeable on the hard surface",
      ],
    },

    communityConsensus: {
      summary:
        "ATK Crimson is a limited-edition micro-etched tempered glass pad that currently looks like a control-leaning glass option in the FragBasic dataset. Store copy and community impressions point to smooth, precise control with easier stopping than speed-first glasspads, making it more interesting for tactical FPS players than most glass options.",
      commonComparisons: [
        "Wallhack SP-005",
        "Tekkusai Singularity",
        "Pulsar Superglide",
        "control glass pads",
      ],
      strengths: [
        "High control and stopping power for a glass surface",
        "Excellent micro-adjustment freedom",
        "Near-perfect humidity and sweat resistance",
        "Micro-etched tempered glass construction",
        "Strong India availability for a limited glasspad",
      ],
      weaknesses: [
        "Not the best fit for players who want maximum glass speed",
        "Limited to 888 pieces worldwide",
        "Official and community base-material descriptions do not perfectly match",
        "Requires glass-pad maintenance habits and suitable skates",
      ],
    },

    sources: [
      {
        label: "mnjx Discord review submitted June 15, 2026",
        type: "personal",
      },
      {
        label: "RyuGear ATK Crimson product page",
        type: "store",
      },
      {
        label: "Altf4gear accessories listing",
        type: "store",
      },
      {
        label: "NMPC India ATK Crimson product page",
        type: "store",
      },
      {
        label: "MaxGaming ATK Crimson listing",
        type: "store",
      },
      {
        label: "ATK launch post and community discussion",
        type: "reddit",
      },
    ],
  }
];
