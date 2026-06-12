import { ReactNode } from 'react';

import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  rightContent?: ReactNode;
  danger?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ActionRow({
  title,
  subtitle,
  icon,
  rightContent,
  danger = false,
  onPress,
  style,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          paddingVertical: spacing.md,
        },
        style,
      ]}
    >
      {icon}

      <View style={{ flex: 1 }}>
        <AppText
          variant="bodyStrong"
          color={danger ? colors.danger : colors.text}
        >
          {title}
        </AppText>

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
    </TouchableOpacity>
  );
}