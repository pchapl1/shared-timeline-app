import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { AppText } from './AppText';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';

type Props = TouchableOpacityProps & {
  label?: string;
  style?: ViewStyle | ViewStyle[];
};

export function FloatingActionButton({
  label = '+',
  style,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      {...props}
      style={[
        {
          position: 'absolute',
          right: 24,
          bottom: 32,
          width: 64,
          height: 64,
          borderRadius: radius.full,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        shadows.lg,
        style,
      ]}
    >
      <AppText
        variant="h1"
        color={colors.textInverse}
        style={{ lineHeight: 36 }}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
}