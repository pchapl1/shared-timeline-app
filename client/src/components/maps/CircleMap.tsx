import MapView, { Callout, Marker } from 'react-native-maps';
import { Text } from 'react-native';
import { router } from 'expo-router';

import { circleMapStyles as styles } from '@/styles/circleMapStyles';

import type { MapMemory } from '@/types/map';

type Props = {
  circleId: number;
  memories: MapMemory[];
};

export function CircleMap({ circleId, memories }: Props) {
  const firstMemory = memories[0];

  const initialRegion = firstMemory
    ? {
        latitude: firstMemory.latitude,
        longitude: firstMemory.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }
    : {
        latitude: 47.6062,
        longitude: -122.3321,
        latitudeDelta: 5,
        longitudeDelta: 5,
      };

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
    >
      {memories.map((memory) => (
        <Marker
          key={memory.id}
          coordinate={{
            latitude: memory.latitude,
            longitude: memory.longitude,
          }}
        >
          <Callout
            onPress={() =>
              router.push(
                `/circles/${circleId}/memories/${memory.id}`
              )
            }
          >
            <Text>{memory.title}</Text>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}