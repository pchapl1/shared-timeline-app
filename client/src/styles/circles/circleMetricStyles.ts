


import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const circleMetricStyles = StyleSheet.create({
  metric: {
    alignItems: 'center',
    minWidth: 56,
  },

  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  value: {
    fontSize: 12,
    lineHeight: 17,
  },

  label: {
    marginTop: 2,
    fontSize: 9,
    lineHeight: 11,
    color: colors.textMuted,
  },
});