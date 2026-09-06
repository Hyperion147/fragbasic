"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminApiError } from "@/features/admin/api";
import { useAdminMe } from "@/features/admin/hooks";
import { IemEditor } from "@/features/admin/iem-editor";
import { useAdminIem, useDeleteIem, useUpdateIem } from "@/features/admin/iem-hooks";

export default function EditIemPage() {
    const { id } = useParams<{ id: string }>(); const router = useRouter(); const me = useAdminMe(); const query = useAdminIem(id); const update = useUpdateIem(id); const remove = useDeleteIem();
    useEffect(() => { const error = me.error ?? query.error; if (error instanceof AdminApiError && error.status === 401) router.replace("/cms67"); }, [me.error, query.error, router]);
    if (me.isLoading || query.isLoading) return <p className="text-sm text-muted-foreground">Loading IEM...</p>;
    if (me.isError || query.isError || !query.data?.iem) return <p className="text-sm text-destructive">Could not load this IEM.</p>;
    const row = query.data.iem;
    function deleteRow() { if (window.confirm(`Delete ${row.name}?`)) remove.mutate(id, { onSuccess: () => router.push("/cms67/iems") }); }
    return <div className="space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">Catalog</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Edit {row.name}</h2><p className="mt-1 text-sm text-muted-foreground">{row.brand} · {row.slug}</p></div><button type="button" className="text-sm text-destructive underline-offset-4 hover:underline" onClick={deleteRow} disabled={remove.isPending || update.isPending}>Delete</button></div><IemEditor initialData={row.data} initialStatus={row.status} imageUploadId={id} submitLabel="Save changes" pending={update.isPending || remove.isPending} error={update.error instanceof Error ? update.error.message : remove.error instanceof Error ? remove.error.message : null} onSubmit={(payload) => update.mutate(payload)} /></div>;
}