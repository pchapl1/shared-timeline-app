import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export const circleTimelineStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },

  contentContainer: {
    paddingBottom: 40,
  },

  loading: {
    color: colors.text,
    fontSize: 18,
  },

  backLink: {
    color: colors.primaryLight,
    fontSize: 16,
    marginBottom: spacing.lg,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  subtitle: {
    color: colors.muted,
    fontSize: 16,
    marginBottom: spacing.sm,
  },

  date: {
    color: colors.subtleText,
    fontSize: 14,
    marginBottom: spacing.xl,
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: spacing.md,
  },

  timelineGroup: {
    marginBottom: spacing.xl,
  },

  timelineGroupTitle: {
    color: colors.muted,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  emptyText: {
    color: colors.muted,
    fontSize: 15,
  },

  floatingButton: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatingButtonText: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '600',
  },

  photoModal: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullscreenPhoto: {
    width: '100%',
    height: '100%',
  },

  closeButton: {
    position: 'absolute',
    top: 60,
    right: spacing.lg,
    zIndex: 10,
    backgroundColor: colors.modalButton,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },

  memberCount: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: '#1F2937',
  },

  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },

  memberAvatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  memberName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  memberRole: {
    marginTop: 4,
    fontSize: 13,
    color: '#9CA3AF',
  },

  inviteButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: '#2563EB',
  },

  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  compactHeader: {
  marginBottom: 8,
},

  compactHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },

  compactHeaderTitle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});