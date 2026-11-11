"use client";

import { mouseSkateSchema, type MouseSkateWriteInput } from "@/schemas/accessory";
import { StructuredRecordEditor } from "./structured-record-editor";

type Props = {
  initialData: Record<string, unknown>;
  initialStatus: MouseSkateWriteInput["status"];
  submitLabel: string;
  pending?: boolean;
  error?: string | null;
  cancelHref?: string;
  onSubmit: (payload: MouseSkateWriteInput) => void;
};

export function AccessoryEditor({
  initialData,
  initialStatus,
  submitLabel,
  pending = false,
  error,
  cancelHref = "/cms67/mouse-skates",
  onSubmit,
}: Props) {
  return (
    <StructuredRecordEditor
      schema={mouseSkateSchema}
      initialData={initialData}
      initialStatus={initialStatus}
      submitLabel={submitLabel}
      cancelHref={cancelHref}
      pending={pending}
      error={error}
      onSubmit={(payload) => onSubmit(payload as MouseSkateWriteInput)}
    />
  );
}
