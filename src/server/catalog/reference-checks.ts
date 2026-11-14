type Pad = { slug: string; status: string; data: { relatedAlternatives?: { similarFeeling: string[]; moreControl: string[]; moreSpeed: string[] } } };
type Editorial = { slug: string; status: string };
export function getAlternativeSlugs(data: unknown): string[] {
  if (!data || typeof data !== "object") return [];
  const alternatives = (data as { relatedAlternatives?: unknown }).relatedAlternatives;
  if (!alternatives || typeof alternatives !== "object") return [];
  const fields = alternatives as Record<string, unknown>;
  return ["similarFeeling", "moreControl", "moreSpeed"].flatMap((key) =>
    Array.isArray(fields[key]) ? fields[key].filter((value): value is string => typeof value === "string") : [],
  );
}
export type ReferenceCatalog = {
  pads: Pad[];
  comparisons: Array<Editorial & { data: { leftSlug: string; rightSlug: string } }>;
  bestPages: Array<Editorial & { data: { pickSlugs: Array<{ slug: string }> } }>;
  guides: Array<Editorial & { data: { relatedPadSlugs: string[] } }>;
};

/** Shared by deletion/rename/unpublish guards; drafts also retain references. */
export function findPadDependents(catalog: ReferenceCatalog, slug: string, publishedOnly = false): string[] {
  const visible = (row: Editorial) => !publishedOnly || row.status === "published";
  return [
    ...catalog.comparisons.filter((row) => visible(row) && [row.data.leftSlug, row.data.rightSlug].includes(slug)).map((row) => `comparison:${row.slug}`),
    ...catalog.bestPages.filter((row) => visible(row) && row.data.pickSlugs.some((pick) => pick.slug === slug)).map((row) => `best:${row.slug}`),
    ...catalog.guides.filter((row) => visible(row) && row.data.relatedPadSlugs.includes(slug)).map((row) => `guide:${row.slug}`),
    ...catalog.pads.filter((row) => visible(row) && row.slug !== slug && getAlternativeSlugs(row.data).includes(slug)).map((row) => `pad:${row.slug}`),
  ];
}
