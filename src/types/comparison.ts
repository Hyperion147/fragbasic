import type { ComparisonDataInput } from "@/schemas/comparison";

export type ComparisonStatus = "published" | "draft";

export type MousepadComparison = ComparisonDataInput & {
  status: ComparisonStatus;
};
