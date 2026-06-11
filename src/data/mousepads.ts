import type { Mousepad } from "@/types/mousepad";

export const mousepads: Mousepad[] = [
    {
        id: "artisan-zero-soft",
        slug: "artisan-zero-soft",

        brand: "Artisan",
        name: "Zero Soft",
        series: "Zero",

        category: "balanced-control",
        surface: "cloth",
        base: "poron",
        softness: "soft",

        sizes: [
            {
                label: "M",
                width: 310,
                height: 240,
                thickness: 4,
                unit: "mm",
            },
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
                    color: "#1c1c1c",
                    available: true,
                },
                {
                    name: "Dai-dai Orange",
                    slug: "orange",
                    color: "#F7931E",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 6.8,
            control: 8.2,
            stoppingPower: 8,
            staticFriction: 6.8,
            dynamicFriction: 6.9,
            microAdjustments: 8.3,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 9,
            sweatResistance: 7,
            dustHairResistance: 5,
            washable: true,
            notes: "Known for strong control, but the rough knit surface can collect dust and hair.",
        },

        texture: {
            feel: "textured",
            skinComfort: 7,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "general-fps"],
            aimStyles: ["micro-adjustments", "flicking"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want a very smooth surface",
            "You dislike textured cloth pads",
            "You want a very fast glide",
        ],

        price: {
            usd: 65,
            inr: 5500,
        },

        availability: {
            global: true,
            india: "limited",
            stores: ["GenesisPC", "import sellers"],
            notes: "Often available in India through limited imported stock.",
        },

        images: {
            main: "/mousepads/artisan/zero-dai-dai-orange.webp",
            gallery: [
                "/mousepads/artisan/zero-black-close.jpg",
                "/mousepads/artisan/zero-black-fold.webp",
                "/mousepads/artisan/zero-black.webp",
            ],
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing before final verdict.",
            pros: [
                "Excellent stopping power",
                "Great for tactical FPS",
                "Premium base",
            ],
            cons: [
                "Expensive",
                "Can trap dust/hair",
                "Limited India availability",
            ],
        },

        sources: [
            {
                label: "Artisan official selection guide",
                type: "official",
                url: "https://artisan-jp.com/global/selection-guide",
            },
        ],

        createdAt: "2026-06-10",
        updatedAt: "2026-06-10",
    },

    {
        id: "pulsar-lgg-hyperion-soft",
        slug: "pulsar-lgg-hyperion-soft",

        brand: "Pulsar x Lethal Gaming Gear",
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
            main: "/mousepads/lgg/hyperion-black.jpg",
            gallery: [
                "/mousepads/lgg/hyperion-blue.jpg",
                "/mousepads/lgg/hyperion-blue-xxl.jpg",
                "/mousepads/lgg/hyperion-black-xxl.jpg",
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

    {
        id: "artisan-type-99-soft",
        slug: "artisan-type-99-soft",

        brand: "Artisan",
        name: "Type-99 Soft",
        series: "Type-99",

        category: "control",
        surface: "cloth",
        base: "poron",
        softness: "soft",

        sizes: [
            {
                label: "S",
                width: 240,
                height: 210,
                thickness: 4,
                unit: "mm",
            },
            {
                label: "M",
                width: 310,
                height: 240,
                thickness: 4,
                unit: "mm",
            },
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
            defaultColorway: "matcha",

            colorways: [
                {
                    name: "Matcha",
                    slug: "matcha",
                    color: "#9BA66D",
                    available: true,
                },
                {
                    name: "Black",
                    slug: "black",
                    color: "#1c1c1c",
                    available: true,
                },
                {
                    name: "Gray",
                    slug: "gray",
                    color: "#7E817A",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 4.4,
            control: 9.4,
            stoppingPower: 9.5,
            staticFriction: 8.4,
            dynamicFriction: 4.8,
            microAdjustments: 7.5,
            ratingConfidence: "official",
        },

        environment: {
            humidityResistance: 9,
            sweatResistance: 8.5,
            dustHairResistance: 7,
            washable: true,
            notes: "Official and retailer descriptions position Type-99 as a low-speed, high-stopping-power control pad with fast-drying fabric aimed at reducing humidity and sweat effects.",
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
            "You want a fast or balanced-speed glide",
            "You play tracking-heavy games like Apex most of the time",
            "You dislike high static friction",
            "You prefer something closer to Artisan Zero or Hyperion speed",
        ],

        price: {
            usd: 65,
            inr: 6099,
        },

        availability: {
            global: true,
            india: "limited",
            stores: ["GenesisPC", "import sellers"],
            notes: "GenesisPC has listed Type-99 in India around ₹6,099, but color and hardness availability can vary.",
        },

        images: {
            main: "/mousepads/artisan/type-99-matcha.webp",
            gallery: [
                "/mousepads/artisan/type-99-black.webp",
                "/mousepads/artisan/type-99-gray.webp",
                "/mousepads/artisan/type-99-matcha-close.webp",
            ],
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be noticeably slower than Artisan Zero and Hyperion, with much higher stopping power.",
            pros: [
                "Very strong stopping power",
                "Smooth control surface",
                "Better humidity-focused positioning than many traditional cloth control pads",
                "Great candidate for Valorant and CS2 low-sens players",
            ],
            cons: [
                "Likely too slow for tracking-heavy games",
                "Expensive",
                "Limited India availability",
                "May feel restrictive if you prefer balanced pads",
            ],
        },

        sources: [
            {
                label: "Artisan official Type-99 page",
                type: "official",
                url: "https://artisan-jp.com/global/fx-type99",
            },
            {
                label: "JPGamingUSA Type-99 listing",
                type: "store",
                url: "https://jpgamingusa.com/products/artisan-fx-type-99-mousepad",
            },
            {
                label: "GenesisPC India Type-99 listing",
                type: "store",
                url: "https://www.genesispc.in/products/artisan-fx-type-99-gaming-mousepad",
            },
            {
                label: "Ausmodshop Type-99 listing",
                type: "store",
                url: "https://ausmodshop.com/products/artisan-fx-type-99-matcha-green",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },

    {
        id: "lgg-saturn-pro-soft",
        slug: "lgg-saturn-pro-soft",

        brand: "Lethal Gaming Gear",
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
            defaultColorway: "black",

            colorways: [
                {
                    name: "Black",
                    slug: "black",
                    color: "#202020",
                    available: true,
                },
                {
                    name: "Red",
                    slug: "red",
                    color: "#8F2633",
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
            main: "/mousepads/lgg/saturn-pro-black.webp",
            gallery: [
                "/mousepads/lgg/saturn-pro-red.webp",
                "/mousepads/lgg/saturn-pro-blue.webp",
                "/mousepads/lgg/saturn-pro-black-xxl.webp",
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
    
];
