import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing'

export const circleFilterPillsStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    marginBottom: 18,
  },

pill: {
  height: 26,
  borderRadius: spacing.xs,
  paddingHorizontal: 10,
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
  ...shadows.sm,
},

  selectedPill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});