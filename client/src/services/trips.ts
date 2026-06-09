import { api } from './api';

import type { Trip } from '@/types/trip';

import type { UpdateTripPayload } from '@/types/trip';

type PaginatedTripsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Trip[];
};

export async function getTrips(circleId: number) {
  const response = await api.get<PaginatedTripsResponse>(
    '/trips/'
  );

  return response.data.results.filter(
    (trip) => Number(trip.circle) === Number(circleId)
  );
}

export async function getTrip(tripId: number) {
  const response = await api.get<Trip>(
    `/trips/${tripId}/`
  );

  return response.data;
}

export async function createTrip(payload: {
  circle: number;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  destination_name?: string;
  latitude?: string;
  longitude?: string;
}) {
  const response = await api.post<Trip>(
    '/trips/',
    payload
  );

  return response.data;
}

export async function updateTrip(
  tripId: number,
  payload: UpdateTripPayload
) {
  const response = await api.patch<Trip>(
    `/trips/${tripId}/`,
    payload
  );

  return response.data;
}

export async function deleteTrip(tripId: number) {
  await api.delete(`/trips/${tripId}/`);
}