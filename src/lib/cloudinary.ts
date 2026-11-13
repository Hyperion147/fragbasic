import crypto from "node:crypto";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export function isCloudinaryConfigured() {
  return Boolean(cloudName && apiKey && apiSecret);
}

type UploadParams = {
  buffer: Buffer;
  mimeType: string;
  folder: string;
  publicId: string;
  overwrite?: boolean;
};

export type CloudinaryUploadResult = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
};

/**
 * Cloudinary signs every request with SHA-1 over the alphabetically sorted
 * parameters (excluding file/api_key/signature) plus the API secret.
 */
function signParams(params: Record<string, string>, secret: string) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(`${toSign}${secret}`).digest("hex");
}

/**
 * Uploads a catalog image to Cloudinary. Delivery transforms (format, width,
 * quality) are applied by the Next image loader, so this stores a clean master.
 */
export async function uploadImageToCloudinary({
  buffer,
  mimeType,
  folder,
  publicId,
  overwrite = false,
}: UploadParams): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const params: Record<string, string> = {
    folder,
    public_id: publicId,
    timestamp,
    overwrite: String(overwrite),
  };

  if (overwrite) {
    params.invalidate = "true";
  }

  const signature = signParams(params, apiSecret!);
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(buffer)], { type: mimeType }), publicId);
  form.append("api_key", apiKey!);
  form.append("signature", signature);

  for (const [key, value] of Object.entries(params)) {
    form.append(key, value);
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form },
  );

  const body = (await response.json().catch(() => null)) as {
    secure_url?: string;
    public_id?: string;
    width?: number;
    height?: number;
    format?: string;
    error?: { message?: string };
  } | null;

  if (!response.ok || !body?.secure_url || !body.public_id) {
    throw new Error(
      body?.error?.message ?? `Cloudinary upload failed (${response.status})`,
    );
  }

  return {
    url: body.secure_url,
    publicId: body.public_id,
    width: body.width,
    height: body.height,
    format: body.format,
  };
}
