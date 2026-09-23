"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminApiError } from "@/features/admin/api";
import { useAdminMe } from "@/features/admin/hooks";
import { createEmptyIem } from "@/features/admin/empty-iem";
import { IemEditor } from "@/features/admin/iem-editor";
import { useCreateIem } from "@/features/admin/iem-hooks";

export default function NewIemPage() {
    const router = useRouter(); const [uploadId] = useState(() => `new-${crypto.randomUUID()}`); const me = useAdminMe(); const create = useCreateIem();
    useEffect(() => { if (me.error instanceof AdminApiError && me.error.status === 401) router.replace("/cms67"); }, [me.error, router]);
    if (me.isLoading) return <p className="text-sm text-muted-foreground">Checking session...</p>;
    if (me.isError) return <p className="text-sm text-destructive">Could not verify session.</p>;
    return <div className="space-y-6"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">Catalog</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Add IEM</h2></div><IemEditor initialData={createEmptyIem()} initialStatus="draft" imageUploadId={uploadId} submitLabel="Create IEM" pending={create.isPending} error={create.error instanceof Error ? create.error.message : null} onSubmit={(payload) => create.mutate(payload, { onSuccess: () => router.push("/cms67/iems") })} /></div>;
}