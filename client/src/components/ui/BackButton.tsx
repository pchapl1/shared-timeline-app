import { TouchableOpacity } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  onPress: () => void;
  label?: string;
};

export function BackButton({
  onPress,
  label = 'Back',
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        alignSelf: 'flex-start',
        paddingVertical: spacing.xs,
      }}
    >
      <AppText
        variant="bodyStrong"
        color={colors.textMuted}
      >
        ← {label}
      </AppText>
    </TouchableOpacity>
  );
}