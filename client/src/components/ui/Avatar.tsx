import { Text, View, ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';

type Props = {
  label?: string;
  size?: number;
  style?: ViewStyle | ViewStyle[];
};

export function Avatar({
  label = '?',
  size = 40,
  style,
}: Props) {
  const initial = label.trim().charAt(0).toUpperCase() || '?';

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius.full,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: colors.surface,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colors.textInverse,
          fontSize: Math.max(12, size * 0.4),
          fontWeight: '800',
        }}
      >
        {initial}
      </Text>
    </View>
  );
}