import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const circleTimelineStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    paddingBottom: 140,
  },

  loading: {
    ...typography.body,
    color: colors.textMuted,
  },

  aboutCard: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  aboutIcon: {
    width: 18,
    alignItems: 'center',
  },

  aboutText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },

  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  aboutLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  aboutLabel: {
    ...typography.bodyStrong,
    color: colors.text,
  },

  aboutValue: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },

monthHeading: {
  ...typography.bodyStrong,
  color: colors.text,
  marginBottom: spacing.md,
},
timelineList: {
  position: 'relative',
  marginBottom: spacing.lg,
},

timelineDotColumn: {
  width: 24,
  alignItems: 'center',
  zIndex: 2,
},

timelineDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  borderWidth: 3,
  borderColor: colors.primary,
  backgroundColor: colors.surface,
  marginTop: 8,
},

timelineDotActive: {
  backgroundColor: colors.primary,
},

timelineImage: {
  width: 82,
  height: 70,
  borderRadius: 10,
  backgroundColor: colors.border,
  marginLeft: 10,
},

timelineImagePlaceholder: {
  width: 82,
  height: 70,
  borderRadius: 10,
  backgroundColor: colors.primarySoft,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
},

timelineContent: {
  flex: 1,
  marginLeft: 10,
  justifyContent: "center",
  paddingTop: 6,
},

timelineDate: {
  fontSize: 10,
  fontWeight: '600',
  color: colors.primary,
  marginBottom: 5,
  marginTop: 4,
},

timelineTitle: {
  fontSize: 13,
  lineHeight: 18,
  fontWeight: '500',
  color: colors.text,
  marginBottom: 4,
},

timelineLocationRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},

timelineLocation: {
  flex: 1,
  fontSize: 10,
  lineHeight: 17,
  fontWeight: '400',
  color: colors.textMuted,
},

emptyTimelineCard: {
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 18,
  padding: spacing.lg,
  marginBottom: spacing.lg,
  backgroundColor: colors.background,
},

emptyTimelineTitle: {
  fontSize: 17,
  fontWeight: '800',
  color: colors.text,
  marginBottom: 4,
},

emptyTimelineText: {
  fontSize: 13,
  lineHeight: 18,
  color: colors.textMuted,
},


addMemoryButton: {
  minHeight: 52,
  borderRadius: 10,
  backgroundColor: colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md, 
},

addMemoryTitle: {
  fontSize: 14,
  fontWeight: '700',
  color: colors.surface,
},

addMemorySubtitle: {
  marginTop: 2,
  fontSize: 11,
  fontWeight: '400',
  color: colors.surface,
},

memoryMenuButton: {
  width: 22,
  height: 22,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.border,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: spacing.xs,
},

loadingMoreText: {
  fontSize: 13,
  fontWeight: '600',
  color: colors.textMuted,
  textAlign: 'center',
  marginTop: spacing.sm,
  marginBottom: spacing.md,
},


timelineTab: {
  backgroundColor: colors.surface,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
},

timelineRowWrapper: {
  position: 'relative',
  backgroundColor: colors.surface,
  paddingHorizontal: spacing.lg,
},

timelineSpine: {
  position: 'absolute',
  top: 8,
  bottom: 0,
  left: spacing.lg + 11,
  width: 2,
  backgroundColor: colors.primarySoft,
},

timelineItem: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  minHeight: 96,
  marginBottom: 0,
},

timelineFooterSpacer: {
  height: 0,
},
});