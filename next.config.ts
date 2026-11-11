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
  images: {
    qualities: [35, 75],
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
        source: "/:path*",
        has: [{ type: "host", value: "www.fragbasic.fun" }],
        destination: "https://fragbasic.fun/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
