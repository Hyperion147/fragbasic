"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { AdminApiError } from "@/features/admin/api";
import { GuideEditor } from "@/features/admin/guide-editor";
import {
  useAdminGuide,
  useDeleteGuide,
  useUpdateGuide,
} from "@/features/admin/editorial-hooks";
import { useAdminMe } from "@/features/admin/hooks";

export default function EditGuidePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const me = useAdminMe();
  const query = useAdminGuide(id);
  const update = useUpdateGuide(id);
  const remove = useDeleteGuide();

  useEffect(() => {
    const error = me.error ?? query.error;
    if (error instanceof AdminApiError && error.status === 401) {
      router.replace("/cms67");
    }
  }, [me.error, query.error, router]);

  if (me.isLoading || query.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading guide...</p>;
  }
  if (me.isError || query.isError || !query.data?.guide) {
    return (
      <p className="text-sm text-destructive">Could not load this guide.</p>
    );
  }

  const row = query.data.guide;

  function deleteRow() {
    if (window.confirm(`Delete ${row.title}?`)) {
      remove.mutate(id, { onSuccess: () => router.push("/cms67/guides") });
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
        <div className="flex items-center gap-3">
          {row.status === "published" ? (
            <Link
              href={`/mousepads/guides/${row.slug}`}
              target="_blank"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              View live
            </Link>
          ) : null}
          <button
            type="button"
            className="text-sm text-destructive underline-offset-4 hover:underline"
            onClick={deleteRow}
            disabled={remove.isPending || update.isPending}
          >
            Delete
          </button>
        </div>
      </div>

      <GuideEditor
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
            onSuccess: () => router.push("/cms67/guides"),
          })
        }
      />
    </div>
  );
}
