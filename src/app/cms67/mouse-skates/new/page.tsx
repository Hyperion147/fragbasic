"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminApiError } from "@/features/admin/api";
import { useAdminMe } from "@/features/admin/hooks";
import { AccessoryEditor } from "@/features/admin/accessory-editor";
import { createEmptyAccessory } from "@/features/admin/empty-accessory";
import { useCreateAccessory } from "@/features/admin/accessory-hooks";

export default function NewMouseSkatePage() {
  const router = useRouter(); const me = useAdminMe(); const create = useCreateAccessory();
  useEffect(() => { if (me.error instanceof AdminApiError && me.error.status === 401) router.replace("/cms67"); }, [me.error, router]);
  if (me.isLoading) return <p className="text-sm text-muted-foreground">Checking session...</p>;
  if (me.isError) return <p className="text-sm text-destructive">Could not verify session.</p>;
  return <div className="space-y-6"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">Catalog</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Add mouse-skate</h2></div><AccessoryEditor initialData={createEmptyAccessory()} initialStatus="draft" submitLabel="Create mouse-skate" pending={create.isPending} error={create.error instanceof Error ? create.error.message : null} onSubmit={(payload) => create.mutate(payload, { onSuccess: () => router.push("/cms67/mouse-skates") })} /></div>;
}