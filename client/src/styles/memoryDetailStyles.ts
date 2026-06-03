import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export const memoryDetailStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  loadingText: {
    color: colors.text,
    fontSize: 18,
  },

  backButton: {
    color: colors.primaryLight,
    fontSize: 16,
    marginTop: 70,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  heroImage: {
    width: '100%',
    height: 340,
  },

  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 12,
  },

  gridImageWrapper: {
    width: '48.8%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },

  gridImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    width: '100%',
    height: 260,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: colors.subtleText,
    fontSize: 16,
    fontWeight: '600',
  },

  content: {
    padding: spacing.lg,
  },

  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  username: {
    color: colors.primaryLight,
    fontSize: 15,
    fontWeight: '600',
  },

  dot: {
    color: colors.border,
    marginHorizontal: spacing.sm,
  },

  timestamp: {
    color: colors.muted,
    fontSize: 14,
  },

  location: {
    color: colors.primaryLight,
    fontSize: 16,
    marginBottom: spacing.lg,
  },

  description: {
    color: colors.subtleText,
    fontSize: 18,
    lineHeight: 30,
  },
  commentsSection: {
  marginTop: 32,
},

commentsTitle: {
  color: colors.text,
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 16,
},

commentCard: {
  backgroundColor: colors.card,
  borderRadius: 14,
  padding: 14,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: colors.border,
},

commentUsername: {
  color: colors.primaryLight,
  fontSize: 14,
  fontWeight: '700',
  marginBottom: 6,
},

commentContent: {
  color: colors.text,
  fontSize: 15,
  lineHeight: 22,
},

emptyCommentsText: {
  color: colors.muted,
  fontSize: 15,
  marginBottom: 16,
},

commentInputRow: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 10,
  marginTop: 8,
},

commentInput: {
  flex: 1,
  minHeight: 44,
  maxHeight: 120,
  backgroundColor: colors.card,
  color: colors.text,
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: colors.border,
},

commentButton: {
  backgroundColor: colors.primary,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 12,
},

commentButtonText: {
  color: colors.text,
  fontSize: 14,
  fontWeight: '700',
},
});