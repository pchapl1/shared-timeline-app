// src/styles/bottomTabBarStyles.ts

import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

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

  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },

  createMenu: {
    marginHorizontal: spacing.lg,
    marginBottom: 92,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderRadius: 28,
    backgroundColor: colors.surface,
    ...shadows.md,
  },

  createMenuHandle: {
    width: 42,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },

  createMenuTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },

  createMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  createMenuIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    marginRight: spacing.md,
  },

  createMenuText: {
    flex: 1,
  },

  createMenuItemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  createMenuItemSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSubtle,
    marginTop: 2,
  },
});