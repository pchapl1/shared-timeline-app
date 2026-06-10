export const WS_BASE_URL =
  process.env.EXPO_PUBLIC_WS_BASE_URL ??
  'ws://192.168.68.120:8000';

export const WEBSOCKET_CLOSE_CODES = {
  NORMAL: 1000,
  UNAUTHORIZED: 4001,
} as const;

export const WEBSOCKET_RECONNECT_DELAYS = [
  1000,
  2000,
  5000,
  10000,
] as const;