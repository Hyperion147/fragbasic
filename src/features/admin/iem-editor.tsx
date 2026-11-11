"use client";

import { iemSchema, type IemWriteInput } from "@/schemas/iem";
import { StructuredRecordEditor } from "./structured-record-editor";

type Props = {
  initialData: Record<string, unknown>;
  initialStatus: IemWriteInput["status"];
  imageUploadId: string;
  uploadEndpoint?: string;
  uploadFieldName?: string;
  submitLabel: string;
  pending?: boolean;
  error?: string | null;
  cancelHref?: string;
  onSubmit: (payload: IemWriteInput) => void;
};

export function IemEditor({
  initialData,
  initialStatus,
  imageUploadId,
  uploadEndpoint = "/api/admin/uploads/iems",
  uploadFieldName = "iemId",
  submitLabel,
  pending = false,
  error,
  cancelHref = "/cms67/iems",
  onSubmit,
}: Props) {
  return (
    <StructuredRecordEditor
      schema={iemSchema}
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
      onSubmit={(payload) => onSubmit(payload as IemWriteInput)}
    />
  );
}
