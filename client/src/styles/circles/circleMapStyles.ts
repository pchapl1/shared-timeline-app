import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const circleMapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  screenContent: {
    paddingBottom: spacing.lg,
  },

  mapShell: {
    flex: 1,
    minHeight: 520,
    overflow: 'hidden',
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },

  mapWrapper: {
    flex: 1,
    position: 'relative',
  },

  map: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  filterOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },

  filterButton: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
  },

  activeFilterButton: {
    backgroundColor: colors.primary,
  },

  filterText: {
    ...typography.caption,
    color: colors.textMuted,
  },

  activeFilterText: {
    color: colors.textInverse,
  },

  mapTypeToggle: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm,
    zIndex: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },

  mapTypeToggleText: {
    ...typography.caption,
    color: colors.primary,
  },

  groupMarker: {
    minWidth: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    borderWidth: 2,
    borderColor: colors.surface,
  },

  tripGroupMarker: {
    backgroundColor: colors.primaryLight,
  },

  groupMarkerText: {
    ...typography.caption,
    color: colors.textInverse,
  },

  calloutTitle: {
    ...typography.bodyStrong,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  calloutText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
});