/**
 * Admin credentials from env.
 *
 * IMPORTANT: Never put a raw bcrypt hash ($2b$12$...) unescaped in .env when using Next.js.
 * Next expands $VAR inside values and corrupts the hash (even with quotes / $$).
 *
 * Preferred:
 *   ADMIN_PASSWORD_HASH_B64=<base64 of the full bcrypt string>
 *
 * Generate:
 *   npx tsx -e "import bcrypt from 'bcryptjs'; const h=bcrypt.hashSync('YOUR_PASSWORD',12); console.log(h); console.log(Buffer.from(h).toString('base64'))"
 */
export function getAdminCredentials():
  | { ok: true; email: string; hash: string }
  | { ok: false; message: string } {
  const email = (process.env.ADMIN_EMAIL ?? "").trim().replace(/^['"]|['"]$/g, "");

  if (!email) {
    return { ok: false, message: "Admin is not configured (missing ADMIN_EMAIL)" };
  }

  const b64 = (process.env.ADMIN_PASSWORD_HASH_B64 ?? "").trim().replace(/^['"]|['"]$/g, "");
  if (b64) {
    try {
      const hash = Buffer.from(b64, "base64").toString("utf8").trim();
      if (!/^\$2[aby]\$\d+\$/.test(hash)) {
        return {
          ok: false,
          message:
            "ADMIN_PASSWORD_HASH_B64 did not decode to a bcrypt hash. Re-generate base64 from a full $2b$... string.",
        };
      }
      return { ok: true, email, hash };
    } catch {
      return { ok: false, message: "ADMIN_PASSWORD_HASH_B64 is not valid base64" };
    }
  }

  // Legacy fallback (often broken under Next.js)
  let hash = (process.env.ADMIN_PASSWORD_HASH ?? "").trim().replace(/^['"]|['"]$/g, "");
  let prev = "";
  while (hash.includes("$$") && hash !== prev) {
    prev = hash;
    hash = hash.replace(/\$\$/g, "$");
  }

  if (!hash) {
    return {
      ok: false,
      message:
        "Missing ADMIN_PASSWORD_HASH_B64. Generate: node -e \"console.log(Buffer.from(bcryptHash).toString('base64'))\"",
    };
  }

  if (!/^\$2[aby]\$\d+\$/.test(hash) || hash.length < 55) {
    return {
      ok: false,
      message:
        "Raw ADMIN_PASSWORD_HASH is corrupted by Next.js ($ expansion). Switch to ADMIN_PASSWORD_HASH_B64.",
    };
  }

  return { ok: true, email, hash };
}
