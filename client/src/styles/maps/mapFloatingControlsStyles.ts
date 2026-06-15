import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const mapFloatingControlsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing.xxl,
    right: spacing.md,
    zIndex: 10,
    gap: 10,
  },

  zoomGroup: {
    overflow: 'hidden',
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(17,24,39,0.08)',
    ...shadows.sm,
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(17,24,39,0.08)',
    ...shadows.sm,
  },

  zoomButton: {
    width: 48,
    height: 46,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  zoomDivider: {
    height: 1,
    marginHorizontal: 13,
    backgroundColor: 'rgba(17,24,39,0.10)',
  },
});