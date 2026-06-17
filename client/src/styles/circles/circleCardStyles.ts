import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';

export const circleCardStyles = StyleSheet.create({
  pressable: {
    marginBottom: 12,
  },

  card: {
    height: 148,
    borderRadius: 10,
    backgroundColor: colors.surface,
    padding: 8,
    flexDirection: 'row',
    gap: 14,
    ...shadows.sm,
  },

  coverWrap: {
    width: 112,
    height: 124,
    borderRadius: 14,
    overflow: 'hidden',
  },

  coverImage: {
    width: '100%',
    height: '100%',
  },

  coverPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  memberBadge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    minWidth: 42,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    ...shadows.sm,
  },

  content: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 0,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  title: {
    flex: 1,
    fontSize: 17,
    lineHeight: 20,
  },

  featureBadge: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
  },

  metricsRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 8,
    marginBottom: 6,
  },

  footerRow: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },

  activityRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginRight: 6,
  },

  activityText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
  },

  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
});