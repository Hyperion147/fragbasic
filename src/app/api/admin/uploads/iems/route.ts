import { requireAdmin } from "@/server/auth";
import { jsonError, jsonOk } from "@/server/api";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "mousepads";
  if (!url || !key) return jsonError("Supabase Storage is not configured", 503);
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const iemId = form?.get("iemId");
  if (!(file instanceof File) || typeof iemId !== "string" || !iemId.trim()) return jsonError("iemId and an image file are required", 400);
  if (!allowedTypes.has(file.type)) return jsonError("Only JPEG, PNG, WebP, and AVIF images are supported", 415);
  if (file.size > 10 * 1024 * 1024) return jsonError("Image must be 10 MB or smaller", 413);
  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const objectPath = `iems/${iemId.trim()}/${crypto.randomUUID()}.${extension}`;
  const response = await fetch(`${url}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": file.type, "x-upsert": "false" },
    body: await file.arrayBuffer(),
  });
  if (!response.ok) return jsonError("Could not upload image to Supabase Storage", 502);
  return jsonOk({ path: objectPath, url: `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${objectPath}` });
}