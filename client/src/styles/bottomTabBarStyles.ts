import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';

export const bottomTabBarStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 10,
    alignItems: 'center',
  },

  container: {
    width: '100%',
    height: 60,
    borderRadius: 24,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    ...shadows.sm,
  },

  tabItem: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  label: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.textSubtle,
  },

  activeLabel: {
    color: colors.primary,
  },

  createButton: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginTop: -24,
    ...shadows.sm,
  },
});