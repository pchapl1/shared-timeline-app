import { Image, TouchableOpacity, View } from 'react-native';

import { format, parseISO } from 'date-fns';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { timelineMemoryRowStyles as styles } from '@/styles/timeline/timelineMemoryRowStyles';

import type { Memory } from '@/types/memory';

type Props = {
  memory: Memory;
  circleName?: string;
  onPress: (memory: Memory) => void;
};

export function TimelineMemoryRow({ memory, circleName, onPress }: Props) {
  const photos = memory.photos?.length
    ? memory.photos.map((photo) => photo.image)
    : memory.photo
      ? [memory.photo]
      : [];

  const shortCircleName =
    circleName && circleName.length > 18
      ? `${circleName.slice(0, 18)}...`
      : circleName;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(memory)}
    >
      <View style={styles.timelineRow}>
        <View style={styles.railColumn}>
          <View style={styles.railLine} />

          <View style={styles.dotOuter}>
            <View style={styles.dotInner} />
          </View>
        </View>

        <View style={styles.memoryContent}>
          <View style={styles.memoryCard}>
            <View style={styles.memoryText}>
              <AppText
                variant="caption"
                color={colors.textMuted}
                style={styles.dateText}
              >
                {format(parseISO(memory.memory_date), 'MMM d')}
              </AppText>

              <AppText variant="bodyStrong">
                {memory.title}
              </AppText>

              {!!memory.location_name && (
                <AppText
                  variant="caption"
                  color={colors.textMuted}
                  style={styles.locationText}
                  numberOfLines={1}
                >
                  {memory.location_name.split(',')[0]}
                </AppText>
              )}

              {(memory.created_by?.username || circleName) && (
                <AppText
                  variant="caption"
                  color={colors.textSubtle}
                  style={styles.metaText}
                  numberOfLines={1}
                >
                  {memory.created_by?.username ?? 'Someone'}
                  {shortCircleName ? ` · ${shortCircleName}` : ''}
                </AppText>
              )}
            </View>

            {photos.length > 0 && (
              <View style={styles.thumbnailWrapper}>
                <Image
                  source={{ uri: photos[0] }}
                  style={styles.thumbnail}
                />

                {photos.length > 1 && (
                  <View style={styles.photoCountBadge}>
                    <AppText style={styles.photoCountText}>
                      +{photos.length - 1}
                    </AppText>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}