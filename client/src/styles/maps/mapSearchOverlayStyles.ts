import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const mapSearchOverlayStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.md,
    right: 78,
    zIndex: 30,
    gap: spacing.sm,
  },

  searchCard: {
    minHeight: 48,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.md,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: spacing.sm,
  },

  resultsCard: {
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.md,
  },

  resultRow: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  resultTextBlock: {
    gap: 2,
  },

  emptyResult: {
    padding: spacing.md,
  },
});