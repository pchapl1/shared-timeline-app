import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';

export const mapPhotoMarkerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  photoRing: {
    width: 45,
    height: 45,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 4,
    borderColor: colors.surface,
    overflow: 'hidden',
    ...shadows.md,
  },

  clusterBubbleOnly: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.surface,
    ...shadows.md,
  },

  selectedPhotoRing: {
    borderColor: colors.primaryLight,
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  placeholder: {
    flex: 1,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pointer: {
    width: 10,
    height: 10,
    backgroundColor: colors.surface,
    transform: [{ rotate: '45deg' }],
    marginTop: -8,
    ...shadows.sm,
  },

  clusterContainer: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: 'rgba(124,58,237,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    ...shadows.md,
  },

  clusterBubble: {
    minWidth: 34,
    height: 34,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clusterCountText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '900',
  },
});