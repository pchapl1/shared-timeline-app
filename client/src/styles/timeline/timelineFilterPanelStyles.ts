import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const timelineFilterPanelStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
    ...shadows.sm,
  },

  section: {
    gap: spacing.sm,
  },

  pillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  circlePillRow: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },

  pill: {
    maxWidth: 180,
    minHeight: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activePill: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.primarySoft,
  },

  pillText: {
    fontWeight: '700',
  },
});