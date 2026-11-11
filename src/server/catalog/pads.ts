import type { Mousepad } from "@/types/mousepad";
import {
  getAllMousepads as getStaticPads,
  getMousepadBySlug as getStaticPadBySlug,
} from "@/lib/mousepads";
import * as glasspadRepo from "@/server/glasspads/repo";
import * as mousepadRepo from "@/server/mousepads/repo";
import { isDbCatalogSource } from "./source";

function isGlassPad(pad: Mousepad) {
  return pad.category === "glass";
}

async function loadMousepads(): Promise<Mousepad[]> {
  if (!isDbCatalogSource("mousepads")) {
    return getStaticPads().filter((pad) => !isGlassPad(pad));
  }

  const rows = await mousepadRepo.listMousepads();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => row.data as Mousepad);
}

async function loadGlasspads(): Promise<Mousepad[]> {
  if (!isDbCatalogSource("glasspads")) {
    return getStaticPads().filter(isGlassPad);
  }

  const rows = await glasspadRepo.listGlasspads();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => row.data as Mousepad);
}

async function loadMousepadBySlug(slug: string): Promise<Mousepad | null> {
  if (!isDbCatalogSource("mousepads")) {
    const pad = getStaticPadBySlug(slug);
    return pad && !isGlassPad(pad) ? pad : null;
  }

  const row = await mousepadRepo.getMousepadBySlug(slug);
  if (!row || row.status !== "published") return null;
  return row.data as Mousepad;
}

async function loadGlasspadBySlug(slug: string): Promise<Mousepad | null> {
  if (!isDbCatalogSource("glasspads")) {
    const pad = getStaticPadBySlug(slug);
    return pad && isGlassPad(pad) ? pad : null;
  }

  const row = await glasspadRepo.getGlasspadBySlug(slug);
  if (!row || row.status !== "published") return null;
  return row.data as Mousepad;
}

/**
 * Soft and hybrid pads only. Draft rows are never exposed publicly.
 */
export async function getPublicMousepads(): Promise<Mousepad[]> {
  return loadMousepads();
}

/**
 * Dedicated glasspads only. Draft rows are never exposed publicly.
 */
export async function getPublicGlasspads(): Promise<Mousepad[]> {
  return loadGlasspads();
}

/**
 * The public "all pads" union. Soft pads and glasspads use independent source
 * flags, so one module can move to the database without pulling the other
 * along. Duplicate slugs are collapsed defensively.
 */
export async function getPublicPads(): Promise<Mousepad[]> {
  const [mousepads, glasspads] = await Promise.all([
    loadMousepads(),
    loadGlasspads(),
  ]);

  const seen = new Set<string>();
  const pads: Mousepad[] = [];

  for (const pad of [...mousepads, ...glasspads]) {
    if (seen.has(pad.slug)) continue;
    seen.add(pad.slug);
    pads.push(pad);
  }

  return pads;
}

export async function getPublicPadBySlug(
  slug: string,
): Promise<Mousepad | null> {
  const mousepad = await loadMousepadBySlug(slug);
  if (mousepad) return mousepad;
  return loadGlasspadBySlug(slug);
}

export async function getPublicPadSlugs(): Promise<string[]> {
  return (await getPublicPads()).map((pad) => pad.slug);
}
