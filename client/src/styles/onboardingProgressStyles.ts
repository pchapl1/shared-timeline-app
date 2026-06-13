import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export const onboardingProgressStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xs,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    alignSelf: 'center',
  },

  step: {
    minWidth: 76,
    alignItems: 'center',
    gap: spacing.xs,
  },

  dot: {
    width: 26,
    height: 26,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dotActive: {
    backgroundColor: colors.primary,
  },

  dotComplete: {
    backgroundColor: colors.primaryLight,
  },

  label: {
    textAlign: 'center',
  },
});