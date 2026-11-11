"use client";

import { useRouter } from "next/navigation";

import { GuideEditor } from "@/features/admin/guide-editor";
import { useCreateGuide } from "@/features/admin/editorial-hooks";

export default function NewGuidePage() {
  const router = useRouter();
  const create = useCreateGuide();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
          Editorial
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          New guide
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Write a long-form guide and link it to catalog pads.
        </p>
      </div>

      <GuideEditor
        initialData={{
          slug: "",
          title: "",
          eyebrow: "",
          description: "",
          category: "",
          readingTime: 5,
          publishedAt: new Date().toISOString().slice(0, 10),
          intro: "",
          sections: [],
          takeaways: [],
          relatedPadSlugs: [],
          keywords: [],
        }}
        initialStatus="draft"
        submitLabel="Create guide"
        pending={create.isPending}
        error={create.error instanceof Error ? create.error.message : null}
        onSubmit={(payload) =>
          create.mutate(payload, {
            onSuccess: () => router.push("/cms67/guides"),
          })
        }
      />
    </div>
  );
}
