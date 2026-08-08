import { config } from "dotenv";
import { mousepads as catalog } from "@/data/mousepads/mousepads";
import { db } from "./index";
import { mousepads } from "./schema";
import { mousepadSchema } from "@/schemas/mousepad";

config({ path: ".env" });

async function main() {
    let inserted = 0;
    let skipped = 0;

    await db.delete(mousepads);

    for (const pad of catalog) {
        const parsed = mousepadSchema.safeParse(pad);
        if (!parsed.success) {
            console.error("Skip invalid: ", pad.slug, parsed.error);
            skipped += 1;
            continue;
        }

        const data = parsed.data;

        await db.insert(mousepads).values({
            id: data.id,
            slug: data.slug,
            brand: data.brand,
            name: data.name,
            status: "published",
            data,
        });

        inserted += 1;
    }

    console.log(`Seed Complete inserted=${inserted} skipped=${skipped}`);
    process.exit(skipped > 0 ? 1 : 0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
