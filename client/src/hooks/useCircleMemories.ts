import { useQuery } from '@tanstack/react-query';

import { getCircleMemories } from '@/services/memories';
import type { Memory } from '@/types/memory';

export function useCircleMemories(circleId: number) {
  return useQuery<Memory[]>({
    queryKey: ['memories', circleId],
    queryFn: () => getCircleMemories(circleId),
    enabled: !!circleId,
  });
}