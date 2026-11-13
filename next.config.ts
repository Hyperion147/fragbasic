import type { NextConfig } from "next";

/**
 * Uploaded catalog images live in Supabase Storage. Derive the hostname from
 * the project URL so staging and production projects work without hardcoding.
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
    qualities: [35, 75],
    // Remote catalog images come from Supabase Storage, which answers with
    // `Cache-Control: private, no-cache`. Without a long Next-side TTL, every
    // browser revalidation triggers a fresh download plus sharp re-encode.
    // 31 days keeps optimized variants hot; bump the image URL (filename or
    // ?v=) when replacing a file at the same path.
    minimumCacheTTL: 2678400,
    remotePatterns: supabaseImageHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseImageHostname,
            port: "",
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
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
