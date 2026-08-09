import { useQuery } from "@tanstack/react-query";
import { fetchAdminMe, fetchAdminMousepads } from "./api";

export const adminKeys = {
    me: ["admin", "me"] as const,
    mousepads: ["admin", "mousepads"] as const,
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
