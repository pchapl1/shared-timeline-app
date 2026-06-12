import { useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { formatDistanceToNow } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';

import type { Memory } from '@/types/memory';
import { memoryCardStyles as styles } from '@/styles/memoryCardStyles';
import { toggleMemoryReaction } from '@/services/memories';

const API_HOST = 'http://127.0.0.1:8000';
const GALLERY_IMAGE_WIDTH = 340;

type Props = {
  memory: Memory;
  onPhotoPress?: (photoUrl: string) => void;
  onPress?: () => void;
};

export function MemoryCard({
  memory,
  onPhotoPress,
  onPress,
}: Props) {
  const [activePhotoIndex, setActivePhotoIndex] =
    useState(0);
  const [isReacting, setIsReacting] = useState(false);

  const queryClient = useQueryClient();

  const hasReacted = memory.has_reacted ?? false;
  const reactionCount = memory.reaction_count ?? 0;

  const latestComment =
    memory.comments && memory.comments.length > 0
      ? memory.comments[memory.comments.length - 1]
      : null;

  const photoUri = memory.photo
    ? memory.photo.startsWith('http')
      ? memory.photo
      : `${API_HOST}${memory.photo}`
    : null;

  function updateMemoryReaction(
    memoryId: number,
    hasReacted: boolean,
    reactionCount: number
  ) {
    queryClient.setQueriesData(
      { queryKey: ['memories'] },
      (oldData: any) => {
        if (!oldData?.pages) {
          return oldData;
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            results: page.results.map((item: any) =>
              item.id === memoryId
                ? {
                    ...item,
                    has_reacted: hasReacted,
                    reaction_count: reactionCount,
                  }
                : item
            ),
          })),
        };
      }
    );
  }

  function handleGalleryScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(
      offsetX / GALLERY_IMAGE_WIDTH
    );

    setActivePhotoIndex(nextIndex);
  }

  async function handleToggleReaction() {
    if (isReacting) {
      return;
    }

    const previousHasReacted = hasReacted;
    const previousReactionCount = reactionCount;

    const optimisticHasReacted = !previousHasReacted;
    const optimisticReactionCount = previousHasReacted
      ? Math.max(previousReactionCount - 1, 0)
      : previousReactionCount + 1;

    setIsReacting(true);

    updateMemoryReaction(
      memory.id,
      optimisticHasReacted,
      optimisticReactionCount
    );

    try {
      const response = await toggleMemoryReaction(memory.id);

      updateMemoryReaction(
        memory.id,
        response.has_reacted,
        response.reaction_count
      );
    } catch (error) {
      console.error(error);

      updateMemoryReaction(
        memory.id,
        previousHasReacted,
        previousReactionCount
      );
    } finally {
      setIsReacting(false);
    }
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={onPress}
    >
      {memory.photos && memory.photos.length > 0 ? (
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleGalleryScroll}
          >
            {memory.photos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                activeOpacity={0.9}
                onPress={() => onPhotoPress?.(photo.image)}
              >
                <Image
                  source={{ uri: photo.image }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {memory.photos.length > 1 && (
            <View style={styles.pagination}>
              {memory.photos.map((photo, index) => (
                <View
                  key={photo.id}
                  style={[
                    styles.paginationDot,
                    index === activePhotoIndex &&
                      styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      ) : photoUri ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPhotoPress?.(photoUri)}
        >
          <Image
            source={{ uri: photoUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderIcon}>🖼️</Text>

          <Text style={styles.placeholderText}>
            Photo Coming Soon
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{memory.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.username}>
            @{memory.created_by?.username ?? 'unknown'}
          </Text>

          <Text style={styles.dot}>•</Text>

          <Text style={styles.date}>
            {formatDistanceToNow(
              new Date(
                memory.created_at ?? memory.memory_date
              ),
              { addSuffix: true }
            )}
          </Text>
        </View>

        {!!memory.location_name && (
          <Text style={styles.location}>
            📍 {memory.location_name}
          </Text>
        )}

        {!!memory.description && (
          <Text style={styles.description}>
            {memory.description}
          </Text>
        )}

        <View style={styles.engagementRow}>
          <TouchableOpacity
            style={styles.engagementPill}
            activeOpacity={0.8}
            onPress={handleToggleReaction}
            disabled={isReacting}
          >
            <Text
              style={[
                styles.reactionIcon,
                hasReacted && styles.reactionIconActive,
              ]}
            >
              {hasReacted ? '❤️' : '🤍'}
            </Text>

            <Text style={styles.reactionText}>
              {reactionCount}
            </Text>
          </TouchableOpacity>

          <View style={styles.engagementPill}>
            <Text style={styles.commentCountText}>
              💬{' '}
              {memory.comment_count ??
                memory.comments?.length ??
                0}
            </Text>
          </View>
        </View>

        {latestComment && (
          <View style={styles.commentPreview}>
            <Text style={styles.commentPreviewUser}>
              @{latestComment.user.username}
            </Text>

            <Text
              style={styles.commentPreviewText}
              numberOfLines={2}
            >
              {latestComment.content}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}