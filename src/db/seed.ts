import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { mousepads as catalog } from "@/data/mousepads/mousepads";
import { db } from "./index";
import { mousepads } from "./schema";
import { mousepadSchema, type MousepadInput } from "@/schemas/mousepad";

config({ path: ".env" });

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const storageBucket = process.env.SUPABASE_STORAGE_BUCKET ?? "mousepads";
const uploadedAssets = new Map<string, string>();

function contentTypeFor(filePath: string) {
    const extension = path.extname(filePath).toLowerCase();
    return (
        {
            ".avif": "image/avif",
            ".gif": "image/gif",
            ".jpeg": "image/jpeg",
            ".jpg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
        } as Record<string, string>
    )[extension] ?? "application/octet-stream";
}

function storagePathFor(id: string, source: string) {
    const sourcePath = new URL(source, "http://seed.local").pathname;
    const fileName = path.basename(sourcePath).replace(/[^a-zA-Z0-9._-]/g, "-");
    return `mousepads/${id}/${fileName}`;
}

async function uploadAsset(id: string, source: string) {
    if (!source.startsWith("/")) return source;

    const cached = uploadedAssets.get(source);
    if (cached) return cached;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to seed images");
    }

    const localPath = path.join(process.cwd(), "public", source.slice(1));
    const file = await readFile(localPath);
    const objectPath = storagePathFor(id, source);
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${encodeURIComponent(storageBucket)}/${objectPath}`;
    const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${serviceRoleKey}`,
            apikey: serviceRoleKey,
            "Content-Type": contentTypeFor(localPath),
            "x-upsert": "true",
        },
        body: file,
    });

    if (!response.ok) {
        const detail = await response.text().catch(() => "");
        throw new Error(`Image upload failed for ${source}: ${response.status} ${detail}`);
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(storageBucket)}/${objectPath}`;
    uploadedAssets.set(source, publicUrl);
    return publicUrl;
}

async function uploadMousepadImages(data: MousepadInput) {
    const images = {
        ...data.images,
        main: await uploadAsset(data.id, data.images.main),
    };
    const colorways = await Promise.all(
        data.visuals.colorways.map(async (colorway) => ({
            ...colorway,
            ...(colorway.image
                ? { image: await uploadAsset(data.id, colorway.image) }
                : {}),
        })),
    );

    return {
        ...data,
        images,
        visuals: { ...data.visuals, colorways },
    };
}

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

        const data = await uploadMousepadImages(parsed.data);

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
