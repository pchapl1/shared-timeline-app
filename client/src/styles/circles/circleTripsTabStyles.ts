import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const circleAlbumsTabStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  title: {
    marginBottom: spacing.md,
  },

  albumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  cover: {
    width: 74,
    height: 74,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.primarySoft,
  },

  coverImage: {
    width: '100%',
    height: '100%',
  },

  coverFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  albumContent: {
    flex: 1,
  },

  albumTitle: {
    marginBottom: 2,
  },

  memoryCount: {
    marginTop: spacing.xs,
  },

  emptyText: {
    paddingTop: spacing.md,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },

  emptyDescription: {
    textAlign: 'center',
  },
});