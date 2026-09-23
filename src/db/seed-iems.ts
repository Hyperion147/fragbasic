import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { iems as catalog } from "@/data/iems/iems";
import { iemSchema } from "@/schemas/iem";
import { db } from "./index";
import { iems } from "./schema";

config({ path: ".env" });

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "mousepads";

function contentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return ({ ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" } as Record<string, string>)[extension] ?? "application/octet-stream";
}

async function uploadImage(id: string, source: string) {
  if (!source.startsWith("/")) return source;
  if (!supabaseUrl || !serviceRoleKey) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  const localPath = path.join(process.cwd(), "public", source.slice(1));
  const fileName = path.basename(localPath).replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectPath = `iems/${id}/${fileName}`;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${serviceRoleKey}`, apikey: serviceRoleKey, "Content-Type": contentType(localPath), "x-upsert": "true" },
    body: await readFile(localPath),
  });
  if (!response.ok) throw new Error(`IEM image upload failed for ${source}: ${response.status}`);
  return `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${objectPath}`;
}

async function main() {
  let inserted = 0;
  let skipped = 0;
  await db.delete(iems);
  for (const item of catalog) {
    const parsed = iemSchema.safeParse(item);
    if (!parsed.success) { console.error("Skip invalid:", item.slug, parsed.error); skipped += 1; continue; }
    const data = { ...parsed.data, images: { ...parsed.data.images, main: await uploadImage(parsed.data.id, parsed.data.images.main) } };
    await db.insert(iems).values({ id: data.id, slug: data.slug, brand: data.brand, name: data.name, status: "published", data });
    inserted += 1;
  }
  console.log(`IEM seed complete inserted=${inserted} skipped=${skipped}`);
  process.exit(skipped > 0 ? 1 : 0);
}

main().catch((error) => { console.error(error); process.exit(1); });