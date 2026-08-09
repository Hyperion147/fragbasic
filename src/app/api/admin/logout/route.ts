import { signOut } from "@/auth";
import { jsonOk } from "@/server/api";

/** POST /api/admin/logout — clears Auth.js session cookie */
export async function POST() {
  await signOut({ redirect: false });
  return jsonOk({ ok: true });
}
