import { useRef, useState } from 'react';

import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { router } from 'expo-router';

import { useSharedMapData } from '@/hooks/maps/useSharedMapData';
import { useMapRegion } from '@/hooks/maps/useMapRegion';

import {
  getPrimaryItem,
  isMarkerCluster,
} from '@/hooks/maps/useMapSelection';

import { calculateMapRegion } from '@/utils/maps/calculateMapRegion';

import { MapClusterPreviewCard } from './MapClusterPreviewCard';
import { MapFloatingControls } from './MapFloatingControls';
import { MapPhotoMarker } from './MapPhotoMarker';
import { MapPreviewCard } from './MapPreviewCard';
import { MapSearchOverlay } from './MapSearchOverlay';

import { sharedMapStyles as styles } from '@/styles/maps/sharedMapStyles';

import type {
  MapDisplayItem,
  MapMarkerGroup,
} from '@/types/map';

type MapType = 'standard' | 'satellite';

export function SharedMap() {
  const mapRef = useRef<MapView>(null);

  const [mapType, setMapType] =
    useState<MapType>('standard');

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const [selectedItem, setSelectedItem] =
    useState<MapDisplayItem | null>(null);

  const [selectedCluster, setSelectedCluster] =
    useState<MapMarkerGroup | null>(null);

  const [currentDelta, setCurrentDelta] = useState(4);

  const {
    allMapItems,
    searchedMapItems,
    markerGroups,
  } = useSharedMapData({
    currentDelta,
    searchQuery,
  });

  const {
    currentRegion,
    initialRegion,
    handleRegionChangeComplete,
  } = useMapRegion(allMapItems);

  // const actualRegion = useMapRegion(allMapItems);

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

  function handleMarkerPress(group: MapMarkerGroup) {
    if (isMarkerCluster(group)) {
      setSelectedItem(null);
      setSelectedCluster(group);

      mapRef.current?.animateToRegion(
        {
          latitude: group.latitude,
          longitude: group.longitude,
          latitudeDelta: Math.min(currentDelta, 1.5),
          longitudeDelta: Math.min(currentDelta, 1.5),
        },
        300
      );

      return;
    }

    setSelectedCluster(null);
    animateToItem(getPrimaryItem(group));
  }

  function handleSearchResultPress(item: MapDisplayItem) {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSelectedCluster(null);

    animateToItem(item, 4);
  }

  function handleMapPress() {
    setSelectedItem(null);
    setIsSearchOpen(false);
    setSelectedCluster(null);
  }

  function handlePreviewPress() {
    if (!selectedItem) return;

    if (selectedItem.type === 'memory') {
      router.push({
        pathname: '/circles/[id]/memories/[memoryId]',
        params: {
          id: String(selectedItem.circleId),
          memoryId: String(selectedItem.id),
        },
      });

      return;
    }

    router.push({
      pathname: '/circles/[id]/trips/[tripId]',
      params: {
        id: String(selectedItem.circleId),
        tripId: String(selectedItem.id),
      },
    });
  }

  function handleMapTypePress() {
    setMapType((current) =>
      current === 'standard' ? 'satellite' : 'standard'
    );

    setIsSearchOpen(false);
  }

  function handleZoomIn() {
    const baseRegion =
      currentRegion ?? initialRegion;

    const nextDelta = Math.max(
      baseRegion.latitudeDelta * 0.45,
      0.01
    );

    setCurrentDelta(nextDelta);

    mapRef.current?.animateToRegion(
      {
        latitude: baseRegion.latitude,
        longitude: baseRegion.longitude,
        latitudeDelta: nextDelta,
        longitudeDelta: nextDelta,
      },
      180
    );
  }

  function handleZoomOut() {
    const baseRegion =
      currentRegion ?? initialRegion;

    const nextDelta = Math.min(
      baseRegion.latitudeDelta * 2.1,
      80
    );

    setCurrentDelta(nextDelta);

    mapRef.current?.animateToRegion(
      {
        latitude: baseRegion.latitude,
        longitude: baseRegion.longitude,
        latitudeDelta: nextDelta,
        longitudeDelta: nextDelta,
      },
      180
    );
  }

  function handleFitAll() {
    if (!allMapItems.length) return;

    const region = calculateMapRegion(
      allMapItems.map((item) => ({
        latitude: item.latitude,
        longitude: item.longitude,
      }))
    );

    setCurrentDelta(region.latitudeDelta);

    mapRef.current?.animateToRegion(region, 350);
  }

  function handleClusterItemPress(item: MapDisplayItem) {
    setSelectedCluster(null);
    animateToItem(item, 1.5);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapType}
        initialRegion={initialRegion}
        onPress={handleMapPress}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {markerGroups.map((group) => {
          const primaryItem = getPrimaryItem(group);

          const isSelected =
            selectedItem?.id === primaryItem.id &&
            selectedItem?.type === primaryItem.type;

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
          onChangeSearchQuery={setSearchQuery}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
          }}
          onSelectItem={handleSearchResultPress}
        />
      )}

      <MapFloatingControls
        onSearchPress={() => setIsSearchOpen(true)}
        onMapTypePress={handleMapTypePress}
        onZoomInPress={handleZoomIn}
        onZoomOutPress={handleZoomOut}
        onFitPress={handleFitAll}
      />

      {selectedCluster && (
        <MapClusterPreviewCard
          items={selectedCluster.items}
          onSelectItem={handleClusterItemPress}
        />
      )}

      {selectedItem && !selectedCluster && (
        <MapPreviewCard
          item={selectedItem}
          onPress={handlePreviewPress}
        />
      )}
    </View>
  );
}