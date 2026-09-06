import { requireAdmin } from "@/server/auth";
import { jsonError, jsonOk } from "@/server/api";

const maxFileSize = 10 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function safeFileName(name: string) {
  const extension = name.split(".").pop()?.toLowerCase() ?? "bin";
  return extension.replace(/[^a-z0-9]/g, "") || "bin";
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return jsonError("Unauthorized", 401);

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "mousepads";

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonError("Supabase Storage is not configured", 503);
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const mousepadId = formData?.get("mousepadId");

  if (!(file instanceof File)) return jsonError("An image file is required", 400);
  if (typeof mousepadId !== "string" || !mousepadId.trim()) {
    return jsonError("mousepadId is required", 400);
  }
  if (!allowedTypes.has(file.type)) {
    return jsonError("Only JPEG, PNG, WebP, and AVIF images are supported", 415);
  }
  if (file.size > maxFileSize) return jsonError("Image must be 10 MB or smaller", 413);

  const objectPath = `mousepads/${mousepadId.trim()}/${crypto.randomUUID()}.${safeFileName(file.name)}`;
  const uploadUrl = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`;
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: await file.arrayBuffer(),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Supabase Storage upload failed", response.status, detail);
    return jsonError("Could not upload image to Supabase Storage", 502);
  }

  const publicUrl = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${encodeURIComponent(bucket)}/${objectPath}`;
  return jsonOk({ path: objectPath, url: publicUrl });
}