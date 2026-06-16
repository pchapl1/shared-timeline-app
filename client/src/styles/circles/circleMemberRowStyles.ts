import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const circleMemberRowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  content: {
    flex: 1,
  },
});