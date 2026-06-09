import { useQuery } from '@tanstack/react-query';

import { getTrip } from '@/services/trips';

export function useTrip(tripId: number) {
  return useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => getTrip(tripId),
    enabled: !!tripId,
  });
}