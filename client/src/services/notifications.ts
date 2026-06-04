import { api } from './api';

export async function getNotifications(page = 1) {
  const response = await api.get(
    `/notifications/?page=${page}`
  );

  return response.data;
}