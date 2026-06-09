import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTrip } from '@/services/trips';

export function useDeleteTrip(circleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tripId: number) => deleteTrip(tripId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trips', circleId],
      });
    },
  });
}