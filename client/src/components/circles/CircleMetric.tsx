import { ReactNode } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { circleMetricStyles as styles } from '@/styles/circles/circleMetricStyles';

type Props = {
  icon: ReactNode;
  value: number;
  label: string;
  featured?: boolean;
};

export function CircleMetric({
  icon,
  value,
  label,
  featured = false,
}: Props) {
  return (
    <View style={styles.metric}>
      <View style={styles.valueRow}>
        {icon}

        <AppText
          variant='bodyStrong'
          style={styles.value}
        >
          {value}
        </AppText>
      </View>

      <AppText variant="caption" style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}