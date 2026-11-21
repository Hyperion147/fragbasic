import models from "./models.json";

export type SetupCategory = keyof typeof models;
export type SetupModel = { id: string; brand: string; model: string; source: string };
type PublishedModel = { id: string; slug: string; brand: string; name: string };

function modelKey(brand: string, model: string) {
  return [brand, model].map((text) =>
    text.normalize("NFKD").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")
  ).join(":");
}

function withPublishedModels(category: "mousepad" | "iem", published: PublishedModel[]) {
  const items: SetupModel[] = [...models[category]];
  const seen = new Set(items.map((item) => modelKey(item.brand, item.model)));
  for (const row of published) {
    const key = modelKey(row.brand, row.name);
    if (seen.has(key)) continue;
    seen.add(key);
    const section = category === "iem" ? "iems" : "mousepads";
    items.push({
      id: `${category}:review:${row.id}`,
      brand: row.brand,
      model: row.name,
      source: `/${section}/${encodeURIComponent(row.slug)}`,
    });
  }
  return items;
}

/** The curated order is for discovery in the setup picker, independent of review scores. */
export function buildSetupCatalog(pads: PublishedModel[], iems: PublishedModel[]) {
  return {
    mouse: models.mouse,
    keyboard: models.keyboard,
    monitor: models.monitor,
    mousepad: withPublishedModels("mousepad", pads),
    iem: withPublishedModels("iem", iems),
  } satisfies Record<SetupCategory, SetupModel[]>;
}
