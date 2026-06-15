import { Image } from 'expo-image';
import { MapPin } from 'lucide-react-native';
import { View, Text } from 'react-native';

import { colors } from '@/theme/colors';
import { mapPhotoMarkerStyles as styles } from '@/styles/maps/mapPhotoMarkerStyles';

type Props = {
  imageUrl?: string | null;
  count?: number;
  isSelected?: boolean;
};

export function MapPhotoMarker({
  imageUrl,
  count = 1,
  isSelected,
}: Props) {
  const isCluster = count > 1;

  if (isCluster) {
    return (
      <View style={styles.clusterBubbleOnly}>
        <Text style={styles.clusterCountText}>
          {count}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.photoRing,
          isSelected && styles.selectedPhotoRing,
        ]}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.photo}
            contentFit="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <MapPin size={24} color={colors.primary} />
          </View>
        )}
      </View>

      <View style={styles.pointer} />
    </View>
  );
}