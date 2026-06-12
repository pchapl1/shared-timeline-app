import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 80,
    paddingHorizontal: spacing.lg,
  },

  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  profileName: {
    textAlign: 'center',
  },

  profileSubtitle: {
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  sectionCard: {
    marginBottom: spacing.lg,
  },

  sectionText: {
    marginTop: spacing.sm,
  },

  logoutButton: {
    marginTop: spacing.sm,
  },
});