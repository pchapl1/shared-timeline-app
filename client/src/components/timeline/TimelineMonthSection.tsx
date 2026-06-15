import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { TimelineMemoryRow } from '@/components/timeline/TimelineMemoryRow';

import { timelineMonthSectionStyles as styles } from '@/styles/timeline/timelineMonthSectionStyles';

import type { Memory } from '@/types/memory';
import type { TimelineMonth } from '@/types/timeline';

type Props = {
  month: TimelineMonth;
  onMemoryPress: (memory: Memory) => void;
};

export function TimelineMonthSection({
  month,
  onMemoryPress,
}: Props) {
  return (
    <View style={styles.monthSection}>
      <AppText variant="h3" style={styles.monthLabel}>
        {month.monthLabel}
      </AppText>

      {month.memories.map((memory) => (
        <TimelineMemoryRow
          key={memory.id}
          memory={memory}
          onPress={onMemoryPress}
        />
      ))}
    </View>
  );
}