import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export const timelineMemoryRowStyles = StyleSheet.create({
  timelineRow: {
    flexDirection: 'row',
    minHeight: 76,
  },

  railColumn: {
    width: 30,
    alignItems: 'center',
  },

  railLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.primaryLight,
  },

  dotOuter: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dotInner: {
    width: 3,
    height: 3,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  memoryContent: {
    flex: 1,
    paddingLeft: spacing.sm,
    paddingBottom: spacing.sm,
  },

  memoryCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingBottom: spacing.lg,
    },

  memoryText: {
    flex: 1,
  },

  dateText: {
    marginBottom: spacing.xs,
  },

  locationText: {
    marginTop: 2,
  },

  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },

  thumbnailWrapper: {
  width: 80,
  height: 80,
  borderRadius: radius.md,
  overflow: 'hidden',
  backgroundColor: colors.surfaceMuted,
},

photoCountBadge: {
  position: 'absolute',
  right: 0,
  bottom: 0,
  minWidth: 32,
  height: 28,
  paddingHorizontal: spacing.xs,
  borderTopLeftRadius: radius.md,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.overlay,
},

photoCountText: {
  color: colors.textInverse,
  fontSize: 14,
  fontWeight: '800',
},
});