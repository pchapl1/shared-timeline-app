import { api } from './api';

import type { Circle } from '@/types/circle';

export type UpdateCirclePayload = Partial<
  Pick<
    Circle,
    | 'name'
    | 'circle_type'
    | 'start_date'
    | 'is_archived'
  >
>;

type PaginatedCirclesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Circle[];
};

export async function getCircles() {
  const response =
    await api.get<PaginatedCirclesResponse>(
      '/circles/'
    );

  return response.data.results;
}

export async function getCircle(circleId: string) {
  const response = await api.get<Circle>(
    `/circles/${circleId}/`
  );

  return response.data;
}

export async function updateCircle(
  circleId: number,
  payload: UpdateCirclePayload
) {
  const response = await api.patch<Circle>(
    `/circles/${circleId}/`,
    payload
  );

  return response.data;
}

export async function deleteCircle(circleId: number) {
  await api.delete(`/circles/${circleId}/`);
}