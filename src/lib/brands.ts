/**
 * Brand landing pages are derived from product brand strings in the database.
 * Some brands are stored under more than one spelling ("Esports Tiger" and
 * "ESPTiger"), which would create near-duplicate landing pages. Aliases fold
 * those spellings into a single canonical URL.
 */
const brandSlugAliases: Record<string, string> = {
  esptiger: "esports-tiger",
};

const brandDisplayNames: Record<string, string> = {
  "esports-tiger": "Esports Tiger",
};

function brandToSlug(brand: string) {
  return brand
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Canonical slug for a brand, with aliases collapsed. */
export function getBrandSlug(brand: string) {
  const slug = brandToSlug(brand);
  return brandSlugAliases[slug] ?? slug;
}

/** Canonical display name for a brand slug. */
export function getBrandName(brand: string) {
  const slug = getBrandSlug(brand);
  return brandDisplayNames[slug] ?? brand.trim();
}

/** Unique canonical brand slugs, alphabetically sorted. */
export function getBrandSlugs(brands: string[]) {
  return Array.from(new Set(brands.map(getBrandSlug))).sort((a, b) =>
    a.localeCompare(b),
  );
}
