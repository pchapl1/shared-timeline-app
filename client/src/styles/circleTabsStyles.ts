import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const circleTabsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: spacing.sm,
    marginBottom: spacing.lg,

    paddingHorizontal: spacing.sm,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: colors.primary,
  },

  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textMuted,
  },

  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
});