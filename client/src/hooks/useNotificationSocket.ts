import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/context/AuthContext';

/**
 * =====================================================
 * Notification WebSocket Hook
 *
 * Responsibilities:
 *
 * 1. Open a WebSocket connection when a user is logged in.
 * 2. Listen for notification events from Django Channels.
 * 3. Refresh notification-related React Query caches.
 * 4. Close the connection when the component unmounts.
 *
 * We are intentionally keeping the first version simple:
 * - No reconnect logic yet
 * - No optimistic updates yet
 * - No cache merging yet
 *
 * First goal:
 * Prove that real-time notifications work.
 * =====================================================
 */
export function useNotificationSocket() {
  const queryClient = useQueryClient();

  const { tokens } = useAuth();

  useEffect(() => {
    /**
     * No logged-in user?
     * Don't create a WebSocket connection.
     */
    if (!tokens?.access) {
      return;
    }

    /**
     * =====================================================
     * Build WebSocket URL
     *
     * We pass the JWT access token so our custom
     * JWTAuthMiddleware can identify the user.
     * =====================================================
     */
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${tokens.access}`
    );

    /**
     * Connection established.
     */
    socket.onopen = () => {
      console.log('Notification WebSocket connected');
    };

    /**
     * Incoming message from Django Channels.
     */
    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log(
          'Notification WebSocket message:',
          data
        );

        /**
         * New notification arrived.
         *
         * Refresh:
         * - notification list
         * - unread badge count
         */
        if (data.type === 'notification_created') {
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
      } catch (error) {
        console.error(
          'Notification WebSocket parse error:',
          error
        );
      }
    };

    /**
     * Connection closed.
     */
    socket.onclose = () => {
      console.log('Notification WebSocket disconnected');
    };

    /**
     * WebSocket error.
     */
    socket.onerror = (error) => {
      console.error(
        'Notification WebSocket error:',
        error
      );
    };

    /**
     * Cleanup when component unmounts.
     */
    return () => {
      socket.close();
    };
  }, [tokens, queryClient]);
}