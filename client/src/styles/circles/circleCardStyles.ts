import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export const circleCardStyles = StyleSheet.create({
  pressable: {
    marginBottom: spacing.md,
  },

  card: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
  },

  title: {
    marginBottom: spacing.xs,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
});