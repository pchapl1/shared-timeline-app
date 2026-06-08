import { api } from './api';

import type { Trip } from '@/types/trip';

export async function getTrips(
  circleId: number
) {
  const response = await api.get<Trip[]>(
    '/trips/'
  );

  return response.data.filter(
    (trip) => trip.circle === circleId
  );
}

export async function createTrip(
  payload: {
    circle: number;
    title: string;
    description: string;
    start_date: string;
    end_date?: string;
    destination_name?: string;
    latitude?: string;
    longitude?: string;
  }
) {
  const response = await api.post(
    '/trips/',
    payload
  );

  return response.data;
}