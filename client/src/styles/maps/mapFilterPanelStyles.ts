import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

export const mapFilterPanelStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 328,
    right: spacing.md,
    width: 132,
    zIndex: 30,

    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: radius.xl,

    borderWidth: 1,
    borderColor: 'rgba(17,24,39,0.08)',

    padding: spacing.xs,

    ...shadows.md,
  },

  option: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
  },

  selectedOption: {
    backgroundColor: 'rgba(124,58,237,0.10)',
  },
});