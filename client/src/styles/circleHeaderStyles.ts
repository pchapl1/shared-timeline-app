import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const circleHeaderStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },

  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: spacing.sm,
    },

  manageLink: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
    },


  card: {
    padding: 0,
    overflow: 'hidden',
  },

  hero: {
    padding: spacing.lg,
    backgroundColor: colors.primarySoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.surface,
    },

  titleBlock: {
    flex: 1,
  },

  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.xs,
  },

  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },

  stats: {
    marginBottom: spacing.sm,
  },

  manageButtonContainer: {
    alignItems: 'center',
  },

  manageButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },

  tabs: {
    marginTop: spacing.sm,
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
});