import { describe, expect, it } from "vitest";
import { artisanMousepads } from "./mousepads/artisan";
import { mousepads } from "./mousepads/mousepads";
import { mousepadSchema } from "@/schemas/mousepad";

describe("artisanMousepads", () => {
  it("accepts artisan zero soft", () => {
    const pad = artisanMousepads.find((p) => p.slug === "artisan-zero-soft");
    expect(pad).toBeDefined();
    const result = mousepadSchema.safeParse(pad);
    expect(result.success).toBe(true);
  });
});

describe("full mousepad catalog", () => {
  it("has at least one pad", () => {
    expect(mousepads.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = mousepads.map((pad) => pad.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has unique ids", () => {
    const ids = mousepads.map((pad) => pad.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("accepts every mousepad against mousepadSchema", () => {
    const failures: Array<{ slug: string; issues: string[] }> = [];

    for (const pad of mousepads) {
      const result = mousepadSchema.safeParse(pad);
      if (!result.success) {
        failures.push({
          slug: pad.slug,
          issues: result.error.issues.map(
            (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`,
          ),
        });
      }
    }

    if (failures.length > 0) {
      const summary = failures
        .slice(0, 15)
        .map((f) => `- ${f.slug}\n  ${f.issues.join("\n  ")}`)
        .join("\n");
      expect.fail(
        `${failures.length}/${mousepads.length} mousepads failed schema validation:\n${summary}`,
      );
    }

    expect(failures).toHaveLength(0);
  });
});
