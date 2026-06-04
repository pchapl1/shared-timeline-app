import { useInfiniteQuery } from '@tanstack/react-query';

import { getNotifications } from '@/services/notifications';
import type { Notification } from '@/types/notification';

type PaginatedNotificationsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notification[];
};

export function useNotifications() {
  return useInfiniteQuery<PaginatedNotificationsResponse>({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 1 }) =>
      getNotifications(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
}