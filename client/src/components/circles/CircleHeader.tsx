import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { CircleTabs } from '@/components/circles/CircleTabs';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { BackButton } from '@/components/ui/BackButton';
import { StatsRow } from '@/components/ui/StatsRow';

import { colors } from '@/theme/colors';

import { circleHeaderStyles as styles } from '@/styles/circleHeaderStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
  activeTab: 'timeline' | 'members' | 'map' | 'trips';
  variant?: 'full' | 'compact';
};

function formatCircleType(circleType?: string) {
  if (!circleType) {
    return 'Shared Circle';
  }

  return circleType
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function CircleHeader({
  circle,
  activeTab,
  variant = 'full',
}: Props) {
  const circleInitial = circle.name.charAt(0).toUpperCase();

  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactTopRow}>
          <BackButton
            onPress={() => router.push('/(tabs)/circles')}
          />

          <AppText
            variant="h3"
            numberOfLines={1}
            style={styles.compactTitle}
          >
            {circle.name}
          </AppText>
        </View>

        <CircleTabs circleId={circle.id} activeTab={activeTab} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topActions}>
        <BackButton
          onPress={() => router.push('/(tabs)/circles')}
        />

        <TouchableOpacity
          style={styles.manageLink}
          onPress={() =>
            router.push({
              pathname: '/circles/[id]/edit',
              params: { id: String(circle.id) },
            })
          }
        >
          <AppText variant="bodySmall" color={colors.primary}>
            Manage
          </AppText>
        </TouchableOpacity>
      </View>

      <AppCard style={styles.card}>
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <AppText variant="h1" color={colors.textInverse}>
              {circleInitial}
            </AppText>
          </View>

          <View style={styles.titleBlock}>
            <AppText variant="h1" numberOfLines={2}>
              {circle.name}
            </AppText>

            <View style={styles.typeBadge}>
              <AppText variant="caption" color={colors.primary}>
                {formatCircleType(circle.circle_type)}
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <StatsRow
            items={[
              {
                label: 'Members',
                value: circle.member_count,
              },
              {
                label: 'Memories',
                value: circle.memory_count,
              },
              {
                label: 'Trips',
                value: circle.trip_count,
              },
            ]}
            style={styles.stats}
          />
        </View>
      </AppCard>

      <View style={styles.tabs}>
        <CircleTabs circleId={circle.id} activeTab={activeTab} />
      </View>
    </View>
  );
}