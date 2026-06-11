import type { Mousepad } from "@/types/mousepad";

export const lggMousepads: Mousepad[] = [
    // Hyperion
    {
        id: "pulsar-lgg-hyperion-soft",
        slug: "pulsar-lgg-hyperion-soft",

        brand: "Pulsar x LGG",
        name: "Hyperion Soft",
        series: "Hyperion",

        category: "balanced-speed",
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
            {
                label: "XL SQ",
                width: 500,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
            {
                label: "XXL",
                width: 1000,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
        ],

        visuals: {
            defaultColorway: "black",

            colorways: [
                {
                    name: "Midnight",
                    slug: "midnight",
                    color: "#576490",
                    available: true,
                },
                {
                    name: "Black",
                    slug: "black",
                    color: "#2b2b2b",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 7.2,
            control: 7.8,
            stoppingPower: 7.4,
            staticFriction: 6.4,
            dynamicFriction: 7.4,
            microAdjustments: 8.6,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 7,
            sweatResistance: 7,
            dustHairResistance: 7,
            washable: true,
            notes: "Official listings position it as a medium/control pad with a smooth but lightly textured polyester surface. Community impressions generally place it around Artisan Zero/Saturn territory, but slightly smoother/faster than traditional control pads.",
        },

        communityConsensus: {
            summary:
                "A balanced all-rounder that feels like a smoother, slightly faster Artisan Zero. Most users describe it as a safe recommendation because it performs well across tactical and tracking-focused FPS games without strongly favoring either style.",

            commonComparisons: [
                "Artisan Zero",
                "LGG Saturn Pro",
                "Hayate Otsu",
                "EM-C",
            ],

            strengths: [
                "Very balanced speed-to-control ratio",
                "Excellent micro-adjustment freedom",
                "Smooth and comfortable surface",
                "Works across Valorant, CS2, Apex and Overwatch",
                "Easy transition from control pads",
                "Premium build quality",
            ],

            weaknesses: [
                "Doesn't excel at any single category",
                "Less stopping power than Saturn Pro or Type-99",
                "Less texture feedback than Zero",
                "Long-term durability is still largely unknown",
            ],
        },

        texture: {
            feel: "slightly-textured",
            skinComfort: 8,
            sleeveFriendly: true,
            noiseLevel: "quiet",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "general-fps", "apex"],
            aimStyles: ["micro-adjustments", "flicking", "tracking"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want a very slow mudpad",
            "You want maximum stopping power like Type-99",
            "You want a very fast Hien-style glide",
        ],

        price: {
            usd: 49.95,
            inr: 5499,
        },

        availability: {
            global: true,
            india: "limited",
            stores: ["CtrlShiftStore", "import sellers"],
            notes: "Seen in India around ₹5,499–₹5,999, but stock may be limited or sold out.",
        },

        images: {
            main: "/mousepads/lgg/hyperion-blue.png",
            gallery: [
                "/mousepads/lgg/hyperion-black.png",
                "/mousepads/lgg/hyperion-blue-xxl.png",
                "/mousepads/lgg/hyperion-black-xxl.png",
            ],
        },

        personal: {
            owned: true,
            tested: true,
            testingDuration: "Add your exact testing duration",
            mainGamesTested: ["valorant", "cs2"],
            notes: "From personal experience, this feels more comparable to Artisan Zero than LGG Saturn Pro. Keep this as your own verdict, while community/official positioning still describes it as a medium-control pad with Saturn-like similarities.",
            pros: [
                "Balanced control-speed feel",
                "Good micro-adjustment freedom",
                "Smoother than rougher control pads",
                "Works well for tactical FPS without feeling too muddy",
            ],
            cons: [
                "Not as slow as true control/mud pads",
                "Limited India availability",
                "Needs more long-term durability testing",
            ],
        },

        sources: [
            {
                label: "Pulsar official product page",
                type: "official",
                url: "https://eu.pulsar.gg/products/pulsar-x-lgg-hyperion-gaming-mousepad-soft",
            },
            {
                label: "Lethal Gaming Gear product page",
                type: "official",
                url: "https://lethal.gg/products/es-hyperion-pro-gaming-mousepad-soft",
            },
            {
                label: "CtrlShiftStore India listing",
                type: "store",
                url: "https://ctrlshiftstore.com/products/pulsar-x-lgg-hyperion-gaming-mousepad",
            },
            {
                label: "MousepadReview Reddit discussion",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1skpxvf/artisan_zero_vs_pulsar_hyperion/",
            },
        ],

        createdAt: "2026-06-10",
        updatedAt: "2026-06-10",
    },

    // Saturn Pro
    {
        id: "lgg-saturn-pro-soft",
        slug: "lgg-saturn-pro-soft",

        brand: "LGG",
        name: "Saturn Pro Soft",
        series: "Saturn Pro",

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
            {
                label: "XL SQ",
                width: 500,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
            {
                label: "XXL",
                width: 1000,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
        ],

        visuals: {
            defaultColorway: "#84060e",

            colorways: [
                {
                    name: "Red",
                    slug: "red",
                    color: "#8F2633",
                    available: true,
                },
                {
                    name: "Black",
                    slug: "black",
                    color: "#202020",
                    available: true,
                },
                {
                    name: "Blue",
                    slug: "blue",
                    color: "#315C9D",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 5.4,
            control: 8.8,
            stoppingPower: 8.7,
            staticFriction: 7.7,
            dynamicFriction: 5.8,
            microAdjustments: 8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 7,
            sweatResistance: 7,
            dustHairResistance: 7,
            washable: true,
            notes: "Official catalog copy positions Saturn Pro as a slow/control pad with controlled glide and easy micro-adjustments. Some community impressions vary depending on humidity, skin contact, and break-in.",
        },

        communityConsensus: {
            summary:
                "One of the most recommended control pads in the enthusiast mousepad community. Strong stopping power, predictable glide, and enough freedom for micro-adjustments without feeling muddy.",

            commonComparisons: [
                "Artisan Zero",
                "Artisan Type-99",
                "Pulsar Hyperion",
                "EM-C",
                "QcK Heavy",
            ],

            strengths: [
                "Excellent stopping power",
                "Very predictable glide",
                "Premium build quality",
                "Strong tac FPS performance",
                "Easy recommendation for most players",
            ],

            weaknesses: [
                "Can feel slower than expected",
                "Higher static friction than balanced pads",
                "Can become slightly sticky in some humid conditions",
                "Not ideal for speed-focused players",
            ],
        },

        texture: {
            feel: "slightly-textured",
            skinComfort: 8,
            sleeveFriendly: true,
            noiseLevel: "quiet",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "general-fps"],
            aimStyles: ["micro-adjustments", "flicking"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want a balanced-speed pad like Hyperion",
            "You want faster dynamic glide for tracking-heavy games",
            "You dislike slower controlled pads",
            "You live in humid conditions and are sensitive to sticky-feeling cloth pads",
        ],

        price: {
            usd: 54.95,
            inr: 6500,
        },

        availability: {
            global: true,
            india: "import-only",
            stores: ["Lethal Gaming Gear", "MaxGaming", "import sellers"],
            notes: "Usually easier to buy globally than locally in India. India pricing depends heavily on import route and stock.",
        },

        images: {
            main: "/mousepads/lgg/saturn-red.png",
            gallery: [
                "/mousepads/lgg/saturn-black.png",
                "/mousepads/lgg/saturn-blue.png",
            ],
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to sit slower than Artisan Zero and Hyperion, with stronger control and stopping power.",
            pros: [
                "Strong controlled glide",
                "Good stopping power",
                "Smooth enough for micro-adjustments",
                "Premium base and stitched edges",
            ],
            cons: [
                "Slower than balanced pads",
                "May feel sticky or inconsistent for some users in humidity",
                "Import-heavy availability in India",
                "Less versatile for tracking-heavy games",
            ],
        },

        sources: [
            {
                label: "LGG Saturn Pro Soft official page",
                type: "official",
                url: "https://lethal.gg/products/es-saturn-pro-gaming-mousepad-soft",
            },
            {
                label: "LGG mousepads catalog",
                type: "official",
                url: "https://lethal.gg/collections/mousepads-1",
            },
            {
                label: "Ausmodshop Saturn Pro listing",
                type: "store",
                url: "https://ausmodshop.com/products/lethal-gaming-gear-saturn-pro",
            },
            {
                label: "Amazon Saturn Pro XLSQ listing",
                type: "store",
                url: "https://www.amazon.com/Lethal-Gaming-Gear-Saturn-Xsoft/dp/B0DG8JPCMT",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },

    // Venus Pro
    {
        id: "lgg-venus-pro-soft",
        slug: "lgg-venus-pro-soft",

        brand: "Lethal Gaming Gear",
        name: "Venus Pro Soft",
        series: "Venus Pro",

        category: "balanced-speed",
        surface: "hybrid",
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
            {
                label: "XL SQ",
                width: 500,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
            {
                label: "XXL",
                width: 1000,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
        ],

        visuals: {
            defaultColorway: "red",

            colorways: [
                {
                    name: "Red",
                    slug: "red",
                    color: "#8F2633",
                    available: true,
                },
                {
                    name: "Black",
                    slug: "black",
                    color: "#202020",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 7.7,
            control: 7.2,
            stoppingPower: 7,
            staticFriction: 5.8,
            dynamicFriction: 7.8,
            microAdjustments: 8.8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8,
            sweatResistance: 8,
            dustHairResistance: 7,
            washable: true,
            notes: "Venus Pro is commonly treated as LGG's faster balanced/hybrid option. It is usually compared to pads like Hayate Otsu and Hien rather than Saturn Pro.",
        },

        communityConsensus: {
            summary:
                "Often described as LGG's answer to pads like the Hayate Otsu. Community impressions generally place it between balanced and speed-focused, with strong micro-adjustment freedom and better stopping power than most speed pads.",

            commonComparisons: [
                "Artisan Hayate Otsu",
                "Artisan Hien",
                "Pulsar Hyperion",
                "LGG Saturn Pro",
                "Artisan Zero",
            ],

            strengths: [
                "Excellent speed-control balance",
                "Very strong micro-adjustments",
                "Good tracking performance",
                "More stopping power than pure speed pads",
                "Works across multiple FPS genres",
            ],

            weaknesses: [
                "Less control than Saturn Pro or Zero",
                "Can feel too quick for tac FPS specialists",
                "Textured surface is not for everyone",
                "Less stopping power than dedicated control pads",
            ],
        },

        texture: {
            feel: "textured",
            skinComfort: 7,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["apex", "overwatch", "fortnite", "general-fps", "valorant"],
            aimStyles: ["tracking", "switching", "micro-adjustments"],
            sensitivity: ["low", "medium", "high"],
        },

        avoidIf: [
            "You want a slow control pad",
            "You dislike textured hybrid surfaces",
            "You mainly play tac FPS and rely heavily on stopping power",
        ],

        price: {
            usd: 54.95,
            inr: 6500,
        },

        availability: {
            global: true,
            india: "import-only",
            stores: ["Lethal Gaming Gear", "MaxGaming", "import sellers"],
            notes: "Usually import-only for India. Pricing depends heavily on shipping and availability.",
        },

        images: {
            main: "/mousepads/lgg/venus-pro-red.webp",
            gallery: [
                "/mousepads/lgg/venus-pro-black.webp",
                "/mousepads/lgg/venus-pro-red-xxl.webp",
                "/mousepads/lgg/venus-pro-surface.webp",
            ],
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to sit faster than Saturn Pro and closer to Hayate Otsu / Hien territory.",
            pros: [
                "Fast balanced glide",
                "Good micro-adjustment freedom",
                "Useful for tracking-heavy games",
                "More controlled than pure speed pads",
            ],
            cons: [
                "Less stopping power than Saturn Pro",
                "Textured surface may not suit everyone",
                "Import-heavy availability in India",
            ],
        },

        sources: [
            {
                label: "LGG mousepads catalog",
                type: "official",
                url: "https://lethal.gg/collections/mousepads-1",
            },
            {
                label: "Lethal Gaming Gear official store",
                type: "official",
                url: "https://lethal.gg/",
            },
            {
                label: "MousepadReview community discussion",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },

    // Neptune Pro
    {
        id: "lgg-neptune-pro-soft",
        slug: "lgg-neptune-pro-soft",

        brand: "Lethal Gaming Gear",
        name: "Neptune Pro Soft",
        series: "Neptune Pro",

        category: "speed",
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
            {
                label: "XL SQ",
                width: 500,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
            {
                label: "XXL",
                width: 1000,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
        ],

        visuals: {
            defaultColorway: "dark-grey",

            colorways: [
                {
                    name: "Dark Grey",
                    slug: "dark-grey",
                    color: "#3A3A3A",
                    available: true,
                },
                {
                    name: "Jet Black",
                    slug: "jet-black",
                    color: "#151515",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 8.8,
            control: 5.8,
            stoppingPower: 5.8,
            staticFriction: 4.5,
            dynamicFriction: 8.9,
            microAdjustments: 9.2,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8,
            sweatResistance: 8,
            dustHairResistance: 7,
            washable: true,
            notes: "Officially positioned as a very fast smooth-speed pad with slight textural feedback. Best suited for players who want speed without moving to glass.",
        },

        communityConsensus: {
            summary:
                "Widely viewed as LGG's speed-focused cloth offering. Players often compare it to Raiden, but with slightly more control and familiarity for users coming from traditional cloth pads.",

            commonComparisons: [
                "Artisan Raiden",
                "Artisan Hien",
                "LGG Venus Pro",
                "Wallhack Speed",
                "Skypad",
            ],

            strengths: [
                "Extremely low friction",
                "Excellent tracking performance",
                "Very smooth glide",
                "Strong micro-adjustment freedom",
                "One of the fastest cloth pads available",
            ],

            weaknesses: [
                "Limited stopping power",
                "Can feel uncontrollable for tac FPS players",
                "Less forgiving than balanced pads",
                "May require an adjustment period",
            ],
        },

        texture: {
            feel: "slightly-textured",
            skinComfort: 8,
            sleeveFriendly: true,
            noiseLevel: "quiet",
        },

        recommendedFor: {
            games: ["apex", "overwatch", "fortnite", "general-fps"],
            aimStyles: ["tracking", "switching", "micro-adjustments"],
            sensitivity: ["low", "medium", "high"],
        },

        avoidIf: [
            "You mainly play Valorant or CS2 and want high stopping power",
            "You want a control pad",
            "You over-flick and need the pad to help you stop",
        ],

        price: {
            usd: 54.99,
            inr: 7000,
        },

        availability: {
            global: true,
            india: "import-only",
            stores: [
                "Lethal Gaming Gear",
                "MaxGaming",
                "Ausmodshop",
                "import sellers",
            ],
            notes: "Mostly import-only for India. Availability may vary by size and softness.",
        },

        images: {
            main: "/mousepads/lgg/neptune-pro-dark-grey.webp",
            gallery: [
                "/mousepads/lgg/neptune-pro-jet-black.webp",
                "/mousepads/lgg/neptune-pro-dark-grey-xl-sq.webp",
                "/mousepads/lgg/neptune-pro-surface.webp",
            ],
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be one of LGG's fastest cloth options and much quicker than Saturn Pro, Hyperion, and Venus Pro.",
            pros: [
                "Very fast cloth glide",
                "Low static friction",
                "Great for tracking",
                "Smoother than rough hybrid speed pads",
                "Good alternative to glass for speed-focused players",
            ],
            cons: [
                "Limited stopping power",
                "Not ideal for pure tac FPS control",
                "Import-heavy availability in India",
                "May feel too fast for control pad users",
            ],
        },

        sources: [
            {
                label: "LGG Neptune Pro official page",
                type: "official",
                url: "https://lethal.gg/products/neptune-pro",
            },
            {
                label: "LGG eS Neptune Pro official page",
                type: "official",
                url: "https://lethal.gg/products/es-neptune-pro-gaming-mousepad-soft",
            },
            {
                label: "Ausmodshop Neptune Pro listing",
                type: "store",
                url: "https://ausmodshop.com/products/lethal-gaming-gear-neptune-pro-dark-grey",
            },
            {
                label: "MousepadReview Neptune Pro review",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1e7ffep/lethal_gaming_gear_neptune_pro_review/",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },

    // Jupiter Pro
    {
        id: "lgg-jupiter-pro-soft",
        slug: "lgg-jupiter-pro-soft",

        brand: "Lethal Gaming Gear",
        name: "Jupiter Pro Soft",
        series: "Jupiter Pro",

        category: "mud",
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
                label: "XL SQ",
                width: 500,
                height: 500,
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
                    color: "#151515",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 3.8,
            control: 9.5,
            stoppingPower: 9.6,
            staticFriction: 8.8,
            dynamicFriction: 4.2,
            microAdjustments: 7.2,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 7,
            sweatResistance: 7,
            dustHairResistance: 7,
            washable: true,
            notes: "Jupiter Pro is commonly described as LGG's slowest control option. The Pro version is smoother and softer than the original Jupiter, but still aimed at very high control and stopping power.",
        },

        communityConsensus: {
            summary:
                "Generally considered one of the slowest pads in LGG's lineup. Recommended primarily for players who want maximum stopping power and a planted feeling for tactical shooters.",

            commonComparisons: [
                "Artisan Type-99",
                "LGG Saturn Pro",
                "EM-C",
                "QcK Heavy",
                "Zowie G-SR",
            ],

            strengths: [
                "Extremely high stopping power",
                "Very controlled glide",
                "Comfortable smooth surface",
                "Great for Valorant and CS2",
                "Predictable aim feel",
            ],

            weaknesses: [
                "Too slow for many players",
                "Weak tracking performance",
                "Can feel restrictive during large corrections",
                "Limited versatility outside tactical FPS",
            ],
        },

        texture: {
            feel: "smooth",
            skinComfort: 9,
            sleeveFriendly: true,
            noiseLevel: "quiet",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "general-fps"],
            aimStyles: ["flicking", "micro-adjustments"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want fast dynamic glide",
            "You play tracking-heavy games most of the time",
            "You dislike high static friction",
            "You prefer balanced pads like Zero or Hyperion",
        ],

        price: {
            usd: 54.95,
            inr: 7000,
        },

        availability: {
            global: true,
            india: "import-only",
            stores: [
                "Lethal Gaming Gear",
                "MaxGaming",
                "Amazon",
                "import sellers",
            ],
            notes: "Mostly import-only for India. Availability varies by size and softness.",
        },

        images: {
            main: "/mousepads/lgg/jupiter-pro-black.webp",
            gallery: [
                "/mousepads/lgg/jupiter-pro-black-close.webp",
                "/mousepads/lgg/jupiter-pro-black-xl.webp",
            ],
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be slower than Saturn Pro and Type-99-adjacent in control intent, but with its own smoother LGG feel.",
            pros: [
                "Extremely high stopping power",
                "Very controlled glide",
                "Comfortable smooth surface",
                "Good for tac FPS players who want a planted feel",
            ],
            cons: [
                "Too slow for many players",
                "Limited tracking freedom",
                "Not very versatile",
                "Import-heavy availability in India",
            ],
        },

        sources: [
            {
                label: "LGG Jupiter Pro official page",
                type: "official",
                url: "https://lethal.gg/products/es-jupiter-pro-gaming-mousepad-soft",
            },
            {
                label: "MaxGaming Jupiter Pro listing",
                type: "store",
                url: "https://www.maxgaming.com/en/mousepads/jupiter-pro-gaming-mousepad-xl-soft-black",
            },
            {
                label: "MousepadReview Jupiter Pro V2 review",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1fvxsfl/review_lgg_jupiter_pro_v2_soft_xl_this_might_be/",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },
];
