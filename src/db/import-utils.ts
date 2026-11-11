import { isDeepStrictEqual } from "node:util";

export const IMPORT_MODES = ["upsert", "insert-only", "replace"] as const;

export type ImportMode = (typeof IMPORT_MODES)[number];

export type ImportStatus = "draft" | "published";

export type ImportOptions = {
  mode: ImportMode;
  status: ImportStatus;
  dryRun: boolean;
  skipImages: boolean;
  forceStatus: boolean;
  yes: boolean;
  only: Set<string> | null;
  help: boolean;
};

export type ImportCandidate = {
  id: string;
  slug: string;
  brand?: string;
  name?: string;
  /**
   * Optional because Drizzle's select type treats columns with defaults as
   * optional. Existing rows always have a status at runtime.
   */
  status?: ImportStatus;
  data: unknown;
};

export type ImportAction =
  | "create"
  | "update"
  | "unchanged"
  | "skip"
  | "conflict";

export type PlannedImport<T extends ImportCandidate = ImportCandidate> = {
  action: ImportAction;
  incoming: T;
  desired: T;
  existing?: ImportCandidate;
  reason?: string;
};

export type ImportSummary = {
  create: number;
  update: number;
  unchanged: number;
  skip: number;
  conflict: number;
  total: number;
};

export type ImportWriter<T extends ImportCandidate> = {
  insert: (row: T) => Promise<void>;
  update: (id: string, row: T) => Promise<void>;
};

const DEFAULT_OPTIONS: ImportOptions = {
  mode: "upsert",
  status: "published",
  dryRun: false,
  skipImages: false,
  forceStatus: false,
  yes: false,
  only: null,
  help: false,
};

export function parseImportOptions(
  argv: readonly string[] = process.argv.slice(2),
): ImportOptions {
  const options: ImportOptions = {
    ...DEFAULT_OPTIONS,
    only: null,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--skip-images") {
      options.skipImages = true;
      continue;
    }

    if (arg === "--force-status") {
      options.forceStatus = true;
      continue;
    }

    if (arg === "--yes" || arg === "-y") {
      options.yes = true;
      continue;
    }

    if (arg.startsWith("--mode=")) {
      const mode = arg.slice("--mode=".length).trim();
      if (!IMPORT_MODES.includes(mode as ImportMode)) {
        throw new Error(
          `Invalid --mode value "${mode}". Expected one of: ${IMPORT_MODES.join(", ")}`,
        );
      }
      options.mode = mode as ImportMode;
      continue;
    }

    if (arg.startsWith("--status=")) {
      const status = arg.slice("--status=".length).trim();
      if (status !== "draft" && status !== "published") {
        throw new Error(
          `Invalid --status value "${status}". Expected draft or published.`,
        );
      }
      options.status = status;
      continue;
    }

    if (arg.startsWith("--only=")) {
      const slugs = arg
        .slice("--only=".length)
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      if (slugs.length === 0) {
        throw new Error("--only requires at least one slug.");
      }

      options.only = new Set(slugs);
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

export function assertSafeOptions(options: ImportOptions) {
  if (options.mode === "replace" && !options.yes) {
    throw new Error(
      "--mode=replace deletes every row in the target table. Re-run with --yes after taking a snapshot.",
    );
  }
}

export function planImports<T extends ImportCandidate>(
  incoming: readonly T[],
  existing: readonly ImportCandidate[],
  options: ImportOptions,
): PlannedImport<T>[] {
  const existingById = new Map(existing.map((row) => [row.id, row]));
  const existingBySlug = new Map(existing.map((row) => [row.slug, row]));

  const plans: PlannedImport<T>[] = [];

  for (const item of incoming) {
    if (options.only && !options.only.has(item.slug)) {
      continue;
    }

    const byId = existingById.get(item.id);
    const bySlug = existingBySlug.get(item.slug);

    const desired = {
      ...item,
      status:
        byId && !options.forceStatus
          ? (byId.status ?? options.status)
          : options.status,
    } as T;

    if (bySlug && bySlug.id !== item.id) {
      plans.push({
        action: "conflict",
        incoming: item,
        desired,
        existing: bySlug,
        reason: `Slug "${item.slug}" already belongs to row "${bySlug.id}".`,
      });
      continue;
    }

    if (!byId) {
      plans.push({
        action: "create",
        incoming: item,
        desired,
      });
      continue;
    }

    if (options.mode === "insert-only") {
      plans.push({
        action: "skip",
        incoming: item,
        desired,
        existing: byId,
        reason: "Record already exists and --mode=insert-only was used.",
      });
      continue;
    }

    if (isSameRecord(byId, desired)) {
      plans.push({
        action: "unchanged",
        incoming: item,
        desired,
        existing: byId,
      });
      continue;
    }

    plans.push({
      action: "update",
      incoming: item,
      desired,
      existing: byId,
    });
  }

  return plans;
}

export function summarizePlans(plans: readonly PlannedImport[]): ImportSummary {
  const summary: ImportSummary = {
    create: 0,
    update: 0,
    unchanged: 0,
    skip: 0,
    conflict: 0,
    total: plans.length,
  };

  for (const plan of plans) {
    summary[plan.action] += 1;
  }

  return summary;
}

export async function executeImports<T extends ImportCandidate>(
  plans: readonly PlannedImport<T>[],
  writer: ImportWriter<T>,
  options: Pick<ImportOptions, "dryRun">,
): Promise<ImportSummary> {
  for (const plan of plans) {
    if (plan.action === "create") {
      if (!options.dryRun) {
        await writer.insert(plan.desired);
      }
      continue;
    }

    if (plan.action === "update") {
      if (!options.dryRun) {
        await writer.update(plan.desired.id, plan.desired);
      }
    }
  }

  return summarizePlans(plans);
}

export function printImportSummary(
  label: string,
  summary: ImportSummary,
  plans: readonly PlannedImport[],
  options: Pick<ImportOptions, "dryRun" | "mode">,
) {
  const prefix = options.dryRun ? "[dry-run] " : "";
  console.log(
    `${prefix}${label} (${options.mode}): create=${summary.create} update=${summary.update} unchanged=${summary.unchanged} skip=${summary.skip} conflict=${summary.conflict} total=${summary.total}`,
  );

  const conflicts = plans.filter((plan) => plan.action === "conflict");
  for (const conflict of conflicts.slice(0, 10)) {
    console.error(
      `  conflict ${conflict.incoming.slug}: ${conflict.reason ?? "unknown conflict"}`,
    );
  }

  if (conflicts.length > 10) {
    console.error(`  ...and ${conflicts.length - 10} more conflicts`);
  }
}

export function printImportHelp(script: string) {
  console.log(`Usage: ${script} [options]

Options:
  --dry-run             Show planned changes without writing to the database
  --mode=upsert         Update existing rows by id and insert new rows (default)
  --mode=insert-only    Insert new rows and skip rows that already exist
  --mode=replace        Delete every row in the table first (requires --yes)
  --only=a,b            Import only the listed slugs
  --status=draft        Status for newly inserted rows (default: published)
  --force-status        Also overwrite the status of existing rows
  --skip-images         Keep local image paths; do not upload to Supabase
  --yes, -y             Confirm destructive --mode=replace
  --help, -h            Show this help

Examples:
  ${script} --dry-run
  ${script} --mode=upsert --only=artisan-zero-soft
  ${script} --mode=replace --yes
`);
}

function isSameRecord(existing: ImportCandidate, desired: ImportCandidate) {
  return (
    existing.slug === desired.slug &&
    existing.brand === desired.brand &&
    existing.name === desired.name &&
    existing.status === desired.status &&
    isDeepStrictEqual(normalizeJson(existing.data), normalizeJson(desired.data))
  );
}

function normalizeJson(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(value));
}
