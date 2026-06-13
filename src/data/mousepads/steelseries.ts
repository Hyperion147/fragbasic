import type { Mousepad } from "@/types/mousepad";

export const steelseriesMousepads: Mousepad[] = [

    // QCK Heavy
    {
        id: "steelseries-qck-heavy",
        slug: "steelseries-qck-heavy",

        brand: "SteelSeries",
        name: "QcK Heavy",
        series: "QcK",

        category: "control",
        surface: "cloth",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "M",
                width: 320,
                height: 270,
                thickness: 6,
                unit: "mm",
            },
            {
                label: "L",
                width: 450,
                height: 400,
                thickness: 6,
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
            speed: 4.8,
            control: 9,
            stoppingPower: 9.2,
            staticFriction: 8.1,
            dynamicFriction: 5,
            microAdjustments: 7.2,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 5.5,
            sweatResistance: 6,
            dustHairResistance: 6,
            washable: true,
            notes: "Classic thick cloth control pad. Strong stopping power, but older QcK surfaces are commonly considered more humidity-sensitive than newer premium pads.",
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
            "You want a fast glide",
            "You play tracking-heavy games most of the time",
            "You dislike muddy or slow-feeling cloth pads",
            "You want modern stitched edges",
        ],

        price: {
            usd: 29.99,
            inr: 3500,
        },

        availability: {
            global: true,
            india: "available",
            stores: [
                "SteelSeries",
                "Amazon India",
                "SCL Gaming",
                "import sellers",
            ],
            notes: "One of the easiest mainstream control pads to find globally and in India, though pricing varies heavily by retailer.",
        },

        images: {
            main: "/mousepads/steelseries/qck-heavy.webp",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Treat as the classic slow/control benchmark for mainstream cloth pads.",
            pros: [
                "Strong stopping power",
                "Very comfortable thick base",
                "Great for tac FPS",
                "Widely available",
                "Affordable compared to premium imports",
            ],
            cons: [
                "Can feel muddy",
                "Humidity sensitivity",
                "No stitched edges",
                "Less refined than modern premium control pads",
            ],
        },

        communityConsensus: {
            summary:
                "One of the most iconic tactical FPS mousepads ever made. Known for strong stopping power, a planted feel, and widespread Counter-Strike usage, but also for feeling muddy or humidity-sensitive compared to modern premium pads.",

            commonComparisons: [
                "Zowie G-SR III",
                "LGG Saturn Pro",
                "Artisan Type-99",
                "SteelSeries QcK Performance Control",
            ],

            strengths: [
                "Strong stopping power",
                "Comfortable thick base",
                "Great tac FPS control",
                "Widely available",
                "Easy entry point into control pads",
            ],

            weaknesses: [
                "Can feel muddy",
                "Humidity-sensitive",
                "Less durable/refined than modern premium pads",
                "Not ideal for tracking-heavy games",
            ],
        },

        sources: [
            {
                label: "SteelSeries QcK Heavy official page",
                type: "official",
                url: "https://steelseries.com/gaming-mousepads/qck-heavy",
            },
            {
                label: "SteelSeries mousepad size guide",
                type: "official",
                url: "https://steelseries.com/blog/which-mousepad-is-right-for-you",
            },
            {
                label: "Amazon India QcK Heavy listing",
                type: "store",
                url: "https://www.amazon.in/SteelSeries-Gaming-Rubber-Optical-Compatible/dp/B000V7ARAU",
            },
            {
                label: "SCL Gaming QcK Heavy listing",
                type: "store",
                url: "https://sclgaming.in/product/steelseries-qck-heavy-mouse-pad/",
            },
        ],

        createdAt: "2026-06-12",
        updatedAt: "2026-06-12",
    },

    // QCK Performance Control
    {
        id: "steelseries-qck-performance-control",
        slug: "steelseries-qck-performance-control",

        brand: "SteelSeries",
        name: "QcK Performance Control",
        series: "QcK Performance",

        category: "control",
        surface: "cloth",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "L",
                width: 490,
                height: 420,
                thickness: 3.5,
                unit: "mm",
            },
            {
                label: "XL",
                width: 900,
                height: 400,
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
                    color: "#111111",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 5.2,
            control: 9.1,
            stoppingPower: 9,
            staticFriction: 7.8,
            dynamicFriction: 5.4,
            microAdjustments: 7.6,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 7.5,
            sweatResistance: 7.5,
            dustHairResistance: 7,
            washable: true,
            notes: "Premium QcK control surface with stitched edges and 3.5mm neoprene-style base. Intended to offer stronger consistency and better construction than older QcK pads.",
        },

        texture: {
            feel: "textured",
            skinComfort: 7.5,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "general-fps"],
            aimStyles: ["micro-adjustments", "flicking"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want a fast or balanced-speed pad",
            "You dislike textured control surfaces",
            "You play mostly tracking-heavy games",
            "You prefer Poron bases over rubber/neoprene-style bases",
        ],

        price: {
            usd: 39.99,
            inr: 3999,
        },

        availability: {
            global: true,
            india: "available",
            stores: [
                "SteelSeries",
                "Amazon India",
                "Flipkart",
                "EliteHubs",
                "MDComputers",
            ],
            notes: "Part of SteelSeries' newer Performance lineup and generally easier to source than enthusiast import pads.",
        },

        images: {
            main: "/mousepads/steelseries/qck-control.webp",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be SteelSeries' modern control option, sitting near QcK Heavy and Saturn Pro in purpose but with better build quality.",
            pros: [
                "Strong stopping power",
                "More refined than classic QcK pads",
                "Stitched edges",
                "Good tac FPS control",
                "Mainstream availability",
            ],
            cons: [
                "Less speed than Balance or Speed variants",
                "Not ideal for tracking-focused players",
                "Textured surface may not suit everyone",
                "Still less premium-feeling than Artisan/LGG Poron pads",
            ],
        },

        communityConsensus: {
            summary:
                "SteelSeries' modern control option. Early community and review impressions describe it as a noticeably more refined QcK-style control pad with more feedback, better construction, and strong stopping power.",

            commonComparisons: [
                "QcK Heavy",
                "LGG Saturn Pro",
                "Artisan Type-99",
                "Zowie G-SR III",
            ],

            strengths: [
                "Strong stopping power",
                "Improved construction over old QcK pads",
                "Good tactile feedback",
                "Comfortable base",
                "Good tac FPS performance",
            ],

            weaknesses: [
                "Slower than balanced pads",
                "Not ideal for tracking-heavy games",
                "Not as premium as Poron-base enthusiast pads",
                "Limited long-term community data",
            ],
        },

        sources: [
            {
                label: "SteelSeries QcK Performance official page",
                type: "official",
                url: "https://steelseries.com/gaming-mousepads/qck-performance",
            },
            {
                label: "SteelSeries mousepad size guide",
                type: "official",
                url: "https://steelseries.com/blog/which-mousepad-is-right-for-you",
            },
            {
                label: "GamingTrend QcK Performance review",
                type: "review",
                url: "https://gamingtrend.com/reviews/steelseries-qck-performance-mousepads-review-the-unsung-hero-on-your-desk-gets-an-upgrade/",
            },
            {
                label: "PC Gamer QcK Performance coverage",
                type: "review",
                url: "https://www.pcgamer.com/hardware/gaming-mice/my-fave-piece-of-PC-gaming-tech-to-launch-this-year-was-the-softest-kind-of-hardware-there-is/",
            },
        ],

        createdAt: "2026-06-12",
        updatedAt: "2026-06-12",
    },

    // QCK Performance Balance
    {
        id: "steelseries-qck-performance-balance",
        slug: "steelseries-qck-performance-balance",

        brand: "SteelSeries",
        name: "QcK Performance Balance",
        series: "QcK Performance",

        category: "balanced-control",
        surface: "cloth",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "L",
                width: 490,
                height: 420,
                thickness: 3.5,
                unit: "mm",
            },
            {
                label: "XL",
                width: 900,
                height: 400,
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
                    color: "#111111",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 6.4,
            control: 7.8,
            stoppingPower: 7.9,
            staticFriction: 6.5,
            dynamicFriction: 6.6,
            microAdjustments: 8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 7.8,
            sweatResistance: 7.8,
            dustHairResistance: 7,
            washable: true,
            notes: "Balanced variant in the QcK Performance lineup, intended to sit between the Control and Speed surfaces with a safer all-round feel.",
        },

        texture: {
            feel: "smooth",
            skinComfort: 8.5,
            sleeveFriendly: true,
            noiseLevel: "quiet",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "apex", "overwatch", "general-fps"],
            aimStyles: [
                "micro-adjustments",
                "flicking",
                "tracking",
                "switching",
            ],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want maximum stopping power",
            "You want a true speed pad",
            "You prefer very slow control pads",
            "You want a rough textured surface with strong feedback",
        ],

        price: {
            usd: 39.99,
            inr: 3999,
        },

        availability: {
            global: true,
            india: "available",
            stores: [
                "SteelSeries",
                "Amazon India",
                "Flipkart",
                "EliteHubs",
                "MDComputers",
            ],
            notes: "Part of SteelSeries' newer Performance lineup and generally easier to source than enthusiast import pads.",
        },

        images: {
            main: "/mousepads/steelseries/qck-balance.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be the safest SteelSeries Performance recommendation for players who do not know whether they want control or speed.",
            pros: [
                "Versatile speed-control balance",
                "Comfortable smooth surface",
                "Stitched edges",
                "Good for mixed FPS games",
                "Mainstream availability",
            ],
            cons: [
                "Does not specialize in control or speed",
                "Less stopping power than Control or QcK Heavy",
                "Less glide than Speed-focused pads",
                "Limited long-term community data",
            ],
        },

        communityConsensus: {
            summary:
                "Generally viewed as the safest QcK Performance variant. It offers a mainstream-friendly balance of speed and control without committing too heavily to either extreme.",

            commonComparisons: [
                "Artisan Zero",
                "Pulsar x LGG Hyperion",
                "Zowie G-SR-SE Gris",
                "LGG Saturn Pro",
                "QcK Performance Control",
            ],

            strengths: [
                "Good all-round balance",
                "Comfortable surface",
                "Easy transition from regular cloth pads",
                "Useful across several FPS styles",
                "Better construction than classic QcK pads",
            ],

            weaknesses: [
                "Less stopping power than control pads",
                "Less speed than dedicated speed pads",
                "Not as distinctive as enthusiast mousepads",
                "Still relatively new in the community",
            ],
        },

        sources: [
            {
                label: "SteelSeries QcK Performance official page",
                type: "official",
                url: "https://steelseries.com/gaming-mousepads/qck-performance",
            },
            {
                label: "SteelSeries mousepad size guide",
                type: "official",
                url: "https://steelseries.com/blog/which-mousepad-is-right-for-you",
            },
            {
                label: "Amazon India QcK Performance Balance listing",
                type: "store",
                url: "https://www.amazon.in/SteelSeries-Performance-Balance-Gaming-Mousepad/dp/B0DZ1P2SF2",
            },
            {
                label: "PC Gamer QcK Performance coverage",
                type: "review",
                url: "https://www.pcgamer.com/hardware/gaming-mice/my-fave-piece-of-PC-gaming-tech-to-launch-this-year-was-the-softest-kind-of-hardware-there-is/",
            },
        ],

        createdAt: "2026-06-12",
        updatedAt: "2026-06-12",
    },

    // QCK Performance Speed
    {
        id: "steelseries-qck-performance-speed",
        slug: "steelseries-qck-performance-speed",

        brand: "SteelSeries",
        name: "QcK Performance Speed",
        series: "QcK Performance",

        category: "balanced-speed",
        surface: "cloth",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "L",
                width: 490,
                height: 420,
                thickness: 3.5,
                unit: "mm",
            },
            {
                label: "XL",
                width: 900,
                height: 400,
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
                    color: "#111111",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 7.8,
            control: 6.8,
            stoppingPower: 6.6,
            staticFriction: 5.3,
            dynamicFriction: 7.9,
            microAdjustments: 8.8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8,
            sweatResistance: 8,
            dustHairResistance: 7,
            washable: true,
            notes: "Designed as the fastest surface in the QcK Performance lineup. Community impressions generally place it in balanced-speed territory rather than true speed-pad territory.",
        },

        texture: {
            feel: "smooth",
            skinComfort: 9,
            sleeveFriendly: true,
            noiseLevel: "quiet",
        },

        recommendedFor: {
            games: ["apex", "overwatch", "fortnite", "general-fps"],
            aimStyles: ["tracking", "switching", "micro-adjustments"],
            sensitivity: ["low", "medium", "high"],
        },

        avoidIf: [
            "You want maximum stopping power",
            "You mainly play Valorant or CS2",
            "You prefer slow control-oriented pads",
            "You rely heavily on friction to stop flicks",
        ],

        price: {
            usd: 39.99,
            inr: 3999,
        },

        availability: {
            global: true,
            india: "available",
            stores: [
                "SteelSeries",
                "Amazon",
                "Flipkart",
                "EliteHubs",
                "MDComputers",
            ],
            notes: "Part of the current QcK Performance lineup and generally easier to source than enthusiast import brands.",
        },

        images: {
            main: "/mousepads/steelseries/qck-speed.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be SteelSeries' fastest cloth offering and a reasonable alternative for players who want more glide without moving into Hien, Neptune Pro, or Raiden territory.",
            pros: [
                "Fast glide",
                "Excellent micro-adjustment freedom",
                "Comfortable surface",
                "Good tracking performance",
                "Premium stitched construction",
            ],
            cons: [
                "Less stopping power than Control and Balance variants",
                "Not ideal for tac FPS specialists",
                "Still slower than dedicated speed pads",
                "Limited enthusiast testing compared to established pads",
            ],
        },

        communityConsensus: {
            summary:
                "The fastest member of the QcK Performance family. Community impressions describe it as a safe speed-oriented option that remains more controlled than pads like Raiden or Neptune Pro.",

            commonComparisons: [
                "QcK Performance Balance",
                "LGG Venus Pro",
                "LGG Neptune Pro",
                "Artisan Hayate Otsu",
                "Artisan Hien",
            ],

            strengths: [
                "Fast glide",
                "Good tracking performance",
                "Strong micro-adjustments",
                "Premium build quality",
                "Easy transition from traditional cloth pads",
            ],

            weaknesses: [
                "Less stopping power than control pads",
                "Not as fast as true speed specialists",
                "Still relatively new in the market",
                "Limited long-term community data",
            ],
        },

        sources: [
            {
                label: "SteelSeries QcK Performance official page",
                type: "official",
                url: "https://steelseries.com/gaming-mousepads/qck-performance",
            },
            {
                label: "SteelSeries Performance Series overview",
                type: "official",
                url: "https://steelseries.com/blog",
            },
            {
                label: "Performance Series review coverage",
                type: "review",
                url: "https://prosettings.net",
            },
            {
                label: "MousepadReview Performance discussion",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/",
            },
        ],

        createdAt: "2026-06-12",
        updatedAt: "2026-06-12",
    },
];
