import { useQuery } from '@tanstack/react-query';

import { getTrips } from '@/services/trips';

export function useTrips(circleId?: number) {
  return useQuery({
    queryKey: circleId ? ['trips', circleId] : ['trips'],
    queryFn: () => getTrips(circleId),
  });
}