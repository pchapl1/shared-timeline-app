import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

export const circleTabsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
    marginTop: spacing.md,
    marginBottom: spacing.xl,

    backgroundColor: colors.surface,
    borderRadius: radius.full,

    borderWidth: 1,
    borderColor: colors.border,

    ...shadows.sm,
  },

  tab: {
    flex: 1,

    paddingVertical: 12,

    borderRadius: radius.full,

    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTab: {
    backgroundColor: colors.primarySoft,
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },

  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
});