import { Image, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';
import { format, formatDistanceToNow } from 'date-fns';
import {
  ChevronRight,
  ImagePlus,
  Images,
  MapPin,
} from 'lucide-react-native';

import { colors } from '@/theme/colors';
import { circleTimelineStyles as styles } from '@/styles/circles/circleTimelineStyles';

import type { Circle } from '@/types/circle';
import type { Memory } from '@/types/memory';

type Props = {
  circle: Circle;
  memories: Memory[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
};

function getMemoryImage(memory: Memory) {
  if (memory.photos && memory.photos.length > 0) {
    return memory.photos[0].image;
  }

  return memory.photo ?? null;
}

function getMemoryDate(memory: Memory) {
  return new Date(memory.created_at ?? memory.memory_date);
}

export function CircleTimelineTab({
  circle,
  memories,
  isLoading,
  isFetchingNextPage,
}: Props) {
  const sortedMemories = [...memories].sort(
    (a, b) =>
      getMemoryDate(b).getTime() - getMemoryDate(a).getTime()
  );

  const latestDate = sortedMemories[0]
    ? getMemoryDate(sortedMemories[0])
    : null;

  function goToAddMemory() {
    router.push({
      pathname: '/circles/[id]/add-memory',
      params: { id: String(circle.id) },
    });
  }

  function goToMemory(memoryId: number) {
    router.push({
      pathname: '/circles/[id]/memories/[memoryId]',
      params: {
        id: String(circle.id),
        memoryId: String(memoryId),
      },
    });
  }

  if (isLoading) {
    return (
      <View style={styles.timelineTab}>
        <Text style={styles.loading}>Loading memories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.timelineTab}>
      <Text style={styles.monthHeading}>
        {latestDate ? format(latestDate, 'MMMM yyyy') : 'Timeline'}
      </Text>

      {sortedMemories.length === 0 ? (
        <View style={styles.emptyTimelineCard}>
          <Text style={styles.emptyTimelineTitle}>
            No memories yet
          </Text>

          <Text style={styles.emptyTimelineText}>
            Add the first memory to start this circle&apos;s timeline.
          </Text>
        </View>
      ) : (
        <View style={styles.timelineList}>
          <View style={styles.timelineSpine} />

          {sortedMemories.map((memory, index) => {
            const imageUri = getMemoryImage(memory);
            const isFirstItem = index === 0;

            return (
              <TouchableOpacity
                key={memory.id}
                style={styles.timelineItem}
                activeOpacity={0.88}
                onPress={() => goToMemory(memory.id)}
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
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {isFetchingNextPage && (
        <Text style={styles.loadingMoreText}>
          Loading more memories...
        </Text>
      )}

      <TouchableOpacity
        style={styles.addMemoryButton}
        activeOpacity={0.9}
        onPress={goToAddMemory}
      >
        <ImagePlus
          size={27}
          strokeWidth={2.3}
          color={colors.surface}
        />

        <View>
          <Text style={styles.addMemoryTitle}>
            Add Memory
          </Text>

          <Text style={styles.addMemorySubtitle}>
            Capture the moments that matter
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}