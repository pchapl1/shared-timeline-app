import { View, ViewStyle } from 'react-native';

import { Avatar } from './Avatar';
import { AppText } from './AppText';

import { colors } from '@/theme/colors';

type AvatarItem = {
  id: number | string;
  label: string;
};

type Props = {
  items: AvatarItem[];
  max?: number;
  size?: number;
  style?: ViewStyle | ViewStyle[];
};

export function AvatarStack({
  items,
  max = 4,
  size = 36,
  style,
}: Props) {
  const visibleItems = items.slice(0, max);
  const remainingCount = Math.max(items.length - max, 0);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {visibleItems.map((item, index) => (
        <Avatar
          key={item.id}
          label={item.label}
          size={size}
          style={{
            marginLeft: index === 0 ? 0 : -10,
          }}
        />
      ))}

      {remainingCount > 0 && (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            marginLeft: -10,
            backgroundColor: colors.surfaceMuted,
            borderWidth: 2,
            borderColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppText variant="caption" color={colors.textMuted}>
            +{remainingCount}
          </AppText>
        </View>
      )}
    </View>
  );
}