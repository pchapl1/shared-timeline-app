import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCircle } from '@/services/circles';

export function useRestoreCircle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (circleId: number) =>
      updateCircle(circleId, {
        is_archived: false,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['circles'],
      });
    },
  });
}