import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { mousepads } from "@/data/mousepads/mousepads";
import { relatedAlternativesBySlug } from "@/data/mousepads/related-alternatives";
import { iems } from "@/data/iems/iems";
import { mouseSkates } from "@/data/accessories/mouse-skates";
import { comparisons } from "@/data/comparisons";
import { bestPages } from "@/data/best-pages";
import {
  latestAddedGlasspadSlugs,
  latestAddedIemSlugs,
  latestAddedMousepadSlugs,
} from "@/data/latest-added";
import { mousepadSchema } from "@/schemas/mousepad";
import { iemSchema } from "@/schemas/iem";
import { mouseSkateSchema } from "@/schemas/accessory";
import { comparisonDataSchema } from "@/schemas/comparison";
import { bestPageDataSchema } from "@/schemas/best-page";

const DEFAULT_OUTPUT = "output/static-catalog-snapshot.json";

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(`Usage: npm run db:snapshot -- [--out=path]

Writes the current static catalog to JSON for rollback and verification.
Default: ${DEFAULT_OUTPUT}`);
    return;
  }

  const data = {
    mousepads,
    relatedAlternativesBySlug,
    iems,
    mouseSkates,
    comparisons,
    bestPages,
    latestAdded: {
      mousepads: latestAddedMousepadSlugs,
      glasspads: latestAddedGlasspadSlugs,
      iems: latestAddedIemSlugs,
    },
  };

  const validation = {
    mousepads: countInvalid(mousepads, mousepadSchema),
    iems: countInvalid(iems, iemSchema),
    mouseSkates: countInvalid(mouseSkates, mouseSkateSchema),
    comparisons: countInvalid(comparisons, comparisonDataSchema),
    bestPages: countInvalid(bestPages, bestPageDataSchema),
  };

  const checksum = createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");

  const snapshot = {
    generatedAt: new Date().toISOString(),
    checksum,
    counts: {
      mousepads: mousepads.length,
      glasspads: mousepads.filter((pad) => pad.category === "glass").length,
      softMousepads: mousepads.filter((pad) => pad.category !== "glass").length,
      iems: iems.length,
      mouseSkates: mouseSkates.length,
      comparisons: comparisons.length,
      bestPages: bestPages.length,
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
    `Counts: mousepads=${snapshot.counts.mousepads} (soft=${snapshot.counts.softMousepads}, glass=${snapshot.counts.glasspads}) iems=${snapshot.counts.iems} skates=${snapshot.counts.mouseSkates} comparisons=${snapshot.counts.comparisons} bestPages=${snapshot.counts.bestPages}`,
  );

  for (const [name, invalid] of Object.entries(validation)) {
    if (invalid > 0) {
      console.error(`Validation: ${invalid} invalid ${name} record(s).`);
      process.exitCode = 1;
    }
  }
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
  records: readonly unknown[],
  schema: { safeParse: (value: unknown) => { success: boolean } },
) {
  return records.filter((record) => !schema.safeParse(record).success).length;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
