import { useMemo } from 'react';

import { useCircleMemories } from '@/hooks/useCircleMemories';
import { useTrips } from '@/hooks/trips/useTrips';

import type { MapMemory, MapTrip } from '@/types/map';
import type { Memory } from '@/types/memory';

export function useCircleMapMemories(circleId: number) {
  const {
    data,
    isLoading: isMemoriesLoading,
    refetch,
  } = useCircleMemories(circleId);

  const {
    data: trips = [],
    isLoading: isTripsLoading,
  } = useTrips(circleId);

  const memories = useMemo<Memory[]>(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  const mapMemories = useMemo<MapMemory[]>(() => {
    return memories
      .filter((memory) => memory.latitude && memory.longitude)
      .map((memory) => ({
        id: memory.id,
        title: memory.title,
        latitude: Number(memory.latitude),
        longitude: Number(memory.longitude),
      }));
  }, [memories]);

  const mapTrips = useMemo<MapTrip[]>(() => {
    return trips
      .filter((trip) => trip.latitude && trip.longitude)
      .map((trip) => ({
        id: trip.id,
        title: trip.title,
        latitude: Number(trip.latitude),
        longitude: Number(trip.longitude),
      }));
  }, [trips]);

  return {
    mapMemories,
    mapTrips,
    isLoading: isMemoriesLoading || isTripsLoading,
    refetch,
  };
}