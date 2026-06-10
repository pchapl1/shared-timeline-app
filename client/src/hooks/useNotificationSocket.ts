import { useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/context/AuthContext';
import { createWebSocketUrl } from '@/services/websocket/createWebSocketUrl';
import { useManagedWebSocket } from '@/hooks/websockets/useManagedWebSocket';

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  const { tokens, refreshAccessToken } = useAuth();

  const url = useMemo(() => {
    if (!tokens?.access) {
      return null;
    }

    return createWebSocketUrl(
      '/ws/notifications/',
      tokens.access
    );
  }, [tokens?.access]);

  const handleMessage = useCallback(
    async (data: unknown) => {
      if (
        typeof data === 'object' &&
        data !== null &&
        'type' in data &&
        data.type === 'notification_created'
      ) {
        await queryClient.invalidateQueries({
          queryKey: ['notifications'],
        });

        await queryClient.invalidateQueries({
          queryKey: ['unreadNotificationCount'],
        });

        await queryClient.invalidateQueries({
          queryKey: ['activities'],
        });
      }
    },
    [queryClient]
  );

  const handleUnauthorized = useCallback(async () => {
    await refreshAccessToken();
  }, [refreshAccessToken]);

  useManagedWebSocket({
    url,
    name: 'Notification',
    onMessage: handleMessage,
    onUnauthorized: handleUnauthorized,
  });
}