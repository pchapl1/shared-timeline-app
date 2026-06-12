import { ReactNode } from 'react';

import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  title: string;
  subtitle?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ListItem({
  title,
  subtitle,
  leftContent,
  rightContent,
  onPress,
  style,
}: Props) {
  const content = (
    <AppCard style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
        }}
      >
        {leftContent}

        <View style={{ flex: 1 }}>
          <AppText variant="bodyStrong">{title}</AppText>

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
    </AppCard>
  );

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
}