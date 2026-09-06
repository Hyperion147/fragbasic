"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mousepadSchema, type MousepadInput, type MousepadWriteInput } from "@/schemas/mousepad";
import { slugifyPad } from "./empty-mousepad";

type Props = {
    initialData: MousepadInput;
    initialStatus: MousepadWriteInput["status"];
    submitLabel: string;
    pending?: boolean;
    error?: string | null;
    imageUploadId: string;
    onSubmit: (payload: MousepadWriteInput) => void;
};

export function MousepadEditor({
    initialData,
    initialStatus,
    submitLabel,
    pending = false,
    error,
    imageUploadId,
    onSubmit,
}: Props) {
    const [data, setData] = useState(() => JSON.stringify(initialData, null, 2));
    const [id, setId] = useState(initialData.id);
    const [status, setStatus] = useState<MousepadWriteInput["status"]>(initialStatus);
    const [jsonError, setJsonError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let parsed: unknown;
        try {
            parsed = JSON.parse(data);
        } catch {
            setJsonError("Catalog JSON is not valid JSON.");
            return;
        }

        const result = mousepadSchema.safeParse(parsed);
        if (!result.success) {
            setJsonError(result.error.issues[0]?.message ?? "Catalog JSON is invalid.");
            return;
        }

        if (result.data.id !== id) {
            setJsonError("The ID field above must match data.id in the JSON.");
            return;
        }

        setJsonError(null);
        onSubmit({ status, data: result.data });
    }

    function fillSlug() {
        try {
            const parsed = JSON.parse(data) as Partial<MousepadInput>;
            const slug = slugifyPad(parsed.brand ?? "", parsed.name ?? "");
            setData(JSON.stringify({ ...parsed, slug }, null, 2));
        } catch {
            setJsonError("Fix the JSON before generating a slug.");
        }
    }

    async function uploadMainImage(file: File | undefined) {
        if (!file) return;
        setUploading(true);
        setJsonError(null);
        try {
            const formData = new FormData();
            formData.append("mousepadId", imageUploadId);
            formData.append("file", file);
            const response = await fetch("/api/admin/uploads/mousepads", {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const result = (await response.json()) as { url?: string; error?: string };
            if (!response.ok || !result.url) throw new Error(result.error ?? "Image upload failed");

            const parsed = JSON.parse(data) as Partial<MousepadInput>;
            setData(JSON.stringify({ ...parsed, images: { ...parsed.images, main: result.url } }, null, 2));
        } catch (uploadError) {
            setJsonError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
        } finally {
            setUploading(false);
        }
    }

    return (
        <form className="space-y-6" onSubmit={onFormSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                    <span className="font-medium">Database ID</span>
                    <Input value={id} onChange={(event) => setId(event.target.value)} required disabled={pending} />
                </label>
                <label className="space-y-2 text-sm">
                    <span className="font-medium">Status</span>
                    <select
                        className="flex h-10 w-full rounded-md border-0 bg-background/88 px-3 py-2 text-sm shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_8%,transparent)] outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                        value={status}
                        onChange={(event) => setStatus(event.target.value as MousepadWriteInput["status"])}
                        disabled={pending}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </label>
            </div>

            <div className="space-y-2">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <label htmlFor="mousepad-json" className="text-sm font-medium">Mousepad data</label>
                        <p className="mt-1 text-xs text-muted-foreground">Edit the complete record. It must match the mousepad schema.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={fillSlug} disabled={pending || uploading}>Generate slug</Button>
                        <label className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-transparent bg-background/78 px-3 text-xs font-medium shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_8%,transparent)] hover:bg-muted has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50">
                            {uploading ? "Uploading..." : "Upload main image"}
                            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => void uploadMainImage(event.target.files?.[0])} disabled={pending || uploading} />
                        </label>
                    </div>
                </div>
                <textarea
                    id="mousepad-json"
                    className="min-h-[38rem] w-full rounded-md border-0 bg-background/88 p-4 font-mono text-xs leading-5 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_8%,transparent)] outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                    value={data}
                    onChange={(event) => setData(event.target.value)}
                    spellCheck={false}
                    disabled={pending || uploading}
                    required
                />
            </div>

            {jsonError || error ? <p className="text-sm text-destructive" role="alert">{jsonError ?? error}</p> : null}

            <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="outline" asChild>
                    <Link href="/cms67/mousepads">Cancel</Link>
                </Button>
                <Button type="submit" disabled={pending}>{pending ? "Saving..." : submitLabel}</Button>
            </div>
        </form>
    );
}