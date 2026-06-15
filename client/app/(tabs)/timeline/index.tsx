import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { router } from 'expo-router';

import { AppText } from '@/components/ui/AppText';
import { TimelineHeader } from '@/components/timeline/TimelineHeader';
import { TimelineMonthSection } from '@/components/timeline/TimelineMonthSection';
import { TimelineSearchBar } from '@/components/timeline/TimeLineSearchBar';

import { useMemories } from '@/hooks/memories/useMemories';
import { useCircles } from '@/hooks/circles/useCircles';

import { colors } from '@/theme/colors';
import { timelineScreenStyles as styles } from '@/styles/timeline/timelineScreenStyles';

import { groupMemoriesByMonth } from '@/utils/timeline/groupMemoriesByMonth';

import type { Memory } from '@/types/memory';

function memoryMatchesSearch(
  memory: Memory,
  query: string,
  circleName?: string
) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    memory.title,
    memory.location_name,
    memory.created_by?.username,
    circleName,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export default function TimelineScreen() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: memories = [], isLoading: isMemoriesLoading } =
    useMemories();

  const { data: circles = [], isLoading: isCirclesLoading } =
    useCircles();

  const circleNameById = useMemo(() => {
    return circles.reduce<Record<number, string>>(
      (lookup, circle) => {
        lookup[circle.id] = circle.name;
        return lookup;
      },
      {}
    );
  }, [circles]);

  const filteredMemories = useMemo(() => {
    return memories.filter((memory) =>
      memoryMatchesSearch(
        memory,
        searchQuery,
        circleNameById[memory.circle]
      )
    );
  }, [memories, searchQuery, circleNameById]);

  const timelineMonths = useMemo(
    () => groupMemoriesByMonth(filteredMemories),
    [filteredMemories]
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

  function handleSearchPress() {
    setIsSearchVisible((current) => !current);
  }

  function handleClearSearch() {
    setSearchQuery('');
  }

  if (isMemoriesLoading || isCirclesLoading) {
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
        onSearchPress={handleSearchPress}
        onFilterPress={() => {}}
      />

      {isSearchVisible && (
        <TimelineSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {timelineMonths.length === 0 ? (
          <View style={styles.emptyCard}>
            <AppText variant="bodyStrong">
              {searchQuery ? 'No memories found.' : 'No memories yet.'}
            </AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.subtitle}
            >
              {searchQuery
                ? 'Try searching for a title, place, person, or circle.'
                : 'Add your first memory to start building your timeline.'}
            </AppText>
          </View>
        ) : (
          timelineMonths.map((month) => (
            <TimelineMonthSection
              key={month.monthKey}
              month={month}
              circleNameById={circleNameById}
              onMemoryPress={handleMemoryPress}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}