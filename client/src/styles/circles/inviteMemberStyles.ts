import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const inviteMemberStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingBottom: spacing.xxxl,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },

  titleIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContent: {
    flex: 1,
  },

  title: {
    marginBottom: spacing.xs,
  },

  subtitle: {
    maxWidth: 320,
  },

  searchCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadows.sm,
  },

  searchLabel: {
    marginBottom: spacing.sm,
  },

  inputWrap: {
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },

  sectionHeader: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },

  userCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.sm,
  },

  cardDisabled: {
    opacity: 0.6,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userInfo: {
    flex: 1,
    gap: 2,
  },

  invitePill: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },

  invitedPill: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },

  emptyText: {
    textAlign: 'center',
  },

  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },

  invitedSection: {
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.sm,
  },

  invitedTitle: {
    marginBottom: spacing.sm,
  },

  invitedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },

  invitedAvatar: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  invitedName: {
    flex: 1,
  },

  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
});