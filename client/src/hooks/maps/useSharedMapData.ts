import { useMemo, useState } from 'react';

import { useMemories } from '@/hooks/memories/useMemories';
import { useTrips } from '@/hooks/trips/useTrips';

import {
  buildMapItems,
  groupMapItems,
} from '@/utils/maps/buildGlobalMapItems';

import type { MapFilter } from '@/types/map';

export function useSharedMapData({
  currentDelta,
  searchQuery,
}: {
  currentDelta: number;
  searchQuery: string;
}) {
  const [filter] = useState<MapFilter>('all');

  const { data: memories = [] } = useMemories();
  const { data: trips = [] } = useTrips();

  const allMapItems = useMemo(
    () =>
      buildMapItems({
        memories,
        trips,
        filter,
        searchQuery: '',
      }),
    [memories, trips, filter]
  );

  const searchedMapItems = useMemo(
    () =>
      buildMapItems({
        memories,
        trips,
        filter,
        searchQuery,
      }),
    [memories, trips, filter, searchQuery]
  );

  const markerGroups = useMemo(
    () => groupMapItems(allMapItems, currentDelta),
    [allMapItems, currentDelta]
  );

  return {
    allMapItems,
    searchedMapItems,
    markerGroups,
  };
}