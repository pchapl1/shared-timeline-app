import { api } from './api';

import type {
  Trip,
  UpdateTripPayload,
} from '@/types/trip';

type PaginatedTripsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Trip[];
};

function normalizeTrips(response: Trip[] | PaginatedTripsResponse) {
  if (Array.isArray(response)) {
    return response;
  }

  return response.results;
}

export async function getTrips(circleId?: number) {
  const response = await api.get<Trip[] | PaginatedTripsResponse>(
    '/trips/'
  );

  const trips = normalizeTrips(response.data);

  if (!circleId) {
    return trips;
  }

  return trips.filter(
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