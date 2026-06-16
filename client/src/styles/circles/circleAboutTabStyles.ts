import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const circleAboutTabStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  aboutText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },

  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  aboutLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  aboutIcon: {
    width: 18,
    alignItems: 'center',
  },

  aboutLabel: {
    ...typography.bodyStrong,
    color: colors.text,
  },

  aboutValue: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
});