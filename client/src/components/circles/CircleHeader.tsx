import { Image, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';
import {
  Clock,
  Image as ImageIcon,
  MoreHorizontal,
  Plane,
  Settings,
  Shield,
  Users,
} from 'lucide-react-native';

import { CircleTabs, type CircleTab } from '@/components/circles/CircleTabs';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { BackButton } from '@/components/ui/BackButton';

import { colors } from '@/theme/colors';

import { circleHeaderStyles as styles } from '@/styles/circles/circleHeaderStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
  activeTab: CircleTab;
  onChangeTab: (tab: CircleTab) => void;
  variant?: 'full' | 'compact';
};

export function CircleHeader({
  circle,
  activeTab,
  onChangeTab,
  variant = 'full',
}: Props) {
  function goBackToCircles() {
    router.push('/(tabs)/circles');
  }

  function goToInvite() {
    router.push({
      pathname: '/circles/[id]/invite',
      params: { id: String(circle.id) },
    });
  }

  function goToSettings() {
    router.push({
      pathname: '/circles/[id]/edit',
      params: { id: String(circle.id) },
    });
  }

  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactTopRow}>
          <BackButton
            onPress={goBackToCircles}
            showLabel={false}
            color={colors.surface}
          />

          <AppText
            variant="h3"
            numberOfLines={1}
            style={styles.compactTitle}
          >
            {circle.name}
          </AppText>
        </View>

        <CircleTabs
          activeTab={activeTab}
          onChangeTab={onChangeTab}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        {circle.cover_photo && (
          <Image
            source={{ uri: circle.cover_photo }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.coverOverlay}>
          <View style={styles.topActions}>
            <BackButton
              onPress={goBackToCircles}
              showLabel={false}
              color={colors.surface}
            />

            <View style={styles.topRightActions}>
              <TouchableOpacity
                style={styles.topIconButton}
                activeOpacity={0.85}
                onPress={goToSettings}
              >
                <Settings
                  size={18}
                  strokeWidth={2.2}
                  color={colors.text}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.topIconButton}
                activeOpacity={0.85}
                onPress={goToSettings}
              >
                <MoreHorizontal
                  size={20}
                  strokeWidth={2.2}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarWrap}>
          {circle.avatar ? (
            <Image
              source={{ uri: circle.avatar }}
              style={styles.mainAvatarImage}
              resizeMode="cover"
            />
          ) : (
            <Avatar
              label={circle.name}
              size={86}
              style={styles.mainAvatar}
            />
          )}

          <View style={styles.shieldBadge}>
            <Shield
              size={16}
              strokeWidth={2.4}
              color={colors.surface}
            />
          </View>
        </View>

        <View style={styles.titleRow}>
          <AppText
            variant="h1"
            numberOfLines={2}
            style={styles.title}
          >
            {circle.name}
          </AppText>

          <Shield
            size={25}
            strokeWidth={2.4}
            color={colors.primary}
          />
        </View>

        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.subtitle}
        >
          Adventures are better together.
        </AppText>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.statTopRow}>
              <ImageIcon
                size={16}
                strokeWidth={2.1}
                color={colors.primary}
              />

              <AppText style={styles.statValue}>
                {circle.memory_count ?? 0}
              </AppText>
            </View>

            <AppText style={styles.statLabel}>
              Memories
            </AppText>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statTopRow}>
              <Plane
                size={16}
                strokeWidth={2.1}
                color={colors.primary}
              />

              <AppText style={styles.statValue}>
                {circle.trip_count ?? 0}
              </AppText>
            </View>

            <AppText style={styles.statLabel}>
              Trips
            </AppText>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statTopRow}>
              <Users
                size={16}
                strokeWidth={2.1}
                color={colors.primary}
              />

              <AppText style={styles.statValue}>
                {circle.member_count ?? 0}
              </AppText>
            </View>

            <AppText style={styles.statLabel}>
              Members
            </AppText>
          </View>
        </View>

        <View style={styles.activityRow}>
          <View style={styles.activityLeft}>
            <Clock
              size={15}
              strokeWidth={2.2}
              color={colors.primary}
            />

            <AppText style={styles.activityText}>
              Last activity recently
            </AppText>
          </View>

          <TouchableOpacity
            style={styles.inviteButton}
            activeOpacity={0.85}
            onPress={goToInvite}
          >
            <AppText style={styles.inviteText}>
              Invite
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <CircleTabs
            activeTab={activeTab}
            onChangeTab={onChangeTab}
          />
        </View>
      </View>
    </View>
  );
}