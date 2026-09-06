"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IemWriteInput } from "@/schemas/iem";
import { uploadIemImage } from "./iem";

type Props = { initialData: Record<string, unknown>; initialStatus: IemWriteInput["status"]; imageUploadId: string; submitLabel: string; pending?: boolean; error?: string | null; onSubmit: (payload: IemWriteInput) => void };

export function IemEditor({ initialData, initialStatus, imageUploadId, submitLabel, pending = false, error, onSubmit }: Props) {
    const [data, setData] = useState(() => JSON.stringify(initialData, null, 2));
    const [id, setId] = useState(String(initialData.id ?? ""));
    const [status, setStatus] = useState<IemWriteInput["status"]>(initialStatus);
    const [message, setMessage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const parsed = JSON.parse(data) as Record<string, unknown>;
            if (typeof parsed.id !== "string" || parsed.id !== id) throw new Error("The ID field must match data.id.");
            if (typeof parsed.slug !== "string" || typeof parsed.brand !== "string" || typeof parsed.name !== "string" || typeof parsed.images !== "object" || !parsed.images) throw new Error("IEM JSON requires id, slug, brand, name, and images.");
            if (typeof (parsed.images as Record<string, unknown>).main !== "string") throw new Error("IEM images.main is required.");
            setMessage(null);
            onSubmit({ status, data: parsed as IemWriteInput["data"] });
        } catch (parseError) {
            setMessage(parseError instanceof Error ? parseError.message : "IEM JSON is invalid.");
        }
    }

    async function upload(file: File | undefined) {
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadIemImage(imageUploadId, file);
            const parsed = JSON.parse(data) as Record<string, unknown>;
            setData(JSON.stringify({ ...parsed, images: { ...(parsed.images as object), main: url } }, null, 2));
            setMessage(null);
        } catch (uploadError) { setMessage(uploadError instanceof Error ? uploadError.message : "Image upload failed."); }
        finally { setUploading(false); }
    }

    return <form className="space-y-6" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm"><span className="font-medium">Database ID</span><Input value={id} onChange={(event) => setId(event.target.value)} required disabled={pending} /></label>
            <label className="space-y-2 text-sm"><span className="font-medium">Status</span><select className="h-10 w-full rounded-md bg-background/88 px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value as IemWriteInput["status"])} disabled={pending}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-2"><div><label htmlFor="iem-json" className="text-sm font-medium">IEM data</label><p className="mt-1 text-xs text-muted-foreground">Edit the complete IEM record as JSON.</p></div><label className="inline-flex h-8 cursor-pointer items-center rounded-md border border-transparent bg-background/78 px-3 text-xs font-medium shadow-sm has-[input:disabled]:opacity-50">{uploading ? "Uploading..." : "Upload main image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => void upload(event.target.files?.[0])} disabled={pending || uploading} /></label></div>
        <textarea id="iem-json" className="min-h-[38rem] w-full rounded-md bg-background/88 p-4 font-mono text-xs leading-5 shadow-sm outline-none" value={data} onChange={(event) => setData(event.target.value)} spellCheck={false} disabled={pending || uploading} required />
        {message || error ? <p className="text-sm text-destructive" role="alert">{message ?? error}</p> : null}
        <div className="flex justify-end gap-2"><Button type="button" variant="outline" asChild><Link href="/cms67/iems">Cancel</Link></Button><Button type="submit" disabled={pending || uploading}>{pending ? "Saving..." : submitLabel}</Button></div>
    </form>;
}