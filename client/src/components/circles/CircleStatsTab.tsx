import { View } from 'react-native';

import {
  Images,
  Plane,
  UsersRound,
} from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { circleStatsTabStyles as styles } from '@/styles/circles/circleStatsTabStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
};

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.iconWrap}>{icon}</View>

      <AppText
        variant="bodySmall"
        color={colors.textMuted}
      >
        {label}
      </AppText>

      <AppText variant="h2">
        {value}
      </AppText>
    </View>
  );
}

export function CircleStatsTab({ circle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <StatCard
          icon={
            <UsersRound
              size={20}
              color={colors.primary}
            />
          }
          label="Members"
          value={circle.member_count}
        />

        <StatCard
          icon={
            <Images
              size={20}
              color={colors.primary}
            />
          }
          label="Memories"
          value={circle.memory_count}
        />

        <StatCard
          icon={
            <Plane
              size={20}
              color={colors.primary}
            />
          }
          label="Trips"
          value={circle.trip_count}
        />
      </View>
    </View>
  );
}