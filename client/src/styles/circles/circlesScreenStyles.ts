import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const circlesScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 56,
    paddingBottom: 130,
  },

  headerContent: {
    marginBottom: 0,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,

  },

  headerCopy: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: 600
  },

  subtitle: {
    marginTop: spacing.xs,
    fontSize: 14,
    lineHeight: 21,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },

  emptyCard: {
    marginTop: spacing.md,
  },

  emptyText: {
    textAlign: 'center',
  },
});