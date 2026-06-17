import { TouchableOpacity, View } from 'react-native';
import { Archive, Circle, Users } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { circleFilterPillsStyles as styles } from '@/styles/circles/circleFilterPillsStyles';

export type CircleFilter = 'all' | 'active' | 'archived';

const FILTERS = [
  {
    key: 'all' as const,
    label: 'All Circles',
    icon: Users,
  },
  {
    key: 'active' as const,
    label: 'Active',
    icon: Circle,
  },
  {
    key: 'archived' as const,
    label: 'Archived',
    icon: Archive,
  },
];

type Props = {
  selectedFilter: CircleFilter;
  onChangeFilter: (filter: CircleFilter) => void;
};

export function CircleFilterPills({
  selectedFilter,
  onChangeFilter,
}: Props) {
  return (
    <View style={styles.row}>
      {FILTERS.map((filter) => {
        const Icon = filter.icon;
        const isSelected = selectedFilter === filter.key;

        return (
          <TouchableOpacity
            key={filter.key}
            activeOpacity={0.85}
            onPress={() => onChangeFilter(filter.key)}
            style={[
              styles.pill,
              isSelected && styles.selectedPill,
            ]}
          >
            <Icon
              size={13}
              color={
                isSelected
                  ? colors.textInverse
                  : filter.key === 'active'
                    ? colors.success
                    : colors.textMuted
              }
              fill={
                filter.key === 'active'
                  ? isSelected
                    ? colors.textInverse
                    : colors.success
                  : 'transparent'
              }
            />

            <AppText
              style = {styles.label}

              variant="bodyStrong"
              color={
                isSelected
                  ? colors.textInverse
                  : colors.textMuted
              }
            >
              {filter.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}