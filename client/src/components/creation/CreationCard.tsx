import { ReactNode } from 'react';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { creationFlowStyles as styles } from '@/styles/creation/creationFlowStyles';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function CreationCard({ title, subtitle, children }: Props) {
  return (
    <AppCard style={styles.card}>
      <AppText variant="bodyStrong" style={styles.cardTitle}>{title} </AppText>

      {!!subtitle && (
        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.cardSubtitle}
        >
          {subtitle}
        </AppText>
      )}

      {children}
    </AppCard>
  );
}