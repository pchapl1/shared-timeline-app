import { useEffect, useRef } from 'react';

import { Image } from 'expo-image';
import { ChevronRight } from 'lucide-react-native';
import {
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import { format } from 'date-fns';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { mapPreviewCardStyles as styles } from '@/styles/maps/mapPreviewCardStyles';

import type { MapDisplayItem } from '@/types/map';

type Props = {
  item: MapDisplayItem;
  onPress: () => void;
};

function formatDateLabel(item: MapDisplayItem) {
  if (!item.dateLabel) {
    return item.type === 'memory' ? 'Memory' : 'Trip';
  }

  const start = format(new Date(item.dateLabel), 'MMM d, yyyy');

  if (!item.endDateLabel) {
    return start;
  }

  const end = format(new Date(item.endDateLabel), 'MMM d, yyyy');

  return `${start} – ${end}`;
}

export function MapPreviewCard({ item, onPress }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  const imageUrls = item.imageUrls ?? [];
  const visibleImages = imageUrls.slice(0, 4);
  const hiddenImageCount = Math.max(imageUrls.length - 4, 0);

  // const hasOneImage = visibleImages.length === 1;
  // const hasMultipleImages = visibleImages.length > 1;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(18);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [item.id, item.type, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.92}
        style={styles.card}
        onPress={onPress}
      >
        <View style={styles.handle} />

        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <AppText
              variant="bodyStrong"
              style={styles.title}
              numberOfLines={1}
            >
              {item.title}
            </AppText>

            <AppText variant="bodySmall" color={colors.textMuted}>
              {item.type === 'trip' ? 'Trip' : 'Memory'} • {formatDateLabel(item)}
            </AppText>
          </View>

          <ChevronRight size={22} color={colors.textSubtle} />
        </View>

        {/* {hasOneImage && (
          <Image
            source={{ uri: visibleImages[0] }}
            style={styles.heroPhoto}
            contentFit="cover"
          />
        )} */}

        {visibleImages.length > 0 && (
          <View style={styles.photoRow}>
            {visibleImages.map((imageUrl, index) => {
              const isLastVisibleImage =
                index === visibleImages.length - 1 &&
                hiddenImageCount > 0;

              return (
                <View
                  key={`${imageUrl}-${index}`}
                  style={styles.photoWrapper}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.photo}
                    contentFit="cover"
                  />

                  {isLastVisibleImage && (
                    <View style={styles.moreOverlay}>
                      <AppText
                        variant="bodyStrong"
                        color={colors.textInverse}
                      >
                        +{hiddenImageCount}
                      </AppText>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {visibleImages.length === 0 && (
          <View style={styles.emptyPhotoRow}>
            <AppText variant="bodySmall" color={colors.textMuted}>
              {item.type === 'trip'
                ? `${item.countLabel ?? 0} memories on this trip`
                : 'No photos yet'}
            </AppText>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}