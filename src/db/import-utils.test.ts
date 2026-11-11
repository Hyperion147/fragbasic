import { describe, expect, it } from "vitest";

import {
  assertSafeOptions,
  parseImportOptions,
  planImports,
  summarizePlans,
  type ImportCandidate,
} from "./import-utils";

function candidate(overrides: Partial<ImportCandidate> = {}): ImportCandidate {
  return {
    id: "pad-1",
    slug: "pad-1",
    brand: "Brand",
    name: "Pad",
    status: "published",
    data: { id: "pad-1", slug: "pad-1" },
    ...overrides,
  };
}

describe("parseImportOptions", () => {
  it("defaults to a safe upsert", () => {
    const options = parseImportOptions([]);

    expect(options.mode).toBe("upsert");
    expect(options.status).toBe("published");
    expect(options.dryRun).toBe(false);
    expect(options.skipImages).toBe(false);
    expect(options.forceStatus).toBe(false);
    expect(options.only).toBeNull();
  });

  it("parses filters and flags", () => {
    const options = parseImportOptions([
      "--dry-run",
      "--mode=insert-only",
      "--status=draft",
      "--only=one, two",
      "--skip-images",
      "--force-status",
    ]);

    expect(options.mode).toBe("insert-only");
    expect(options.status).toBe("draft");
    expect(options.dryRun).toBe(true);
    expect(options.skipImages).toBe(true);
    expect(options.forceStatus).toBe(true);
    expect(options.only).toEqual(new Set(["one", "two"]));
  });

  it("rejects unknown modes and arguments", () => {
    expect(() => parseImportOptions(["--mode=destroy"])).toThrow(
      /Invalid --mode/,
    );
    expect(() => parseImportOptions(["--nope"])).toThrow(/Unknown argument/);
  });
});

describe("assertSafeOptions", () => {
  it("blocks replace without confirmation", () => {
    const options = parseImportOptions(["--mode=replace"]);
    expect(() => assertSafeOptions(options)).toThrow(/--yes/);
  });

  it("allows replace with confirmation", () => {
    const options = parseImportOptions(["--mode=replace", "--yes"]);
    expect(() => assertSafeOptions(options)).not.toThrow();
  });
});

describe("planImports", () => {
  it("creates missing rows", () => {
    const plans = planImports([candidate()], [], parseImportOptions([]));

    expect(plans).toHaveLength(1);
    expect(plans[0].action).toBe("create");
  });

  it("updates changed rows", () => {
    const existing = candidate();
    const incoming = candidate({
      data: { id: "pad-1", slug: "pad-1", name: "Changed" },
    });

    const plans = planImports([incoming], [existing], parseImportOptions([]));

    expect(plans[0].action).toBe("update");
  });

  it("leaves identical rows unchanged", () => {
    const existing = candidate();
    const plans = planImports([candidate()], [existing], parseImportOptions([]));

    expect(plans[0].action).toBe("unchanged");
  });

  it("treats undefined object keys like JSONB does", () => {
    const existing = candidate({ data: { id: "pad-1", slug: "pad-1" } });
    const incoming = candidate({
      data: { id: "pad-1", slug: "pad-1", optional: undefined },
    });

    const plans = planImports([incoming], [existing], parseImportOptions([]));

    expect(plans[0].action).toBe("unchanged");
  });

  it("skips existing rows in insert-only mode", () => {
    const options = parseImportOptions(["--mode=insert-only"]);
    const plans = planImports([candidate()], [candidate()], options);

    expect(plans[0].action).toBe("skip");
  });

  it("preserves the existing status unless forced", () => {
    const existing = candidate({ status: "draft" });
    const incoming = candidate({
      status: "published",
      data: { id: "pad-1", slug: "pad-1", changed: true },
    });

    const preserved = planImports([incoming], [existing], parseImportOptions([]));
    expect(preserved[0].desired.status).toBe("draft");

    const forced = planImports(
      [incoming],
      [existing],
      parseImportOptions(["--force-status"]),
    );
    expect(forced[0].desired.status).toBe("published");
  });

  it("reports slug conflicts instead of overwriting another row", () => {
    const existing = candidate({ id: "pad-2", slug: "pad-2" });
    const incoming = candidate({ id: "pad-1", slug: "pad-2" });

    const plans = planImports([incoming], [existing], parseImportOptions([]));

    expect(plans[0].action).toBe("conflict");
    expect(plans[0].reason).toContain("pad-2");
  });

  it("filters by --only", () => {
    const options = parseImportOptions(["--only=pad-2"]);
    const plans = planImports(
      [candidate({ id: "pad-1", slug: "pad-1" }), candidate({ id: "pad-2", slug: "pad-2" })],
      [],
      options,
    );

    expect(plans).toHaveLength(1);
    expect(plans[0].incoming.slug).toBe("pad-2");
  });
});

describe("summarizePlans", () => {
  it("counts each action", () => {
    const options = parseImportOptions([]);
    const plans = planImports(
      [candidate(), candidate({ id: "pad-2", slug: "pad-2" })],
      [candidate()],
      options,
    );

    expect(summarizePlans(plans)).toEqual({
      create: 1,
      update: 0,
      unchanged: 1,
      skip: 0,
      conflict: 0,
      total: 2,
    });
  });
});
