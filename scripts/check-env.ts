import { loadEnvConfig } from "@next/env";
import { getAdminCredentials } from "../src/server/admin-credentials";

// Use the same parsing and precedence rules as Next, including $ expansion.
// The checker reports status only, never connection strings or credential parts.
loadEnvConfig(process.cwd(), process.env.NODE_ENV === "development");

let errors = 0;
function check(label: string, valid: boolean) {
  console.log(`${valid ? "OK" : "MISSING/INVALID"}: ${label}`);
  if (!valid) errors += 1;
}

let databaseValid = false;
try {
  databaseValid = ["postgres:", "postgresql:"].includes(new URL(process.env.DATABASE_URL ?? "").protocol);
} catch { /* Report configuration status without logging the connection URL. */ }
check("PostgreSQL connection configuration", databaseValid);
const secret = process.env.AUTH_SECRET ?? "";
check("Auth.js secret (at least 32 characters)", secret.length >= 32 && !/replace[_ -]?with|change[_ -]?me/i.test(secret));
check("Admin email and bcrypt password configuration", getAdminCredentials().ok);

let authUrlValid = true;
if (process.env.AUTH_URL) {
  try {
    const url = new URL(process.env.AUTH_URL);
    authUrlValid = ["http:", "https:"].includes(url.protocol) && !url.username && !url.password;
    if (process.env.NODE_ENV === "production") authUrlValid = authUrlValid && url.protocol === "https:";
  } catch { authUrlValid = false; }
}
check("Auth URL (or automatic hosting URL detection)", authUrlValid);
const cloudinary = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
const supabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log(`${cloudinary || supabase ? "OK" : "OPTIONAL/UNCONFIGURED"}: Catalog image upload storage`);
console.log(errors ? `${errors} configuration check(s) failed.` : "Environment checks passed. No credential values were printed.");
process.exitCode = errors ? 1 : 0;
