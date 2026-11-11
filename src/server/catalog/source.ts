export type CatalogSource = "static" | "db";

export type CatalogSourceModule =
  | "mousepads"
  | "glasspads"
  | "iems"
  | "accessories"
  | "comparisons"
  | "best-pages"
  | "guides";

const ENV_KEYS: Record<CatalogSourceModule, string> = {
  mousepads: "CATALOG_SOURCE_MOUSEPADS",
  glasspads: "CATALOG_SOURCE_GLASSPADS",
  iems: "CATALOG_SOURCE_IEMS",
  accessories: "CATALOG_SOURCE_ACCESSORIES",
  comparisons: "CATALOG_SOURCE_COMPARISONS",
  "best-pages": "CATALOG_SOURCE_BEST_PAGES",
  guides: "CATALOG_SOURCE_GUIDES",
};

/**
 * Public reads default to the checked-in static catalog. Set the matching
 * `CATALOG_SOURCE_*` environment variable to `db` to switch one module at a
 * time. Unknown values keep the safe static default.
 */
export function getCatalogSource(module: CatalogSourceModule): CatalogSource {
  const value = process.env[ENV_KEYS[module]]?.trim().toLowerCase();
  return value === "db" || value === "database" ? "db" : "static";
}

export function isDbCatalogSource(module: CatalogSourceModule) {
  return getCatalogSource(module) === "db";
}
