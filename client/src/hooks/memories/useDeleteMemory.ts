import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMemory } from '@/services/memories';

export function useDeleteMemory(
  circleId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memoryId: number) =>
      deleteMemory(memoryId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['memories', circleId],
      });
    },
  });
}