import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const creationFlowStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingBottom: spacing.xxxl,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },

  header: {
    marginBottom: spacing.md,
  },

  headerText: {
    flex: 1,
  },

  headerSubtitle: {
    marginTop: spacing.xs,
  },

  progressContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
    ...shadows.sm,
  },

  progressStep: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },

  progressDot: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressDotActive: {
    backgroundColor: colors.primary,
  },

  progressDotComplete: {
    backgroundColor: colors.primary,
  },

  progressLabel: {
    textAlign: 'center',
  },

  card: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },

  cardTitle: {
    fontSize: 28,
    lineHeight: 34,
  },

  cardSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },

  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  footerButton: {
    flex: 1,
  },

  successContainer: {
    alignItems: 'center',
    paddingTop: spacing.hero,
  },

  successIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },

  successTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  successMessage: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  successPreview: {
    marginBottom: spacing.xl,
  },

  successActions: {
    width: '100%',
    gap: spacing.md,
  },

  eyebrow: {
    marginBottom: 6,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '600',
    textTransform: 'uppercase',
    opacity: 0.7,
  },
});