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
                label: "XL",
                width: 490,
                height: 420,
                thickness: 4,
                unit: "mm",
            },
        ],

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
            humidityResistance: 7,
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
            main: "/mousepads/artisan-zero-soft/main.webp",
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
            main: "/mousepads/pulsar-lgg-hyperion-soft/main.webp",
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

        category: "mud",
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

        feel: {
            speed: 4,
            control: 9.5,
            stoppingPower: 9.5,
            staticFriction: 8.5,
            dynamicFriction: 4.5,
            microAdjustments: 7.5,
            ratingConfidence: "official",
        },

        environment: {
            humidityResistance: 7,
            sweatResistance: 7,
            dustHairResistance: 6,
            washable: true,
            notes: "Positioned as a very high stopping-power tactical FPS pad.",
        },

        texture: {
            feel: "smooth",
            skinComfort: 8,
            sleeveFriendly: true,
            noiseLevel: "quiet",
        },

        recommendedFor: {
            games: ["valorant", "cs2"],
            aimStyles: ["micro-adjustments", "flicking"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You play tracking-heavy games",
            "You want fast dynamic glide",
            "You dislike slow control pads",
        ],

        price: {
            usd: 65,
            inr: 6000,
        },

        availability: {
            global: true,
            india: "limited",
            stores: ["GenesisPC", "import sellers"],
        },

        images: {
            main: "/mousepads/artisan-type-99-soft/main.webp",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "High priority for Valorant/CS2 testing.",
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
                height: 410,
                thickness: 4,
                unit: "mm",
            },
        ],

        feel: {
            speed: 5.5,
            control: 9,
            stoppingPower: 8.5,
            staticFriction: 7.5,
            dynamicFriction: 6,
            microAdjustments: 8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 6,
            sweatResistance: 6,
            dustHairResistance: 7,
            washable: true,
            notes: "Community impressions vary; some users report a sticky or inconsistent feel in certain conditions.",
        },

        texture: {
            feel: "smooth",
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
            "You live in very humid conditions and dislike slow pads",
            "You want a faster balanced pad",
        ],

        price: {
            usd: 50,
            inr: 6000,
        },

        availability: {
            global: true,
            india: "import-only",
            stores: ["MaxGaming", "import sellers"],
        },

        images: {
            main: "/mousepads/lgg-saturn-pro-soft/main.webp",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Important comparison target against Artisan Zero and Type-99.",
        },

        sources: [
            {
                label: "LGG mousepads catalog",
                type: "official",
                url: "https://lethal.gg/collections/mousepads-1",
            },
        ],

        createdAt: "2026-06-10",
        updatedAt: "2026-06-10",
    },

    {
        id: "xraypad-aqua-control-zero",
        slug: "xraypad-aqua-control-zero",

        brand: "Xraypad",
        name: "Aqua Control Zero",
        series: "Aqua Control",

        category: "control",
        surface: "cloth",
        base: "rubber",
        softness: "firm",

        sizes: [
            {
                label: "450x400",
                width: 450,
                height: 400,
                thickness: 4,
                unit: "mm",
            },
            {
                label: "500x500",
                width: 500,
                height: 500,
                thickness: 4,
                unit: "mm",
            },
        ],

        feel: {
            speed: 5.5,
            control: 8.5,
            stoppingPower: 8.5,
            staticFriction: 7.5,
            dynamicFriction: 5.5,
            microAdjustments: 8,
            ratingConfidence: "official",
        },

        environment: {
            humidityResistance: 8.5,
            sweatResistance: 8,
            dustHairResistance: 7,
            washable: true,
            notes: "Listed as suitable for sweaty hands and humid weather.",
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
            "You want a plush Poron base",
            "You want a very smooth surface",
        ],

        price: {
            inr: 2500,
        },

        availability: {
            global: true,
            india: "available",
            stores: ["GenesisPC", "Amazon India"],
            notes: "One of the better India-available control options.",
        },

        images: {
            main: "/mousepads/xraypad-aqua-control-zero/main.webp",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Very important for India-focused recommendations.",
        },

        sources: [
            {
                label: "GenesisPC product page",
                type: "store",
                url: "https://www.genesispc.in/products/x-raypad-aqua-control-zero-slow-control",
            },
        ],

        createdAt: "2026-06-10",
        updatedAt: "2026-06-10",
    },
];
