import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IemWriteInput } from "@/schemas/iem";
import { createIem, deleteIem, fetchAdminIem, fetchAdminIems, updateIem } from "./iem";

export const iemAdminKeys = {
    list: ["admin", "iems"] as const,
    item: (id: string) => ["admin", "iems", id] as const,
};

export function useAdminIems(enabled = true) { return useQuery({ queryKey: iemAdminKeys.list, queryFn: fetchAdminIems, enabled, retry: false }); }
export function useAdminIem(id: string) { return useQuery({ queryKey: iemAdminKeys.item(id), queryFn: () => fetchAdminIem(id), enabled: Boolean(id), retry: false }); }
export function useCreateIem() {
    const client = useQueryClient();
    return useMutation({ mutationFn: (payload: IemWriteInput) => createIem(payload), onSuccess: () => client.invalidateQueries({ queryKey: iemAdminKeys.list }) });
}
export function useUpdateIem(id: string) {
    const client = useQueryClient();
    return useMutation({ mutationFn: (payload: IemWriteInput) => updateIem(id, payload), onSuccess: () => Promise.all([client.invalidateQueries({ queryKey: iemAdminKeys.list }), client.invalidateQueries({ queryKey: iemAdminKeys.item(id) })]) });
}
export function useDeleteIem() {
    const client = useQueryClient();
    return useMutation({ mutationFn: deleteIem, onSuccess: () => client.invalidateQueries({ queryKey: iemAdminKeys.list }) });
}