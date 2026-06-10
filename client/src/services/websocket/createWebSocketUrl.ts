import { WS_BASE_URL } from '@/config/websocket';

export function createWebSocketUrl(
  path: string,
  token: string
) {
  const encodedToken = encodeURIComponent(token);

  return `${WS_BASE_URL}${path}?token=${encodedToken}`;
}