import { NextResponse } from "next/server";

import { buildPublicSearchIndex } from "@/server/catalog/search";

export const revalidate = 300;

export async function GET() {
  return NextResponse.json({ items: await buildPublicSearchIndex() });
}
