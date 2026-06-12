import type { Mousepad } from "@/types/mousepad"

export const zowieMousepads: Mousepad[] = [
  // G-SR III
  {
    id: "zowie-g-sr-iii",
    slug: "zowie-g-sr-iii",

    brand: "Zowie",
    name: "G-SR III",
    series: "G-SR",

    category: "control",
    surface: "cloth",
    base: "rubber",
    softness: "soft",

    sizes: [
        {
            label: "L",
            width: 470,
            height: 390,
            thickness: 3.5,
            unit: "mm",
        },
    ],

    visuals: {
        defaultColorway: "black",
        colorways: [
            {
                name: "Black",
                slug: "black",
                color: "#1A1A1A",
                available: true,
            },
        ],
    },

    feel: {
        speed: 5.1,
        control: 8.9,
        stoppingPower: 9,
        staticFriction: 7.9,
        dynamicFriction: 5.3,
        microAdjustments: 7.6,
        ratingConfidence: "community",
    },

    environment: {
        humidityResistance: 8,
        sweatResistance: 8,
        dustHairResistance: 7,
        washable: true,
        notes: "Zowie positions G-SR III as a controlled glide pad with enhanced humidity resistance, improved durability, and a tighter weave to reduce inconsistent glide over time.",
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
        "You want a fast or balanced-speed pad",
        "You play tracking-heavy games most of the time",
        "You dislike controlled glide or subtle lock-in",
        "You want a 500x500 size; look at H-SR III instead",
    ],

    price: {
        usd: 39.99,
        inr: 3499,
    },

    availability: {
        global: true,
        india: "available",
        stores: ["Zowie India", "Amazon India", "Vishal Peripherals", "import sellers"],
        notes: "Zowie India and Indian retailers list G-SR III, though stock may vary by city/store.",
    },

    images: {
        main: "/mousepads/zowie/gsr-3.png",
    },

    personal: {
        owned: false,
        tested: false,
        notes: "Needs personal testing. Expected to be a modernized G-SR-style control pad with better humidity handling than older Zowie cloth pads.",
        pros: [
            "Strong stopping power",
            "Predictable controlled glide",
            "Improved humidity resistance",
            "Good mainstream esports availability",
            "Comfortable smooth surface",
        ],
        cons: [
            "Not very fast",
            "Less premium base feel than Poron pads",
            "Only one standard size",
            "May feel restrictive for tracking-heavy games",
        ],
    },

    communityConsensus: {
        summary:
            "A modernized Zowie control pad aimed at tac FPS players who want strong stopping power, predictable glide, and better humidity handling than older G-SR generations.",

        commonComparisons: [
            "Zowie G-SR II",
            "LGG Saturn Pro",
            "Artisan Type-99",
            "QcK Heavy",
            "Zowie G-SR-SE Gris",
        ],

        strengths: [
            "Strong stopping power",
            "Predictable control",
            "Better humidity resistance than older Zowie pads",
            "Comfortable surface",
            "Good for Valorant and CS2",
        ],

        weaknesses: [
            "Can feel slow",
            "Not ideal for tracking-heavy games",
            "Less premium feeling than Artisan or LGG Pro bases",
            "Size options are limited",
        ],
    },

    sources: [
        {
            label: "Zowie G-SR III official page",
            type: "official",
            url: "https://zowie.benq.com/en-in/mouse-pad/g-sr-iii.html",
        },
        {
            label: "Zowie G-SR specs page",
            type: "official",
            url: "https://zowie.benq.com/en-in/mouse-pad/g-sr.html",
        },
        {
            label: "ProSettings G-SR III review",
            type: "review",
            url: "https://prosettings.net/reviews/zowie-g-sr-iii/",
        },
    ],

    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
},

  // H-SR III
  {
    id: "zowie-h-sr-iii",
    slug: "zowie-h-sr-iii",

    brand: "Zowie",
    name: "H-SR III",
    series: "H-SR",

    category: "control",
    surface: "cloth",
    base: "rubber",
    softness: "soft",

    sizes: [
        {
            label: "XL SQ",
            width: 500,
            height: 500,
            thickness: 3.5,
            unit: "mm",
        },
    ],

    visuals: {
        defaultColorway: "black",
        colorways: [
            {
                name: "Black",
                slug: "black",
                color: "#171717",
                available: true,
            },
        ],
    },

    feel: {
        speed: 5.1,
        control: 8.9,
        stoppingPower: 9,
        staticFriction: 7.9,
        dynamicFriction: 5.3,
        microAdjustments: 7.6,
        ratingConfidence: "community",
    },

    environment: {
        humidityResistance: 8,
        sweatResistance: 8,
        dustHairResistance: 7,
        washable: true,
        notes: "H-SR III shares the same control-focused identity as G-SR III but uses a larger 500x500mm format.",
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
        "You want a faster pad",
        "You do not need a 500x500 mousepad",
        "You prefer Poron bases",
        "You play mostly tracking-heavy games",
    ],

    price: {
        eur: 59.99,
        inr: 4999,
    },

    availability: {
        global: true,
        india: "limited",
        stores: ["Zowie EU", "import sellers"],
        notes: "Availability varies by region. H-SR III is mainly relevant for players who want the G-SR III feel in a 500x500 format.",
    },

    images: {
        main: "/mousepads/zowie/hsr-3.png",
    },

    personal: {
        owned: false,
        tested: false,
        notes: "Needs personal testing. Treat as the larger square-format version of G-SR III until direct testing says otherwise.",
        pros: [
            "Large 500x500 size",
            "Strong stopping power",
            "Predictable controlled glide",
            "Good for low sens tac FPS",
        ],
        cons: [
            "Not very fast",
            "Limited availability",
            "Less useful if you prefer 490x420 sizing",
        ],
    },

    communityConsensus: {
        summary:
            "Generally treated as the larger 500x500 version of G-SR III. Useful for low-sens players who want the same controlled glide but more vertical and horizontal space.",

        commonComparisons: [
            "Zowie G-SR III",
            "LGG Saturn Pro XL SQ",
            "Artisan Type-99 XXL",
            "QcK Heavy",
        ],

        strengths: [
            "Large square size",
            "Strong control",
            "Good stopping power",
            "Useful for low sensitivity players",
        ],

        weaknesses: [
            "Not meaningfully different from G-SR III besides size",
            "Limited availability",
            "Still slower than balanced pads",
        ],
    },

    sources: [
        {
            label: "Zowie H-SR III official page",
            type: "official",
            url: "https://zowie.benq.eu/en-eu/mouse-pad/h-sr-iii.html",
        },
        {
            label: "MousepadReview H-SR III discussion",
            type: "reddit",
            url: "https://www.reddit.com/r/MousepadReview/comments/1gv0iv9/is_the_hsr_iii_just_a_larger_gsr_iii_im_finding/",
        },
    ],

    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
},

  // G-SR-SE Gris
  {
    id: "zowie-g-sr-se-gris",
    slug: "zowie-g-sr-se-gris",

    brand: "Zowie",
    name: "G-SR-SE Gris",
    series: "G-SR-SE",

    category: "balanced-control",
    surface: "cloth",
    base: "rubber",
    softness: "soft",

    sizes: [
        {
            label: "L",
            width: 470,
            height: 390,
            thickness: 3.5,
            unit: "mm",
        },
    ],

    visuals: {
        defaultColorway: "gris",
        colorways: [
            {
                name: "Gris",
                slug: "gris",
                color: "#8C8C86",
                available: true,
            },
        ],
    },

    feel: {
        speed: 6.5,
        control: 8,
        stoppingPower: 8,
        staticFriction: 6.8,
        dynamicFriction: 6.7,
        microAdjustments: 8,
        ratingConfidence: "community",
    },

    environment: {
        humidityResistance: 8,
        sweatResistance: 8,
        dustHairResistance: 7,
        washable: true,
        notes: "Zowie positions G-SR-SE Gris as a smooth glide pad with steady control, humidity-resistant printed cloth surface, non-stitched edges, and a high-density rubber base.",
    },

    texture: {
        feel: "smooth",
        skinComfort: 8.5,
        sleeveFriendly: true,
        noiseLevel: "quiet",
    },

    recommendedFor: {
        games: ["valorant", "cs2", "general-fps", "apex"],
        aimStyles: ["micro-adjustments", "flicking", "tracking"],
        sensitivity: ["low", "medium"],
    },

    avoidIf: [
        "You want stitched edges",
        "You want a very slow control pad",
        "You want a very fast speed pad",
        "You strongly dislike printed cloth surfaces",
    ],

    price: {
        usd: 34.99,
        inr: 3499,
    },

    availability: {
        global: true,
        india: "available",
        stores: ["Zowie India", "Amazon India", "import sellers"],
        notes: "Availability varies, but G-SR-SE variants are generally easier to find than many enthusiast imports.",
    },

    images: {
        main: "/mousepads/zowie/gsr-se-gris.png",
    },

    personal: {
        owned: false,
        tested: false,
        notes: "Needs personal testing. Expected to be a balanced-control esports pad, faster and less locked-in than G-SR III.",
        pros: [
            "Balanced speed and control",
            "Smooth comfortable surface",
            "Good tac FPS performance",
            "Better glide freedom than G-SR III",
            "Mainstream availability",
        ],
        cons: [
            "Non-stitched edges",
            "Less premium base than Poron pads",
            "Not as slow as dedicated control pads",
            "Not as fast as balanced-speed pads",
        ],
    },

    communityConsensus: {
        summary:
            "Commonly viewed as Zowie's middle-ground pad: faster and smoother than G-SR, but still controlled enough for tactical FPS.",

        commonComparisons: [
            "Zowie G-SR III",
            "Zowie G-SR-SE Rouge",
            "Artisan Zero",
            "LGG Saturn Pro",
            "Pulsar Hyperion",
        ],

        strengths: [
            "Smooth glide",
            "Balanced control",
            "Good stopping power",
            "Comfortable surface",
            "Works well for Valorant and CS2",
        ],

        weaknesses: [
            "Non-stitched edges",
            "Less premium than enthusiast Poron pads",
            "Can be too slow for speed pad users",
            "Can be too fast for G-SR users",
        ],
    },

    sources: [
        {
            label: "Zowie G-SR-SE Gris official page",
            type: "official",
            url: "https://zowie.benq.com/en-in/mouse-pad/g-sr-se-gris.html",
        },
        {
            label: "MouseReview G-SR-SE Gris impressions",
            type: "reddit",
            url: "https://www.reddit.com/r/MouseReview/comments/16t1t3i/zowie_gsrse_gris_review_impressions/",
        },
    ],

    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
},

  // G-SR-SE Rouge II
  {
    id: "zowie-g-sr-se-rouge-ii",
    slug: "zowie-g-sr-se-rouge-ii",

    brand: "Zowie",
    name: "G-SR-SE Rouge II",
    series: "G-SR-SE",

    category: "balanced-control",
    surface: "cloth",
    base: "rubber",
    softness: "soft",

    sizes: [
        {
            label: "L",
            width: 470,
            height: 390,
            thickness: 3.5,
            unit: "mm",
        },
    ],

    visuals: {
        defaultColorway: "rouge",
        colorways: [
            {
                name: "Rouge II",
                slug: "rouge",
                color: "#B32031",
                available: true,
            },
        ],
    },

    feel: {
        speed: 6.7,
        control: 7.8,
        stoppingPower: 7.9,
        staticFriction: 6.5,
        dynamicFriction: 6.9,
        microAdjustments: 8.1,
        ratingConfidence: "community",
    },

    environment: {
        humidityResistance: 8,
        sweatResistance: 8,
        dustHairResistance: 7,
        washable: true,
        notes: "Rouge II is positioned as smoother and easier to move than slower control pads while maintaining strong stopping power and improved humidity resistance.",
    },

    texture: {
        feel: "smooth",
        skinComfort: 8.5,
        sleeveFriendly: true,
        noiseLevel: "quiet",
    },

    recommendedFor: {
        games: ["valorant", "cs2", "general-fps", "apex"],
        aimStyles: ["micro-adjustments", "flicking", "tracking"],
        sensitivity: ["low", "medium"],
    },

    avoidIf: [
        "You want a stitched-edge pad",
        "You want a very slow control pad",
        "You want a rough textured surface",
    ],

    price: {
        usd: 34.99,
        inr: 3499,
    },

    availability: {
        global: true,
        india: "limited",
        stores: ["Zowie India", "MaxGaming", "import sellers"],
        notes: "Rouge II availability varies by region and may be easier through Zowie or international stores.",
    },

    images: {
        main: "/mousepads/zowie/gsr-se-rouge-2.png",
    },

    personal: {
        owned: false,
        tested: false,
        notes: "Needs personal testing. Expected to be one of the smoother G-SR-SE options with slightly easier movement than Gris.",
        pros: [
            "Smooth glide",
            "Good stopping power",
            "Humidity-resistant surface",
            "Good for tac FPS and mixed FPS",
        ],
        cons: [
            "Non-stitched edges",
            "Less controlled than G-SR III",
            "Less premium base feel than Poron pads",
        ],
    },

    communityConsensus: {
        summary:
            "Viewed as a smooth balanced-control esports pad. It keeps Zowie's controlled feel but gives easier movement than the slower G-SR style pads.",

        commonComparisons: [
            "Zowie G-SR-SE Gris",
            "Zowie G-SR III",
            "Artisan Zero",
            "Pulsar Hyperion",
        ],

        strengths: [
            "Smooth controlled glide",
            "Good stopping power",
            "Comfortable surface",
            "Easier movement than G-SR",
        ],

        weaknesses: [
            "Non-stitched edges",
            "Not as controlled as G-SR III",
            "Not as premium as Artisan or LGG Pro pads",
        ],
    },

    sources: [
        {
            label: "Zowie G-SR-SE Rouge II official page",
            type: "official",
            url: "https://zowie.benq.com/en-in/mouse-pad/g-sr-se-rouge-ii.html",
        },
        {
            label: "MaxGaming Rouge II listing",
            type: "store",
            url: "https://www.maxgaming.com/en/mousepads/zowie-g-sr-se-rouge-ii-mousepad",
        },
    ],

    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
},

  // G-SR-SE Bi
  {
    id: "zowie-g-sr-se-bi",
    slug: "zowie-g-sr-se-bi",

    brand: "Zowie",
    name: "G-SR-SE Bi",
    series: "G-SR-SE",

    category: "balanced-control",
    surface: "cloth",
    base: "rubber",
    softness: "soft",

    sizes: [
        {
            label: "L",
            width: 470,
            height: 390,
            thickness: 3.5,
            unit: "mm",
        },
    ],

    visuals: {
        defaultColorway: "bi",
        colorways: [
            {
                name: "Bi",
                slug: "bi",
                color: "#4F6F78",
                available: true,
            },
        ],
    },

    feel: {
        speed: 6.5,
        control: 8,
        stoppingPower: 8,
        staticFriction: 6.7,
        dynamicFriction: 6.7,
        microAdjustments: 8,
        ratingConfidence: "community",
    },

    environment: {
        humidityResistance: 8,
        sweatResistance: 8,
        dustHairResistance: 7,
        washable: true,
        notes: "G-SR-SE Bi shares the same core G-SR-SE identity: humidity-resistant printed cloth, smooth glide, steady control, non-stitched edges, and high-density rubber base.",
    },

    texture: {
        feel: "smooth",
        skinComfort: 8.5,
        sleeveFriendly: true,
        noiseLevel: "quiet",
    },

    recommendedFor: {
        games: ["valorant", "cs2", "general-fps", "apex"],
        aimStyles: ["micro-adjustments", "flicking", "tracking"],
        sensitivity: ["low", "medium"],
    },

    avoidIf: [
        "You want stitched edges",
        "You want a very slow control pad",
        "You want a very fast speed pad",
    ],

    price: {
        usd: 34.99,
        inr: 3499,
    },

    availability: {
        global: true,
        india: "limited",
        stores: ["Zowie India", "import sellers"],
        notes: "Availability may vary by region and production run.",
    },

    images: {
        main: "/mousepads/zowie/gsr-se-3.png",
    },

    personal: {
        owned: false,
        tested: false,
        notes: "Needs personal testing. Treat as a G-SR-SE family pad unless direct testing shows meaningful differences from Gris/Rouge II.",
        pros: [
            "Smooth balanced-control glide",
            "Good stopping power",
            "Comfortable surface",
            "Good for tactical FPS",
        ],
        cons: [
            "Non-stitched edges",
            "Limited availability",
            "May overlap heavily with other G-SR-SE variants",
        ],
    },

    communityConsensus: {
        summary:
            "Part of the modern G-SR-SE family. Community expectations are similar to Gris and Rouge: smooth, balanced-control, and comfortable for FPS players who want more speed than G-SR.",

        commonComparisons: [
            "Zowie G-SR-SE Gris",
            "Zowie G-SR-SE Rouge II",
            "Zowie G-SR III",
            "Artisan Zero",
        ],

        strengths: [
            "Smooth glide",
            "Steady control",
            "Good stopping power",
            "Comfortable surface",
        ],

        weaknesses: [
            "Non-stitched edges",
            "Less distinct from other G-SR-SE variants",
            "Limited availability in some regions",
        ],
    },

    sources: [
        {
            label: "Zowie G-SR-SE Bi official page",
            type: "official",
            url: "https://zowie.benq.com/en-in/mouse-pad/g-sr-se-bi.html",
        },
    ],

    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
},
]
