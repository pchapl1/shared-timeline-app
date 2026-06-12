import { useCallback } from 'react';

import { FlatList, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { PageHeader } from '@/components/ui/PageHeader';

import { useNotifications } from '@/hooks/useNotifications';
import { markNotificationRead } from '@/services/notifications';
import { notificationStyles as styles } from '@/styles/notificationStyles';

import { colors } from '@/theme/colors';

import type { Notification } from '@/types/notification';

function getNotificationText(notification: Notification) {
  if (notification.notification_type === 'memory_comment') {
    return `${notification.actor_username} commented on your memory`;
  }

  if (notification.notification_type === 'memory_reaction') {
    return `${notification.actor_username} liked your memory`;
  }

  if (notification.notification_type === 'circle_invite') {
    return `${notification.actor_username} invited you to a circle`;
  }

  if (notification.notification_type === 'member_joined') {
    return `${notification.actor_username} joined your circle`;
  }

  return `${notification.actor_username} sent you a notification`;
}

function getNotificationIcon(notification: Notification) {
  if (notification.notification_type === 'memory_comment') {
    return '💬';
  }

  if (notification.notification_type === 'memory_reaction') {
    return '❤️';
  }

  if (notification.notification_type === 'circle_invite') {
    return '📨';
  }

  if (notification.notification_type === 'member_joined') {
    return '👋';
  }

  return '🔔';
}

export default function NotificationsScreen() {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useNotifications();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });

      queryClient.invalidateQueries({
        queryKey: ['unreadNotificationCount'],
      });
    }, [queryClient])
  );

  const notifications =
    data?.pages.flatMap((page) => page.results) ?? [];

  async function handleNotificationPress(
    notification: Notification
  ) {
    try {
      if (!notification.is_read) {
        await markNotificationRead(notification.id);

        await queryClient.invalidateQueries({
          queryKey: ['notifications'],
        });

        await queryClient.invalidateQueries({
          queryKey: ['unreadNotificationCount'],
        });
      }

      if (
        notification.notification_type === 'memory_comment' ||
        notification.notification_type === 'memory_reaction'
      ) {
        if (notification.circle && notification.memory) {
          router.push({
            pathname: '/circles/[id]/memories/[memoryId]',
            params: {
              id: notification.circle.toString(),
              memoryId: notification.memory.toString(),
            },
          });
        }

        return;
      }

      if (notification.notification_type === 'circle_invite') {
        router.push('/invites');
        return;
      }

      if (notification.notification_type === 'member_joined') {
        if (notification.circle) {
          router.push({
            pathname: '/circles/[id]',
            params: {
              id: notification.circle.toString(),
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <PageHeader
          title="Notifications"
          subtitle="Updates from your circles and memories."
        />

        <AppCard>
          <AppText
            variant="bodySmall"
            color={colors.textMuted}
            style={{ textAlign: 'center' }}
          >
            Loading notifications...
          </AppText>
        </AppCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Notifications"
        subtitle="Updates from your circles and memories."
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          <AppCard>
            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={{ textAlign: 'center' }}
            >
              No notifications yet.
            </AppText>
          </AppCard>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.footerText}
            >
              Loading more notifications...
            </AppText>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleNotificationPress(item)}
          >
            <AppCard
              style={[
                styles.card,
                !item.is_read && styles.unreadCard,
              ]}
            >
              <View style={styles.cardRow}>
                <View style={styles.iconBubble}>
                  <AppText variant="h3">
                    {getNotificationIcon(item)}
                  </AppText>
                </View>

                <View style={styles.cardContent}>
                  <AppText variant="bodyStrong">
                    {getNotificationText(item)}
                  </AppText>

                  {!!item.memory_title && (
                    <AppText
                      variant="bodySmall"
                      color={colors.textMuted}
                      style={styles.detailText}
                    >
                      {item.memory_title}
                    </AppText>
                  )}

                  {!!item.circle_name && (
                    <AppText
                      variant="bodySmall"
                      color={colors.primary}
                      style={styles.detailText}
                    >
                      {item.circle_name}
                    </AppText>
                  )}

                  <AppText
                    variant="caption"
                    color={colors.textSubtle}
                    style={styles.timestamp}
                  >
                    {formatDistanceToNow(
                      new Date(item.created_at),
                      { addSuffix: true }
                    )}
                  </AppText>
                </View>
              </View>
            </AppCard>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}