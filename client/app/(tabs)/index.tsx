import { FlatList, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { PageHeader } from '@/components/ui/PageHeader';

import { activityStyles as styles } from '@/styles/activityStyles';
import { useActivities } from '@/hooks/useActivities';
import { colors } from '@/theme/colors';

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

function getActivityIcon(activity: Activity) {
  if (activity.activity_type === 'memory_created') {
    return '📸';
  }

  if (activity.activity_type === 'comment_created') {
    return '💬';
  }

  if (activity.activity_type === 'reaction_created') {
    return '❤️';
  }

  if (activity.activity_type === 'member_joined') {
    return '👋';
  }

  return '✨';
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

  function handleActivityPress(activity: Activity) {
    if (
      activity.activity_type === 'memory_created' ||
      activity.activity_type === 'comment_created' ||
      activity.activity_type === 'reaction_created'
    ) {
      if (activity.circle && activity.memory) {
        router.push({
          pathname: '/circles/[id]/memories/[memoryId]',
          params: {
            id: activity.circle.toString(),
            memoryId: activity.memory.toString(),
          },
        });
      }

      return;
    }

    if (activity.activity_type === 'member_joined') {
      if (activity.circle) {
        router.push({
          pathname: '/circles/[id]',
          params: {
            id: activity.circle.toString(),
          },
        });
      }
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <PageHeader
          title="Activity"
          subtitle="Recent updates from your circles."
        />

        <AppCard>
          <AppText
            variant="bodySmall"
            color={colors.textMuted}
            style={{ textAlign: 'center' }}
          >
            Loading activity...
          </AppText>
        </AppCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Activity"
        subtitle="Recent updates from your circles."
      />

      <FlatList
        data={activities}
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
              No activity yet.
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
              Loading more activity...
            </AppText>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleActivityPress(item)}
          >
            <AppCard style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.iconBubble}>
                  <AppText variant="h3">
                    {getActivityIcon(item)}
                  </AppText>
                </View>

                <View style={styles.cardContent}>
                  <AppText variant="bodyStrong">
                    {getActivityText(item)}
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