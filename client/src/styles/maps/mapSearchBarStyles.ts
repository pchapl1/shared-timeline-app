// src/styles/maps/mapSearchBarStyles.ts

import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const mapSearchBarStyles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.sm,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
});