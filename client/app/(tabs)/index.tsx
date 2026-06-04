import { Text, View, StyleSheet, FlatList } from 'react-native';
import { activityStyles as styles } from '@/styles/activityStyles';
import { formatDistanceToNow } from 'date-fns';

import { useActivities } from '@/hooks/useActivities';
import type { Activity } from '@/types/activity';

function getActivityText(activity: Activity) {
  if (activity.activity_type === 'memory_created') {
    return `${activity.actor_username} added a memory`;
  }

  if (activity.activity_type === 'comment_created') {
    return `${activity.actor_username} commented on a memory`;
  }

  if (activity.activity_type === 'reaction_created') {
    return `${activity.actor_username} liked a memory`;
  }

  if (activity.activity_type === 'member_joined') {
    return `${activity.actor_username} joined a circle`;
  }

  return `${activity.actor_username} did something`;
}

export default function ActivityScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useActivities();

  const activities =
    data?.pages.flatMap((page) => page.results) ?? [];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Loading activity...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No activity yet.
          </Text>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text style={styles.emptyText}>
              Loading more activity...
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {getActivityText(item)}
            </Text>

            {item.memory_title ? (
              <Text style={styles.memoryTitle}>
                {item.memory_title}
              </Text>
            ) : null}

            <Text style={styles.circleName}>
              {item.circle_name}
            </Text>

            <Text style={styles.timestamp}>
              {formatDistanceToNow(new Date(item.created_at), {
                addSuffix: true,
              })}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

