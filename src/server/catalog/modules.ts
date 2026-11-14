export type CatalogModule =
  | "mousepads"
  | "glasspads"
  | "iems"
  | "accessories"
  | "comparisons"
  | "best-pages"
  | "guides";

export const CATALOG_MODULE_LABELS: Record<CatalogModule, string> = {
  mousepads: "Mousepads",
  glasspads: "Glasspads",
  iems: "IEMs",
  accessories: "Mouse skates",
  comparisons: "Comparisons",
  "best-pages": "Best pages",
  guides: "Guides",
};
