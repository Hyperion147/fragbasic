import type { NextConfig } from "next";

/**
 * Supabase Storage host derived from the project URL, so staging and
 * production projects work without hardcoding.
 */
function getSupabaseImageHostname(): string | null {
  const rawUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!rawUrl) return null;

  try {
    return new URL(rawUrl).hostname;
  } catch {
    return null;
  }
}

const supabaseImageHostname = getSupabaseImageHostname();

const nextConfig: NextConfig = {
  experimental: {
    // Prerendering opens a database query per page. The catalog runs on a
    // pooled remote Postgres connection, so cap build concurrency to avoid
    // exhausting the pool and timing out page generation.
    staticGenerationMaxConcurrency: 4,
  },
  images: {
    // Cloudinary images select their CDN loader per image. Local and Supabase
    // sources retain Next's responsive image optimization.
    qualities: [35, 75],
    // Supabase answers with `Cache-Control: private, no-cache`, so without a
    // long Next-side TTL every revalidation downloads and re-encodes again.
    // Cloudinary URLs are listed too, in case the custom loader is not active
    // in some environment, so they are still accepted by the optimizer.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      ...(supabaseImageHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseImageHostname,
              port: "",
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/mousepads/brand/esptiger",
        destination: "/mousepads/brand/esports-tiger",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fragbasic.fun" }],
        destination: "https://fragbasic.fun/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
