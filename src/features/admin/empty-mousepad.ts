import { MousepadInput } from "@/schemas/mousepad";

export function createEmptyMousepad(): MousepadInput {
    return {
        id: "",
        slug: "",
        brand: "",
        name: "",
        series: "",
        category: "balanced-control",
        surface: "cloth",
        base: "poron",
        softness: "soft",
        communityConsensus: {
            summary: "",
            commonComparisons: [],
            strengths: [],
            weaknesses: [],
        },
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
            speed: 5,
            control: 5,
            stoppingPower: 5,
            staticFriction: 5,
            dynamicFriction: 5,
            microAdjustments: 5,
            ratingConfidence: "estimated",
        },
        environment: {
            humidityResistance: 5,
            sweatResistance: 5,
            dustHairResistance: 5,
            washable: true,
            notes: "",
        },
        texture: {
            feel: "slightly-textured",
            skinComfort: 5,
            sleeveFriendly: true,
            noiseLevel: "medium",
        },
        recommendedFor: {
            games: ["general-fps"],
            aimStyles: ["hybrid"],
            sensitivity: ["medium"],
        },
        avoidIf: [],
        price: { usd: 0, inr: 0 },
        availability: {
            global: true,
            india: "unknown",
            stores: [],
            notes: "",
        },
        visuals: {
            defaultColorway: "default",
            colorways: [
                {
                    name: "Default",
                    slug: "default",
                    color: "#888888",
                    available: true,
                },
            ],
        },
        images: {
            main: "/mousepads/placeholder.png",
        },
        personal: {
            owned: false,
            tested: false,
            notes: "",
            pros: [],
            cons: [],
        },
        sources: [
            {
                label: "Pending source",
                type: "personal",
            },
        ],
    };
}

export function slugifyPad(brand: string, name: string) {
    return `${brand} ${name}`
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}
