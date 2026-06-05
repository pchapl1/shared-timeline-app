import { ActivityIndicator, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { CircleMap } from '@/components/maps/CircleMap';

import { useCircleMapMemories } from '@/hooks/useCircleMapMemories';

import { circleMapStyles as styles } from '@/styles/circleMapStyles';

export default function CircleMapScreen() {
  const { id } = useLocalSearchParams();

  const circleId = Number(id);

  const { mapMemories, isLoading } =
    useCircleMapMemories(circleId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CircleMap
        circleId={circleId}
        memories={mapMemories}
      />
    </View>
  );
}