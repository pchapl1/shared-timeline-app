import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const circleHeaderStyles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },

  cover: {
    height: 220,
    marginHorizontal: -24,
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
    width: 38,
    height: 38,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  profileCard: {
    marginTop: -36,
    marginHorizontal: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 34,
    paddingBottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },

  avatarWrap: {
    position: 'absolute',
    top: -44,
    alignSelf: 'center',
  },

  mainAvatar: {
    ...shadows.md,
  },

  mainAvatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: colors.surface,
  },

  title: {
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: 2,
    fontSize: 26,
    lineHeight: 32,
  },

  memberCount: {
    marginBottom: spacing.lg,
  },

  actionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },

  actionItem: {
    alignItems: 'center',
    gap: spacing.xs,
    minWidth: 58,
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabs: {
    width: '100%',
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
    right: -4,
    bottom: 4,
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