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

  topRightActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  topIconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  profileCard: {
    marginTop: -40,
    marginHorizontal: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: 40,
    paddingBottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  avatarWrap: {
    position: 'absolute',
    top: -56,
    left: spacing.xl,
  },

  mainAvatar: {
    ...shadows.md,
  },

  mainAvatarImage: {
    width: 88,
    height: 88,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: colors.surface,
  },

  shieldBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 2,

  },

  title: {
    flexShrink: 1,
    textAlign: 'left',
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.3,
  },

  subtitle: {
    marginBottom: spacing.lg,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '600',
  },

  memberCount: {
    marginBottom: spacing.lg,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

    gap: 56,

    marginBottom: spacing.md,
  },

  statItem: {
    // flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  statTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    marginBottom: 2,
  },

  statValue: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.text,
  },


  statLabel: {
    paddingLeft: 0, // remove this completely
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500', // was 700
    color: colors.textMuted,
  },

  activityRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 13,
    paddingBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },

  activityText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },

  inviteButton: {
    minWidth: 88,
    height: 30,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inviteText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },

  tabs: {
    alignSelf: 'stretch',
    marginHorizontal: -spacing.md,
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