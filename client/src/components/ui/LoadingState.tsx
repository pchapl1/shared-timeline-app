import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  message?: string;
  style?: StyleProp<ViewStyle>;
};

export function LoadingState({
  message = 'Loading...',
  style,
}: Props) {
  return (
    <AppCard
      style={[
        {
          alignItems: 'center',
          paddingVertical: spacing.xl,
        },
        style,
      ]}
    >
      <ActivityIndicator color={colors.primary} />

      <AppText
        variant="bodySmall"
        color={colors.textMuted}
        style={{ marginTop: spacing.md }}
      >
        {message}
      </AppText>
    </AppCard>
  );
}