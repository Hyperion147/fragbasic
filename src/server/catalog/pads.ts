import { cache } from "react";

import * as glasspadRepo from "@/server/glasspads/repo";
import * as mousepadRepo from "@/server/mousepads/repo";
import type { Mousepad } from "@/types/mousepad";

// `generateMetadata` and the page body both read the catalog during the same
// render. Caching the loaders keeps that to one query per request, which
// matters when statically generating many pages against a pooled database.
const loadMousepads = cache(async (): Promise<Mousepad[]> => {
  const rows = await mousepadRepo.listMousepads();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as Mousepad);
});

const loadGlasspads = cache(async (): Promise<Mousepad[]> => {
  const rows = await glasspadRepo.listGlasspads();
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as Mousepad);
});

const loadMousepadBySlug = cache(async (slug: string): Promise<Mousepad | null> => {
  const row = await mousepadRepo.getMousepadBySlug(slug);
  if (!row || row.status !== "published") return null;
  return ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as Mousepad;
});

const loadGlasspadBySlug = cache(async (slug: string): Promise<Mousepad | null> => {
  const row = await glasspadRepo.getGlasspadBySlug(slug);
  if (!row || row.status !== "published") return null;
  return ({ ...row.data, updatedAt: row.updatedAt.toISOString(), createdAt: row.createdAt.toISOString() }) as Mousepad;
});

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
 * The public "all pads" union of soft pads and glasspads. Duplicate slugs are
 * collapsed defensively.
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

export const getPublicPadBySlug = cache(
  async (slug: string): Promise<Mousepad | null> => {
    const mousepad = await loadMousepadBySlug(slug);
    if (mousepad) return mousepad;
    return loadGlasspadBySlug(slug);
  },
);

export async function getPublicPadSlugs(): Promise<string[]> {
  return (await getPublicPads()).map((pad) => pad.slug);
}
