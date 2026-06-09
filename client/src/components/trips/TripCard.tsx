import { Text, TouchableOpacity, View } from 'react-native';

import type { Trip } from '@/types/trip';

import { tripCardStyles as styles } from '@/styles/tripCardStyles';

type Props = {
  trip: Trip;
  onPress?: () => void;
};

export function TripCard({ trip, onPress }: Props) {
  const memoryCount = trip.memory_count ?? 0;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View>
        <Text style={styles.title}>{trip.title}</Text>

        {!!trip.destination_name && (
          <Text style={styles.destination}>
            {trip.destination_name}
          </Text>
        )}

        <Text style={styles.date}>
          {trip.start_date}
          {trip.end_date ? ` → ${trip.end_date}` : ''}
        </Text>

        {!!trip.description && (
          <Text style={styles.description}>
            {trip.description}
          </Text>
        )}

        <Text style={styles.memoryCount}>
          {memoryCount}{' '}
          {memoryCount === 1 ? 'Memory' : 'Memories'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}