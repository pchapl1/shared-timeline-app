import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
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
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.xs,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  filterButton: {
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
    color: colors.text,
  },

  activeFilterText: {
    color: colors.textInverse,
  },

  mapTypeToggle: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },

  mapTypeToggleText: {
    ...typography.caption,
    color: colors.text,
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