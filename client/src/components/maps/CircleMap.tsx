import { useEffect, useMemo, useRef, useState } from 'react';

import MapView, { Callout, Marker } from 'react-native-maps';
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { circleMapStyles as styles } from '@/styles/circleMapStyles';

import type { MapMemory, MapTrip } from '@/types/map';

type MapFilter = 'all' | 'memories' | 'trips';


type MapType = 'standard' | 'satellite';

type MapItem =
  | (MapMemory & { type: 'memory' })
  | (MapTrip & { type: 'trip' });

type MarkerGroup = {
  key: string;
  latitude: number;
  longitude: number;
  items: MapItem[];
};

type Props = {
  circleId: number;
  memories: MapMemory[];
  trips: MapTrip[];
};

function getCoordinateKey(latitude: number, longitude: number) {
  return `${latitude.toFixed(5)}-${longitude.toFixed(5)}`;
}

export function CircleMap({ circleId, memories, trips }: Props) {
  const mapRef = useRef<MapView>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [filter, setFilter] = useState<MapFilter>('all');
  const [mapType, setMapType] = useState<MapType>('standard');


  const visibleMemories =
    filter === 'trips' ? [] : memories;

  const visibleTrips =
    filter === 'memories' ? [] : trips;

  const mapItems = useMemo<MapItem[]>(() => {
    return [
      ...visibleMemories.map((memory) => ({
        ...memory,
        type: 'memory' as const,
      })),
      ...visibleTrips.map((trip) => ({
        ...trip,
        type: 'trip' as const,
      })),
    ];
  }, [visibleMemories, visibleTrips]);

  const markerGroups = useMemo<MarkerGroup[]>(() => {
    const groups = new Map<string, MarkerGroup>();

    for (const item of mapItems) {
      const key = getCoordinateKey(
        item.latitude,
        item.longitude
      );

      const existingGroup = groups.get(key);

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        groups.set(key, {
          key,
          latitude: item.latitude,
          longitude: item.longitude,
          items: [item],
        });
      }
    }

    return Array.from(groups.values());
  }, [mapItems]);

  const allPoints = useMemo(
    () =>
      markerGroups.map((group) => ({
        latitude: group.latitude,
        longitude: group.longitude,
      })),
    [markerGroups]
  );

  const firstPoint = allPoints[0];

  const initialRegion = firstPoint
    ? {
        latitude: firstPoint.latitude,
        longitude: firstPoint.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }
    : {
        latitude: 47.6062,
        longitude: -122.3321,
        latitudeDelta: 5,
        longitudeDelta: 5,
      };

  useEffect(() => {
    if (!isMapReady || allPoints.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      mapRef.current?.fitToCoordinates(allPoints, {
        edgePadding: {
          top: 120,
          right: 120,
          bottom: 120,
          left: 120,
        },
        animated: true,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [isMapReady, allPoints]);

  function openMapItem(item: MapItem) {
    if (item.type === 'memory') {
      router.push({
        pathname: '/circles/[id]/memories/[memoryId]',
        params: {
          id: String(circleId),
          memoryId: String(item.id),
        },
      });

      return;
    }

    router.push({
      pathname: '/circles/[id]/trips/[tripId]',
      params: {
        id: String(circleId),
        tripId: String(item.id),
      },
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all' && styles.activeFilterButton,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'memories' && styles.activeFilterButton,
          ]}
          onPress={() => setFilter('memories')}
        >
          <Text style={styles.filterText}>Memories</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'trips' && styles.activeFilterButton,
          ]}
          onPress={() => setFilter('trips')}
        >
          <Text style={styles.filterText}>Trips</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapTypeContainer}>
        <TouchableOpacity
          style={[
            styles.mapTypeButton,
            mapType === 'standard' && styles.activeMapTypeButton,
          ]}
          onPress={() => setMapType('standard')}
        >
          <Text style={styles.mapTypeText}>Standard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mapTypeButton,
            mapType === 'satellite' && styles.activeMapTypeButton,
          ]}
          onPress={() => setMapType('satellite')}
        >
          <Text style={styles.mapTypeText}>Satellite</Text>
        </TouchableOpacity>
      </View>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          mapType={mapType}
          onMapReady={() => setIsMapReady(true)}
        >
        {markerGroups.map((group) => {
          const isGrouped = group.items.length > 1;
          const firstItem = group.items[0];
          const isTripOnlyGroup = group.items.every(
            (item) => item.type === 'trip'
          );

          return (
            <Marker
              key={group.key}
              coordinate={{
                latitude: group.latitude,
                longitude: group.longitude,
              }}
              pinColor={
                !isGrouped && firstItem.type === 'trip'
                  ? 'purple'
                  : undefined
              }
            >
              {isGrouped && (
                <View
                  style={[
                    styles.groupMarker,
                    isTripOnlyGroup && styles.tripGroupMarker,
                  ]}
                >
                  <Text style={styles.groupMarkerText}>
                    {group.items.length}
                  </Text>
                </View>
              )}

              <Callout>
                <View>
                  {isGrouped ? (
                    <>
                      <Text style={styles.calloutTitle}>
                        {group.items.length} items here
                      </Text>

                      {group.items.map((item) => (
                        <TouchableOpacity
                          key={`${item.type}-${item.id}`}
                          onPress={() => openMapItem(item)}
                        >
                          <Text style={styles.calloutText}>
                            {item.type === 'memory' ? '📸' : '✈️'}{' '}
                            {item.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() => openMapItem(firstItem)}
                    >
                      <Text style={styles.calloutTitle}>
                        {firstItem.type === 'memory' ? '📸' : '✈️'}{' '}
                        {firstItem.title}
                      </Text>
                      <Text style={styles.calloutText}>
                        Tap to view
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}