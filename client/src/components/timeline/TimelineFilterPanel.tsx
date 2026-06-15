import { ScrollView, TouchableOpacity, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { timelineFilterPanelStyles as styles } from '@/styles/timeline/timelineFilterPanelStyles';

import type { Circle } from '@/types/circle';

export type TimelinePhotoFilter = 'all' | 'photos';

type Props = {
  photoFilter: TimelinePhotoFilter;
  selectedCircleId: number | null;
  circles: Circle[];
  onChangePhotoFilter: (filter: TimelinePhotoFilter) => void;
  onChangeCircleFilter: (circleId: number | null) => void;
};

export function TimelineFilterPanel({
  photoFilter,
  selectedCircleId,
  circles,
  onChangePhotoFilter,
  onChangeCircleFilter,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <AppText variant="bodySmall" color={colors.textMuted}>
          Type
        </AppText>

        <View style={styles.pillRow}>
          <FilterPill
            label="All"
            isActive={photoFilter === 'all'}
            onPress={() => onChangePhotoFilter('all')}
          />

          <FilterPill
            label="Photos only"
            isActive={photoFilter === 'photos'}
            onPress={() => onChangePhotoFilter('photos')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="bodySmall" color={colors.textMuted}>
          Circle
        </AppText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.circlePillRow}
        >
          <FilterPill
            label="All circles"
            isActive={selectedCircleId === null}
            onPress={() => onChangeCircleFilter(null)}
          />

          {circles.map((circle) => (
            <FilterPill
              key={circle.id}
              label={circle.name}
              isActive={selectedCircleId === circle.id}
              onPress={() => onChangeCircleFilter(circle.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

type FilterPillProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

function FilterPill({
  label,
  isActive,
  onPress,
}: FilterPillProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.pill,
        isActive && styles.activePill,
      ]}
    >
      <AppText
        variant="bodySmall"
        color={isActive ? colors.primary : colors.textMuted}
        style={styles.pillText}
        numberOfLines={1}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
}