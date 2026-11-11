"use client";

import { mousepadSchema, type MousepadInput, type MousepadWriteInput } from "@/schemas/mousepad";
import { StructuredRecordEditor } from "./structured-record-editor";

type Props = {
  initialData: MousepadInput;
  initialStatus: MousepadWriteInput["status"];
  submitLabel: string;
  pending?: boolean;
  error?: string | null;
  imageUploadId: string;
  uploadEndpoint?: string;
  uploadFieldName?: string;
  cancelHref?: string;
  onSubmit: (payload: MousepadWriteInput) => void;
};

export function MousepadEditor({
  initialData,
  initialStatus,
  submitLabel,
  pending = false,
  error,
  imageUploadId,
  uploadEndpoint = "/api/admin/uploads/mousepads",
  uploadFieldName = "mousepadId",
  cancelHref = "/cms67/mousepads",
  onSubmit,
}: Props) {
  return (
    <StructuredRecordEditor
      schema={mousepadSchema}
      initialData={initialData}
      initialStatus={initialStatus}
      submitLabel={submitLabel}
      cancelHref={cancelHref}
      pending={pending}
      error={error}
      imageUpload={{
        id: imageUploadId,
        endpoint: uploadEndpoint,
        field: uploadFieldName,
      }}
      onSubmit={(payload) => onSubmit(payload as MousepadWriteInput)}
    />
  );
}
