import type { Mousepad } from "@/types/mousepad";

export const othersMousepads: Mousepad[] = [
  // ESP Tiger Shan Hai Tang Dao
  {
    id: "esports-tiger-shan-hai-tang-dao",
    slug: "esports-tiger-shan-hai-tang-dao",

    brand: "Esports Tiger",
    name: "Shan Hai Tang Dao",
    series: "Shan Hai",

    category: "control",
    surface: "cloth",
    base: "poron",
    softness: "soft",

    sizes: [
      {
        label: "L",
        width: 420,
        height: 330,
        thickness: 4,
        unit: "mm",
      },
      {
        label: "XL",
        width: 490,
        height: 420,
        thickness: 4,
        unit: "mm",
      },
      {
        label: "XXL",
        width: 500,
        height: 490,
        thickness: 4,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "black",
      colorways: [
        {
          name: "Black",
          slug: "black",
          color: "#1a1a1a",
          available: true,
        },
        {
          name: "Pink",
          slug: "pink",
          color: "#d17a8f",
          available: true,
        },
      ],
    },

    feel: {
      speed: 4.8,
      control: 8.4,
      stoppingPower: 5.8,
      staticFriction: 7.0,
      dynamicFriction: 6.1,
      microAdjustments: 8.2,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 8.5,
      sweatResistance: 8,
      dustHairResistance: 6.5,
      washable: true,
      notes: "Shan Hai series is praised for better humidity and temperature stability than many cloth pads while keeping a steady, control-oriented glide.",
    },

    texture: {
      feel: "textured",
      skinComfort: 7.4,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "general-fps"],
      aimStyles: ["micro-adjustments", "flicking"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want a very fast speed pad",
      "You prefer very smooth cloth surfaces",
      "You need maximum stopping power like dedicated mud pads",
    ],

    price: {
      usd: 39,
      inr: 3499,
    },

    availability: {
      global: true,
      india: "limited",
      stores: ["Addice Inc", "import sellers", "online retailers"],
      notes: "Good import availability; frequently stocked by specialty sellers serving the Indian market.",
    },

    images: {
      main: "/mousepads/others/tang-dao.png",
    },

    personal: {
      owned: false,
      tested: false,
      notes: "Community favorite in the control space, but official ESPTiger specs describe it as a coarse high-control pad rather than a smooth Zero clone. Needs personal verification for the exact in-hand feel.",
      pros: [
        "Excellent value compared to Artisan/LGG",
        "Stable and controlled glide",
        "Strong humidity resistance",
        "High quality stitching and base",
      ],
      cons: [
        "Slightly less premium than top-tier Japanese pads",
        "Availability can be spotty outside major importers",
        "Less brand recognition in some regions",
      ],
    },

    communityConsensus: {
      summary:
        "Widely regarded as a strong value control pad with good humidity stability, a coarse cloth surface, and a more planted glide than smoother hybrid-control options.",
      commonComparisons: ["Artisan Zero", "LGG Saturn Pro", "Endgame Gear EM-C"],
      strengths: [
        "Great price-to-performance ratio",
        "Controlled glide with tactile feedback",
        "Excellent build quality and edge stitching",
        "Resistant to humidity and temperature changes",
        "Comfortable for long sessions",
      ],
      weaknesses: [
        "Not as 'premium' feeling as Artisan Poron in some opinions",
        "Coarser surface will not suit everyone",
        "Limited official global distribution",
      ],
    },

    sources: [
      {
        label: "ESPTIGER Shan Hai series product page",
        type: "official",
      },
      {
        label: "r/MousepadReview Tang Dao discussion and comparisons",
        type: "reddit",
      },
      {
        label: "Community review comparing to Artisan Zero",
        type: "review",
      },
    ],
  },

  // Kurosun Samurai
  {
    id: "kurosun-samurai",
    slug: "kurosun-samurai",

    brand: "Kurosun",
    name: "Samurai",
    series: "Samurai",

    category: "balanced-control",
    surface: "cloth",
    base: "rubber",
    softness: "soft",

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
          color: "#1a1a1a",
          available: true,
        },
      ],
    },

    feel: {
      speed: 6.8,
      control: 8.0,
      stoppingPower: 7.9,
      staticFriction: 7.2,
      dynamicFriction: 6.7,
      microAdjustments: 8.1,
      ratingConfidence: "estimated",
    },

    environment: {
      humidityResistance: 7.5,
      sweatResistance: 7.5,
      dustHairResistance: 6.5,
      washable: true,
      notes: "Features a custom sticky Alpha Cell base that provides excellent desk grip. Surface can show some initial X/Y difference that typically breaks in with use.",
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 8.5,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "apex", "general-fps"],
      aimStyles: ["micro-adjustments", "flicking", "tracking"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want a very fast pure speed pad",
      "You dislike pads with strong initial static friction",
      "You need large size options beyond standard XL",
    ],

    price: {
      usd: 49,
      inr: 4500,
    },

    availability: {
      global: true,
      india: "import-only",
      stores: ["Kurosun official", "import sellers", "specialty retailers"],
      notes: "Available globally via official site and importers. Stock in India depends on third-party sellers.",
    },

    images: {
      main: "/mousepads/others/kurosun-samurai.png",
    },

    personal: {
      owned: false,
      tested: false,
      notes: "Frequently praised in recent community discussions as a high-quality balanced option with exceptional desk adhesion.",
      pros: [
        "Excellent desk grip and stability",
        "Comfortable materials and perfect stitching",
        "Versatile balanced performance for multiple games",
        "Good value at the price point",
        "Clean minimalist Samurai aesthetic",
      ],
      cons: [
        "Initial X/Y glide difference that requires break-in",
        "Limited size variety (mainly standard XL)",
        "Base may be too sticky for some desk setups",
        "Less established brand recognition",
      ],
    },

    communityConsensus: {
      summary:
        "A standout balanced cloth pad known for its premium feel, extremely sticky Alpha Cell base that 'sticks like glue' to desks, and versatile performance across FPS titles. Many users prefer it to more expensive options for everyday use and comfort.",
      commonComparisons: [
        "Artisan Zero",
        "LGG Saturn Pro",
        "Kurosun Shogun",
        "QcK Heavy",
      ],
      strengths: [
        "Outstanding desk adhesion and stability",
        "High quality build with excellent stitching",
        "Balanced glide suitable for most playstyles",
        "Comfortable and pleasant surface texture",
        "Strong value proposition",
      ],
      weaknesses: [
        "Can have noticeable X/Y inconsistency when brand new",
        "Very sticky base may not suit everyone",
        "Primarily one size option",
        "Requires some break-in period",
      ],
    },

    sources: [
      {
        label: "Kurosun official website",
        type: "official",
      },
      {
        label: "Kurosun Samurai Mousepad Review",
        type: "reddit",
      },
      {
        label: "Type 99 or Kurosun Samurai discussion",
        type: "reddit",
      },
      {
        label: "LGG Saturn Pro vs Kurosun Samurai",
        type: "reddit",
      },
    ],
  },

  // Kurosun Shogun
  {
    id: "kurosun-shogun",
    slug: "kurosun-shogun",

    brand: "Kurosun",
    name: "Shogun",
    series: "Shogun",

    category: "control",
    surface: "cloth",
    base: "rubber",
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

    visuals: {
      defaultColorway: "shogun",
      colorways: [
        {
          name: "Shogun",
          slug: "shogun",
          color: "#2a2a2a",
          image: "/mousepads/others/kurosun-shogun.webp",
          available: true,
        },
      ],
    },

    feel: {
      speed: 4.1,
      control: 7.8,
      stoppingPower: 7.5,
      staticFriction: 5.8,
      dynamicFriction: 6.3,
      microAdjustments: 8.2,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 8.0,
      sweatResistance: 8.2,
      dustHairResistance: 6.8,
      washable: true,
      notes: "Limited edition control pad with good consistency and strong humidity stability for a cloth surface.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 8.8,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "general-fps"],
      aimStyles: ["micro-adjustments", "flicking", "switching"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want a fast pad",
      "You mainly play tracking-heavy games",
      "You dislike slower control surfaces",
    ],

    price: {
      usd: 55,
      inr: 5200,
    },

    availability: {
      global: true,
      india: "limited",
      stores: ["Kurosun official", "Waimers", "import sellers"],
      notes: "Limited edition release; stock depends heavily on restocks and regional sellers.",
    },

    images: {
      main: "/mousepads/others/kurosun-shogun.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes: "Positioned as a premium smooth control pad. PURPLE's submitted review rated it lower on raw control/stopping than earlier community estimates while still calling it one of the best control pads, so the final scores are averaged downward but keep it firmly in the control class.",
      pros: [
        "Very smooth surface",
        "Strong stopping power",
        "Excellent micro-adjustment control",
        "Consistent X/Y glide",
        "Comfortable soft base",
      ],
      cons: [
        "May feel restrictive for tracking-heavy games",
        "Not ideal for players wanting fast glide",
        "Limited availability",
      ],
    },

    communityConsensus: {
      summary:
        "A premium smooth control pad with strong stopping power, balanced friction, and excellent consistency. Best suited for tactical FPS and precision-heavy aim styles.",
      commonComparisons: [
        "Artisan Type-99",
        "Artisan Zero",
        "LGG Saturn Pro",
        "Zowie G-SR-SE",
        "Kurosun Samurai",
      ],
      strengths: [
        "Very smooth surface",
        "Strong stopping power",
        "Excellent micro-adjustment control",
        "Consistent X/Y glide",
        "Comfortable soft base",
        "Good for tactical shooters",
      ],
      weaknesses: [
        "May feel restrictive for tracking-heavy games",
        "Not ideal for players wanting fast glide",
        "Limited availability",
      ],
    },

    sources: [
      {
        label: "PURPLE community review submitted June 2026",
        type: "personal",
      },
      {
        label: "Kurosun official website",
        type: "official",
      },
      {
        label: "Rivions Kurosun Shogun review",
        type: "review",
      },
      {
        label: "r/MousepadReview Kurosun Shogun review",
        type: "reddit",
      },
      {
        label: "Waimers Kurosun Shogun listing",
        type: "store",
      },
      {
        label: "Periview Kurosun Shogun review",
        type: "review",
      },
    ],
  },

  // Matrova Scarlet
  {
    id: "matrova-scarlet",
    slug: "matrova-scarlet",

    brand: "Matrova",
    name: "Scarlet",
    series: "Mid Balance",

    category: "balanced-control",
    surface: "hybrid",
    base: "silicone",
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

    visuals: {
      defaultColorway: "scarlet",
      colorways: [
        {
          name: "Scarlet",
          slug: "scarlet",
          color: "#e83e4f",
          image: "/mousepads/others/matrova-scarlet.jpg",
          available: true,
        },
        {
          name: "Custom",
          slug: "custom",
          color: "#6f5f9f",
          available: true,
        },
      ],
    },

    feel: {
      speed: 6.1,
      control: 7.2,
      stoppingPower: 6.6,
      staticFriction: 5.3,
      dynamicFriction: 5.6,
      microAdjustments: 8.1,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 8.0,
      sweatResistance: 8.0,
      dustHairResistance: 6.8,
      washable: true,
      notes:
        "Official copy positions Scarlet as a mid-balance smooth-control pad. The submitted review noted different X/Y texture and a controlled feel without muddy slowdown.",
    },

    texture: {
      feel: "slightly-textured",
      skinComfort: 8.0,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "apex", "general-fps"],
      aimStyles: ["hybrid", "micro-adjustments", "flicking"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want a very slow control pad",
      "You dislike noticeable X/Y texture difference",
      "You want easy local India availability",
      "You prefer traditional cloth instead of treated hybrid surfaces",
    ],

    price: {
      inr: 3000,
    },

    availability: {
      global: true,
      india: "import-only",
      stores: ["Matrova"],
      notes:
        "Submitted price was around Rs. 3,000 before import costs. Matrova sells direct and supports custom options, so India buyers may need to import.",
    },

    images: {
      main: "/mousepads/others/matrova-scarlet.jpg",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Added from PURPLE's submitted review and Matrova product copy. The profile keeps it on the border of control and balanced, with X/Y texture called out as a defining trait.",
      pros: [
        "Balanced control without muddy feel",
        "Good micro-adjustment freedom",
        "Interesting X/Y texture character",
        "Custom options available",
        "Competitive direct price",
      ],
      cons: [
        "Import required for India",
        "X/Y texture difference will not suit everyone",
        "Less community data than bigger brands",
        "Silicone/PU-style base may vary by desk",
      ],
    },

    communityConsensus: {
      summary:
        "Matrova Scarlet is a balanced-control hybrid pad with a smooth-control focus and noticeable X/Y texture character. It should appeal to players who want a controlled but not muddy glide and are comfortable importing from a smaller enthusiast brand.",
      commonComparisons: [
        "Artisan Zero",
        "Kurosun Samurai",
        "Aqua Control Plus",
        "LGG Saturn Pro",
      ],
      strengths: [
        "Controlled but still mobile",
        "Distinct texture tuning",
        "Good hybrid FPS fit",
        "Custom color/design options",
      ],
      weaknesses: [
        "Sparse long-term community data",
        "Import-only for India",
        "X/Y difference may be polarizing",
      ],
    },

    sources: [
      {
        label: "PURPLE community review submitted June 2026",
        type: "personal",
      },
      {
        label: "Matrova Scarlet product page",
        type: "official",
      },
    ],
  },

  // ESP Tiger Wu Xiang
  {
  id: "esptiger-wuxiang-pioneer",
  slug: "esptiger-wuxiang-pioneer",

  brand: "ESPTiger",
  name: "Wu Xiang",
  series: "Pioneer",

  category: "balanced-speed",
  surface: "hybrid",
  base: "poron",
  softness: "soft",

  sizes: [
    {
      label: "XL",
      width: 480,
      height: 400,
      thickness: 4,
      unit: "mm",
    },
    {
      label: "XXL",
      width: 500,
      height: 500,
      thickness: 4,
      unit: "mm",
    },
  ],

  visuals: {
    defaultColorway: "pioneer",
    colorways: [
      {
        name: "Pioneer",
        slug: "pioneer",
        color: "#4f4033",
        available: true,
      },
    ],
  },

  feel: {
    speed: 8.0,
    control: 6.0,
    stoppingPower: 5.0,
    staticFriction: 4.0,
    dynamicFriction: 4.0,
    microAdjustments: 7.0,
    ratingConfidence: "community",
  },

  environment: {
    humidityResistance: 4.0,
    sweatResistance: 8.0,
    dustHairResistance: 8.0,
    washable: true,
      notes:
        "Community testing points to a coated or treated surface that resists sweat and debris well, but humidity performance looks notably weaker than the previous estimate. One long-term owner also reported yellowing over time while saying the glide stayed consistent for roughly six months.",
  },

  texture: {
    feel: "smooth",
    skinComfort: 7.8,
    sleeveFriendly: true,
    noiseLevel: "quiet",
  },

  recommendedFor: {
    games: [
      "apex",
      "overwatch",
      "general-fps",
    ],
    aimStyles: [
      "hybrid",
      "tracking",
      "switching",
    ],
    sensitivity: [
      "low",
      "medium",
    ],
  },

  avoidIf: [
    "You want strong humidity performance",
    "You mainly play tactical FPS and want more stopping power",
    "You prefer slower cloth control pads",
    "You dislike treated or coated surfaces that can show wear over time",
  ],

  price: {
    inr: 2950,
  },

  availability: {
    global: true,
    india: "available",
    stores: [
      "Neo Macro",
    ],
    notes:
      "Confirmed in India via Neo Macro. Broader stock may vary by region and restock window.",
  },

  images: {
    main: "/mousepads/others/esp-wu-xiang.png",
  },

  personal: {
    owned: false,
    tested: false,
      notes:
        "This profile is now anchored more heavily to community testing than to the older provisional estimate. Current evidence points to a clearly faster hybrid-style pad rather than a balanced-control cloth option.",
    pros: [
      "Fast glide for a non-glass surface",
      "Low static and dynamic friction",
      "Good sweat and dust resistance",
      "Consistent glide over months of use in one long-term review",
      "Competitive pricing in India",
    ],
    cons: [
      "Humidity resistance looks weak for this class",
      "Coated finish may yellow or show wear over time",
      "Stopping power is limited versus control-oriented pads",
    ],
  },

  communityConsensus: {
    summary:
      "The Wuxiang Pioneer appears to be one of the faster hybrid-style pads in this dataset, with low friction, moderate control, and better sweat and dust resistance than humidity resistance. It should sit much closer to the speed side than the earlier balanced-control estimate suggested.",

    commonComparisons: [
      "Artisan Hien Soft",
      "LGG Neptune Pro Soft",
      "ESPTiger Tang Dao",
      "Aqua Control II",
      "fast hybrid pads",
    ],

    strengths: [
      "Very fast glide",
      "Low initial and in-motion resistance",
      "Solid micro-adjustment freedom",
      "Good sweat resistance",
      "Good dust and hair resistance",
    ],

    weaknesses: [
      "Humidity resistance is below average",
      "Stopping power is modest",
      "Surface may yellow with age",
    ],
  },

  sources: [
    {
      label: "Neo Macro Pioneer Wu Xiang Gaming Mousepad listing",
      type: "store",
    },
    {
      label: "Community review by bymuii",
      type: "review",
    },
  ],
},

  // Talongames Type99
  {
    id: "talongames-type99",
    slug: "talongames-type99",

    brand: "Talongames",
    name: "Type99",
    series: "Type99 Control",

    category: "control",
    surface: "cloth",
    base: "silicone",
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

    visuals: {
      defaultColorway: "matcha-green",
      colorways: [
        {
          name: "Matcha Green",
          slug: "matcha-green",
          color: "#8aa734",
          image: "/mousepads/others/talongames-type99.jpg",
          available: true,
        },
      ],
    },

    feel: {
      speed: 2.6,
      control: 8.4,
      stoppingPower: 8.3,
      staticFriction: 7.7,
      dynamicFriction: 7.0,
      microAdjustments: 6.9,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 7.8,
      sweatResistance: 7.8,
      dustHairResistance: 6.2,
      washable: true,
      notes:
        "Indian retailer copy describes the surface as fast yet controlled with a non-slip rubberized bottom. The submitted review places it extremely close to Artisan Type-99 in control feel, but with a less premium base.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 8.0,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["valorant", "cs2", "general-fps"],
      aimStyles: ["precision", "micro-adjustments", "flicking"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You want premium Poron base quality",
      "You need a fast tracking pad",
      "You dislike high static friction",
      "You want many colorway choices",
    ],

    price: {
      inr: 2000,
    },

    availability: {
      global: true,
      india: "available",
      stores: ["RyuGear", "Loadout", "Keyora"],
      notes:
        "Submitted price was around Rs. 2,000 through Indian retailers. RyuGear and Loadout list the 490x420x4mm version.",
    },

    images: {
      main: "/mousepads/others/talongames-type99.jpg",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Added from PURPLE's submitted review and Indian retailer specs. It is treated as a budget Artisan Type-99 alternative: very controlled and slow, but with a less refined base.",
      pros: [
        "Strong control for the price",
        "High stopping power",
        "Very affordable compared with Artisan",
        "Good India availability",
        "Familiar Type-99-like control target",
      ],
      cons: [
        "Base is not as good as Artisan",
        "Less premium stitching/build feel",
        "Limited community data",
        "Slow glide can feel restrictive",
      ],
    },

    communityConsensus: {
      summary:
        "Talongames Type99 is a budget control pad aimed at the Artisan Type-99 feel profile. It is much cheaper and locally obtainable in India, with strong stopping power and control, but the base and overall premium feel are expectedly below Artisan.",
      commonComparisons: [
        "Artisan Type-99 Mid",
        "Artisan Type-99 Soft",
        "Zowie G-SR III",
        "Kurosun Shogun",
      ],
      strengths: [
        "Excellent value control option",
        "Strong stopping power",
        "Good for Valorant and CS2",
        "Easy India availability",
      ],
      weaknesses: [
        "Base quality below Artisan",
        "Less refined than premium control pads",
        "Not suitable for speed-focused players",
      ],
    },

    sources: [
      {
        label: "PURPLE community review submitted June 2026",
        type: "personal",
      },
      {
        label: "RyuGear Talongames Type99 listing",
        type: "store",
      },
      {
        label: "Loadout Talongames Type99 listing",
        type: "store",
      },
    ],
  },

  // GlideX Nebula
  {
    id: "glidex-nebula",
    slug: "glidex-nebula",

    brand: "GlideX",
    name: "Nebula",
    series: "Nebula",

    category: "balanced-speed",
    surface: "hybrid",
    base: "poron",
    softness: "soft",

    sizes: [
      {
        label: "L",
        width: 470,
        height: 390,
        thickness: 4,
        unit: "mm",
      },
    ],

    visuals: {
      defaultColorway: "nebula",
      colorways: [
        {
          name: "Nebula",
          slug: "nebula",
          color: "#1a1630",
          available: true,
        },
      ],
    },

    feel: {
      speed: 6.6,
      control: 5.2,
      stoppingPower: 5.1,
      staticFriction: 4.2,
      dynamicFriction: 5.7,
      microAdjustments: 7.1,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 8.0,
      sweatResistance: 4.5,
      dustHairResistance: 9.2,
      washable: true,
      notes:
        "Treated hybrid surface is marketed as easier to keep clean than traditional cloth. Submitted testing rates dust/hair resistance extremely high and humidity well, but sweat can still slow the pad more than expected for a coated hybrid.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 8.0,
      sleeveFriendly: true,
      noiseLevel: "quiet",
    },

    recommendedFor: {
      games: ["apex", "overwatch", "valorant", "general-fps"],
      aimStyles: ["hybrid", "tracking", "switching"],
      sensitivity: ["low", "medium"],
    },

    avoidIf: [
      "You need strong stopping power for tac FPS",
      "You sweat heavily and want a pad that stays consistent when damp",
      "You want a slow control or mud surface",
      "You need multiple colorways or larger desk-pad sizes",
    ],

    price: {
      inr: 2999,
    },

    availability: {
      global: false,
      india: "available",
      stores: ["GlideX"],
      notes:
        "Sold direct via GlideX (getglidex.com) at about Rs. 2,999. India-focused brand; broader global retail is limited.",
    },

    images: {
      main: "/mousepads/others/glidex-nebula.webp",
    },

    personal: {
      owned: false,
      tested: false,
      notes:
        "Added from Bluee_weeb's community submission (July 2026) and GlideX product copy. Official positioning is hybrid/speed with fast glide and balanced feedback on a plush 4mm Poron base. Raw submitted scores were lightly calibrated against dataset peers (Matrova Scarlet, Aqua Control Plus, ESPTiger Wu Xiang, LGG Neptune Firm) so control is not unrealistically low for a mid-speed hybrid, while keeping the reviewer's low sweat resistance and high dust resistance.",
      pros: [
        "Smooth hybrid glide with easy starts",
        "Plush 4mm Poron base comfort",
        "Strong dust/hair resistance and easy cleaning",
        "Good humidity stability for the class",
        "Competitive India pricing with local availability",
      ],
      cons: [
        "Sweat can muddy the surface more than expected",
        "Limited stopping power for pure tac FPS",
        "Only one size and colorway so far",
        "Thin long-term community data",
        "Product image still needs to be added to the site assets",
      ],
    },

    communityConsensus: {
      summary:
        "GlideX Nebula is an India-available hybrid speed-leaning pad on soft Poron. It aims at fast, smooth glide with moderate feedback rather than locked-in control. Early testing points to excellent debris resistance and easy sleeve use, with sweat consistency as the main weakness.",
      commonComparisons: [
        "Xraypad Aqua Control Plus",
        "ESPTiger Wu Xiang",
        "Matrova Scarlet",
        "LGG Venus Pro",
        "LGG Neptune Pro",
      ],
      strengths: [
        "Smooth, free-starting hybrid surface",
        "Comfortable soft Poron base",
        "High dust and hair resistance",
        "Solid humidity performance",
        "Local India stock and fair price",
      ],
      weaknesses: [
        "Weak sweat resistance relative to other hybrids",
        "Modest control and stopping power",
        "Limited size/colorway options",
        "Early-stage brand with sparse long-term reviews",
      ],
    },

    sources: [
      {
        label: "Bluee_weeb community review submitted July 2026",
        type: "personal",
      },
      {
        label: "Glide X Nebula official product page",
        type: "official",
        url: "https://getglidex.com/products/glidex-nebula/",
      },
      {
        label: "GlideX Instagram product specs (470x390x4mm Poron)",
        type: "review",
      },
    ],
  },
];
