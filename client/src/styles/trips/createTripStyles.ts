import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export const createTripStyles = StyleSheet.create({
  input: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 15,
  },

  textArea: {
    minHeight: 88,
    textAlignVertical: 'top',
  },

  field: {
    marginBottom: spacing.md,
  },

  label: {
    marginBottom: spacing.xs,
  },

  dateButton: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },

  reviewSection: {
    marginTop: spacing.lg,
  },

  previewCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },

  reviewRow: {
    marginBottom: spacing.md,
  },

  successCard: {
    marginTop: spacing.lg,
  },

  stepContainer: {
    marginTop: 8,
    marginBottom: 24,
  },


reviewPreview: {
  marginTop: spacing.md,
  marginBottom: spacing.xl,
},

reviewHero: {
  backgroundColor: colors.surface,
  borderRadius: radius.xxl,
  borderWidth: 1,
  borderColor: colors.border,
  padding: spacing.md,
  marginBottom: spacing.md,
},

reviewTitle: {
  marginBottom: spacing.sm,
},

reviewMetaRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.sm,
},

reviewMetaText: {
  flex: 1,
},

reviewSummary: {
  backgroundColor: colors.surface,
  borderRadius: radius.xxl,
  borderWidth: 1,
  borderColor: colors.border,
  padding: spacing.md,
  gap: spacing.md,
},

reviewSummaryRow: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: spacing.md,
},
});