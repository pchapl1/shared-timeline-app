import { TouchableOpacity, ViewStyle } from 'react-native';

import { ChevronLeft } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

type Props = {
  onPress: () => void;
  label?: string;
  showLabel?: boolean;
  variant?: 'plain' | 'circle';
  color?: string;
  style?: ViewStyle | ViewStyle[];
};

export function BackButton({
  onPress,
  label = 'Back',
  showLabel = true,
  variant = 'plain',
  color = colors.textMuted,
  style,
}: Props) {
  const isCircle = variant === 'circle';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: spacing.xs,
        },
        isCircle && {
          width: 38,
          height: 38,
          borderRadius: radius.full,
          backgroundColor: colors.surface,
          justifyContent: 'center',
          paddingVertical: 0,
          ...shadows.sm,
        },
        style,
      ]}
    >
      <ChevronLeft
        size={showLabel ? 22 : 24}
        strokeWidth={2.4}
        color={color}
      />

      {showLabel && (
        <AppText variant="bodyStrong" color={color}>
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
}