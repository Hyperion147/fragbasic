import { serializeSitemap } from "@/lib/sitemap";
import { getPublicSitemap } from "@/server/catalog/sitemap";

// Prerender at build time and refresh through ISR or CMS revalidatePath calls.
// Database failures propagate as errors, never as a cached partial sitemap/404.
export const dynamic = "force-static";
export const revalidate = 300;

export async function GET() {
  const xml = serializeSitemap(await getPublicSitemap());
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
