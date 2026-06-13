import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const circleHeaderStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.xs,
  },

  cover: {
    height: 240,
    marginHorizontal: -24,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
    backgroundColor: colors.primary,
  },
  coverImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  coverOverlay: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 52,
  },

  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topIconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileCard: {
    marginTop: -24,
    marginHorizontal: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 44,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },

  avatarWrap: {
    position: 'absolute',
    top: -48,
    alignSelf: 'center',
    marginBottom: 0,
  },

  mainAvatar: {
    ...shadows.md,
  },

  mainAvatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: colors.surface,
  },

  title: {
    textAlign: 'center',
    marginBottom: 2,
  },

  memberCount: {
    marginBottom: spacing.sm,
  },

  avatarStack: {
    marginBottom: 16,
  },

  actionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: spacing.md,
  },

  actionItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },

  tabs: {
    width: '100%',
    marginTop: 2,
    backgroundColor: colors.surface,
  },

  compactContainer: {
    marginBottom: spacing.md,
  },

  compactTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  compactTitle: {
    flex: 1,
    textAlign: 'right',
  },

  cameraButton: {
    position: 'absolute',
    right: -6,
    bottom: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
});