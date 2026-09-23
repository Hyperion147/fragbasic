import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { getAdminCredentials } from "@/server/admin-credentials";

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

/**
 * POST /api/admin/login
 */
export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return zodError(parsed.error);

  const email = parsed.data.email.trim();
  const password = parsed.data.password;

  const creds = getAdminCredentials();
  if (!creds.ok) {
    return jsonError(creds.message, 500);
  }

  const emailOk = email.toLowerCase() === creds.email.toLowerCase();
  const passOk = await bcrypt.compare(password, creds.hash);

  if (!emailOk || !passOk) {
    return jsonError("Invalid credentials", 401);
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("[login] AuthError after successful bcrypt", error.type, error);
      return jsonError("Login failed creating session", 500);
    }
    const message = error instanceof Error ? error.message : "";
    const digest = (error as { digest?: string })?.digest ?? "";
    if (message.includes("NEXT_REDIRECT") || digest.includes("NEXT_REDIRECT")) {
      return jsonOk({ ok: true });
    }
    console.error("[login] unexpected error after bcrypt ok", error);
    return jsonError("Login failed creating session", 500);
  }
}
