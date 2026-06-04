import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';

import { useNotifications } from '@/hooks/useNotifications';
import { markNotificationRead } from '@/services/notifications';
import type { Notification } from '@/types/notification';
import { notificationStyles as styles } from '@/styles/notificationStyles';

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

export default function NotificationsScreen() {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useNotifications();

  const notifications =
    data?.pages.flatMap((page) => page.results) ?? [];

  async function handleNotificationPress(notificationId: number) {
    try {
      await markNotificationRead(notificationId);

      await queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['unreadNotificationCount'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Loading notifications...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No notifications yet.
          </Text>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text style={styles.emptyText}>
              Loading more notifications...
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleNotificationPress(item.id)}
          >
            <View
              style={[
                styles.card,
                !item.is_read ? styles.unreadCard : undefined,
              ]}
            >
              <Text style={styles.cardTitle}>
                {getNotificationText(item)}
              </Text>

              {item.memory_title ? (
                <Text style={styles.memoryTitle}>
                  {item.memory_title}
                </Text>
              ) : null}

              {item.circle_name ? (
                <Text style={styles.circleName}>
                  {item.circle_name}
                </Text>
              ) : null}

              <Text style={styles.timestamp}>
                {formatDistanceToNow(new Date(item.created_at), {
                  addSuffix: true,
                })}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}