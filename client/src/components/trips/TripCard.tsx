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

function formatDateRange(
  startDate: string,
  endDate?: string | null
) {
  const start = new Date(startDate);

  const startFormatted =
    start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  if (!endDate) {
    return startFormatted;
  }

  const end = new Date(endDate);

  const endFormatted =
    end.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return `${startFormatted} – ${endFormatted}`;
}

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
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.date}
            >
              {formatDateRange(
                trip.start_date,
                trip.end_date
              )}
            </AppText>

            {!!trip.description && (
              <AppText
                variant="bodySmall"
                color={colors.textMuted}
                style={styles.description}
                numberOfLines={2}
              >
                {trip.description}
              </AppText>
            )}

            <View style={styles.memoryBadge}>
              <AppText
                variant="caption"
                color={colors.primary}
              >
                📸 {memoryCount}{' '}
                {memoryCount === 1
                  ? 'Memory'
                  : 'Memories'}
              </AppText>
            </View>
          </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );
}