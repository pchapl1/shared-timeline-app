import { useInfiniteQuery } from '@tanstack/react-query';

import { getActivities } from '@/services/activities';
import type { Activity } from '@/types/activity';

type PaginatedActivitiesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Activity[];
};

export function useActivities() {
  return useInfiniteQuery<PaginatedActivitiesResponse>({
    queryKey: ['activities'],
    queryFn: ({ pageParam = 1 }) =>
      getActivities(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
}