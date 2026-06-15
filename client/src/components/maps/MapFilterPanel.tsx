import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { mapFilterPanelStyles as styles } from '@/styles/maps/mapFilterPanelStyles';

import type { MapFilter } from '@/types/map';

type Props = {
  selectedFilter: MapFilter;
  onSelectFilter: (filter: MapFilter) => void;
};

const FILTER_OPTIONS: {
  label: string;
  value: MapFilter;
}[] = [
  { label: 'All', value: 'all' },
  { label: 'Memories', value: 'memories' },
  { label: 'Trips', value: 'trips' },
];

export function MapFilterPanel({
  selectedFilter,
  onSelectFilter,
}: Props) {
  return (
    <View style={styles.container}>
      {FILTER_OPTIONS.map((option) => {
        const isSelected = selectedFilter === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            activeOpacity={0.85}
            style={[
              styles.option,
              isSelected && styles.selectedOption,
            ]}
            onPress={() => onSelectFilter(option.value)}
          >
            <AppText
              variant="bodySmall"
              color={isSelected ? colors.primary : colors.text}
            >
              {option.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}