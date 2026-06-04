import { useQuery } from '@tanstack/react-query';

import { getUnreadNotificationCount } from '@/services/notifications';
import { useAuth } from '@/context/AuthContext';

export function useUnreadNotificationCount() {
  const { tokens, isLoading } = useAuth();

  return useQuery({
    queryKey: ['unreadNotificationCount'],
    queryFn: getUnreadNotificationCount,
    enabled: !isLoading && !!tokens,
  });
}