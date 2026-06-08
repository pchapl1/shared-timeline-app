import { useQuery } from '@tanstack/react-query';

import { getTrips } from '@/services/trips';

export function useTrips(circleId: number) {
  return useQuery({
    queryKey: ['trips', circleId],
    queryFn: () => getTrips(circleId),
    enabled: !!circleId,
  });
}