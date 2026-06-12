import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export function PageHeader({
  title,
  subtitle,
  rightContent,
  style,
}: Props) {
  return (
    <View
      style={[
        {
          marginBottom: spacing.lg,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <AppText variant="h1">{title}</AppText>

          {!!subtitle && (
            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={{ marginTop: spacing.xs }}
            >
              {subtitle}
            </AppText>
          )}
        </View>

        {rightContent}
      </View>
    </View>
  );
}