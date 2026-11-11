"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  latestAddedGlasspadSlugs,
  latestAddedIemSlugs,
  latestAddedMousepadSlugs,
} from "@/data/latest-added";
import { AdminApiError } from "@/features/admin/api";
import { useAdminMe } from "@/features/admin/hooks";
import { LatestAddedEditor } from "@/features/admin/latest-added-editor";
import {
  useAdminLatestAdded,
  useUpdateLatestAdded,
} from "@/features/admin/latest-added-hooks";
import { latestAddedDataSchema } from "@/schemas/latest-added";

const fallback = {
  mousepads: [...latestAddedMousepadSlugs],
  glasspads: [...latestAddedGlasspadSlugs],
  iems: [...latestAddedIemSlugs],
};

export default function CmsLatestAddedPage() {
  const router = useRouter();
  const me = useAdminMe();
  const query = useAdminLatestAdded(me.isSuccess);
  const update = useUpdateLatestAdded();

  useEffect(() => {
    const error = me.error ?? query.error;
    if (error instanceof AdminApiError && error.status === 401) {
      router.replace("/cms67");
    }
  }, [me.error, query.error, router]);

  if (me.isLoading || (me.isSuccess && query.isLoading)) {
    return <p className="text-sm text-muted-foreground">Loading latest added...</p>;
  }
  if (me.isError || query.isError) {
    return (
      <p className="text-sm text-destructive" role="alert">
        Could not load the latest-added list.
      </p>
    );
  }

  const row = query.data?.latestAdded ?? null;
  const parsed = latestAddedDataSchema.safeParse(row?.data);
  const initialData = parsed.success ? parsed.data : fallback;
  const savedAt = row?.updatedAt
    ? new Date(row.updatedAt).toLocaleString()
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
            Site
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Latest added
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Curated product slugs highlighted on the home page.
            {savedAt ? ` Last saved ${savedAt}.` : " Not imported yet."}
          </p>
        </div>
      </div>

      <LatestAddedEditor
        initialData={initialData}
        submitLabel="Save latest added"
        pending={update.isPending}
        error={update.error instanceof Error ? update.error.message : null}
        onSubmit={(payload) => update.mutate(payload)}
      />
    </div>
  );
}
