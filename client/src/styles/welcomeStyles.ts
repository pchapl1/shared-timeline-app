import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';


export const welcomeStyles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
    
      content: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xxl,
      },
    
      heroCard: {
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.xxl,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xxl,
        marginBottom: spacing.lg,
        ...shadows.lg,
      },
    
      logoBubble: {
        width: 88,
        height: 88,
        borderRadius: radius.xxl,
        backgroundColor: colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
      },
    
      logoIcon: {
        fontSize: 40,
      },
    
      kicker: {
        marginBottom: spacing.sm,
        letterSpacing: 2,
      },
    
      title: {
        textAlign: 'center',
        marginBottom: spacing.md,
      },
    
      subtitle: {
        textAlign: 'center',
        maxWidth: 310,
      },
    
      previewCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.md,
      },
    
      previewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
      avatarStack: {
        flexDirection: 'row',
      },
    
      avatar: {
        width: 34,
        height: 34,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -spacing.sm,
        borderWidth: 2,
        borderColor: colors.surface,
      },
    
      avatarPurple: {
        backgroundColor: colors.primary,
      },
    
      avatarPink: {
        backgroundColor: colors.primaryLight,
      },
    
      timelineLine: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.md,
      },
    
      memoryRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
    
      memoryDot: {
        width: 12,
        height: 12,
        borderRadius: radius.full,
        backgroundColor: colors.primary,
        marginTop: spacing.xs,
        marginRight: spacing.md,
      },
    
      memoryContent: {
        flex: 1,
      },
    
      actions: {
        gap: spacing.sm,
      },
    
      primaryButton: {
        borderRadius: radius.full,
        minHeight: 56,
      },
});
