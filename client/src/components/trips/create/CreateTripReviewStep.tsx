import { View } from 'react-native';

import { MapPin, CalendarDays, FileText } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { createTripStyles as styles } from '@/styles/trips/createTripStyles';

type Props = {
  title: string;
  description: string;
  destinationName: string;
  startDate: Date;
  endDate: Date | null;
};

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getDateRange(startDate: Date, endDate: Date | null) {
  if (!endDate) {
    return formatDate(startDate);
  }

  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

function getDurationLabel(startDate: Date, endDate: Date | null) {
  if (!endDate) {
    return 'Start date only';
  }

  const dayMs = 1000 * 60 * 60 * 24;
  const duration =
    Math.round((endDate.getTime() - startDate.getTime()) / dayMs) + 1;

  return `${duration} day${duration === 1 ? '' : 's'}`;
}

export function CreateTripReviewStep({
  title,
  description,
  destinationName,
  startDate,
  endDate,
}: Props) {
  return (
    <View style={styles.reviewPreview}>
      <View style={styles.reviewHero}>
        <AppText variant="hero" style={styles.reviewTitle}>
          {title || 'Untitled Trip'}
        </AppText>

        {!!destinationName && (
          <View style={styles.reviewMetaRow}>
            <MapPin size={20} color={colors.textMuted} />

            <AppText
              variant="body"
              color={colors.textMuted}
              style={styles.reviewMetaText}
            >
              {destinationName}
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.reviewSummary}>
        <View style={styles.reviewSummaryRow}>
          <CalendarDays size={22} color={colors.primary} />

          <View style={styles.reviewMetaText}>
            <AppText variant="bodyStrong">
              {getDateRange(startDate, endDate)}
            </AppText>

            <AppText variant="bodySmall" color={colors.textMuted}>
              {getDurationLabel(startDate, endDate)}
            </AppText>
          </View>
        </View>

        {!!description.trim() && (
          <View style={styles.reviewSummaryRow}>
            <FileText size={22} color={colors.primary} />

            <AppText variant="body" style={styles.reviewMetaText}>
              {description.trim()}
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
}