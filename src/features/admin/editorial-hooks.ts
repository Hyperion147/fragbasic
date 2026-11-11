import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ComparisonWriteInput } from "@/schemas/comparison";
import type { BestPageWriteInput } from "@/schemas/best-page";
import type { GuideWriteInput } from "@/schemas/guide";
import {
  createBestPage,
  createComparison,
  createGuide,
  deleteBestPage,
  deleteComparison,
  deleteGuide,
  fetchAdminBestPage,
  fetchAdminBestPages,
  fetchAdminComparison,
  fetchAdminComparisons,
  fetchAdminGuide,
  fetchAdminGuides,
  updateBestPage,
  updateComparison,
  updateGuide,
} from "./editorial";
import { fetchAdminMousepads } from "./api";
import { fetchAdminGlasspads } from "./glasspad";

export const comparisonAdminKeys = {
  list: ["admin", "comparisons"] as const,
  item: (id: string) => ["admin", "comparisons", id] as const,
};

export const bestPageAdminKeys = {
  list: ["admin", "best-pages"] as const,
  item: (id: string) => ["admin", "best-pages", id] as const,
};

export const guideAdminKeys = {
  list: ["admin", "guides"] as const,
  item: (id: string) => ["admin", "guides", id] as const,
};

export function useAdminComparisons(enabled = true) {
  return useQuery({
    queryKey: comparisonAdminKeys.list,
    queryFn: fetchAdminComparisons,
    enabled,
    retry: false,
  });
}

export function useAdminComparison(id: string) {
  return useQuery({
    queryKey: comparisonAdminKeys.item(id),
    queryFn: () => fetchAdminComparison(id),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useCreateComparison() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: ComparisonWriteInput) => createComparison(payload),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: comparisonAdminKeys.list }),
  });
}

export function useUpdateComparison(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: ComparisonWriteInput) => updateComparison(id, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: comparisonAdminKeys.list }),
        client.invalidateQueries({ queryKey: comparisonAdminKeys.item(id) }),
      ]),
  });
}

export function useDeleteComparison() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteComparison,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: comparisonAdminKeys.list }),
  });
}

export function useAdminBestPages(enabled = true) {
  return useQuery({
    queryKey: bestPageAdminKeys.list,
    queryFn: fetchAdminBestPages,
    enabled,
    retry: false,
  });
}

export function useAdminBestPage(id: string) {
  return useQuery({
    queryKey: bestPageAdminKeys.item(id),
    queryFn: () => fetchAdminBestPage(id),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useCreateBestPage() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: BestPageWriteInput) => createBestPage(payload),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: bestPageAdminKeys.list }),
  });
}

export function useUpdateBestPage(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: BestPageWriteInput) => updateBestPage(id, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: bestPageAdminKeys.list }),
        client.invalidateQueries({ queryKey: bestPageAdminKeys.item(id) }),
      ]),
  });
}

export function useDeleteBestPage() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteBestPage,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: bestPageAdminKeys.list }),
  });
}

export function useAdminGuides(enabled = true) {
  return useQuery({
    queryKey: guideAdminKeys.list,
    queryFn: fetchAdminGuides,
    enabled,
    retry: false,
  });
}

export function useAdminGuide(id: string) {
  return useQuery({
    queryKey: guideAdminKeys.item(id),
    queryFn: () => fetchAdminGuide(id),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useCreateGuide() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: GuideWriteInput) => createGuide(payload),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: guideAdminKeys.list }),
  });
}

export function useUpdateGuide(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: GuideWriteInput) => updateGuide(id, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: guideAdminKeys.list }),
        client.invalidateQueries({ queryKey: guideAdminKeys.item(id) }),
      ]),
  });
}

export function useDeleteGuide() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteGuide,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: guideAdminKeys.list }),
  });
}

export function usePadSlugOptions(enabled = true) {
  return useQuery({
    queryKey: ["admin", "pad-slug-options"],
    enabled,
    retry: false,
    queryFn: async () => {
      const [soft, glass] = await Promise.all([
        fetchAdminMousepads(),
        fetchAdminGlasspads(),
      ]);
      return [...soft.mousepads, ...glass.glasspads]
        .map((row) => ({ slug: row.slug, name: `${row.brand} ${row.name}` }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });
}
