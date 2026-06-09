import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  updateCircle,
  type UpdateCirclePayload,
} from '@/services/circles';

export function useUpdateCircle(circleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCirclePayload) =>
      updateCircle(circleId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['circles'],
      });

      queryClient.invalidateQueries({
        queryKey: ['circle', String(circleId)],
      });
    },
  });
}