import { api } from './api';

export async function getCircles() {
  const response = await api.get('/circles/');

  return response.data.results;
}

export async function getCircle(circleId: string) {

  const response = await api.get(`/circles/${circleId}/`);

  console.log('CIRCLES RESPONSE:', response.data);
  return response.data;
}