import crypto from "node:crypto";

import sharp from "sharp";

import { isCloudinaryConfigured, uploadImageToCloudinary } from "@/lib/cloudinary";
import { jsonError, jsonOk } from "@/server/api";
import { requireAdmin } from "@/server/auth";

const maxFileSize = 10 * 1024 * 1024;
const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

type CatalogFolder = "mousepads" | "glasspads" | "iems";

/**
 * Normalizes uploads before they hit storage: auto-orient, cap the long edge
 * at 2000px, and convert to WebP. This keeps Cloudinary masters small while
 * still leaving room for retina delivery.
 */
async function optimizeImage(file: File) {
  const input = Buffer.from(await file.arrayBuffer());

  try {
    const buffer = await sharp(input)
      .rotate()
      .resize({
        width: 2000,
        height: 2000,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 84 })
      .toBuffer();

    return { buffer, mimeType: "image/webp", extension: "webp" };
  } catch {
    const extension =
      file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      "bin";

    return { buffer: input, mimeType: file.type, extension };
  }
}

async function uploadToSupabase({
  buffer,
  mimeType,
  extension,
  folder,
  catalogId,
}: {
  buffer: Buffer;
  mimeType: string;
  extension: string;
  folder: CatalogFolder;
  catalogId: string;
}) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "mousepads";

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonError("Image storage is not configured", 503);
  }

  const objectPath = `${folder}/${catalogId}/${crypto.randomUUID()}.${extension}`;
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        "Content-Type": mimeType,
        "x-upsert": "false",
      },
      body: new Uint8Array(buffer),
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Supabase Storage upload failed", response.status, detail);
    return jsonError("Could not upload image to storage", 502);
  }

  return jsonOk({
    path: objectPath,
    url: `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${objectPath}`,
  });
}

/**
 * Builds the POST handler shared by the mousepad, glasspad, and IEM upload
 * endpoints. Cloudinary is used when configured; Supabase Storage remains the
 * fallback so local setups keep working during migration.
 */
export function createCatalogImageUploadHandler({
  folder,
  idField,
}: {
  folder: CatalogFolder;
  idField: string;
}) {
  return async function POST(request: Request) {
    if (!(await requireAdmin())) {
      return jsonError("Unauthorized", 401);
    }

    const formData = await request.formData().catch(() => null);
    const file = formData?.get("file");
    const catalogId = formData?.get(idField);

    if (!(file instanceof File)) {
      return jsonError("An image file is required", 400);
    }

    if (typeof catalogId !== "string" || !catalogId.trim()) {
      return jsonError(`${idField} and an image file are required`, 400);
    }

    if (!allowedTypes.has(file.type)) {
      return jsonError("Only JPEG, PNG, WebP, and AVIF images are supported", 415);
    }

    if (file.size > maxFileSize) {
      return jsonError("Image must be 10 MB or smaller", 413);
    }

    const optimized = await optimizeImage(file);

    if (isCloudinaryConfigured()) {
      try {
        const uploaded = await uploadImageToCloudinary({
          buffer: optimized.buffer,
          mimeType: optimized.mimeType,
          folder: `fragbasic/${folder}/${catalogId.trim()}`,
          publicId: crypto.randomUUID(),
        });

        return jsonOk({ path: uploaded.publicId, url: uploaded.url });
      } catch (error) {
        console.error("Cloudinary upload failed", error);
        return jsonError("Could not upload image to Cloudinary", 502);
      }
    }

    return uploadToSupabase({
      buffer: optimized.buffer,
      mimeType: optimized.mimeType,
      extension: optimized.extension,
      folder,
      catalogId: catalogId.trim(),
    });
  };
}
