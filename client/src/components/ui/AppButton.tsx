import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { AppText } from './AppText';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: Variant;
  style?: ViewStyle | ViewStyle[];
};

export function AppButton({
  title,
  variant = 'primary',
  style,
  ...props
}: Props) {
  const buttonStyles = {
    primary: {
      backgroundColor: colors.primary,
    },

    secondary: {
      backgroundColor: colors.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border,
    },

    ghost: {
      backgroundColor: 'transparent',
    },
  };

  const textColor =
    variant === 'primary'
      ? colors.textInverse
      : colors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      {...props}
      style={[
        {
          minHeight: 52,
          borderRadius: radius.lg,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        },
        buttonStyles[variant],
        style,
      ]}
    >
      <AppText
        variant="bodyStrong"
        color={textColor}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}