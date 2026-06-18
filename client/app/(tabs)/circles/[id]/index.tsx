import { useMemo, useState } from 'react';

import {
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { formatDistanceToNow } from 'date-fns';

import { useLocalSearchParams } from 'expo-router';

import { CircleAlbumsTab } from '@/components/circles/CircleAlbumsTab';
import { CircleHeader } from '@/components/circles/CircleHeader';
import { CircleMembersTab } from '@/components/circles/CircleMembersTab';
import {
  CircleTimelineEmpty,
  CircleTimelineFooter,
  CircleTimelineHeader,
  CircleTimelineMemoryItem,
  getMemoryDate,
} from '@/components/circles/CircleTimelineTab';

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

  const sortedMemories = useMemo(
    () =>
      [...memories].sort(
        (a, b) =>
          getMemoryDate(b).getTime() -
          getMemoryDate(a).getTime()
      ),
    [memories]
  );


  const lastActivityText = useMemo(() => {
    if (!sortedMemories.length) {
      return 'No activity yet';
    }

  return `Last activity ${formatDistanceToNow(
    getMemoryDate(sortedMemories[0]),
    { addSuffix: true }
  )}`;
}, [sortedMemories]);

  function handleRefresh() {
    refetchCircle();
    refetchMemories();
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

  if (activeTab !== 'timeline') {
    return (
      <View style={styles.screen}>
        <FlatList
          data={[activeTab]}
          keyExtractor={(item) => item}
          renderItem={() => {
            if (activeTab === 'trips') {
              return (
                <Text style={styles.loading}>
                  Trips Coming Next
                </Text>
              );
            }

            if (activeTab === 'members') {
              return <CircleMembersTab circle={circle} />;
            }

            return <CircleAlbumsTab circle={circle} />;
          }}
          ListHeaderComponent={
            <CircleHeader
              circle={circle}
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              lastActivityText={lastActivityText}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={sortedMemories}
        keyExtractor={(memory) => String(memory.id)}
        renderItem={({ item, index }) => (
          <CircleTimelineMemoryItem
            circleId={circle.id}
            memory={item}
            isFirstItem={index === 0}
          />
        )}
        ListHeaderComponent={
          <>
            <CircleHeader
              circle={circle}
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              lastActivityText={lastActivityText}
            />

            <CircleTimelineHeader memories={sortedMemories} />
          </>
        }
        ListEmptyComponent={
          isMemoriesLoading ? null : <CircleTimelineEmpty />
        }
        ListFooterComponent={
          <CircleTimelineFooter
            isFetchingNextPage={isFetchingNextPage}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.4}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}