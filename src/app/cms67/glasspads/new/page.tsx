"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminApiError } from "@/features/admin/api";
import { useAdminMe } from "@/features/admin/hooks";
import { createEmptyGlasspad } from "@/features/admin/empty-glasspad";
import { MousepadEditor } from "@/features/admin/mousepad-editor";
import { useCreateGlasspad } from "@/features/admin/glasspad-hooks";

export default function NewGlasspadPage() {
  const router = useRouter(); const [uploadId] = useState(() => `new-${crypto.randomUUID()}`); const me = useAdminMe(); const create = useCreateGlasspad();
  useEffect(() => { if (me.error instanceof AdminApiError && me.error.status === 401) router.replace("/cms67"); }, [me.error, router]);
  if (me.isLoading) return <p className="text-sm text-muted-foreground">Checking session...</p>;
  if (me.isError) return <p className="text-sm text-destructive">Could not verify session.</p>;
  return <div className="space-y-6"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">Catalog</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Add glasspad</h2></div><MousepadEditor initialData={createEmptyGlasspad()} initialStatus="draft" imageUploadId={uploadId} uploadEndpoint="/api/admin/uploads/glasspads" cancelHref="/cms67/glasspads" submitLabel="Create glasspad" pending={create.isPending} error={create.error instanceof Error ? create.error.message : null} onSubmit={(payload) => create.mutate(payload, { onSuccess: () => router.push("/cms67/glasspads") })} /></div>;
}