import { useMemo, useState } from 'react';

import type { Region } from 'react-native-maps';

import { getPreferredMapItem } from '@/utils/maps/getPreferredMapItem';

import type { MapDisplayItem } from '@/types/map';

export function useMapRegion(items: MapDisplayItem[]) {
  const [currentDelta, setCurrentDelta] = useState(4);
  const [currentRegion, setCurrentRegion] =
    useState<Region | null>(null);

  const initialRegion = useMemo(() => {
    const preferredItem = getPreferredMapItem(items);

    if (!preferredItem) {
      return {
        latitude: 39.5,
        longitude: -98.5795,
        latitudeDelta: 3,
        longitudeDelta: 3,
      };
    }

    return {
      latitude: preferredItem.latitude,
      longitude: preferredItem.longitude,
      latitudeDelta: 4,
      longitudeDelta: 4,
    };
  }, [items]);

  function handleRegionChangeComplete(region: Region) {
    setCurrentRegion(region);
    setCurrentDelta(region.latitudeDelta);
  }

  return {
    currentDelta,
    setCurrentDelta,
    currentRegion,
    initialRegion,
    handleRegionChangeComplete,
  };
}