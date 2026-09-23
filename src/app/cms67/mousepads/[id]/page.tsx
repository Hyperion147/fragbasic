"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { AdminApiError } from "@/features/admin/api";
import { MousepadEditor } from "@/features/admin/mousepad-editor";
import { useAdminMe, useAdminMousepad, useDeleteMousepad, useUpdateMousepad } from "@/features/admin/hooks";

export default function EditMousepadPage() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();
    const me = useAdminMe();
    const query = useAdminMousepad(id);
    const update = useUpdateMousepad(id);
    const remove = useDeleteMousepad();

    useEffect(() => {
        const error = me.error ?? query.error;
        if (error instanceof AdminApiError && error.status === 401) router.replace("/cms67");
    }, [me.error, query.error, router]);

    if (me.isLoading || query.isLoading) return <p className="text-sm text-muted-foreground">Loading mousepad...</p>;
    if (me.isError || query.isError || !query.data?.mousepad) {
        return <p className="text-sm text-destructive" role="alert">Could not load this mousepad.</p>;
    }

    const row = query.data.mousepad;
    if (!row.data || typeof row.data !== "object") {
        return <p className="text-sm text-destructive" role="alert">This row contains invalid catalog data.</p>;
    }

    function deleteRow() {
        if (!window.confirm(`Delete ${row.name}?`)) return;
        remove.mutate(id, { onSuccess: () => router.push("/cms67/mousepads") });
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">Catalog</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">Edit {row.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{row.brand} · {row.slug}</p>
                </div>
                <button type="button" className="text-sm text-destructive underline-offset-4 hover:underline disabled:opacity-50" onClick={deleteRow} disabled={remove.isPending || update.isPending}>Delete</button>
            </div>
            <MousepadEditor
                initialData={row.data as never}
                initialStatus={row.status}
                imageUploadId={id}
                submitLabel="Save changes"
                pending={update.isPending || remove.isPending}
                error={update.error instanceof Error ? update.error.message : remove.error instanceof Error ? remove.error.message : null}
                onSubmit={(payload) => update.mutate(payload)}
            />
        </div>
    );
}