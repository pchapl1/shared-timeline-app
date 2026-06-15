import { useMemo, useRef, useState } from 'react';

import MapView, { Marker, Region } from 'react-native-maps';
import { View } from 'react-native';
import { router } from 'expo-router';

import { useMemories } from '@/hooks/memories/useMemories';
import { useTrips } from '@/hooks/trips/useTrips';

import {
  buildMapItems,
  groupMapItems,
} from '@/utils/maps/buildGlobalMapItems';
import { calculateMapRegion } from '@/utils/maps/calculateMapRegion';

import { MapFloatingControls } from './MapFloatingControls';
import { MapPhotoMarker } from './MapPhotoMarker';
import { MapPreviewCard } from './MapPreviewCard';
import { MapSearchOverlay } from './MapSearchOverlay';

import { sharedMapStyles as styles } from '@/styles/maps/sharedMapStyles';

import type {
  MapDisplayItem,
  MapFilter,
  MapMarkerGroup,
} from '@/types/map';

type MapType = 'standard' | 'satellite';

function getPrimaryItem(group: MapMarkerGroup) {
  return group.items[0];
}

export function SharedMap() {
  const mapRef = useRef<MapView>(null);

  const [filter] = useState<MapFilter>('all');

  const [mapType, setMapType] =
    useState<MapType>('standard');

  const [currentDelta, setCurrentDelta] =
    useState(4);

  const [currentRegion, setCurrentRegion] =
    useState<Region | null>(null);

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const [selectedItem, setSelectedItem] =
    useState<MapDisplayItem | null>(null);

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

  const initialRegion = useMemo(() => {
    const preferredItem =
      allMapItems.find(
        (item) =>
          item.type === 'memory' &&
          item.imageUrl
      ) ??
      allMapItems.find(
        (item) => item.type === 'memory'
      ) ??
      allMapItems[0];

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
  }, [allMapItems]);

  function animateToItem(
    item: MapDisplayItem,
    delta = 2.5
  ) {
    setCurrentDelta(delta);
    setSelectedItem(item);

    mapRef.current?.animateToRegion(
      {
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      },
      350
    );
  }

  function handleMarkerPress(
    group: MapMarkerGroup
  ) {
    animateToItem(getPrimaryItem(group));
  }

  function handleSearchResultPress(
    item: MapDisplayItem
  ) {
    setIsSearchOpen(false);
    setSearchQuery('');

    animateToItem(item, 6);
  }

  function handleMapPress() {
    setSelectedItem(null);
    setIsSearchOpen(false);
  }

  function handlePreviewPress() {
    if (!selectedItem) {
      return;
    }

    if (selectedItem.type === 'memory') {
      router.push({
        pathname:
          '/circles/[id]/memories/[memoryId]',
        params: {
          id: String(selectedItem.circleId),
          memoryId: String(selectedItem.id),
        },
      });

      return;
    }

    router.push({
      pathname:
        '/circles/[id]/trips/[tripId]',
      params: {
        id: String(selectedItem.circleId),
        tripId: String(selectedItem.id),
      },
    });
  }

  function handleMapTypePress() {
    setMapType((current) =>
      current === 'standard'
        ? 'satellite'
        : 'standard'
    );

    setIsSearchOpen(false);
  }

  function handleSearchPress() {
    setIsSearchOpen(true);
  }

  function handleZoomIn() {
    const baseRegion = currentRegion ?? initialRegion;

    const nextDelta = Math.max(
      baseRegion.latitudeDelta * 0.6,
      0.01
    );

    mapRef.current?.animateToRegion(
      {
        latitude: baseRegion.latitude,
        longitude: baseRegion.longitude,
        latitudeDelta: nextDelta,
        longitudeDelta: nextDelta,
      },
      250
    );
  }

  function handleZoomOut() {
    const baseRegion = currentRegion ?? initialRegion;

    const nextDelta = Math.min(
      baseRegion.latitudeDelta * 1.6,
      80
    );

    mapRef.current?.animateToRegion(
      {
        latitude: baseRegion.latitude,
        longitude: baseRegion.longitude,
        latitudeDelta: nextDelta,
        longitudeDelta: nextDelta,
      },
      250
    );
  }

  function handleFitAll() {
    if (!allMapItems.length) {
      return;
    }

    const region = calculateMapRegion(
      allMapItems.map((item) => ({
        latitude: item.latitude,
        longitude: item.longitude,
      }))
    );

    setCurrentDelta(region.latitudeDelta);

    mapRef.current?.animateToRegion(
      region,
      350
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapType}
        initialRegion={initialRegion}
        onPress={handleMapPress}
        onRegionChangeComplete={(region) => {
          setCurrentRegion(region);
          setCurrentDelta(region.latitudeDelta);
        }}
      >
      
        {markerGroups.map((group) => {
          const primaryItem =
            getPrimaryItem(group);

          const isSelected =
            selectedItem?.id === primaryItem.id &&
            selectedItem?.type ===
              primaryItem.type;

          return (
            <Marker
              key={group.key}
              coordinate={{
                latitude: group.latitude,
                longitude: group.longitude,
              }}
              tracksViewChanges={false}
              onPress={(event) => {
                event.stopPropagation();
                handleMarkerPress(group);
              }}
            >
              <MapPhotoMarker
                imageUrl={primaryItem.imageUrl}
                count={group.items.length}
                isSelected={isSelected}
              />
            </Marker>
          );
        })}
      </MapView>

      {isSearchOpen && (
        <MapSearchOverlay
          searchQuery={searchQuery}
          items={searchedMapItems}
          onChangeSearchQuery={
            setSearchQuery
          }
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
          }}
          onSelectItem={
            handleSearchResultPress
          }
        />
      )}

      <MapFloatingControls
        onSearchPress={handleSearchPress}
        onMapTypePress={
          handleMapTypePress
        }
        onZoomInPress={handleZoomIn}
        onZoomOutPress={handleZoomOut}
        onFitPress={handleFitAll}
      />

      {selectedItem && (
        <MapPreviewCard
          item={selectedItem}
          onPress={handlePreviewPress}
        />
      )}
    </View>
  );
}