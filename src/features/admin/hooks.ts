import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createMousepad,
    deleteMousepad,
    fetchAdminMe,
    fetchAdminMousepad,
    fetchAdminMousepads,
    updateMousepad,
} from "./api";
import { MousepadWriteInput } from "@/schemas/mousepad";

export const adminKeys = {
    me: ["admin", "me"] as const,
    mousepads: ["admin", "mousepads"] as const,
    mousepad: (id: string) => ["admin", "mousepads", id] as const,
};

export function useAdminMe() {
    return useQuery({
        queryKey: adminKeys.me,
        queryFn: fetchAdminMe,
        retry: false,
        staleTime: 30_000,
    });
}

export function useAdminMousepads(enabled = true) {
    return useQuery({
        queryKey: adminKeys.mousepads,
        queryFn: fetchAdminMousepads,
        enabled,
        retry: false,
        staleTime: 15_000,
    });
}

export function useCreateMousepad() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (payload: MousepadWriteInput) => createMousepad(payload),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: adminKeys.mousepads });
        },
    });
}

export function useAdminMousepad(id: string) {
    return useQuery({
        queryKey: adminKeys.mousepad(id),
        queryFn: () => fetchAdminMousepad(id),
        enabled: Boolean(id),
        retry: false,
    });
}

export function useUpdateMousepad(id: string) {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (payload: MousepadWriteInput) => updateMousepad(id, payload),
        onSuccess: async () => {
            await Promise.all([
                qc.invalidateQueries({ queryKey: adminKeys.mousepads }),
                qc.invalidateQueries({ queryKey: adminKeys.mousepad(id) }),
            ]);
        },
    });
}

export function useDeleteMousepad() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteMousepad(id),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: adminKeys.mousepads });
        },
    });
}
