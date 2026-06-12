import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const memoryDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingBottom: spacing.xxxl,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroSection: {
    position: 'relative',
    backgroundColor: colors.surfaceMuted,
  },

  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 10,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },

  heroImage: {
    width: '100%',
    height: 300,
  },

  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    padding: spacing.sm,
    paddingTop: spacing.xxxl,
  },

  gridImageWrapper: {
    width: '49%',
    height: 180,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },

  gridImage: {
    width: '100%',
    height: '100%',
  },

  photoCountBadge: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.modalButton,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },

  imagePlaceholder: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  memoryCard: {
    marginTop: 0,
  },

  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  creatorText: {
    flex: 1,
  },

  title: {
    marginBottom: spacing.sm,
  },

  locationRow: {
    marginTop: spacing.xs,
  },

  memoryActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },

  inlineActionButton: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },

  inlineDangerButton: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },

  section: {
    marginTop: spacing.xl,
  },

  description: {
    lineHeight: 26,
  },

  commentCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },

  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  commentHeaderText: {
    flex: 1,
  },

  commentContent: {
    lineHeight: 20,
  },

  deleteCommentButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },

  emptyComments: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },

  commentComposer: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.sm,
  },

  commentInput: {
    minHeight: 40,
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },

  sendButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
});