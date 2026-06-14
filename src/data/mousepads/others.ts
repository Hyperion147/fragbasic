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
        url: "https://esptiger.com/products/shan-hai-tang-dao-control-gaming-mousepad",
      },
      {
        label: "r/MousepadReview Tang Dao discussion and comparisons",
        type: "reddit",
        url: "https://www.reddit.com/r/MousepadReview/comments/1ct1dvb/esptiger_tang_dao_round_up/",
      },
      {
        label: "Community review comparing to Artisan Zero",
        type: "review",
        url: "https://damiancooper.medium.com/esptiger-shan-hai-tangdao-black-a-chinese-artisan-zero-rival-8fa493719dd6",
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
        url: "https://kurosun.co/",
      },
      {
        label: "Kurosun Samurai Mousepad Review",
        type: "reddit",
        url: "https://www.reddit.com/r/MousepadReview/comments/1dtzv1e/kurosun_samurai_mousepad_review/",
      },
      {
        label: "Type 99 or Kurosun Samurai discussion",
        type: "reddit",
        url: "https://www.reddit.com/r/MousepadReview/comments/1f1vw54/type_99_or_kurosun_samurai/",
      },
      {
        label: "LGG Saturn Pro vs Kurosun Samurai",
        type: "reddit",
        url: "https://www.reddit.com/r/MousepadReview/comments/1i7lt1r/lgg_saturn_pro_vs_kurosun_samurai/",
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
      speed: 4.2,
      control: 8.8,
      stoppingPower: 9.0,
      staticFriction: 6.4,
      dynamicFriction: 7.6,
      microAdjustments: 8.7,
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
      notes: "Positioned as a premium smooth control pad. Slower than Artisan Zero and Saturn Pro, but smoother and more locked-in for precise aim styles.",
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
        label: "Kurosun official website",
        type: "official",
        url: "https://kurosun.co/",
      },
      {
        label: "Rivions Kurosun Shogun review",
        type: "review",
        url: "https://www.rivions.com/blog/kurosun-shogun-review",
      },
      {
        label: "r/MousepadReview Kurosun Shogun review",
        type: "reddit",
        url: "https://www.reddit.com/r/MousepadReview/comments/1iv2jhb/kurosun_shogun_review/",
      },
      {
        label: "Waimers Kurosun Shogun listing",
        type: "store",
        url: "https://waimers.in/products/kurosun-shogun",
      },
      {
        label: "Periview Kurosun Shogun review",
        type: "review",
        url: "https://periview.gg/2025/01/29/kurosun-shogun-jude-reviews/",
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
      url: "https://neomacro.in/products/pioneer-wu-xiang-gaming-mousepad-esptiger",
    },
    {
      label: "Community review by bymuii",
      type: "review",
    },
  ],
}
];
