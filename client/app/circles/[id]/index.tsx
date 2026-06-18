import { useMemo, useState } from 'react';

import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { CircleAlbumsTab } from '@/components/circles/CircleAlbumsTab';
import { CircleHeader } from '@/components/circles/CircleHeader';
import { CircleMembersTab } from '@/components/circles/CircleMembersTab';
import { CircleTimelineTab } from '@/components/circles/CircleTimelineTab';

import type { CircleTab } from '@/components/circles/CircleTabs';

import { useAuth } from '@/context/AuthContext';
import { useCircle } from '@/hooks/circles/useCircle';
import { useCircleMemories } from '@/hooks/useCircleMemories';

import { colors } from '@/theme/colors';
import { circleTimelineStyles as styles } from '@/styles/circles/circleTimelineStyles';

export default function CircleDetailScreen() {
  const [activeTab, setActiveTab] =
    useState<CircleTab>('timeline');

  const { id } = useLocalSearchParams<{ id: string }>();
  const circleId = Number(id);

  const { isLoading: authLoading, tokens } = useAuth();

  const {
    data: circle,
    isLoading: isCircleLoading,
    refetch: refetchCircle,
  } = useCircle(id);

  const {
    data: memoriesData,
    isLoading: isMemoriesLoading,
    refetch: refetchMemories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCircleMemories(circleId);

  const memories = useMemo(
    () =>
      memoriesData?.pages.flatMap((page) => page.results) ?? [],
    [memoriesData]
  );

  function handleRefresh() {
    refetchCircle();
    refetchMemories();
  }

  function handleScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    if (activeTab !== 'timeline') {
      return;
    }

    const { layoutMeasurement, contentOffset, contentSize } =
      event.nativeEvent;

    const distanceFromBottom =
      contentSize.height -
      (layoutMeasurement.height + contentOffset.y);

    if (
      distanceFromBottom < 320 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }

  if (authLoading || isCircleLoading || !tokens || !circle) {
    return (
      <View style={styles.screen}>
        <View style={styles.contentContainer}>
          <Text style={styles.loading}>Loading circle...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <CircleHeader
          circle={circle}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {activeTab === 'timeline' && (
          <CircleTimelineTab
            circle={circle}
            memories={memories}
            isLoading={isMemoriesLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}

        {activeTab === 'trips' && (
          <Text style={styles.loading}>Trips Coming Next</Text>
        )}

        {activeTab === 'members' && (
          <CircleMembersTab circle={circle} />
        )}

        {activeTab === 'albums' && (
          <CircleAlbumsTab circle={circle} />
        )}
      </ScrollView>
    </View>
  );
}