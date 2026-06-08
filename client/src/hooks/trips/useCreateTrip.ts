import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTrip } from '@/services/trips';

export function useCreateTrip(circleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      // Refresh this circle's trip list after a successful create.
      queryClient.invalidateQueries({
        queryKey: ['trips', circleId],
      });
    },
  });
}