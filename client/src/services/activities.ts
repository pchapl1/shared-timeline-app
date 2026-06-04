import { api } from './api';

export async function getActivities(page = 1) {
  const response = await api.get(`/activities/?page=${page}`);

  return response.data;
}