import { Image, TouchableOpacity, View } from 'react-native';
import {
  Briefcase,
  Clock,
  Ellipsis,
  Image as ImageIcon,
  ShieldCheck,
  Users,
} from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';
import { AvatarStack } from '@/components/ui/AvatarStack';
import { IconCircleButton } from '@/components/ui/IconCircleButton';
import { CircleMetric } from '@/components/circles/CircleMetric';

import { colors } from '@/theme/colors';
import { circleCardStyles as styles } from '@/styles/circles/circleCardStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
  onPress: () => void;
  onOptionsPress?: () => void;
};

function getCircleDescription(circle: Circle) {
  if (circle.circle_type === 'family') {
    return 'Where life begins and love never ends.';
  }

  if (circle.circle_type === 'travel_group') {
    return 'Adventures are better together.';
  }

  if (circle.circle_type === 'friends') {
    return 'Good friends, good food, good times.';
  }

  if (circle.circle_type === 'couple') {
    return 'Your favorite memories, together.';
  }

  return 'The people and memories that matter most.';
}

function getLastActivityText(circle: Circle) {
  return circle.memory_count > 0
    ? 'Last memory'
    : 'no memories yet';
}

function getTripLabel(count: number) {
  return count === 1 ? 'Trip' : 'Trips';
}

export function CircleCard({
  circle,
  onPress,
  onOptionsPress,
}: Props) {
  const memberCount =
    circle.member_count ?? circle.members?.length ?? 0;

  const memoryCount = circle.memory_count ?? 0;
  const tripCount = circle.trip_count ?? 0;

  const avatarItems =
    circle.members?.map((member) => ({
      id: member.id,
      label: member.username,
    })) ?? [];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.pressable}
    >
      <View style={styles.card}>
        <View style={styles.coverWrap}>
          {circle.cover_photo ? (
            <Image
              source={{ uri: circle.cover_photo }}
              style={styles.coverImage}
            />
          ) : (
            <View style={styles.coverPlaceholder}>
              <AppText
                variant="h1"
                color={colors.textInverse}
              >
                {circle.name.charAt(0).toUpperCase()}
              </AppText>
            </View>
          )}

          <View style={styles.memberBadge}>
            <Users size={14} color={colors.text} />
            <AppText variant="bodyStrong">{memberCount}</AppText>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <AppText
              variant="bodyStrong"
              numberOfLines={1}
              style={styles.title}
            >
              {circle.name}
            </AppText>

            {circle.circle_type === 'travel_group' && (
              <View style={styles.featureBadge}>
                <ShieldCheck size={17} color={colors.primary} />
              </View>
            )}
          </View>

          <AppText
            variant="bodySmall"
            color={colors.textMuted}
            numberOfLines={1}
            style={styles.description}
          >
            {getCircleDescription(circle)}
          </AppText>

          <View style={styles.metricsRow}>
            <CircleMetric
              icon={
                <ImageIcon
                  size={12}
                  color={colors.primary}
                />
              }
              value={memoryCount}
              label="Memories"
              featured
            />

            <CircleMetric
              icon={
                <Briefcase
                  size={12}
                  color={colors.primary}
                />
              }
              value={tripCount}
              label={getTripLabel(tripCount)}
            />

            <CircleMetric
              icon={
                <Users
                  size={12}
                  color={colors.primary}
                />
              }
              value={memberCount}
              label="Members"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.footerRow}>
            <View style={styles.activityRow}>
              <Clock size={14} color={colors.primary} />

              <AppText
                variant="caption"
                color={colors.textMuted}
                numberOfLines={1}
                style={styles.activityText}
              >
                {getLastActivityText(circle)}
              </AppText>
            </View>

            <View style={styles.footerRight}>
              <AvatarStack items={avatarItems} size={22} max={3} />

              <IconCircleButton
                icon={
                  <Ellipsis
                    size={18}
                    color={colors.text}
                  />
                }
                onPress={onOptionsPress}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}