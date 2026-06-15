import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { router } from 'expo-router';

import { AppText } from '@/components/ui/AppText';
import { TimelineHeader } from '@/components/timeline/TimelineHeader';
import { TimelineMonthSection } from '@/components/timeline/TimelineMonthSection';

import { useMemories } from '@/hooks/memories/useMemories';

import { colors } from '@/theme/colors';
import { timelineScreenStyles as styles } from '@/styles/timeline/timelineScreenStyles';

import { groupMemoriesByMonth } from '@/utils/timeline/groupMemoriesByMonth';

import type { Memory } from '@/types/memory';

export default function TimelineScreen() {
  const { data: memories = [], isLoading } = useMemories();

  const timelineMonths = useMemo(
    () => groupMemoriesByMonth(memories),
    [memories]
  );

  function handleMemoryPress(memory: Memory) {
    router.push({
      pathname: '/circles/[id]/memories/[memoryId]',
      params: {
        id: memory.circle.toString(),
        memoryId: memory.id.toString(),
      },
    });
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <TimelineHeader />

        <AppText
          variant="body"
          color={colors.textMuted}
          style={styles.subtitle}
        >
          Loading your shared memories...
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TimelineHeader
        onSearchPress={() => {}}
        onFilterPress={() => {}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {timelineMonths.length === 0 ? (
          <View style={styles.emptyCard}>
            <AppText variant="bodyStrong">
              No memories yet.
            </AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.subtitle}
            >
              Add your first memory to start building your
              timeline.
            </AppText>
          </View>
        ) : (
          timelineMonths.map((month) => (
            <TimelineMonthSection
              key={month.monthKey}
              month={month}
              onMemoryPress={handleMemoryPress}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}