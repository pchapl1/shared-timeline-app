import { ReactNode } from 'react';
import { View } from 'react-native';

import { Check } from 'lucide-react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { creationFlowStyles as styles } from '@/styles/creation/creationFlowStyles';

type Props = {
  title: string;
  message?: string;
  primaryLabel: string;
  onPrimaryPress: () => void;
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
  children?: ReactNode;
};

export function CreationSuccess({
  title,
  message,
  primaryLabel,
  onPrimaryPress,
  secondaryLabel,
  onSecondaryPress,
  children,
}: Props) {
  return (
    <View style={styles.successContainer}>
      <View style={styles.successIcon}>
        <Check size={34} color={colors.textInverse} strokeWidth={3} />
      </View>

      <AppText variant="h1" style={styles.successTitle}>
        {title}
      </AppText>

      {!!message && (
        <AppText
          variant="body"
          color={colors.textMuted}
          style={styles.successMessage}
        >
          {message}
        </AppText>
      )}

      {!!children && (
        <View style={styles.successPreview}>
          {children}
        </View>
      )}

      <View style={styles.successActions}>
        <AppButton title={primaryLabel} onPress={onPrimaryPress} />

        {!!secondaryLabel && !!onSecondaryPress && (
          <AppButton
            title={secondaryLabel}
            variant="secondary"
            onPress={onSecondaryPress}
          />
        )}
      </View>
    </View>
  );
}