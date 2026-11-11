"use client";

import { useRouter } from "next/navigation";

import { ComparisonEditor } from "@/features/admin/comparison-editor";
import { useCreateComparison } from "@/features/admin/editorial-hooks";

export default function NewComparisonPage() {
  const router = useRouter();
  const create = useCreateComparison();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
          Editorial
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          New comparison
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Compare two pads by slug. References are checked against mousepads and
          glasspads.
        </p>
      </div>

      <ComparisonEditor
        initialData={{ slug: "", title: "", leftSlug: "", rightSlug: "", excerpt: "", tags: [] }}
        initialStatus="draft"
        submitLabel="Create comparison"
        pending={create.isPending}
        error={create.error instanceof Error ? create.error.message : null}
        onSubmit={(payload) =>
          create.mutate(payload, {
            onSuccess: () => router.push("/cms67/comparisons"),
          })
        }
      />
    </div>
  );
}
