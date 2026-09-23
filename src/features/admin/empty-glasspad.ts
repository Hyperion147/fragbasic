import { createEmptyMousepad } from "./empty-mousepad";

export function createEmptyGlasspad() {
    const mousepad = createEmptyMousepad();
    return {
        ...mousepad,
        category: "glass" as const,
        surface: "glass" as const,
        base: "rubber" as const,
        softness: "hard" as const,
        glassSurfaceFinish: "unknown" as const,
        images: { main: "/mousepads/glasspads/placeholder.png" },
    };
}