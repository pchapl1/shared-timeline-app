import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export const memoryCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 220,
  },

  galleryImage: {
    width: 340,
    height: 220,
  },

  imagePlaceholder: {
    height: 180,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: colors.subtleText,
    fontSize: 16,
    fontWeight: '600',
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
    borderRadius: 4,
    backgroundColor: colors.muted,
  },

  paginationDotActive: {
    backgroundColor: colors.text,
  },

  content: {
    padding: 18,
  },

  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  username: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '600',
  },

  dot: {
    color: colors.border,
    marginHorizontal: spacing.sm,
  },

  date: {
    color: colors.muted,
    fontSize: 14,
  },

  location: {
    color: colors.primaryLight,
    fontSize: 14,
    marginBottom: 12,
  },

  description: {
    color: colors.subtleText,
    fontSize: 16,
    lineHeight: 24,
  },
  reactionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
  gap: spacing.xs,
  marginTop: spacing.md,
},

  reactionIcon: {
    fontSize: 22,
  },

  reactionIconActive: {
    transform: [{ scale: 1.05 }],
  },

  reactionText: {
    color: colors.subtleText,
    fontSize: 15,
    fontWeight: '600',
  },
});