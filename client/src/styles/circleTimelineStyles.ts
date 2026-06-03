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
    paddingBottom: 120,
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

  inviteButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: spacing.lg,
  },

  inviteButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});