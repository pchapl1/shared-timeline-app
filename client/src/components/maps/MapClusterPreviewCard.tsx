import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { mapClusterPreviewCardStyles as styles } from '@/styles/maps/mapClusterPreviewCardStyles';

import type { MapDisplayItem } from '@/types/map';

type Props = {
  items: MapDisplayItem[];
  onSelectItem: (item: MapDisplayItem) => void;
};

export function MapClusterPreviewCard({
  items,
  onSelectItem,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.handle} />

      <AppText variant="bodyStrong" style={styles.title}>
        {items.length} memories at this location
      </AppText>

      {items.map((item) => (
        <TouchableOpacity
          key={`${item.type}-${item.id}`}
          activeOpacity={0.85}
          style={styles.row}
          onPress={() => onSelectItem(item)}
        >
          <View style={styles.dot} />

          <View style={styles.textBlock}>
            <AppText variant="bodyStrong" numberOfLines={1}>
              {item.title}
            </AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              numberOfLines={1}
            >
              {item.type === 'trip' ? 'Trip' : 'Memory'}
              {item.subtitle ? ` • ${item.subtitle}` : ''}
            </AppText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}