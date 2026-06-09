import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTrip } from '@/services/trips';

import type { Trip } from '@/types/trip';

import type { UpdateTripPayload } from '@/types/trip';

export function useUpdateTrip(
  circleId: number,
  tripId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTripPayload) =>
      updateTrip(tripId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trips', circleId],
      });

      queryClient.invalidateQueries({
        queryKey: ['trip', tripId],
      });
    },
  });
}