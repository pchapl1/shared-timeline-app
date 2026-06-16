import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';

import { creationFlowStyles as styles } from '@/styles/creation/creationFlowStyles';

type Props = {
  primaryLabel: string;
  onPrimaryPress: () => void;
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
  primaryDisabled?: boolean;
  isLoading?: boolean;
};

export function CreationFooter({
  primaryLabel,
  onPrimaryPress,
  secondaryLabel,
  onSecondaryPress,
  primaryDisabled = false,
  isLoading = false,
}: Props) {
  return (
    <View style={styles.footer}>
      {!!secondaryLabel && !!onSecondaryPress && (
        <AppButton
          title={secondaryLabel}
          variant="secondary"
          onPress={onSecondaryPress}
          style={styles.footerButton}
        />
      )}

      <AppButton
        title={isLoading ? 'Saving...' : primaryLabel}
        onPress={onPrimaryPress}
        disabled={primaryDisabled || isLoading}
        style={styles.footerButton}
      />
    </View>
  );
}