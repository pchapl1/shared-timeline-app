import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';
import { CircleMap } from '@/components/maps/CircleMap';
import { AppScreen } from '@/components/ui/layout/AppScreen';
import { LoadingState } from '@/components/ui/LoadingState';

import { useCircle } from '@/hooks/circles/useCircle';
import { useCircleMapMemories } from '@/hooks/useCircleMapMemories';

import { circleMapStyles as styles } from '@/styles/circles/circleMapStyles';

export default function CircleMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const circleId = Number(id);

  const { data: circle, isLoading: isCircleLoading } =
    useCircle(id);

  const {
    mapMemories,
    mapTrips,
    isLoading: isMapLoading,
  } = useCircleMapMemories(circleId);

  if (isCircleLoading || isMapLoading || !circle) {
    return (
      <AppScreen>
        <LoadingState message="Loading map..." />
      </AppScreen>
    );
  }

  return (
    <AppScreen contentStyle={styles.screenContent}>
      <CircleHeader
        circle={circle}
        activeTab="map"
        variant="compact"
      />

      <View style={styles.mapShell}>
        <CircleMap
          circleId={circleId}
          memories={mapMemories}
          trips={mapTrips}
        />
      </View>
    </AppScreen>
  );
}