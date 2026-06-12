import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const memoryCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },

  image: {
    width: '100%',
    height: 240,
  },

  galleryImage: {
    width: 340,
    height: 240,
  },

  imagePlaceholder: {
  height: 150,
  backgroundColor: colors.primarySoft,
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
},

  placeholderIcon: {
  fontSize: 28,
  marginBottom: spacing.xs,
},

  placeholderText: {
    ...typography.bodyStrong,
    color: colors.primary,
  },

  pagination: {
    position: 'absolute',
    bottom: spacing.sm,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },

  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  paginationDotActive: {
    backgroundColor: colors.surface,
    width: 18,
  },

  content: {
    padding: spacing.lg,
  },

  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },

  username: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '700',
  },

  dot: {
    color: colors.textSubtle,
    marginHorizontal: spacing.sm,
  },

  date: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },

  location: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },

  description: {
    ...typography.body,
    color: colors.textMuted,
  },

  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },

  engagementPill: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  reactionIcon: {
    fontSize: 18,
  },

  reactionIconActive: {
    transform: [{ scale: 1.05 }],
  },

  reactionText: {
    ...typography.caption,
    color: colors.textMuted,
  },

  commentCountText: {
    ...typography.caption,
    color: colors.textMuted,
  },

  commentPreview: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  commentPreviewUser: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },

  commentPreviewText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
});