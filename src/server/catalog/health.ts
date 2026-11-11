import type { ZodType } from "zod";

import { db } from "@/db";
import {
  bestPages,
  comparisons,
  glasspads,
  guides,
  iems,
  mousepads,
  mouseSkates,
} from "@/db/schema";
import { bestPageDataSchema } from "@/schemas/best-page";
import { comparisonDataSchema } from "@/schemas/comparison";
import { guideDataSchema } from "@/schemas/guide";
import { iemSchema } from "@/schemas/iem";
import { mousepadSchema } from "@/schemas/mousepad";
import { mouseSkateSchema } from "@/schemas/accessory";
import { CATALOG_MODULE_LABELS, type CatalogModule } from "./modules";

export type CatalogHealthIssue = {
  level: "error" | "warning";
  module: CatalogModule;
  message: string;
  slug?: string;
};

export type CatalogHealthModuleReport = {
  module: CatalogModule;
  label: string;
  total: number;
  published: number;
  draft: number;
  errorCount: number;
  warningCount: number;
};

export type CatalogHealthReport = {
  ok: boolean;
  checkedAt: string;
  modules: CatalogHealthModuleReport[];
  issues: CatalogHealthIssue[];
  totals: {
    total: number;
    published: number;
    draft: number;
    errors: number;
    warnings: number;
  };
};

type HealthRow = {
  id: string;
  slug: string;
  status?: string;
  data: unknown;
};

type RowValidator = (row: HealthRow, data: unknown) => void;

function isPublicUrl(value: unknown) {
  return typeof value === "string" && /^https?:\/\/\S+$/i.test(value);
}

function imageUrl(data: unknown) {
  if (!data || typeof data !== "object") return undefined;
  const images = (data as { images?: unknown }).images;
  if (!images || typeof images !== "object") return undefined;
  return (images as { main?: unknown }).main;
}

function inspectRows(
  module: CatalogModule,
  rows: readonly HealthRow[],
  schema: ZodType,
  issues: CatalogHealthIssue[],
  options: {
    requirePublicImage?: boolean;
    validate?: RowValidator;
  } = {},
): CatalogHealthModuleReport {
  let published = 0;
  let draft = 0;

  for (const row of rows) {
    if (row.status === "published") published += 1;
    else draft += 1;

    const parsed = schema.safeParse(row.data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      issues.push({
        level: "error",
        module,
        slug: row.slug,
        message: `${issue?.path.join(".") || "data"}: ${issue?.message ?? "invalid row"}`,
      });
      continue;
    }

    if (options.requirePublicImage && !isPublicUrl(imageUrl(parsed.data))) {
      issues.push({
        level: "error",
        module,
        slug: row.slug,
        message: "images.main must be an absolute http(s) URL",
      });
    }

    options.validate?.(row, parsed.data);
  }

  return {
    module,
    label: CATALOG_MODULE_LABELS[module],
    total: rows.length,
    published,
    draft,
    errorCount: 0,
    warningCount: 0,
  };
}

function issueCount(
  issues: readonly CatalogHealthIssue[],
  module: CatalogModule,
  level: CatalogHealthIssue["level"],
) {
  return issues.filter((issue) => issue.module === module && issue.level === level)
    .length;
}

/**
 * Read-only integrity check for every table-backed catalog module.
 * Designed for both `npm run db:check` and the admin health panel.
 */
export async function getCatalogHealth(): Promise<CatalogHealthReport> {
  const [
    mousepadRows,
    glasspadRows,
    iemRows,
    skateRows,
    comparisonRows,
    bestPageRows,
    guideRows,
  ] = await Promise.all([
    db.select().from(mousepads),
    db.select().from(glasspads),
    db.select().from(iems),
    db.select().from(mouseSkates),
    db.select().from(comparisons),
    db.select().from(bestPages),
    db.select().from(guides),
  ]);

  const issues: CatalogHealthIssue[] = [];
  const padSlugs = new Set<string>([
    ...mousepadRows.map((row) => row.slug),
    ...glasspadRows.map((row) => row.slug),
  ]);

  const modules: CatalogHealthModuleReport[] = [];

  modules.push(
    inspectRows("mousepads", mousepadRows, mousepadSchema, issues, {
      requirePublicImage: true,
      validate: (row, data) => {
        if ((data as { category?: string }).category === "glass") {
          issues.push({
            level: "warning",
            module: "mousepads",
            slug: row.slug,
            message: "Glass row found in the mousepads table",
          });
        }
      },
    }),
  );

  modules.push(
    inspectRows("glasspads", glasspadRows, mousepadSchema, issues, {
      requirePublicImage: true,
      validate: (row, data) => {
        const pad = data as { category?: string; surface?: string };
        if (pad.category !== "glass" || pad.surface !== "glass") {
          issues.push({
            level: "error",
            module: "glasspads",
            slug: row.slug,
            message: "Glasspad rows must use glass category and surface",
          });
        }
      },
    }),
  );

  modules.push(
    inspectRows("iems", iemRows, iemSchema, issues, {
      requirePublicImage: true,
    }),
  );

  modules.push(inspectRows("accessories", skateRows, mouseSkateSchema, issues));

  modules.push(
    inspectRows("comparisons", comparisonRows, comparisonDataSchema, issues, {
      validate: (row, data) => {
        const comparison = data as { leftSlug: string; rightSlug: string };
        for (const slug of [comparison.leftSlug, comparison.rightSlug]) {
          if (!padSlugs.has(slug)) {
            issues.push({
              level: "error",
              module: "comparisons",
              slug: row.slug,
              message: `Missing pad reference: ${slug}`,
            });
          }
        }
        if (comparison.leftSlug === comparison.rightSlug) {
          issues.push({
            level: "error",
            module: "comparisons",
            slug: row.slug,
            message: "Comparison references the same pad twice",
          });
        }
      },
    }),
  );

  modules.push(
    inspectRows("best-pages", bestPageRows, bestPageDataSchema, issues, {
      validate: (row, data) => {
        const page = data as { pickSlugs: Array<{ slug: string }> };
        for (const pick of page.pickSlugs) {
          if (!padSlugs.has(pick.slug)) {
            issues.push({
              level: "error",
              module: "best-pages",
              slug: row.slug,
              message: `Missing pad reference: ${pick.slug}`,
            });
          }
        }
      },
    }),
  );

  modules.push(
    inspectRows("guides", guideRows, guideDataSchema, issues, {
      validate: (row, data) => {
        const guide = data as { relatedPadSlugs: string[] };
        for (const slug of guide.relatedPadSlugs) {
          if (!padSlugs.has(slug)) {
            issues.push({
              level: "error",
              module: "guides",
              slug: row.slug,
              message: `Missing pad reference: ${slug}`,
            });
          }
        }
      },
    }),
  );

  // Row-level validators append issues after the initial count is computed.
  for (const entry of modules) {
    entry.errorCount = issueCount(issues, entry.module, "error");
    entry.warningCount = issueCount(issues, entry.module, "warning");
  }

  const totals = modules.reduce(
    (sum, entry) => ({
      total: sum.total + entry.total,
      published: sum.published + entry.published,
      draft: sum.draft + entry.draft,
      errors: sum.errors + entry.errorCount,
      warnings: sum.warnings + entry.warningCount,
    }),
    { total: 0, published: 0, draft: 0, errors: 0, warnings: 0 },
  );

  return {
    ok: totals.errors === 0,
    checkedAt: new Date().toISOString(),
    modules,
    issues,
    totals,
  };
}
