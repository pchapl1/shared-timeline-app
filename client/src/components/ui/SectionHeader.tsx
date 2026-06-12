import { ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SectionHeader({
  title,
  subtitle,
  rightContent,
  style,
}: Props) {
  return (
    <View
      style={[
        {
          marginBottom: spacing.md,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <AppText variant="h3">{title}</AppText>

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