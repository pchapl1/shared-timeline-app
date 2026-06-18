import { memo } from 'react';

import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Images,
  MapPin,
  MoreHorizontal,
} from 'lucide-react-native';
import { useQueryClient } from '@tanstack/react-query';

import { deleteMemory } from '@/services/memories';

import { colors } from '@/theme/colors';
import { circleTimelineStyles as styles } from '@/styles/circles/circleTimelineStyles';

import type { Memory } from '@/types/memory';

type TimelineHeaderProps = {
  memories: Memory[];
};

type TimelineItemProps = {
  circleId: number;
  memory: Memory;
  isFirstItem: boolean;
};

type TimelineFooterProps = {
  isFetchingNextPage: boolean;
};

function getMemoryImage(memory: Memory) {
  if (memory.photos && memory.photos.length > 0) {
    return memory.photos[0].image;
  }

  return memory.photo ?? null;
}

export function getMemoryDate(memory: Memory) {
  return new Date(memory.created_at ?? memory.memory_date);
}

function goToMemory(circleId: number, memoryId: number) {
  router.push({
    pathname: '/circles/[id]/memories/[memoryId]',
    params: {
      id: String(circleId),
      memoryId: String(memoryId),
    },
  });
}

function goToEditMemory(circleId: number, memoryId: number) {
  router.push({
    pathname: '/circles/[id]/memories/edit/[memoryId]',
    params: {
      id: String(circleId),
      memoryId: String(memoryId),
    },
  });
}

export function CircleTimelineHeader({
  memories,
}: TimelineHeaderProps) {
  const latestDate = memories[0]
    ? getMemoryDate(memories[0])
    : null;

  return (
    <View style={styles.timelineTab}>
      <Text style={styles.monthHeading}>
        {latestDate ? format(latestDate, 'MMMM yyyy') : 'Timeline'}
      </Text>
    </View>
  );
}

export const CircleTimelineMemoryItem = memo(
  function CircleTimelineMemoryItem({
    circleId,
    memory,
    isFirstItem,
  }: TimelineItemProps) {

    // console.log('Render Memory: ', memory.id)
    const queryClient = useQueryClient();
    const imageUri = getMemoryImage(memory);

    function confirmDeleteMemory() {
      Alert.alert(
        'Delete memory?',
        'This memory will be removed from the circle timeline.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: handleDeleteMemory,
          },
        ]
      );
    }

    async function handleDeleteMemory() {
      try {
        await deleteMemory(memory.id);

        await queryClient.invalidateQueries({
          queryKey: ['memories', circleId],
        });

        await queryClient.invalidateQueries({
          queryKey: ['circles'],
        });

        await queryClient.invalidateQueries({
          queryKey: ['circle', String(circleId)],
        });
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Could not delete memory.');
      }
    }

    function openMemoryActions() {
      Alert.alert(memory.title, 'Choose an action', [
        {
          text: 'View Memory',
          onPress: () => goToMemory(circleId, memory.id),
        },
        {
          text: 'Edit Memory',
          onPress: () => goToEditMemory(circleId, memory.id),
        },
        {
          text: 'Delete Memory',
          style: 'destructive',
          onPress: confirmDeleteMemory,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }

    return (
      <View style={styles.timelineRowWrapper}>
        <View style={styles.timelineSpine} />

        <TouchableOpacity
          style={styles.timelineItem}
          activeOpacity={0.88}
          onPress={() => goToMemory(circleId, memory.id)}
        >
          <View style={styles.timelineDotColumn}>
            <View
              style={[
                styles.timelineDot,
                isFirstItem && styles.timelineDotActive,
              ]}
            />
          </View>

          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.timelineImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.timelineImagePlaceholder}>
              <Images
                size={20}
                strokeWidth={2}
                color={colors.primary}
              />
            </View>
          )}

          <View style={styles.timelineContent}>
            <Text style={styles.timelineDate}>
              {formatDistanceToNow(getMemoryDate(memory), {
                addSuffix: true,
              })}
            </Text>

            <Text
              style={styles.timelineTitle}
              numberOfLines={1}
            >
              {memory.title}
            </Text>

            {!!memory.location_name && (
              <View style={styles.timelineLocationRow}>
                <MapPin
                  size={13}
                  strokeWidth={2}
                  color={colors.textMuted}
                />

                <Text
                  style={styles.timelineLocation}
                  numberOfLines={1}
                >
                  {memory.location_name}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.memoryMenuButton}
            activeOpacity={0.75}
            onPress={(event) => {
              event.stopPropagation();
              openMemoryActions();
            }}
          >
            <MoreHorizontal
              size={14}
              strokeWidth={2.2}
              color={colors.primary}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
);

export function CircleTimelineEmpty() {
  return (
    <View style={styles.timelineTab}>
      <View style={styles.emptyTimelineCard}>
        <Text style={styles.emptyTimelineTitle}>
          No memories yet
        </Text>

        <Text style={styles.emptyTimelineText}>
          Add the first memory to start this circle&apos;s timeline.
        </Text>
      </View>
    </View>
  );
}

export function CircleTimelineFooter({
  isFetchingNextPage,
}: TimelineFooterProps) {
  if (!isFetchingNextPage) {
    return <View style={styles.timelineFooterSpacer} />;
  }

  return (
    <Text style={styles.loadingMoreText}>
      Loading more memories...
    </Text>
  );
}