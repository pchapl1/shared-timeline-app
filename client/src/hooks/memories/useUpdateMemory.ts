import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  updateMemory,
  type UpdateMemoryPayload,
} from '@/services/memories';

export function useUpdateMemory(
  circleId: number,
  memoryId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: UpdateMemoryPayload
    ) => updateMemory(memoryId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['memories', circleId],
      });

      queryClient.invalidateQueries({
        queryKey: ['memory', String(memoryId)],
      });
    },
  });
}