"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MouseSkateWriteInput } from "@/schemas/accessory";

type Props = { initialData: Record<string, unknown>; initialStatus: MouseSkateWriteInput["status"]; submitLabel: string; pending?: boolean; error?: string | null; onSubmit: (payload: MouseSkateWriteInput) => void };

export function AccessoryEditor({ initialData, initialStatus, submitLabel, pending = false, error, onSubmit }: Props) {
  const [data, setData] = useState(() => JSON.stringify(initialData, null, 2));
  const [id, setId] = useState(String(initialData.id ?? ""));
  const [status, setStatus] = useState<MouseSkateWriteInput["status"]>(initialStatus);
  const [message, setMessage] = useState<string | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const parsed = JSON.parse(data) as Record<string, unknown>;
      if (typeof parsed.id !== "string" || parsed.id !== id) throw new Error("The ID field must match data.id.");
      if (typeof parsed.slug !== "string" || typeof parsed.brand !== "string" || typeof parsed.name !== "string" || typeof parsed.series !== "string") throw new Error("Mouse-skate JSON requires id, slug, brand, name, and series.");
      setMessage(null); onSubmit({ status, data: parsed as MouseSkateWriteInput["data"] });
    } catch (parseError) { setMessage(parseError instanceof Error ? parseError.message : "Mouse-skate JSON is invalid."); }
  }
  return <form className="space-y-6" onSubmit={submit}>
    <div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm"><span className="font-medium">Database ID</span><Input value={id} onChange={(event) => setId(event.target.value)} required disabled={pending} /></label><label className="space-y-2 text-sm"><span className="font-medium">Status</span><select className="h-10 w-full rounded-md bg-background/88 px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value as MouseSkateWriteInput["status"])} disabled={pending}><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
    <div><label htmlFor="accessory-json" className="text-sm font-medium">Mouse-skate data</label><p className="mt-1 text-xs text-muted-foreground">Edit the complete mouse-skate record as JSON.</p></div>
    <textarea id="accessory-json" className="min-h-[38rem] w-full rounded-md bg-background/88 p-4 font-mono text-xs leading-5 shadow-sm outline-none" value={data} onChange={(event) => setData(event.target.value)} spellCheck={false} disabled={pending} required />
    {message || error ? <p className="text-sm text-destructive" role="alert">{message ?? error}</p> : null}
    <div className="flex justify-end gap-2"><Button type="button" variant="outline" asChild><Link href="/cms67/mouse-skates">Cancel</Link></Button><Button type="submit" disabled={pending}>{pending ? "Saving..." : submitLabel}</Button></div>
  </form>;
}