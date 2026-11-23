import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { accountOrigin, getAccountConfig } from "./config";

export async function accountClient(writable = false) {
  const config = getAccountConfig();
  if (!config) return null;
  const jar = await cookies();
  return createServerClient(config.url, config.key, {
    cookieOptions: { httpOnly: true, sameSite: "lax", secure: accountOrigin().startsWith("https://") },
    cookies: {
      getAll: () => jar.getAll(),
      setAll(updates) {
        // The account proxy persists token refreshes before the page renders.
        if (writable) for (const { name, value, options } of updates) jar.set(name, value, options);
      },
    },
  });
}
