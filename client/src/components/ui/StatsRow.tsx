import { View, ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type StatItem = {
  label: string;
  value: string | number;
};

type Props = {
  items: StatItem[];
  style?: ViewStyle | ViewStyle[];
};

export function StatsRow({ items, style }: Props) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: spacing.sm,
        },
        style,
      ]}
    >
      {items.map((item) => (
        <View
          key={item.label}
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <AppText variant="h3" color={colors.primary}>
            {item.value}
          </AppText>

          <AppText variant="caption" color={colors.textMuted}>
            {item.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}