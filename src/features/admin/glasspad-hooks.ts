import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MousepadWriteInput } from "@/schemas/mousepad";
import { createGlasspad, deleteGlasspad, fetchAdminGlasspad, fetchAdminGlasspads, updateGlasspad } from "./glasspad";

export const glasspadAdminKeys = { list: ["admin", "glasspads"] as const, item: (id: string) => ["admin", "glasspads", id] as const };
export function useAdminGlasspads(enabled = true) { return useQuery({ queryKey: glasspadAdminKeys.list, queryFn: fetchAdminGlasspads, enabled, retry: false }); }
export function useAdminGlasspad(id: string) { return useQuery({ queryKey: glasspadAdminKeys.item(id), queryFn: () => fetchAdminGlasspad(id), enabled: Boolean(id), retry: false }); }
export function useCreateGlasspad() { const client = useQueryClient(); return useMutation({ mutationFn: (payload: MousepadWriteInput) => createGlasspad(payload), onSuccess: () => client.invalidateQueries({ queryKey: glasspadAdminKeys.list }) }); }
export function useUpdateGlasspad(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (payload: MousepadWriteInput) => updateGlasspad(id, payload), onSuccess: () => Promise.all([client.invalidateQueries({ queryKey: glasspadAdminKeys.list }), client.invalidateQueries({ queryKey: glasspadAdminKeys.item(id) })]) }); }
export function useDeleteGlasspad() { const client = useQueryClient(); return useMutation({ mutationFn: deleteGlasspad, onSuccess: () => client.invalidateQueries({ queryKey: glasspadAdminKeys.list }) }); }