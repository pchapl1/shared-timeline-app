import { ReactNode } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { creationFlowStyles as styles } from '@/styles/creation/creationFlowStyles';

type Props = {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
};

export function CreationHeader({
  title,
  subtitle,
  rightContent,
}: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        {!!subtitle && (
          <AppText
            variant="caption"
            color={colors.primary}
            style={styles.eyebrow}
          >
            {subtitle}
          </AppText>
        )}

        <AppText variant="h1">{title}</AppText>
      </View>

      {rightContent}
    </View>
  );
}