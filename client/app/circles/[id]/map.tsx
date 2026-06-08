import { ActivityIndicator, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';
import { CircleMap } from '@/components/maps/CircleMap';

import { useCircle } from '@/hooks/useCircle';
import { useCircleMapMemories } from '@/hooks/useCircleMapMemories';

import { circleMapStyles as styles } from '@/styles/circleMapStyles';

export default function CircleMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const circleId = Number(id);

  const {
    data: circle,
    isLoading: isCircleLoading,
  } = useCircle(id);

  const {
    mapMemories,
    isLoading: isMapLoading,
  } = useCircleMapMemories(circleId);

  if (isCircleLoading || isMapLoading || !circle) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CircleHeader
        circle={circle}
        activeTab="map"
        variant='compact'
      />

      <CircleMap
        circleId={circleId}
        memories={mapMemories}
      />
    </View>
  );
}