import { useInfiniteQuery } from '@tanstack/react-query';
import { getCircleMemories } from '@/services/memories';
import type { Memory } from '@/types/memory';

type PaginatedMemoriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Memory[];
};

export function useCircleMemories(circleId: number) {
  return useInfiniteQuery<PaginatedMemoriesResponse>({
    queryKey: ['memories', circleId],
    queryFn: ({ pageParam = 1 }) =>
      getCircleMemories(circleId, Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) {
        return undefined;
      }

      return allPages.length + 1;
    },
    enabled: !!circleId,
  });
}