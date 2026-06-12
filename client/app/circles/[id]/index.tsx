import { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';

import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';

import { useCircle } from '@/hooks/circles/useCircle';
import { useCircleMemories } from '@/hooks/useCircleMemories';

import { circleTimelineStyles as styles } from '@/styles/circleTimelineStyles';

import { useAuth } from '../../../src/context/AuthContext';
import { MemoryCard } from '../../../src/components/memories/MemoryCard';
import { colors } from '../../../src/theme/colors';

import type { Memory } from '../../../src/types/memory';

function groupMemoriesByMonth(memories: Memory[]) {
  const grouped: Record<string, Memory[]> = {};

  const sortedMemories = [...memories].sort(
    (a, b) =>
      new Date(b.memory_date).getTime() -
      new Date(a.memory_date).getTime()
  );

  sortedMemories.forEach((memory) => {
    const date = new Date(memory.memory_date);

    const groupKey = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }

    grouped[groupKey].push(memory);
  });

  return grouped;
}

export default function CircleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { isLoading: authLoading, tokens } = useAuth();

  const circleId = Number(id);

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

  const memories =
    memoriesData?.pages.flatMap((page) => page.results) ?? [];

  const [selectedPhoto, setSelectedPhoto] =
    useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const groupedMemories = groupMemoriesByMonth(memories);

  async function handleRefresh() {
    try {
      setRefreshing(true);

      await Promise.all([
        refetchCircle(),
        refetchMemories(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }

  function goToAddMemory() {
    router.push({
      pathname: '/circles/[id]/add-memory',
      params: {
        id: id.toString(),
      },
    });
  }

  function goToMemory(memoryId: number) {
    router.push({
      pathname: '/circles/[id]/memories/[memoryId]',
      params: {
        id: id.toString(),
        memoryId: memoryId.toString(),
      },
    });
  }

  if (
    authLoading ||
    isCircleLoading ||
    isMemoriesLoading ||
    !tokens ||
    !circle
  ) {
    return (
      <View style={styles.screen}>
        <View style={styles.contentContainer}>
          <Text style={styles.loading}>
            Loading circle...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={400}
        onScroll={(event) => {
          const {
            layoutMeasurement,
            contentOffset,
            contentSize,
          } = event.nativeEvent;

          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 120;

          if (
            isCloseToBottom &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <CircleHeader
          circle={circle}
          activeTab="timeline"
        />

        <View style={styles.section}>
          {memories.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Memories will appear here.
              </Text>
            </View>
          ) : (
            Object.entries(groupedMemories).map(
              ([groupTitle, groupMemories]) => (
                <View
                  key={groupTitle}
                  style={styles.timelineGroup}
                >
                  <Text style={styles.timelineGroupTitle}>
                    {groupTitle}
                  </Text>

                  {groupMemories.map((memory) => (
                    <TouchableOpacity
                      key={memory.id}
                      activeOpacity={0.9}
                      onPress={() => goToMemory(memory.id)}
                    >
                      <MemoryCard
                        memory={memory}
                        onPhotoPress={(photoUrl) =>
                          setSelectedPhoto(photoUrl)
                        }
                        onPress={() => goToMemory(memory.id)}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )
            )
          )}

          {isFetchingNextPage && (
            <Text style={styles.emptyText}>
              Loading more memories...
            </Text>
          )}
        </View>
      </ScrollView>

      <FloatingActionButton
        label="＋"
        onPress={goToAddMemory}
      />

      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.photoModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPhoto(null)}
          >
            <Text style={styles.closeButtonText}>
              ✕
            </Text>
          </TouchableOpacity>

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.fullscreenPhoto}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}