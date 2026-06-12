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
    marginBottom: spacing.sm,
  },

  description: {
    marginTop: spacing.xs,
  },

  memoryCount: {
    marginTop: spacing.md,
  },
});