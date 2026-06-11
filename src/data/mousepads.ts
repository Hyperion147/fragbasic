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
            main: "/mousepads/artisan/zero-dai-dai-orange.png",
            gallery: [
                "/mousepads/artisan/zero-black-close.png",
                "/mousepads/artisan/zero-black-fold.png",
                "/mousepads/artisan/zero-black.png",
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
                    color: "#271300",
                    available: true,
                },
                {
                    name: "Dai-Dai Orange",
                    slug: "dai-dai-orange",
                    color: "#F7931E",
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
            gallery: [
                "/mousepads/artisan/raiden-orange.png",
                "/mousepads/artisan/raiden-black-fold.png",
                "/mousepads/artisan/raiden-orange-fold.png",
            ],
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
            defaultColorway: "black",

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
                    color: "#7B2431",
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
            gallery: [
                "/mousepads/artisan/hayate-otsu-v2-black.png",
                "/mousepads/artisan/hayate-otsu-v2-red-fold.png",
                "/mousepads/artisan/hayate-otsu-v2-black-fold.png",
            ],
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
                    color: "#7C2230",
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
            gallery: [
                "/mousepads/artisan/hien-blue.png",
                "/mousepads/artisan/hien-red-fold.png",
                "/mousepads/artisan/hien-blue-fold.png",
            ],
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
            gallery: [
                "/mousepads/artisan/type99-black.png",
                "/mousepads/artisan/type99-black-close.jpg",
                "/mousepads/artisan/type99-matcha-close.webp",
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
