import type { Mousepad } from "@/types/mousepad";

export const othersMousepads: Mousepad[] = [
  // ESP Tiger Shan Hai Tang Dao
  {
    id: "esports-tiger-shan-hai-tang-dao",
    slug: "esports-tiger-shan-hai-tang-dao",

    brand: "Esports Tiger",
    name: "Shan Hai Tang Dao",
    series: "Shan Hai",

    category: "balanced-control",
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
      speed: 6.7,
      control: 8.1,
      stoppingPower: 7.8,
      staticFriction: 6.3,
      dynamicFriction: 6.9,
      microAdjustments: 8.4,
      ratingConfidence: "community",
    },

    environment: {
      humidityResistance: 8.5,
      sweatResistance: 8,
      dustHairResistance: 6.5,
      washable: true,
      notes: "Shan Hai series praised for better humidity and temperature stability than many cloth pads while keeping a smooth Zero-like glide.",
    },

    texture: {
      feel: "smooth",
      skinComfort: 8.5,
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
      "You prefer heavily textured surfaces",
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
      notes: "Community favorite as a more affordable and sometimes more consistent alternative to Artisan Zero. Needs personal verification for exact feel match.",
      pros: [
        "Excellent value compared to Artisan/LGG",
        "Smooth and consistent glide",
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
        "Widely regarded as one of the best 'Artisan Zero-style' pads at a lower price point. Many users describe it as smoother and more consistent with better real-world humidity performance than the original Zero.",
      commonComparisons: ["Artisan Zero", "LGG Saturn Pro", "Endgame Gear EM-C"],
      strengths: [
        "Great price-to-performance ratio",
        "Smooth consistent glide with good stopping power",
        "Excellent build quality and edge stitching",
        "Resistant to humidity and temperature changes",
        "Comfortable for long sessions",
      ],
      weaknesses: [
        "Not as 'premium' feeling as Artisan Poron in some opinions",
        "Texture is very subtle (may feel too smooth for some)",
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
      ],
    },

    feel: {
      speed: 6.8,
      control: 8.0,
      stoppingPower: 7.9,
      staticFriction: 7.2,
      dynamicFriction: 6.7,
      microAdjustments: 8.1,
      ratingConfidence: "community",
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
  }
];
