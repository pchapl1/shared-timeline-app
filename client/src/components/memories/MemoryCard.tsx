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

import type { Memory } from '@/types/memory';

import { memoryCardStyles as styles } from '@/styles/memoryCardStyles';
import { toggleMemoryReaction } from '@/services/memories';

const API_HOST = 'http://127.0.0.1:8000';
const GALLERY_IMAGE_WIDTH = 340;

type Props = {
  memory: Memory;
  onPhotoPress?: (photoUrl: string) => void;
};

export function MemoryCard({ memory, onPhotoPress }: Props) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const [hasReacted, setHasReacted] = useState(
    memory.has_reacted ?? false
  );

  const [reactionCount, setReactionCount] = useState(
    memory.reaction_count ?? 0
  );

  const [isReacting, setIsReacting] = useState(false);

  const photoUri = memory.photo
    ? memory.photo.startsWith('http')
      ? memory.photo
      : `${API_HOST}${memory.photo}`
    : null;

  function handleGalleryScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / GALLERY_IMAGE_WIDTH);

    setActivePhotoIndex(nextIndex);
  }

  async function handleToggleReaction() {
    if (isReacting) {
      return;
    }

    const previousHasReacted = hasReacted;
    const previousReactionCount = reactionCount;

    setIsReacting(true);
    setHasReacted(!previousHasReacted);
    setReactionCount(
      previousHasReacted
        ? Math.max(previousReactionCount - 1, 0)
        : previousReactionCount + 1
    );

    try {
      const response = await toggleMemoryReaction(memory.id);

      setHasReacted(response.has_reacted);
      setReactionCount(response.reaction_count);
    } catch (error) {
      console.error(error);

      setHasReacted(previousHasReacted);
      setReactionCount(previousReactionCount);
    } finally {
      setIsReacting(false);
    }
  }

  return (
    <View style={styles.card}>
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
              new Date(memory.created_at ?? memory.memory_date),
              {
                addSuffix: true,
              }
            )}
          </Text>
        </View>

        {!!memory.location_name && (
          <Text style={styles.location}>
            {memory.location_name}
          </Text>
        )}

        {!!memory.description && (
          <Text style={styles.description}>
            {memory.description}
          </Text>
        )}

        <TouchableOpacity
          style={styles.reactionButton}
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
      </View>
    </View>
  );
}