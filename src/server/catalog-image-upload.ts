import crypto from "node:crypto";
import { storageIdSchema } from "@/lib/validation/catalog";

import sharp from "sharp";

import { isCloudinaryConfigured, uploadImageToCloudinary } from "@/lib/cloudinary";
import { jsonError, jsonOk } from "@/server/api";
import { requireAdmin } from "@/server/auth";

const maxFileSize = 4 * 1024 * 1024;
const maxMultipartSize = maxFileSize + 64 * 1024;
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
export async function optimizeImage(file: File) {
  const input = Buffer.from(await file.arrayBuffer());
  const image = sharp(input, { limitInputPixels: 40_000_000, failOn: "error" });
  const metadata = await image.metadata();
  if (!metadata.format || !["jpeg", "png", "webp", "heif"].includes(metadata.format)) {
    throw new Error("Unsupported image contents");
  }
  const buffer = await image.rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84 }).toBuffer();
  return { buffer, mimeType: "image/webp", extension: "webp" };
}

/** Bound the body while streaming, before formData allocates/parses it. */
export async function readUploadForm(request: Request) {
  const length = Number(request.headers.get("content-length"));
  if (length > maxMultipartSize) throw new RangeError("Upload too large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing upload body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxMultipartSize) {
        await reader.cancel();
        throw new RangeError("Upload too large");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return new Request(request.url, { method: "POST", headers: request.headers, body: body.buffer }).formData();
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

    let formData: FormData;
    try { formData = await readUploadForm(request); }
    catch (error) { return jsonError(error instanceof RangeError ? "Image must be 4 MB or smaller" : "Invalid multipart upload", error instanceof RangeError ? 413 : 400); }
    const file = formData?.get("file");
    const catalogId = formData?.get(idField);

    if (!(file instanceof File)) {
      return jsonError("An image file is required", 400);
    }

    if (!storageIdSchema.safeParse(catalogId).success) {
      return jsonError(`${idField} must contain only letters, numbers, hyphens or underscores`, 400);
    }

    if (!allowedTypes.has(file.type)) {
      return jsonError("Only JPEG, PNG, WebP, and AVIF images are supported", 415);
    }

    if (file.size > maxFileSize) {
      return jsonError("Image must be 4 MB or smaller", 413);
    }

    let optimized: Awaited<ReturnType<typeof optimizeImage>>;
    try { optimized = await optimizeImage(file); }
    catch { return jsonError("File contents must be a valid JPEG, PNG, WebP or AVIF image", 415); }
    const safeId = storageIdSchema.parse(catalogId);

    if (isCloudinaryConfigured()) {
      try {
        const uploaded = await uploadImageToCloudinary({
          buffer: optimized.buffer,
          mimeType: optimized.mimeType,
          folder: `fragbasic/${folder}/${safeId}`,
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
      catalogId: safeId,
    });
  };
}
