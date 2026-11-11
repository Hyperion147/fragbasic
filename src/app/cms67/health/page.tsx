"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AdminApiError } from "@/features/admin/api";
import { CatalogHealthPanel } from "@/features/admin/catalog-health-panel";
import { useAdminMe } from "@/features/admin/hooks";

export default function CmsHealthPage() {
  const router = useRouter();
  const me = useAdminMe();

  useEffect(() => {
    if (me.error instanceof AdminApiError && me.error.status === 401) {
      router.replace("/cms67");
    }
  }, [me.error, router]);

  if (me.isLoading) {
    return <p className="text-sm text-muted-foreground">Checking session...</p>;
  }
  if (me.isError) {
    return (
      <p className="text-sm text-destructive" role="alert">
        Could not verify session.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
          Operations
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          Catalog health
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Schema, image URL, reference, and source-flag checks for every
          table-backed module.
        </p>
      </div>

      <CatalogHealthPanel />
    </div>
  );
}
