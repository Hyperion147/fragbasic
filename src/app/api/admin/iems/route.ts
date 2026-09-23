import { iemWriteSchema } from "@/schemas/iem";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/iems/repo";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ iems: await repo.listIems() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const parsed = iemWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;
  if (await repo.getIemBySlug(data.slug)) return jsonError("Slug already exists", 409);
  if (await repo.getIemById(data.id)) return jsonError("Id already exists", 409);
  return jsonOk({ iem: await repo.insertIem({ id: data.id, slug: data.slug, brand: data.brand, name: data.name, status, data }) }, 201);
}