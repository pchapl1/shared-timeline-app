import { api } from './api';

export async function getNotifications(page = 1) {
  const response = await api.get(
    `/notifications/?page=${page}`
  );

  return response.data;
}

export async function markNotificationRead(
  notificationId: number
) {
  const response = await api.post(
    `/notifications/${notificationId}/mark_read/`
  );

  return response.data;
}