import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const circleStatsTabStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },

  grid: {
    gap: spacing.md,
  },

  statCard: {
    backgroundColor: colors.background,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});