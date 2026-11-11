import { revalidatePath } from "next/cache";

import type { CatalogModule } from "./modules";

type RouteConfig = {
  literals: string[];
  dynamic: Array<{ path: string; type: "page" | "layout" }>;
};

const SHARED_PATHS = ["/", "/sitemap.xml", "/api/search-index"];

const MODULE_ROUTES: Record<CatalogModule, RouteConfig> = {
  mousepads: {
    literals: [
      ...SHARED_PATHS,
      "/mousepads",
      "/mousepads/glasspads",
      "/mousepads/compare",
      "/mousepads/compare/universal",
      "/mousepads/guides",
      "/best",
    ],
    dynamic: [
      { path: "/mousepads/[slug]", type: "page" },
      { path: "/mousepads/compare/[slug]", type: "page" },
      { path: "/mousepads/guides/[slug]", type: "page" },
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
      "/mousepads/guides",
      "/best",
    ],
    dynamic: [
      { path: "/mousepads/[slug]", type: "page" },
      { path: "/mousepads/compare/[slug]", type: "page" },
      { path: "/mousepads/guides/[slug]", type: "page" },
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
  guides: {
    literals: [...SHARED_PATHS, "/mousepads/guides"],
    dynamic: [{ path: "/mousepads/guides/[slug]", type: "page" }],
  },
};

/**
 * Revalidate every public page and generated artifact that can depend on a
 * catalog module. Called from admin route handlers after successful writes.
 */
export function revalidateCatalog(...modules: CatalogModule[]) {
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
