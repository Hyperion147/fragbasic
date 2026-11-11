"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { AdminApiError } from "@/features/admin/api";
import { ComparisonEditor } from "@/features/admin/comparison-editor";
import {
  useAdminComparison,
  useDeleteComparison,
  useUpdateComparison,
} from "@/features/admin/editorial-hooks";
import { useAdminMe } from "@/features/admin/hooks";

export default function EditComparisonPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const me = useAdminMe();
  const query = useAdminComparison(id);
  const update = useUpdateComparison(id);
  const remove = useDeleteComparison();

  useEffect(() => {
    const error = me.error ?? query.error;
    if (error instanceof AdminApiError && error.status === 401) {
      router.replace("/cms67");
    }
  }, [me.error, query.error, router]);

  if (me.isLoading || query.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading comparison...</p>;
  }
  if (me.isError || query.isError || !query.data?.comparison) {
    return (
      <p className="text-sm text-destructive">
        Could not load this comparison.
      </p>
    );
  }

  const row = query.data.comparison;

  function deleteRow() {
    if (window.confirm(`Delete ${row.title}?`)) {
      remove.mutate(id, { onSuccess: () => router.push("/cms67/comparisons") });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
            Editorial
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Edit {row.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{row.slug}</p>
        </div>
        <button
          type="button"
          className="text-sm text-destructive underline-offset-4 hover:underline"
          onClick={deleteRow}
          disabled={remove.isPending || update.isPending}
        >
          Delete
        </button>
      </div>

      <ComparisonEditor
        initialData={row.data}
        initialStatus={row.status}
        submitLabel="Save changes"
        pending={update.isPending || remove.isPending}
        error={
          update.error instanceof Error
            ? update.error.message
            : remove.error instanceof Error
              ? remove.error.message
              : null
        }
        onSubmit={(payload) =>
          update.mutate(payload, {
            onSuccess: () => router.push("/cms67/comparisons"),
          })
        }
      />
    </div>
  );
}
