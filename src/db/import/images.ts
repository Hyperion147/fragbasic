import { readFile } from "node:fs/promises";
import path from "node:path";

export type ImageUploader = {
  upload: (id: string, source: string) => Promise<string>;
  resolve: (id: string, source: string) => string;
  enabled: boolean;
};

export function createImageUploader(
  folder: string,
  options: { skip?: boolean } = {},
): ImageUploader {
  const cache = new Map<string, string>();
  const skip = options.skip ?? false;

  function config() {
    const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "mousepads";

    return { supabaseUrl, serviceRoleKey, bucket };
  }

  function publicUrlFor(id: string, source: string, bucket: string) {
    const { supabaseUrl } = config();
    const localPath = path.join(process.cwd(), "public", source.slice(1));
    const fileName = path
      .basename(localPath)
      .replace(/[^a-zA-Z0-9._-]/g, "-");
    const objectPath = `${folder}/${id}/${fileName}`;
    return `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${objectPath}`;
  }

  function resolve(id: string, source: string) {
    if (skip || !source.startsWith("/")) {
      return source;
    }

    const { supabaseUrl, serviceRoleKey, bucket } = config();
    if (!supabaseUrl || !serviceRoleKey) {
      return source;
    }

    return publicUrlFor(id, source, bucket);
  }

  async function upload(id: string, source: string) {
    if (skip || !source.startsWith("/")) {
      return source;
    }

    const cacheKey = `${id}:${source}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const { supabaseUrl, serviceRoleKey, bucket } = config();

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for image uploads. Use --skip-images to keep local paths.",
      );
    }

    const localPath = path.join(process.cwd(), "public", source.slice(1));
    const fileName = path
      .basename(localPath)
      .replace(/[^a-zA-Z0-9._-]/g, "-");
    const objectPath = `${folder}/${id}/${fileName}`;
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        "Content-Type": contentTypeFor(localPath),
        "x-upsert": "true",
      },
      body: await readFile(localPath),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `Image upload failed for ${source}: ${response.status}${detail ? ` ${detail}` : ""}`,
      );
    }

    const publicUrl = publicUrlFor(id, source, bucket);
    cache.set(cacheKey, publicUrl);
    return publicUrl;
  }

  const { supabaseUrl, serviceRoleKey } = config();

  return {
    upload,
    resolve,
    enabled: !skip && Boolean(supabaseUrl && serviceRoleKey),
  };
}

function contentTypeFor(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  return (
    ({
      ".avif": "image/avif",
      ".gif": "image/gif",
      ".jpeg": "image/jpeg",
      ".jpg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
    }) as Record<string, string>
  )[extension] ?? "application/octet-stream";
}
