import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const circleMembersTabStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  title: {
    marginBottom: spacing.sm,
  },

  emptyText: {
    paddingTop: spacing.md,
  },

  inviteButton: {
    marginTop: spacing.lg,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    },
});