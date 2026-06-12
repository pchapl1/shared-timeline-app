import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export const notificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 80,
    paddingHorizontal: spacing.lg,
  },

  listContent: {
    paddingBottom: 120,
  },

  card: {
    marginBottom: spacing.md,
  },

  unreadCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },

  cardRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    flex: 1,
  },

  detailText: {
    marginTop: spacing.xs,
  },

  timestamp: {
    marginTop: spacing.sm,
  },

  footerText: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
});