import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },

  hero: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  logoBubble: {
    width: 76,
    height: 76,
    borderRadius: radius.xl,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },

  logoText: {
    fontSize: 34,
  },

  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 310,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    ...shadows.md,
  },

  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  input: {
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 16,
    marginBottom: spacing.md,
  },

  button: {
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },

  buttonText: {
    ...typography.bodyStrong,
    color: colors.textInverse,
  },

  switchButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },

  switchText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },

  switchTextStrong: {
    color: colors.primary,
    fontWeight: '800',
  },

  message: {
    ...typography.bodySmall,
    color: colors.danger,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});