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
 * OptimizedImage selects this loader only for Cloudinary upload URLs.
 * Other sources use Next's default optimizer; the fallback below is defensive.
 */
export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  if (!src.startsWith(CLOUDINARY_PREFIX)) {
    return src;
  }

  const transform = `f_auto,q_${quality ?? "auto"},c_limit,w_${width}`;
  return src.replace("/image/upload/", `/image/upload/${transform}/`);
}