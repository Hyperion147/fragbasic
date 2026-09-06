"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminApiError } from "@/features/admin/api";
import { createEmptyMousepad } from "@/features/admin/empty-mousepad";
import { MousepadEditor } from "@/features/admin/mousepad-editor";
import { useAdminMe, useCreateMousepad } from "@/features/admin/hooks";

export default function NewMousepadPage() {
    const router = useRouter();
    const [imageUploadId] = useState(() => `new-${crypto.randomUUID()}`);
    const me = useAdminMe();
    const create = useCreateMousepad();

    useEffect(() => {
        if (me.error instanceof AdminApiError && me.error.status === 401) router.replace("/cms67");
    }, [me.error, router]);

    if (me.isLoading) return <p className="text-sm text-muted-foreground">Checking session...</p>;
    if (me.isError) return <p className="text-sm text-destructive" role="alert">Could not verify session.</p>;

    return (
        <div className="space-y-6">
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">Catalog</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">Add mousepad</h2>
                <p className="mt-1 text-sm text-muted-foreground">Create a validated mousepad record.</p>
            </div>
            <MousepadEditor
                initialData={createEmptyMousepad()}
                initialStatus="draft"
                imageUploadId={imageUploadId}
                submitLabel="Create mousepad"
                pending={create.isPending}
                error={create.error instanceof Error ? create.error.message : null}
                onSubmit={(payload) => create.mutate(payload, { onSuccess: () => router.push("/cms67/mousepads") })}
            />
        </div>
    );
}