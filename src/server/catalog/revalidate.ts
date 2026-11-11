import { revalidatePath } from "next/cache";

import type { CatalogSourceModule } from "./source";

type RouteConfig = {
  literals: string[];
  dynamic: Array<{ path: string; type: "page" | "layout" }>;
};

const SHARED_PATHS = ["/", "/sitemap.xml", "/api/search-index"];

const MODULE_ROUTES: Record<CatalogSourceModule, RouteConfig> = {
  mousepads: {
    literals: [
      ...SHARED_PATHS,
      "/mousepads",
      "/mousepads/glasspads",
      "/mousepads/compare",
      "/mousepads/compare/universal",
      "/best",
    ],
    dynamic: [
      { path: "/mousepads/[slug]", type: "page" },
      { path: "/mousepads/compare/[slug]", type: "page" },
      { path: "/best/[slug]", type: "page" },
    ],
  },
  glasspads: {
    literals: [
      ...SHARED_PATHS,
      "/mousepads",
      "/mousepads/glasspads",
      "/mousepads/compare",
      "/mousepads/compare/universal",
      "/best",
    ],
    dynamic: [
      { path: "/mousepads/[slug]", type: "page" },
      { path: "/mousepads/compare/[slug]", type: "page" },
      { path: "/best/[slug]", type: "page" },
    ],
  },
  iems: {
    literals: [...SHARED_PATHS, "/iems", "/iems/compare"],
    dynamic: [{ path: "/iems/[slug]", type: "page" }],
  },
  accessories: {
    literals: [
      ...SHARED_PATHS,
      "/accessories/mouse-skates",
      "/accessories/mouse-skates/browse",
      "/accessories/mouse-skates/compare",
    ],
    dynamic: [],
  },
  comparisons: {
    literals: [
      ...SHARED_PATHS,
      "/mousepads/compare",
      "/mousepads/compare/universal",
    ],
    dynamic: [
      { path: "/mousepads/compare/[slug]", type: "page" },
      { path: "/mousepads/[slug]", type: "page" },
    ],
  },
  "best-pages": {
    literals: [...SHARED_PATHS, "/best"],
    dynamic: [{ path: "/best/[slug]", type: "page" }],
  },
  "latest-added": {
    literals: [
      ...SHARED_PATHS,
      "/iems",
      "/mousepads",
      "/mousepads/glasspads",
    ],
    dynamic: [],
  },
};

/**
 * Revalidate every public page and generated artifact that can depend on a
 * catalog module. Called from admin route handlers after successful writes.
 */
export function revalidateCatalog(...modules: CatalogSourceModule[]) {
  const literals = new Set<string>();
  const dynamic = new Map<string, "page" | "layout">();

  for (const sourceModule of modules) {
    const routes = MODULE_ROUTES[sourceModule];
    for (const path of routes.literals) literals.add(path);
    for (const route of routes.dynamic) dynamic.set(route.path, route.type);
  }

  for (const path of literals) revalidatePath(path);
  for (const [path, type] of dynamic) revalidatePath(path, type);
}
