import { getSetupCatalog } from "@/server/catalog/setup";

export const revalidate = 300;

export async function GET() {
  return Response.json(await getSetupCatalog());
}
