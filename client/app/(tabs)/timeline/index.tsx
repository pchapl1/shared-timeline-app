import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { router } from 'expo-router';

import { AppText } from '@/components/ui/AppText';
import { TimelineFilterPanel } from '@/components/timeline/TimelineFilterPanel';
import { TimelineHeader } from '@/components/timeline/TimelineHeader';
import { TimelineMonthSection } from '@/components/timeline/TimelineMonthSection';
import { TimelineSearchBar } from '@/components/timeline/TimelineSearchBar';

import { useMemories } from '@/hooks/memories/useMemories';
import { useCircles } from '@/hooks/circles/useCircles';

import { colors } from '@/theme/colors';
import { timelineScreenStyles as styles } from '@/styles/timeline/timelineScreenStyles';

import { groupMemoriesByMonth } from '@/utils/timeline/groupMemoriesByMonth';
import { getMemoryImage } from '@/utils/timeline/getMemoryImage';

import type { Memory } from '@/types/memory';
import type { TimelinePhotoFilter } from '@/components/timeline/TimelineFilterPanel';

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

function memoryMatchesPhotoFilter(
  memory: Memory,
  photoFilter: TimelinePhotoFilter
) {
  if (photoFilter === 'all') {
    return true;
  }

  return Boolean(getMemoryImage(memory));
}

function memoryMatchesCircleFilter(
  memory: Memory,
  selectedCircleId: number | null
) {
  if (selectedCircleId === null) {
    return true;
  }

  return memory.circle === selectedCircleId;
}

export default function TimelineScreen() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [photoFilter, setPhotoFilter] =
    useState<TimelinePhotoFilter>('all');
  const [selectedCircleId, setSelectedCircleId] =
    useState<number | null>(null);

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
    return memories.filter((memory) => {
      const circleName = circleNameById[memory.circle];

      return (
        memoryMatchesSearch(memory, searchQuery, circleName) &&
        memoryMatchesPhotoFilter(memory, photoFilter) &&
        memoryMatchesCircleFilter(memory, selectedCircleId)
      );
    });
  }, [
    memories,
    searchQuery,
    circleNameById,
    photoFilter,
    selectedCircleId,
  ]);

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

  function handleFilterPress() {
    setIsFilterVisible((current) => !current);
  }

  function handleClearSearch() {
    setSearchQuery('');
  }

  const hasActiveFilters =
    photoFilter !== 'all' || selectedCircleId !== null;

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
        onFilterPress={handleFilterPress}
      />

      {isSearchVisible && (
        <TimelineSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
        />
      )}

      {isFilterVisible && (
        <TimelineFilterPanel
          photoFilter={photoFilter}
          selectedCircleId={selectedCircleId}
          circles={circles}
          onChangePhotoFilter={setPhotoFilter}
          onChangeCircleFilter={setSelectedCircleId}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {timelineMonths.length === 0 ? (
          <View style={styles.emptyCard}>
            <AppText variant="bodyStrong">
              {searchQuery || hasActiveFilters
                ? 'No memories found.'
                : 'No memories yet.'}
            </AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.subtitle}
            >
              {searchQuery || hasActiveFilters
                ? 'Try changing your search or filters.'
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