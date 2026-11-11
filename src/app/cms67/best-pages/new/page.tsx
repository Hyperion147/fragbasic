"use client";

import { useRouter } from "next/navigation";

import { BestPageEditor } from "@/features/admin/best-page-editor";
import { useCreateBestPage } from "@/features/admin/editorial-hooks";

export default function NewBestPagePage() {
  const router = useRouter();
  const create = useCreateBestPage();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
          Editorial
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          New best page
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Build a buying guide and link its picks to catalog pads.
        </p>
      </div>

      <BestPageEditor
        initialData={{
          slug: "",
          title: "",
          eyebrow: "",
          description: "",
          badge: "",
          hero: "",
          thesis: "",
          story: [],
          rules: [],
          pickSlugs: [],
          keywords: [],
        }}
        initialStatus="draft"
        submitLabel="Create best page"
        pending={create.isPending}
        error={create.error instanceof Error ? create.error.message : null}
        onSubmit={(payload) =>
          create.mutate(payload, {
            onSuccess: () => router.push("/cms67/best-pages"),
          })
        }
      />
    </div>
  );
}
