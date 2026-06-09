import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { CircleTabs } from '@/components/circles/CircleTabs';
import { circleTimelineStyles as styles } from '@/styles/circleTimelineStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
  activeTab: 'timeline' | 'members' | 'map' | 'trips';
  variant?: 'full' | 'compact';
};

export function CircleHeader({
  circle,
  activeTab,
  variant = 'full',
}: Props) {
  if (variant === 'compact') {
    return (
      <View style={styles.compactHeader}>
        <View style={styles.compactHeaderTop}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/circles')}
          >
            <Text style={styles.backLink}>← Back</Text>
          </TouchableOpacity>

          <Text
            style={styles.compactHeaderTitle}
            numberOfLines={1}
          >
            {circle.name}
          </Text>
        </View>

        <CircleTabs
          circleId={circle.id}
          activeTab={activeTab}
        />
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/circles')}
      >
        <Text style={styles.backLink}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{circle.name}</Text>

      <Text style={styles.subtitle}>{circle.circle_type}</Text>

      <Text style={styles.date}>
        Started: {circle.start_date}
      </Text>

      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() =>
          router.push({
            pathname: '/circles/[id]/edit',
            params: {
              id: String(circle.id),
            },
          })
        }
      >
        <Text style={styles.inviteButtonText}>
          Edit Circle
        </Text>
      </TouchableOpacity>

      <CircleTabs
        circleId={circle.id}
        activeTab={activeTab}
      />
    </View>
  );
}