import { config } from "dotenv";

import { getCatalogHealth } from "@/server/catalog/health";

config({ path: ".env", quiet: true });

async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`Usage: npm run db:check -- [--json]

Validates every catalog row against its schema, checks public image URLs, and
resolves editorial references. Exits non-zero when errors are found.`);
    return;
  }

  const report = await getCatalogHealth();

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.ok ? 0 : 1);
  }

  console.log(`Catalog health checked at ${report.checkedAt}\n`);
  console.table(
    report.modules.map((module) => ({
      module: module.label,
      total: module.total,
      published: module.published,
      draft: module.draft,
      errors: module.errorCount,
      warnings: module.warningCount,
    })),
  );

  if (report.issues.length > 0) {
    console.log("\nIssues:");
    for (const issue of report.issues) {
      const slug = issue.slug ? ` [${issue.slug}]` : "";
      console.log(
        `  ${issue.level.toUpperCase()} ${issue.module}${slug}: ${issue.message}`,
      );
    }
  } else {
    console.log("\nNo issues found.");
  }

  console.log(
    `\nTotals: ${report.totals.total} rows, ${report.totals.published} published, ${report.totals.draft} draft, ${report.totals.errors} errors, ${report.totals.warnings} warnings.`,
  );

  process.exit(report.ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
