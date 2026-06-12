import { ReactNode } from 'react';

import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppCard({ children, style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radius.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
        },
        shadows.md,
        style,
      ]}
    >
      {children}
    </View>
  );
}