import { ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';

type Props = {
  icon: ReactNode;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function IconBubble({
  icon,
  size = 48,
  style,
}: Props) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius.full,
          backgroundColor: colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {typeof icon === 'string' ? (
        <AppText variant="h3">{icon}</AppText>
      ) : (
        icon
      )}
    </View>
  );
}