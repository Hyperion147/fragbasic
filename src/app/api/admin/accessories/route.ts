import { mouseSkateWriteSchema } from "@/schemas/accessory";
import { jsonError, jsonOk, zodError } from "@/server/api";
import { requireAdmin } from "@/server/auth";
import * as repo from "@/server/accessories/repo";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  return jsonOk({ accessories: await repo.listMouseSkates() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);
  const parsed = mouseSkateWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return zodError(parsed.error);
  const { status, data } = parsed.data;
  if (await repo.getMouseSkateBySlug(data.slug)) return jsonError("Slug already exists", 409);
  if (await repo.getMouseSkateById(data.id)) return jsonError("Id already exists", 409);
  return jsonOk({ accessory: await repo.insertMouseSkate({ id: data.id, slug: data.slug, brand: data.brand, name: data.name, status, data }) }, 201);
}