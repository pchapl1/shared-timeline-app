import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const tripCardStyles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },

  content: {
    flex: 1,
  },

  title: {
    marginBottom: spacing.xs,
  },

  destination: {
    marginBottom: spacing.xs,
  },

  date: {
    marginBottom: spacing.xs,
  },

  description: {
    marginTop: spacing.xs,
  },

  memoryBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,

    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,

    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
});