import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export const createPickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },

  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },

  iconBubble: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    marginBottom: spacing.md,
  },

  subtitle: {
    marginTop: spacing.xs,
  },

  circleCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circleAvatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    marginRight: spacing.md,
  },

  circleInfo: {
    flex: 1,
  },

  centerText: {
    textAlign: 'center',
  },
});