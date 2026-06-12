import { TouchableOpacity, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { IconBubble } from '@/components/ui/IconBubble';

import { colors } from '@/theme/colors';

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
      activeOpacity={0.9}
      onPress={onPress}
    >
      <AppCard style={styles.card}>
        <View style={styles.headerRow}>
          <IconBubble icon="✈️" />

          <View style={styles.content}>
            <AppText
              variant="h3"
              style={styles.title}
            >
              {trip.title}
            </AppText>

            {!!trip.destination_name && (
              <AppText
                variant="bodySmall"
                color={colors.primary}
                style={styles.destination}
              >
                {trip.destination_name}
              </AppText>
            )}

            <AppText
              variant="caption"
              color={colors.textSubtle}
              style={styles.date}
            >
              {trip.start_date}
              {trip.end_date
                ? ` → ${trip.end_date}`
                : ''}
            </AppText>

            {!!trip.description && (
              <AppText
                variant="bodySmall"
                color={colors.textMuted}
                style={styles.description}
              >
                {trip.description}
              </AppText>
            )}

            <AppText
              variant="bodyStrong"
              color={colors.primary}
              style={styles.memoryCount}
            >
              {memoryCount}{' '}
              {memoryCount === 1
                ? 'Memory'
                : 'Memories'}
            </AppText>
          </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );
}