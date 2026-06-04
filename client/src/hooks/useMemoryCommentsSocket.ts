import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Memory } from '@/types/memory';

type CommentCreatedMessage = {
  type: 'comment_created';
  comment: NonNullable<Memory['comments']>[number];
};

export function useMemoryCommentsSocket(memoryId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!memoryId) {
      return;
    }

    let socket: WebSocket | null = null;

    async function connectSocket() {
      try {
        // Get the saved JWT tokens from storage.
        // This should be the same "tokens" key your Axios auth uses.
        const storedTokens = await AsyncStorage.getItem('tokens');

        if (!storedTokens) {
          console.log('No stored tokens found for memory comments socket.');
          return;
        }

        const parsedTokens = JSON.parse(storedTokens);
        const accessToken = parsedTokens.access;

        if (!accessToken) {
          console.log('No access token found for memory comments socket.');
          return;
        }

        // Send the access token in the query string.
        // Your Django JWTAuthMiddleware reads this token and sets scope["user"].
        socket = new WebSocket(
          `ws://127.0.0.1:8000/ws/memories/${memoryId}/comments/?token=${accessToken}`
        );

        socket.onopen = () => {
          console.log(`Connected to memory comments socket: ${memoryId}`);
        };

        socket.onmessage = (event) => {
          const data: CommentCreatedMessage = JSON.parse(event.data);

          if (data.type !== 'comment_created') {
            return;
          }

          queryClient.setQueryData<Memory>(
            ['memory', memoryId],
            (oldMemory) => {
              if (!oldMemory) {
                return oldMemory;
              }

              const existingComments = oldMemory.comments ?? [];

              const alreadyExists = existingComments.some(
                (comment) => comment.id === data.comment.id
              );

              if (alreadyExists) {
                return oldMemory;
              }

              return {
                ...oldMemory,
                comments: [...existingComments, data.comment],
                comment_count: (oldMemory.comment_count ?? 0) + 1,
              };
            }
          );
        };

        socket.onerror = (error) => {
          console.log('Memory comments socket error:', error);
        };

        socket.onclose = () => {
          console.log(`Disconnected from memory comments socket: ${memoryId}`);
        };
      } catch (error) {
        console.log('Could not connect memory comments socket:', error);
      }
    }

    connectSocket();

    return () => {
      socket?.close();
    };
  }, [memoryId, queryClient]);
}