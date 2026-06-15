import { useMemo } from 'react';

import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Search, X } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { mapSearchOverlayStyles as styles } from '@/styles/maps/mapSearchOverlayStyles';

import type { MapDisplayItem } from '@/types/map';

type Props = {
  searchQuery: string;
  items: MapDisplayItem[];
  onChangeSearchQuery: (value: string) => void;
  onClose: () => void;
  onSelectItem: (item: MapDisplayItem) => void;
};

export function MapSearchOverlay({
  searchQuery,
  items,
  onChangeSearchQuery,
  onClose,
  onSelectItem,
}: Props) {
  const visibleResults = useMemo(
    () => items.slice(0, 8),
    [items]
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        <Search size={18} color={colors.textMuted} />

        <TextInput
          value={searchQuery}
          onChangeText={onChangeSearchQuery}
          placeholder="Search memories and trips"
          placeholderTextColor={colors.textMuted}
          autoFocus
          style={styles.input}
          returnKeyType="search"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
        >
          <X size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {!!searchQuery.trim() && (
        <View style={styles.resultsCard}>
          {visibleResults.length === 0 && (
            <View style={styles.emptyResult}>
              <AppText variant="bodySmall" color={colors.textMuted}>
                No matching memories or trips
              </AppText>
            </View>
          )}

          {visibleResults.map((item) => (
            <TouchableOpacity
              key={`${item.type}-${item.id}`}
              style={styles.resultRow}
              activeOpacity={0.85}
              onPress={() => {
                Keyboard.dismiss();
                onSelectItem(item);
              }}
            >
              <View style={styles.resultTextBlock}>
                <AppText variant="bodyStrong" numberOfLines={1}>
                  {item.title}
                </AppText>

                <AppText variant="bodySmall" color={colors.textMuted} numberOfLines={1}>
                  {item.type === 'memory' ? 'Memory' : 'Trip'}
                  {item.subtitle ? ` • ${item.subtitle}` : ''}
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}