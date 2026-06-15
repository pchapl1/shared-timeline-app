import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const timelineMonthSectionStyles = StyleSheet.create({
  monthSection: {
    marginBottom: spacing.xl,
  },

  monthLabel: {
    marginBottom: spacing.md,
    color: colors.text,
  },
});