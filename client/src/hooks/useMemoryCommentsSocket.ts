import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/context/AuthContext';
import { createWebSocketUrl } from '@/services/websocket/createWebSocketUrl';
import { useManagedWebSocket } from '@/hooks/websockets/useManagedWebSocket';

import type { Memory } from '@/types/memory';

type CommentCreatedMessage = {
  type: 'comment_created';
  comment: NonNullable<Memory['comments']>[number];
};

export function useMemoryCommentsSocket(
  memoryId: string | undefined
) {
  const queryClient = useQueryClient();

  const { tokens, refreshAccessToken } = useAuth();

  const url = useMemo(() => {
    if (!memoryId || !tokens?.access) {
      return null;
    }

    return createWebSocketUrl(
      `/ws/memories/${memoryId}/comments/`,
      tokens.access
    );
  }, [memoryId, tokens?.access]);

  const handleMessage = useCallback(
    async (data: unknown) => {
      if (
        typeof data !== 'object' ||
        data === null ||
        !('type' in data) ||
        data.type !== 'comment_created'
      ) {
        return;
      }

      const message = data as CommentCreatedMessage;

      queryClient.setQueryData<Memory>(
        ['memory', memoryId],
        (oldMemory) => {
          if (!oldMemory) {
            return oldMemory;
          }

          const existingComments = oldMemory.comments ?? [];

          const alreadyExists = existingComments.some(
            (comment) => comment.id === message.comment.id
          );

          if (alreadyExists) {
            return oldMemory;
          }

          return {
            ...oldMemory,
            comments: [
              ...existingComments,
              message.comment,
            ],
            comment_count:
              (oldMemory.comment_count ?? 0) + 1,
          };
        }
      );
    },
    [memoryId, queryClient]
  );

  const handleUnauthorized = useCallback(async () => {
    await refreshAccessToken();
  }, [refreshAccessToken]);

  useManagedWebSocket({
    url,
    name: 'Memory comments',
    onMessage: handleMessage,
    onUnauthorized: handleUnauthorized,
  });
}