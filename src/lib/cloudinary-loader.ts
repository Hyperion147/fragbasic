type LoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

const CLOUDINARY_PREFIX = "https://res.cloudinary.com/";

/**
 * Custom next/image loader.
 *
 * Cloudinary masters get delivery transforms (auto format/quality, limit
 * width) applied in the URL, so Cloudinary's CDN does the resizing and caches
 * the result.
 *
 * When `images.loader` is `"custom"`, Next.js does not serve `/_next/image`
 * at all, so anything that is not on Cloudinary (local assets, or Supabase
 * images that have not been migrated yet) must be returned unchanged.
 */
export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  if (!src.startsWith(CLOUDINARY_PREFIX)) {
    return src;
  }

  const transform = `f_auto,q_${quality ?? "auto"},c_limit,w_${width}`;
  return src.replace("/image/upload/", `/image/upload/${transform}/`);
}