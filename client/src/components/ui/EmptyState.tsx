import { StyleProp, ViewStyle } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  title: string;
  message?: string;
  icon?: string;
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({
  title,
  message,
  icon = '✨',
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
      <AppText variant="h1">{icon}</AppText>

      <AppText
        variant="h3"
        style={{
          marginTop: spacing.md,
          textAlign: 'center',
        }}
      >
        {title}
      </AppText>

      {!!message && (
        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={{
            marginTop: spacing.sm,
            textAlign: 'center',
          }}
        >
          {message}
        </AppText>
      )}
    </AppCard>
  );
}