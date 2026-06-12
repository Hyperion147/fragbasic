import type { Mousepad } from "@/types/mousepad";

export const artisanMousepads: Mousepad[] = [
    // Zero
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
            defaultColorway: "orange",

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
                    color: "#EE9858",
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
            main: "/mousepads/artisan/zero-dai-dai-orange.png",
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

        communityConsensus: {
            summary:
                "Often considered the safest Artisan recommendation. Most players describe it as a balanced-control pad with strong stopping power while remaining fast enough for modern FPS.",

            commonComparisons: [
                "LGG Saturn Pro",
                "Pulsar Hyperion",
                "Type-99",
                "QcK Heavy",
            ],

            strengths: [
                "Excellent balance of speed and control",
                "Works for almost every FPS title",
                "Very consistent glide",
                "Great for tac FPS",
                "Easy recommendation for first Artisan pad",
            ],

            weaknesses: [
                "Collects hair and dust",
                "Not as fast as Hien or Raiden",
                "Not as much stopping power as Type-99",
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

    // Raiden
    {
        id: "artisan-raiden-soft",
        slug: "artisan-raiden-soft",

        brand: "Artisan",
        name: "Raiden Soft",
        series: "Raiden",

        category: "speed",
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
            defaultColorway: "coffee-brown",

            colorways: [
                {
                    name: "Coffee Brown",
                    slug: "coffee-brown",
                    color: "#352524",
                    available: true,
                },
                {
                    name: "Dai-Dai Orange",
                    slug: "dai-dai-orange",
                    color: "#EE9858",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 9.2,
            control: 5.2,
            stoppingPower: 5.4,
            staticFriction: 4.1,
            dynamicFriction: 9.3,
            microAdjustments: 9.4,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8,
            sweatResistance: 8,
            dustHairResistance: 7,
            washable: true,
            notes: "Raiden is Artisan's high-speed cloth surface. It is known for very low initial friction and smooth glide, while Soft adds more stopping power and forgiveness than Mid.",
        },

        communityConsensus: {
            summary:
                "The fastest mainstream Artisan cloth pad. Extremely smooth and low-friction, often described as the closest thing to a hard pad while still being cloth.",

            commonComparisons: ["Hien", "Hayate Otsu", "Glass pads"],

            strengths: [
                "Extremely smooth glide",
                "Fantastic for tracking",
                "Very low friction",
                "Excellent comfort",
            ],

            weaknesses: [
                "Limited stopping power",
                "Can feel uncontrollable for tac FPS",
                "Historically associated with sensor issues on older mice",
            ],
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
            "You mainly play Valorant or CS2 and rely heavily on stopping power",
            "You want a slow control pad",
            "You over-flick often and need the pad to help you stop",
            "You dislike very fast cloth surfaces",
        ],

        price: {
            usd: 64.99,
            inr: 5700,
        },

        availability: {
            global: true,
            india: "limited",
            stores: ["GenesisPC", "MaxGaming", "JPGamingUSA", "import sellers"],
            notes: "Available globally through specialty stores. In India, GenesisPC has listed Raiden variants around ₹5,699, but stock, size, and hardness vary.",
        },

        images: {
            main: "/mousepads/artisan/raiden-black.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be much faster than Zero, Type-99, Saturn Pro, and Hyperion. Soft should be the safest Raiden variant for people who want speed without going fully uncontrolled.",
            pros: [
                "Extremely smooth glide",
                "Very low static friction",
                "Excellent for tracking-heavy games",
                "Great micro-adjustment freedom",
                "Soft base adds some stopping power compared to Mid",
            ],
            cons: [
                "Not ideal if you need strong stopping power",
                "Can feel too fast for tactical FPS players",
                "Expensive",
                "Limited India availability",
                "Less forgiving than balanced-control pads",
            ],
        },

        sources: [
            {
                label: "Artisan NINJA FX Raiden official page",
                type: "official",
                url: "https://artisan-jp.com/global/fx-raiden",
            },
            {
                label: "JPGamingUSA Raiden listing",
                type: "store",
                url: "https://jpgamingusa.com/products/artisan-fx-raiden-mousepad",
            },
            {
                label: "GenesisPC India Raiden listing",
                type: "store",
                url: "https://www.genesispc.in/products/artisan-fx-raiden",
            },
            {
                label: "MaxGaming Raiden listing",
                type: "store",
                url: "https://www.maxgaming.com/en/mousepads/mousepad-fx-raiden-xsoft-xxl-daidai-orange",
            },
            {
                label: "MousepadReview Raiden Soft overview",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1c61fz9/artisan_raiden_soft_a_brief_overview/",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },

    // Hayate Otsu
    {
        id: "artisan-hayate-otsu-soft",
        slug: "artisan-hayate-otsu-soft",

        brand: "Artisan",
        name: "Hayate Otsu V2 Soft",
        series: "Hayate Otsu V2",

        category: "balanced-speed",
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
            defaultColorway: "wine-red",

            colorways: [
                {
                    name: "Black",
                    slug: "black",
                    color: "#1e1e1e",
                    available: true,
                },
                {
                    name: "Wine Red",
                    slug: "wine-red",
                    color: "#B22B32",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 7.8,
            control: 7.3,
            stoppingPower: 7.5,
            staticFriction: 5.9,
            dynamicFriction: 7.9,
            microAdjustments: 9.1,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8,
            sweatResistance: 8,
            dustHairResistance: 7,
            washable: true,
            notes: "Hayate Otsu V2 is positioned as Artisan's balanced speed-and-stopping-power surface. It is generally faster than Zero while still retaining more stopping power than pure speed pads.",
        },

        communityConsensus: {
            summary:
                "Often described as the best all-round Artisan pad. Faster than Zero, smoother than Hien, and still retains enough control for tactical shooters.",

            commonComparisons: ["Hien", "Zero", "Raiden"],

            strengths: [
                "Excellent micro-adjustments",
                "Very versatile",
                "Great balance of speed and stopping power",
                "Works for both tracking and tac FPS",
            ],

            weaknesses: [
                "More expensive than competitors",
                "Not as much control as Zero",
                "Not as much speed as Raiden",
            ],
        },

        texture: {
            feel: "slightly-textured",
            skinComfort: 8,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "apex", "overwatch", "general-fps"],
            aimStyles: [
                "tracking",
                "micro-adjustments",
                "flicking",
                "switching",
            ],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want a slow control pad",
            "You rely heavily on high stopping power for tac FPS",
            "You dislike slightly textured cloth surfaces",
            "You want something as fast as Raiden",
        ],

        price: {
            usd: 64.99,
            inr: 6699,
        },

        availability: {
            global: true,
            india: "limited",
            stores: ["GenesisPC", "JPGamingUSA", "MaxGaming", "import sellers"],
            notes: "GenesisPC has listed Hayate Otsu V2 XL around ₹6,699 in India, but color, hardness, and size availability vary.",
        },

        images: {
            main: "/mousepads/artisan/hayate-otsu-v2-red.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to sit between Zero and Hien: faster than Zero, more controlled than Hien, and more versatile than Raiden.",
            pros: [
                "Excellent speed-control balance",
                "Strong micro-adjustment freedom",
                "More stopping power than Hien or Raiden",
                "Versatile across tac FPS and tracking games",
                "Premium Artisan build quality",
            ],
            cons: [
                "Less stopping power than Zero or Type-99",
                "Can feel too quick for players who want planted control",
                "Expensive",
                "Limited India availability",
            ],
        },

        sources: [
            {
                label: "Artisan Selection Guide",
                type: "official",
                url: "https://artisan-jp.com/global/selection-guide",
            },
            {
                label: "GenesisPC Hayate Otsu V2 listing",
                type: "store",
                url: "https://www.genesispc.in/products/artisan-fx-hayate-otsu-v2-gaming-mousepad",
            },
            {
                label: "JPGamingUSA Hayate Otsu V2 listing",
                type: "store",
                url: "https://jpgamingusa.com/products/artisan-fx-hayate-otsu-v2-mousepad",
            },
            {
                label: "MousepadReview Artisan experience thread",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1evlter/my_experience_with_artisan_mousepads_hayate_otsu/",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },

    // Hien
    {
        id: "artisan-hien-soft",
        slug: "artisan-hien-soft",

        brand: "Artisan",
        name: "Hien Soft",
        series: "Hien",

        category: "balanced-speed",
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
            defaultColorway: "wine-red",

            colorways: [
                {
                    name: "Wine Red",
                    slug: "wine-red",
                    color: "#A72A33",
                    available: true,
                },
                {
                    name: "Black",
                    slug: "black",
                    color: "#1d1d1d",
                    available: true,
                },
                {
                    name: "Navy Blue",
                    slug: "navy-blue",
                    color: "#304E7A",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 8.2,
            control: 6.6,
            stoppingPower: 7.1,
            staticFriction: 5.4,
            dynamicFriction: 8.3,
            microAdjustments: 8.7,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8.5,
            sweatResistance: 8,
            dustHairResistance: 7.5,
            washable: true,
            notes: "Hien is known for a rougher, more textured surface with fast glide and strong surface feedback. It is usually considered very durable and relatively consistent in different conditions.",
        },

        communityConsensus: {
            summary:
                "One of the most iconic speed-oriented cloth pads ever made. Known for its rough texture, fast glide, and excellent tracking performance.",

            commonComparisons: [
                "Hayate Otsu",
                "Raiden",
                "Zero",
                "Razer Strider",
            ],

            strengths: [
                "Excellent tracking performance",
                "Low static friction",
                "Very durable",
                "Fast and responsive",
            ],

            weaknesses: [
                "Rough texture",
                "Can feel too fast for Valorant players",
                "Less stopping power than Zero",
            ],
        },

        texture: {
            feel: "rough",
            skinComfort: 6,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["apex", "overwatch", "fortnite", "general-fps"],
            aimStyles: ["tracking", "switching", "micro-adjustments"],
            sensitivity: ["low", "medium", "high"],
        },

        avoidIf: [
            "You mainly play Valorant or CS2 and want strong stopping power",
            "You dislike rough or abrasive surfaces",
            "You want a smoother pad like Zero, Type-99, or Raiden",
            "You want a slow controlled glide",
        ],

        price: {
            usd: 54.99,
            inr: 5499,
        },

        availability: {
            global: true,
            india: "limited",
            stores: [
                "GenesisPC",
                "JPGamingUSA",
                "Amazon India",
                "import sellers",
            ],
            notes: "GenesisPC has listed Hien variants around ₹5,499 in India. Availability depends on hardness, size, and color.",
        },

        images: {
            main: "/mousepads/artisan/hien-red.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be faster and rougher than Hayate Otsu, with stronger feedback and better tracking freedom than Zero.",
            pros: [
                "Fast glide with strong surface feedback",
                "Great for tracking and target switching",
                "Very durable reputation",
                "Works across many FPS games",
                "Less muddy than slower control pads",
            ],
            cons: [
                "Rough texture is not for everyone",
                "Less stopping power than Zero, Type-99, or Saturn Pro",
                "Can feel too fast for pure tac FPS players",
                "Expensive",
            ],
        },

        sources: [
            {
                label: "Artisan NINJA FX Hien official page",
                type: "official",
                url: "https://artisan-jp.com/global/fx-hien",
            },
            {
                label: "Artisan Selection Guide",
                type: "official",
                url: "https://artisan-jp.com/global/selection-guide",
            },
            {
                label: "GenesisPC Hien listing",
                type: "store",
                url: "https://www.genesispc.in/products/artisan-fx-hien-gaming-mousepad",
            },
            {
                label: "JPGamingUSA Hien listing",
                type: "store",
                url: "https://jpgamingusa.com/products/artisan-fx-hien-mousepad",
            },
            {
                label: "Amazon India Hien listing",
                type: "store",
                url: "https://www.amazon.in/Artisan-Hien-Wine-FX-HI-SF-XL-R-Japan/dp/B07F5TMZZC",
            },
        ],

        createdAt: "2026-06-11",
        updatedAt: "2026-06-11",
    },

    // Type-99
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

        communityConsensus: {
            summary:
                "The modern Artisan control pad. Usually recommended for players who want more stopping power than Zero while maintaining Artisan quality.",

            commonComparisons: ["Saturn Pro", "Zero", "QcK Heavy", "EM-C"],

            strengths: [
                "Very high stopping power",
                "Strong control",
                "Excellent for Valorant and CS2",
                "More planted feeling than Zero",
            ],

            weaknesses: [
                "Too slow for some players",
                "Tracking feels restricted compared to Zero",
                "Less versatile across genres",
            ],
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
            main: "/mousepads/artisan/type99-matcha.png",
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
];
