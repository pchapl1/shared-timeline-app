import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const mapClusterPreviewCardStyles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: 46,
    zIndex: 20,

    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    paddingBottom: spacing.xl,

    borderWidth: 1,
    borderColor: colors.border,

    ...shadows.lg,
  },

  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },

  title: {
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingBottom: spacing.md,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  textBlock: {
    flex: 1,
  },
});