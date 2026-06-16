import { Alert, Image, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';
import {
  Camera,
  MessageCircle,
  Plane,
  Settings,
  UserPlus,
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

  function goToTrips() {
    router.push(`/circles/${circle.id}/trips`);
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
          <BackButton onPress={goBackToCircles} showLabel={false} color={colors.surface} />

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
            <BackButton onPress={goBackToCircles} showLabel={false} color={colors.surface} />

            <TouchableOpacity
              style={styles.topIconButton}
              activeOpacity={0.85}
              onPress={goToSettings}
            >
              <Settings
                size={19}
                strokeWidth={2.2}
                color={colors.text}
              />
            </TouchableOpacity>
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
              size={88}
              style={styles.mainAvatar}
            />
          )}

          <TouchableOpacity
            style={styles.cameraButton}
            activeOpacity={0.85}
            onPress={goToSettings}
          >
            <Camera
              size={15}
              strokeWidth={2.4}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <AppText
          variant="h1"
          numberOfLines={2}
          style={styles.title}
        >
          {circle.name}
        </AppText>

        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.memberCount}
        >
          {circle.member_count}{' '}
          {circle.member_count === 1 ? 'member' : 'members'}
        </AppText>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.85}
            onPress={goToInvite}
          >
            <View style={styles.actionIcon}>
              <UserPlus
                size={22}
                strokeWidth={2.2}
                color={colors.primary}
              />
            </View>

            <AppText variant="caption" color={colors.textMuted}>
              Invite
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.85}
            onPress={() =>
              Alert.alert(
                'Coming Soon',
                'Group chat is currently under development.'
              )
            }
          >
            <View style={styles.actionIcon}>
              <MessageCircle
                size={22}
                strokeWidth={2.2}
                color={colors.primary}
              />
            </View>

            <AppText variant="caption" color={colors.textMuted}>
              Chat
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.85}
            onPress={goToTrips}
          >
            <View style={styles.actionIcon}>
              <Plane
                size={22}
                strokeWidth={2.2}
                color={colors.primary}
              />
            </View>

            <AppText variant="caption" color={colors.textMuted}>
              Trips
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.85}
            onPress={goToSettings}
          >
            <View style={styles.actionIcon}>
              <Settings
                size={22}
                strokeWidth={2.2}
                color={colors.primary}
              />
            </View>

            <AppText variant="caption" color={colors.textMuted}>
              Settings
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