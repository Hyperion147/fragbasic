import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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
import { mouseSkateSchema } from "@/schemas/accessory";
import { bestPageDataSchema } from "@/schemas/best-page";
import { comparisonDataSchema } from "@/schemas/comparison";
import { guideDataSchema } from "@/schemas/guide";
import { iemSchema } from "@/schemas/iem";
import { mousepadSchema } from "@/schemas/mousepad";

const DEFAULT_OUTPUT = "output/catalog-snapshot.json";

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(`Usage: npm run db:snapshot -- [--out=path]

Writes the current database catalog to JSON for backup and verification.
Default: ${DEFAULT_OUTPUT}`);
    return;
  }

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

  const data = {
    mousepads: mousepadRows,
    glasspads: glasspadRows,
    iems: iemRows,
    mouseSkates: skateRows,
    comparisons: comparisonRows,
    bestPages: bestPageRows,
    guides: guideRows,
  };

  const validation = {
    mousepads: countInvalid(mousepadRows, mousepadSchema),
    glasspads: countInvalid(glasspadRows, mousepadSchema),
    iems: countInvalid(iemRows, iemSchema),
    mouseSkates: countInvalid(skateRows, mouseSkateSchema),
    comparisons: countInvalid(comparisonRows, comparisonDataSchema),
    bestPages: countInvalid(bestPageRows, bestPageDataSchema),
    guides: countInvalid(guideRows, guideDataSchema),
  };

  const checksum = createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");

  const snapshot = {
    generatedAt: new Date().toISOString(),
    checksum,
    counts: {
      mousepads: mousepadRows.length,
      glasspads: glasspadRows.length,
      iems: iemRows.length,
      mouseSkates: skateRows.length,
      comparisons: comparisonRows.length,
      bestPages: bestPageRows.length,
      guides: guideRows.length,
    },
    validation,
    data,
  };

  const outputPath = path.resolve(options.out);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

  console.log(`Snapshot written: ${outputPath}`);
  console.log(`Checksum: ${checksum}`);
  console.log(
    `Counts: mousepads=${snapshot.counts.mousepads} glasspads=${snapshot.counts.glasspads} iems=${snapshot.counts.iems} skates=${snapshot.counts.mouseSkates} comparisons=${snapshot.counts.comparisons} bestPages=${snapshot.counts.bestPages} guides=${snapshot.counts.guides}`,
  );

  for (const [name, invalid] of Object.entries(validation)) {
    if (invalid > 0) {
      console.error(`Validation: ${invalid} invalid ${name} record(s).`);
      process.exitCode = 1;
    }
  }

  process.exit(process.exitCode ?? 0);
}

function parseArgs(argv: readonly string[]) {
  let out = DEFAULT_OUTPUT;
  let help = false;

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }

    if (arg.startsWith("--out=")) {
      const value = arg.slice("--out=".length).trim();
      if (!value) {
        throw new Error("--out requires a file path.");
      }
      out = value;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { out, help };
}

function countInvalid(
  rows: readonly { data: unknown }[],
  schema: { safeParse: (value: unknown) => { success: boolean } },
) {
  return rows.filter((row) => !schema.safeParse(row.data).success).length;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
