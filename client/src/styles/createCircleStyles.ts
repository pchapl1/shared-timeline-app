import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const createCircleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingBottom: spacing.xxl,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },


  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: radius.xxl,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },

  heroEmoji: {
    fontSize: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  title: {
    textAlign: 'center',
  },

  subtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
    maxWidth: 280,
  },

  card: {
    marginBottom: spacing.lg,
    padding: spacing.md,
  },

  input: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 54,
    color: colors.text,
    fontSize: 16,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },

  dateInput: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 54,
    justifyContent: 'center',
    marginTop: spacing.xs,
  },

  fieldSpacer: {
    marginTop: spacing.sm,
  },

  dropdownButton: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },

  dropdownMenu: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },

  dropdownItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  dropdownItemLast: {
    borderBottomWidth: 0,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  buttonDisabled: {
    opacity: 0.6,
  },
});