import { useEffect, useRef } from 'react';

import {
  WEBSOCKET_CLOSE_CODES,
  WEBSOCKET_RECONNECT_DELAYS,
} from '@/config/websocket';

type UseManagedWebSocketArgs = {
  url: string | null;
  name: string;
  onMessage: (data: unknown) => void | Promise<void>;
  onUnauthorized?: () => void | Promise<void>;
};

export function useManagedWebSocket({
  url,
  name,
  onMessage,
  onUnauthorized,
}: UseManagedWebSocketArgs) {
  const socketRef = useRef<WebSocket | null>(null);

  const reconnectAttemptRef = useRef(0);

  const reconnectTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    let isIntentionalClose = false;

    function clearReconnectTimeout() {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    }

    function connect() {
      clearReconnectTimeout();

      const socket = new WebSocket(url!);

      socketRef.current = socket;

      socket.onopen = () => {
        reconnectAttemptRef.current = 0;

        console.log(`${name} WebSocket connected`);
      };

      socket.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          console.log(`${name} WebSocket message:`, data);

          await onMessage(data);
        } catch (error) {
          console.error(
            `${name} WebSocket parse error:`,
            error
          );
        }
      };

      socket.onclose = async (event) => {
        socketRef.current = null;

        if (isIntentionalClose) {
          console.log(
            `${name} WebSocket closed intentionally`
          );
          return;
        }

        const isUnauthorized =
          event.code ===
            WEBSOCKET_CLOSE_CODES.UNAUTHORIZED ||
          event.reason?.includes('403');

        if (isUnauthorized) {
          console.warn(`${name} WebSocket unauthorized`);

          if (onUnauthorized) {
            await onUnauthorized();
          }

          return;
        }

        const attempt = reconnectAttemptRef.current;

        const delay =
          WEBSOCKET_RECONNECT_DELAYS[
            Math.min(
              attempt,
              WEBSOCKET_RECONNECT_DELAYS.length - 1
            )
          ];

        reconnectAttemptRef.current += 1;

        console.warn(
          `${name} WebSocket disconnected unexpectedly. Reconnecting in ${delay}ms.`,
          event.code,
          event.reason
        );

        reconnectTimeoutRef.current = setTimeout(() => {
          if (!isIntentionalClose) {
            connect();
          }
        }, delay);
      };

      socket.onerror = () => {
        if (isIntentionalClose) {
          return;
        }

        console.warn(
          `${name} WebSocket connection error`
        );
      };
    }

    connect();

    return () => {
      isIntentionalClose = true;

      clearReconnectTimeout();

      const socket = socketRef.current;

      if (
        socket &&
        (socket.readyState === WebSocket.OPEN ||
          socket.readyState === WebSocket.CONNECTING)
      ) {
        socket.close(
          WEBSOCKET_CLOSE_CODES.NORMAL,
          'Component unmounted'
        );
      }

      socketRef.current = null;
    };
  }, [url, name, onMessage, onUnauthorized]);
}