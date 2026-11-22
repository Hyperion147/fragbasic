export function getAccountConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key?.startsWith("sb_publishable_")) return null;
  return { url, key };
}

export function accountOrigin() {
  return new URL(process.env.ACCOUNT_SITE_URL || process.env.AUTH_URL || "https://fragbasic.fun").origin;
}
