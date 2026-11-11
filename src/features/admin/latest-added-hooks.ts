import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { LatestAddedWriteInput } from "@/schemas/latest-added";
import { fetchAdminLatestAdded, updateLatestAdded } from "./latest-added";

export const latestAddedAdminKeys = {
  item: ["admin", "latest-added"] as const,
};

export function useAdminLatestAdded(enabled = true) {
  return useQuery({
    queryKey: latestAddedAdminKeys.item,
    queryFn: fetchAdminLatestAdded,
    enabled,
    retry: false,
  });
}

export function useUpdateLatestAdded() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: LatestAddedWriteInput) => updateLatestAdded(payload),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: latestAddedAdminKeys.item }),
  });
}
