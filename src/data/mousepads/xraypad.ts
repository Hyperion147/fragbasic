import type { Mousepad } from "@/types/mousepad";

export const xraypadMousepads: Mousepad[] = [
    // Aqua Control Plus
    {
        id: "xraypad-aqua-control-plus",
        slug: "xraypad-aqua-control-plus",

        brand: "Xraypad",
        name: "Aqua Control Plus",
        series: "Aqua Control",

        category: "balanced-speed",
        surface: "hybrid",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "XL",
                width: 450,
                height: 400,
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
                width: 900,
                height: 400,
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
                    name: "White",
                    slug: "white",
                    color: "#d8d8d8",
                    available: true,
                },
                {
                    name: "Wave",
                    slug: "wave",
                    color: "#3f6f8f",
                    available: true,
                },
                {
                    name: "Sakura",
                    slug: "sakura",
                    color: "#e8a7b8",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 7.0,
            control: 7.4,
            stoppingPower: 7.2,
            staticFriction: 6.2,
            dynamicFriction: 7.0,
            microAdjustments: 8.2,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8.5,
            sweatResistance: 8.5,
            dustHairResistance: 7,
            washable: true,
            notes: "One of the strongest points of the Aqua Control series is consistency in humid environments compared with traditional cloth control pads.",
        },

        texture: {
            feel: "textured",
            skinComfort: 7,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "apex", "overwatch", "general-fps"],
            aimStyles: ["micro-adjustments", "tracking", "switching"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You want a very slow control pad",
            "You dislike textured surfaces",
            "You want maximum stopping power",
            "You prefer smooth cloth pads",
        ],

        price: {
            usd: 32.99,
            inr: 3200,
        },

        availability: {
            global: true,
            india: "available",
            stores: ["GenesisPC", "Neo Macro", "NMPC", "Xraypad"],
            notes: "One of the easiest Xraypad models to obtain globally and in India.",
        },

        images: {
            main: "/mousepads/xraypad/aqua-control-plus.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Community generally treats AC+ as the benchmark Xraypad and the easiest recommendation in their lineup.",
            pros: [
                "Excellent balance of speed and control",
                "Very humidity resistant",
                "Strong value for money",
                "Good micro-adjustments",
                "Large size selection",
            ],
            cons: [
                "Texture can feel abrasive",
                "Not as controlled as Zero",
                "Not as fast as AC2",
                "Rubber base is less premium than Poron",
            ],
        },

        communityConsensus: {
            summary:
                "The mousepad that made Xraypad popular. Most players view it as a balanced-speed pad with strong consistency, good value, and enough control for tactical shooters while remaining excellent for tracking-heavy games.",

            commonComparisons: [
                "Artisan Hayate Otsu",
                "Artisan Hien",
                "LGG Venus Pro",
                "Aqua Control II",
                "Aqua Control Zero",
            ],

            strengths: [
                "Balanced speed and control",
                "Excellent value",
                "Humidity resistance",
                "Versatile for many FPS genres",
                "Good micro-adjustments",
            ],

            weaknesses: [
                "Textured surface is not for everyone",
                "Less stopping power than control pads",
                "Rubber base instead of Poron",
                "Can feel rough on bare skin",
            ],
        },

        sources: [
            {
                label: "Xraypad Aqua Control Plus V2 official page",
                type: "official",
                url: "https://shop.x-raypad.com/product-category/products/x-ray-gaming-mouse-pads/acv2/",
            },
            {
                label: "Xraypad official Aqua Control comparison",
                type: "official",
                url: "https://www.youtube.com/watch?v=WplAaUpozOA",
            },
            {
                label: "MousepadReview Aqua Control discussion",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1d4xj0l/difference_between_the_aqua_control_series/",
            },
        ],
    },

    // Aqua Control Zero
    {
        id: "xraypad-aqua-control-zero",
        slug: "xraypad-aqua-control-zero",

        brand: "Xraypad",
        name: "Aqua Control Zero",
        series: "Aqua Control",

        category: "balanced-control",
        surface: "hybrid",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "XL",
                width: 450,
                height: 400,
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
                    color: "#171717",
                    available: true,
                },
                {
                    name: "White",
                    slug: "white",
                    color: "#e4e4e4",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 6.1,
            control: 8.5,
            stoppingPower: 8.4,
            staticFriction: 7,
            dynamicFriction: 6.1,
            microAdjustments: 8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8.8,
            sweatResistance: 8.5,
            dustHairResistance: 7,
            washable: true,
            notes: "Control-focused Aqua Control variant, commonly recommended for humid conditions and sweaty hands while staying less muddy than older cloth control pads.",
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
            "You want a fast glide",
            "You dislike textured hybrid surfaces",
            "You prefer very smooth cloth pads",
            "You mainly play tracking-heavy games",
        ],

        price: {
            usd: 32.99,
            inr: 2400,
        },

        availability: {
            global: true,
            india: "available",
            stores: ["GenesisPC", "NMPC", "Neo Macro", "Xraypad"],
            notes: "Usually one of the easier Xraypad control options to find in India.",
        },

        images: {
            main: "/mousepads/xraypad/aqua-control-zero.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be the safest Xraypad recommendation for Valorant/CS2 players who want control without going full mudpad.",
            pros: [
                "Strong control",
                "Good stopping power",
                "Humidity resistant",
                "Good India availability",
                "Better value than premium import pads",
            ],
            cons: [
                "Textured surface may not suit everyone",
                "Less premium base than Poron pads",
                "Not as fast as AC+ or AC2",
                "Less plush than Artisan/LGG Pro pads",
            ],
        },

        communityConsensus: {
            summary:
                "The control-focused Aqua Control pad. Community impressions usually place it below AC+ and AC2 in speed, making it a strong budget-friendly option for Valorant and CS2 players who still want humidity resistance.",

            commonComparisons: [
                "Aqua Control Plus",
                "Aqua Control II",
                "Artisan Zero",
                "LGG Saturn Pro",
                "Zowie G-SR-SE Gris",
            ],

            strengths: [
                "Good control",
                "Strong stopping power",
                "Humidity resistance",
                "Good value",
                "Useful for tactical FPS",
            ],

            weaknesses: [
                "Less smooth than some cloth pads",
                "Less speed than other Aqua Control models",
                "Rubber base feels less premium than Poron",
                "Texture is not for everyone",
            ],
        },

        sources: [
            {
                label: "GenesisPC Aqua Control Zero listing",
                type: "store",
                url: "https://www.genesispc.in/collections/xraypad",
            },
            {
                label: "Xraypad official store",
                type: "official",
                url: "https://shop.x-raypad.com/",
            },
            {
                label: "MousepadReview Aqua Control discussion",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1d4xj0l/difference_between_the_aqua_control_series/",
            },
        ],
    },

    // Aqua Control II
    {
        id: "xraypad-aqua-control-ii",
        slug: "xraypad-aqua-control-ii",

        brand: "Xraypad",
        name: "Aqua Control II",
        series: "Aqua Control",

        category: "balanced-speed",
        surface: "hybrid",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "XL",
                width: 450,
                height: 400,
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
                width: 900,
                height: 400,
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
                    color: "#181818",
                    available: true,
                },
                {
                    name: "White",
                    slug: "white",
                    color: "#e5e5e5",
                    available: true,
                },
                {
                    name: "Sakura Pink",
                    slug: "sakura-pink",
                    color: "#e9a4b7",
                    available: true,
                },
                {
                    name: "Sakura Blue",
                    slug: "sakura-blue",
                    color: "#6e92bd",
                    available: true,
                },
                {
                    name: "Sakura Night",
                    slug: "sakura-night",
                    color: "#26334d",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 7.5,
            control: 6.8,
            stoppingPower: 6.7,
            staticFriction: 5.8,
            dynamicFriction: 7.6,
            microAdjustments: 8.4,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8.5,
            sweatResistance: 8.5,
            dustHairResistance: 7,
            washable: true,
            notes: "Balanced-fast Aqua Control option with consistent X/Y glide. Community reviews commonly test it under high humidity and still describe it as stable.",
        },

        texture: {
            feel: "textured",
            skinComfort: 6.8,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["apex", "overwatch", "fortnite", "general-fps", "valorant"],
            aimStyles: ["tracking", "switching", "micro-adjustments"],
            sensitivity: ["low", "medium", "high"],
        },

        avoidIf: [
            "You want strong stopping power",
            "You dislike rough or textured surfaces",
            "You mainly play tac FPS and prefer slow control",
            "You want a very smooth cloth feel",
        ],

        price: {
            usd: 32.99,
            inr: 2000,
        },

        availability: {
            global: true,
            india: "available",
            stores: ["GenesisPC", "NMPC", "Amazon India", "Xraypad"],
            notes: "Commonly stocked in India, including 450x400, 500x500, and XXL variants depending on retailer.",
        },

        images: {
            main: "/mousepads/xraypad/aqua-control-2.webp",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be faster and rougher than AC Zero/AC+, making it a stronger option for tracking and mixed FPS.",
            pros: [
                "Fast balanced glide",
                "Strong tracking freedom",
                "Good humidity resistance",
                "Good India availability",
                "Multiple colorways",
            ],
            cons: [
                "Texture can feel rough",
                "Less stopping power than AC Zero",
                "Rubber base is less premium than Poron",
                "May be too fast for tac FPS control users",
            ],
        },

        communityConsensus: {
            summary:
                "A faster Aqua Control option with more glide freedom than AC+ and AC Zero. Community impressions usually recommend it for players who want a textured, humidity-resistant pad for tracking-heavy or mixed FPS games.",

            commonComparisons: [
                "Aqua Control Plus",
                "Aqua Control Zero",
                "Artisan Hien",
                "LGG Venus Pro",
                "Razer Strider",
            ],

            strengths: [
                "Fast balanced glide",
                "Good tracking performance",
                "Humidity resistance",
                "Consistent X/Y glide",
                "Good value",
            ],

            weaknesses: [
                "Rough texture",
                "Less stopping power than control pads",
                "Not ideal for pure tactical FPS control",
                "Rubber base is less premium",
            ],
        },

        sources: [
            {
                label: "GenesisPC Aqua Control II listing",
                type: "store",
                url: "https://www.genesispc.in/products/x-raypad-aqua-control-ii-xl",
            },
            {
                label: "Amazon India Aqua Control II listing",
                type: "store",
                url: "https://www.amazon.in/X-Raypad-Aqua-Control-Ultra-High-Requirements/dp/B09TSGCTML",
            },
            {
                label: "MousepadReview Aqua Control II Sakura Black review",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1blb3b5/xraypad_aqua_control_ii_sakura_black_review/",
            },
        ],
    },

    // Aqua Control II SR / Revati
    {
        id: "xraypad-aqua-control-ii-sr-revati",
        slug: "xraypad-aqua-control-ii-sr-revati",

        brand: "Xraypad",
        name: "Aqua Control II SR / Revati",
        series: "Aqua Control II SR",

        category: "control",
        surface: "cloth",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "XL",
                width: 450,
                height: 400,
                thickness: 4,
                unit: "mm",
            },
        ],

        visuals: {
            defaultColorway: "revati",
            colorways: [
                {
                    name: "Revati",
                    slug: "revati",
                    color: "#73808d",
                    image: "/mousepads/xraypad/aqua-control-ii-sr-revati.jpg",
                    available: false,
                },
            ],
        },

        feel: {
            speed: 4.1,
            control: 9.0,
            stoppingPower: 9.6,
            staticFriction: 8.4,
            dynamicFriction: 6.7,
            microAdjustments: 7.8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8.5,
            sweatResistance: 8.5,
            dustHairResistance: 5.5,
            washable: true,
            notes:
                "Official copy positions the SR / Revati as an Aqua Control 2 surface suitable for sweaty hands. The submitted review says the rough texture attracts dust and is harder to clean than smoother cloth pads.",
        },

        texture: {
            feel: "rough",
            skinComfort: 4.2,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },

        recommendedFor: {
            games: ["valorant", "cs2", "general-fps"],
            aimStyles: ["precision", "micro-adjustments", "flicking"],
            sensitivity: ["low", "medium"],
        },

        avoidIf: [
            "You are coming from glass and dislike rough cloth texture",
            "You want a fast Aqua Control II-style glide",
            "You want an easy-to-clean smooth surface",
            "You play mostly tracking-heavy games",
        ],

        price: {
            usd: 29.99,
            inr: 2799,
        },

        availability: {
            global: true,
            india: "limited",
            stores: ["Xraypad", "NMPC India"],
            notes:
                "NMPC India lists the XL 450x400x4mm Revati variant at Rs. 2,799, but it was sold out during the June 2026 research pass. X-Raypad lists it globally with flat packaging.",
        },

        images: {
            main: "/mousepads/xraypad/aqua-control-ii-sr-revati.jpg",
        },

        personal: {
            owned: false,
            tested: false,
            notes:
                "Added from cync3_'s submitted review and cross-checked against X-Raypad/NMPC specs. The reviewer scored it as much slower and more locked-in than the generic Aqua Control II profile, with instant stopping power, rough texture, dust attraction, and flat-box shipping.",
            pros: [
                "Excellent stopping power",
                "Strong tactical FPS control",
                "Flat packaged instead of rolled",
                "Good sweat suitability",
                "Clear stitched edge construction",
            ],
            cons: [
                "Rough surface can feel abrasive, especially after glasspads",
                "Attracts dust",
                "Texture makes cleaning harder",
                "Less glide freedom than standard Aqua Control II",
                "Limited/sold-out India availability",
            ],
        },

        communityConsensus: {
            summary:
                "Aqua Control II SR / Revati is a collaboration variant using the Aqua Control 2 FPS surface, but the submitted user review places this copy much closer to a slow control pad than the standard AC II entry. It should make the most sense for Valorant and CS2 players who want immediate stopping and can tolerate a rougher surface.",

            commonComparisons: [
                "Aqua Control II",
                "Aqua Control Zero",
                "Equate Plus V2",
                "LGG Saturn Pro",
                "Zowie G-SR III",
            ],

            strengths: [
                "Very high stopping power",
                "Strong locked-in control",
                "Tactical FPS fit",
                "Flat packaging",
                "Sweat-friendly Aqua Control surface",
            ],

            weaknesses: [
                "Rough hand feel",
                "Dust attraction",
                "Harder cleaning than smoother pads",
                "Less suitable for players wanting fast glide",
            ],
        },

        sources: [
            {
                label: "cync3_ community review submitted June 2026",
                type: "personal",
            },
            {
                label: "X-Raypad Aqua Control II SR / REVATI official page",
                type: "official",
                url: "https://shop.x-raypad.com/shop/x-raypad-aqua-control-ii-sr-revati-gaming-mouse-pads/",
            },
            {
                label: "NMPC India Revati product page",
                type: "store",
                url: "https://www.nmpc.in/products/x-raypad-aqua-control-ii-sr-revati",
            },
            {
                label: "MaxGaming generic Aqua Control II listing",
                type: "store",
                url: "https://us.maxgaming.com/us/mousepads/aqua-control-ii-mousepad-white-xl",
            },
        ],
    },

    // Equate Plus V2
    {
        id: "xraypad-equate-plus-v2",
        slug: "xraypad-equate-plus-v2",

        brand: "Xraypad",
        name: "Equate Plus V2",
        series: "Equate Plus",

        category: "balanced-control",
        surface: "hybrid",
        base: "rubber",
        softness: "soft",

        sizes: [
            {
                label: "L",
                width: 360,
                height: 300,
                thickness: 4,
                unit: "mm",
            },
            {
                label: "XL",
                width: 450,
                height: 400,
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
                width: 900,
                height: 400,
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
                    color: "#171717",
                    available: true,
                },
                {
                    name: "Red",
                    slug: "red",
                    color: "#9a2634",
                    available: true,
                },
                {
                    name: "Blue",
                    slug: "blue",
                    color: "#315f9f",
                    available: true,
                },
                {
                    name: "Pink",
                    slug: "pink",
                    color: "#dc9bb5",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 5.8,
            control: 8.7,
            stoppingPower: 8.6,
            staticFriction: 7.2,
            dynamicFriction: 5.9,
            microAdjustments: 7.8,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 8.8,
            sweatResistance: 8.8,
            dustHairResistance: 7,
            washable: true,
            notes: "Silver-wire hybrid control surface with strong humidity and sweat suitability. Community reviews have tested it in very high humidity and still position it as stable.",
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
            "You want a fast tracking pad",
            "You prefer rougher textured hybrid pads",
            "You want a pure mudpad",
            "You need maximum glide freedom",
        ],

        price: {
            usd: 34.99,
            inr: 2900,
        },

        availability: {
            global: true,
            india: "available",
            stores: ["GenesisPC", "NMPC", "Amazon India", "Xraypad"],
            notes: "Available through Indian enthusiast stores, though colors and sizes may rotate in and out of stock.",
        },

        images: {
            main: "/mousepads/xraypad/eq-plus-v2.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to sit as Xraypad's smoother controlled option, slower than AC+ and AC2 but less muddy than classic slow pads.",
            pros: [
                "Strong control",
                "Good stopping power",
                "Humidity resistant",
                "Comfortable surface",
                "Good value",
            ],
            cons: [
                "Not very fast",
                "Less tracking freedom than AC2",
                "Rubber base is less premium than Poron",
                "Less known than Aqua Control lineup",
            ],
        },

        communityConsensus: {
            summary:
                "A smooth balanced-control pad that many users place between traditional control pads and faster hybrid pads. It is usually recommended for players who want control and humidity resistance without the roughness of Aqua Control II.",

            commonComparisons: [
                "Aqua Control Zero",
                "LGG Saturn Pro",
                "Artisan Zero",
                "Zowie G-SR-SE",
                "QcK Heavy",
            ],

            strengths: [
                "Good stopping power",
                "Smooth controlled glide",
                "Humidity resistance",
                "Comfortable surface",
                "Good value",
            ],

            weaknesses: [
                "Less speed than AC+ or AC2",
                "Less mainstream than Aqua Control pads",
                "Rubber base is less premium",
                "Not ideal for tracking-heavy games",
            ],
        },

        sources: [
            {
                label: "GenesisPC Equate Plus V2 listing",
                type: "store",
                url: "https://www.genesispc.in/products/xraypad-equate-plus-v2",
            },
            {
                label: "NMPC Equate Plus V2 listing",
                type: "store",
                url: "https://www.nmpc.in/products/x-raypad-equate-plus-v2-kiwami-gaming-mouse-pad-eq-v2-kiwami",
            },
            {
                label: "MousepadReview Equate Plus V2 review",
                type: "reddit",
                url: "https://www.reddit.com/r/MousepadReview/comments/1alvn4g/xraypad_equate_plus_v2_review/",
            },
        ],
    },

    // Aqua Control Pro
    {
        id: "xraypad-aqua-control-pro-mid",
        slug: "xraypad-aqua-control-pro-mid",

        brand: "Xraypad",
        name: "Aqua Control Pro Mid",
        series: "Aqua Control Pro",

        category: "speed",
        surface: "hybrid",
        base: "polyurethane",
        softness: "mid",

        sizes: [
            {
                label: "XL",
                width: 450,
                height: 400,
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
            defaultColorway: "neon",
            colorways: [
                {
                    name: "Neon",
                    slug: "neon",
                    color: "#64ff6a",
                    available: true,
                },
                {
                    name: "Black",
                    slug: "black",
                    color: "#151515",
                    available: true,
                },
                {
                    name: "Rainbow",
                    slug: "rainbow",
                    color: "#7b68ee",
                    available: true,
                },
            ],
        },

        feel: {
            speed: 8.1,
            control: 6.4,
            stoppingPower: 6.2,
            staticFriction: 5.1,
            dynamicFriction: 4.3,
            microAdjustments: 8.9,
            ratingConfidence: "community",
        },

        environment: {
            humidityResistance: 9,
            sweatResistance: 9,
            dustHairResistance: 7.5,
            washable: true,
            notes: "Premium Aqua Control model with moisture resistance and a polyurethane honeycomb-style base. Neon/Rainbow variants are generally positioned faster than Black due to heat treatment.",
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
            "You rely heavily on stopping power",
            "You prefer soft rubber or Poron bases",
        ],

        price: {
            usd: 49.99,
            inr: 3599,
        },

        availability: {
            global: true,
            india: "available",
            stores: ["GenesisPC", "NMPC", "JPGamingUSA", "Xraypad"],
            notes: "Available globally and through Indian enthusiast retailers, but colors/hardness options can vary.",
        },

        images: {
            main: "/mousepads/xraypad/aqua-control-pro.png",
        },

        personal: {
            owned: false,
            tested: false,
            notes: "Needs personal testing. Expected to be the premium faster Aqua Control option, sitting closer to Hien/Venus/Neptune territory than AC Zero.",
            pros: [
                "Fast hybrid glide",
                "Strong micro-adjustment freedom",
                "Very humidity resistant",
                "Premium base compared with standard Aqua Control pads",
                "Good tracking performance",
            ],
            cons: [
                "Less stopping power than AC Zero or Equate Plus V2",
                "Texture may feel abrasive",
                "Mid base may feel less forgiving",
                "Color variants may have different speed",
            ],
        },

        communityConsensus: {
            summary:
                "Xraypad's premium speed-leaning Aqua Control model. Community impressions usually place it above AC2 in build and speed consistency, with Neon/Rainbow being faster than Black.",

            commonComparisons: [
                "Aqua Control II",
                "Artisan Hien",
                "LGG Venus Pro",
                "LGG Neptune Pro",
                "Artisan Hayate Otsu",
            ],

            strengths: [
                "Fast glide",
                "Good humidity resistance",
                "Premium construction",
                "Strong micro-adjustments",
                "Good for tracking",
            ],

            weaknesses: [
                "Less stopping power than control pads",
                "Texture is not for everyone",
                "Variant speed differences can be confusing",
                "More expensive than standard Xraypad models",
            ],
        },

        sources: [
            {
                label: "GenesisPC Aqua Control Pro Neon listing",
                type: "store",
                url: "https://www.genesispc.in/products/x-raypad-aqua-control-pro-xl-neon-500-500-4",
            },
            {
                label: "Amazon Aqua Control Pro listing",
                type: "store",
                url: "https://www.amazon.com/X-raypad-Aqua-Control-Gaming-Mouse/dp/B0DCVVLFBF",
            },
            {
                label: "JPGamingUSA Aqua Control Pro listing",
                type: "store",
                url: "https://jpgamingusa.com/products/x-raypad-aqua-control-pro-mousepad-flat-packaging",
            },
            {
                label: "Xraypad official store",
                type: "official",
                url: "https://shop.x-raypad.com/",
            },
        ],
    },
];
