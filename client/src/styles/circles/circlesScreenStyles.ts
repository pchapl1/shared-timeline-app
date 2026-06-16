import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const circlesScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: 80,
    paddingBottom: 120,
  },

  headerContent: {
    marginBottom: spacing.md,
  },

  createButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
  },

  emptyCard: {
    marginTop: spacing.md,
  },

  emptyText: {
    textAlign: 'center',
  },

  archivedSection: {
    marginTop: spacing.lg,
  },

  archivedTitle: {
    marginBottom: spacing.md,
  },

  archivedCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceMuted,
  },

  archivedSubtitle: {
    marginTop: spacing.xs,
  },
});