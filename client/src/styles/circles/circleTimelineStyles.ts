import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const circleTimelineStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingBottom: 140,
  },

  loading: {
    ...typography.body,
    color: colors.textMuted,
  },

  aboutCard: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
    aboutIcon: {
    width: 18,
    alignItems: 'center',
  },

  aboutText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },

  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  aboutLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  aboutLabel: {
    ...typography.bodyStrong,
    color: colors.text,
  },

  aboutValue: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
});