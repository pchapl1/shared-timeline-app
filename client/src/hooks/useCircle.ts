import { useQuery } from '@tanstack/react-query';

import { getCircle } from '@/services/circles';
import type { Circle } from '@/types/circle';

export function useCircle(circleId: string | undefined) {
  return useQuery<Circle>({
    queryKey: ['circle', circleId],
    queryFn: () => getCircle(circleId as string),
    enabled: !!circleId,
  });
}