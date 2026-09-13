import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MouseSkateWriteInput } from "@/schemas/accessory";
import { createAccessory, deleteAccessory, fetchAdminAccessory, fetchAdminAccessories, updateAccessory } from "./accessory";

export const accessoryAdminKeys = { list: ["admin", "accessories"] as const, item: (id: string) => ["admin", "accessories", id] as const };
export function useAdminAccessories(enabled = true) { return useQuery({ queryKey: accessoryAdminKeys.list, queryFn: fetchAdminAccessories, enabled, retry: false }); }
export function useAdminAccessory(id: string) { return useQuery({ queryKey: accessoryAdminKeys.item(id), queryFn: () => fetchAdminAccessory(id), enabled: Boolean(id), retry: false }); }
export function useCreateAccessory() { const client = useQueryClient(); return useMutation({ mutationFn: (payload: MouseSkateWriteInput) => createAccessory(payload), onSuccess: () => client.invalidateQueries({ queryKey: accessoryAdminKeys.list }) }); }
export function useUpdateAccessory(id: string) { const client = useQueryClient(); return useMutation({ mutationFn: (payload: MouseSkateWriteInput) => updateAccessory(id, payload), onSuccess: () => Promise.all([client.invalidateQueries({ queryKey: accessoryAdminKeys.list }), client.invalidateQueries({ queryKey: accessoryAdminKeys.item(id) })]) }); }
export function useDeleteAccessory() { const client = useQueryClient(); return useMutation({ mutationFn: deleteAccessory, onSuccess: () => client.invalidateQueries({ queryKey: accessoryAdminKeys.list }) }); }