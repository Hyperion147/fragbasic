import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "@/auth";
import { jsonError, jsonOk, zodError } from "@/server/api";

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return zodError(parsed.error);

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError("Invalid credentials", 401);
    }
    // Auth.js may throw NEXT_REDIRECT in some versions even with redirect:false
    const message = error instanceof Error ? error.message : "";
    if (message.includes("NEXT_REDIRECT") || (error as { digest?: string })?.digest?.includes("NEXT_REDIRECT")) {
      return jsonOk({ ok: true });
    }
    console.error("login error", error);
    return jsonError("Invalid credentials", 401);
  }
}
