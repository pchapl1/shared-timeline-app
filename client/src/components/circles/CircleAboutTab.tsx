import { Text, View } from 'react-native';

import {
  CalendarClock,
  Images,
  Lock,
  Plane,
  UsersRound,
} from 'lucide-react-native';

import { colors } from '@/theme/colors';
import { circleAboutTabStyles as styles } from '@/styles/circles/circleAboutTabStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
};

function formatCircleType(circleType?: string) {
  if (!circleType) return 'Private';

  return circleType
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value?: string | null) {
  if (!value) return 'Not set';

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function AboutIcon({ children }: { children: React.ReactNode }) {
  return <View style={styles.aboutIcon}>{children}</View>;
}

export function CircleAboutTab({ circle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutText}>
        Our little corner of the internet to remember the good times.
      </Text>

      <View style={styles.aboutRow}>
        <View style={styles.aboutLabelWrap}>
          <AboutIcon>
            <CalendarClock size={14} color={colors.textMuted} strokeWidth={2} />
          </AboutIcon>
          <Text style={styles.aboutLabel}>Created</Text>
        </View>

        <Text style={styles.aboutValue}>{formatDate(circle.start_date)}</Text>
      </View>

      <View style={styles.aboutRow}>
        <View style={styles.aboutLabelWrap}>
          <AboutIcon>
            <Lock size={14} color={colors.textMuted} strokeWidth={2} />
          </AboutIcon>
          <Text style={styles.aboutLabel}>Circle Type</Text>
        </View>

        <Text style={styles.aboutValue}>
          {formatCircleType(circle.circle_type)}
        </Text>
      </View>

      <View style={styles.aboutRow}>
        <View style={styles.aboutLabelWrap}>
          <AboutIcon>
            <UsersRound size={14} color={colors.textMuted} strokeWidth={2} />
          </AboutIcon>
          <Text style={styles.aboutLabel}>Members</Text>
        </View>

        <Text style={styles.aboutValue}>{circle.member_count}</Text>
      </View>

      <View style={styles.aboutRow}>
        <View style={styles.aboutLabelWrap}>
          <AboutIcon>
            <Images size={14} color={colors.textMuted} strokeWidth={2} />
          </AboutIcon>
          <Text style={styles.aboutLabel}>Memories</Text>
        </View>

        <Text style={styles.aboutValue}>{circle.memory_count}</Text>
      </View>

      <View style={styles.aboutRow}>
        <View style={styles.aboutLabelWrap}>
          <AboutIcon>
            <Plane size={14} color={colors.textMuted} strokeWidth={2} />
          </AboutIcon>
          <Text style={styles.aboutLabel}>Trips</Text>
        </View>

        <Text style={styles.aboutValue}>{circle.trip_count}</Text>
      </View>
    </View>
  );
}