import { TouchableOpacity } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme';

type Props = {
  onPress: () => void;
};

export function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.md,
        paddingVertical: 6,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.sm,
      }}
    >
      <AppText
        variant="bodyStrong"
        color={colors.primary}
      >
        ← Back
      </AppText>
    </TouchableOpacity>
  );
}