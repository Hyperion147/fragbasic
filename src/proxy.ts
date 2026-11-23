import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { accountOrigin, getAccountConfig } from "@/server/account/config";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const config = getAccountConfig();
  if (config) {
    const supabase = createServerClient(config.url, config.key, {
      cookieOptions: { httpOnly: true, sameSite: "lax", secure: accountOrigin().startsWith("https://") },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(updates, headers) {
          for (const { name, value } of updates) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of updates) response.cookies.set(name, value, options);
          for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
        },
      },
    });
    await supabase.auth.getClaims();
  }
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: "/account" };
