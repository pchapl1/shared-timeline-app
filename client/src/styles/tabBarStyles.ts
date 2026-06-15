import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 10,

    height: 60,

    paddingTop: 5,
    paddingBottom: 6,

    backgroundColor: colors.surface,
    borderTopWidth: 0,

    borderRadius: 24,

    ...shadows.sm,
    },

  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 0,
    },

  centerButton: {
    position: 'absolute',
    top: -17,
    left: '50%',
    transform: [{ translateX: -23 }],

    width: 46,
    height: 46,
    borderRadius: radius.full,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.primary,

    ...shadows.sm,
    },

  centerButtonText: {
    color: colors.surface,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '700',
  },

  tabIconText: {
    fontSize: 21,
    lineHeight: 24,
  },
});