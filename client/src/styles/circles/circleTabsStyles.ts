import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const circleTabsStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.surface,

    borderTopWidth: 1,
    borderTopColor: colors.border,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  tab: {
    flex: 1,
    minWidth: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 3,

    paddingTop: 12,
    paddingBottom: 12,

    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: colors.primary,
  },

  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },

  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
});