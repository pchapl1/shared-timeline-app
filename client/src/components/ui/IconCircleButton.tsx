import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

import { iconCircleButtonStyles as styles } from '@/styles/ui/iconCircleButtonStyles';

type Props = {
  icon: ReactNode;
  onPress?: () => void;
};

export function IconCircleButton({ icon, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.button}
    >
      {icon}
    </TouchableOpacity>
  );
}