import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const mapPreviewCardStyles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: 46,
    zIndex: 20,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
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

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  titleBlock: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    color: colors.text,
  },

  heroPhoto: {
    width: '100%',
    height: 86,
    borderRadius: radius.md,
    marginTop: spacing.md,
    backgroundColor: colors.surfaceMuted,
  },

  photoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingBottom: spacing.lg,
  },

  photoWrapper: {
    width: 88,
    height: 72,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyPhotoRow: {
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
});