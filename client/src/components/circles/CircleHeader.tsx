import { TouchableOpacity, View, Image, Alert } from 'react-native';
import { router } from 'expo-router';

import { CircleTabs } from '@/components/circles/CircleTabs';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { AvatarStack } from '@/components/ui/AvatarStack';
import { BackButton } from '@/components/ui/BackButton';
import { IconBubble } from '@/components/ui/IconBubble';

import { colors } from '@/theme/colors';

import { circleHeaderStyles as styles } from '@/styles/circleHeaderStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
  activeTab: 'about' | 'members' | 'albums' | 'stats';
  variant?: 'full' | 'compact';
};

export function CircleHeader({
  circle,
  activeTab,
  variant = 'full',
}: Props) {
  const avatarItems = circle.members.map((member) => ({
    id: member.id,
    label: member.username,
  }));

  function goBackToCircles() {
    router.push('/(tabs)/circles');
  }

  function goToInvite() {
    router.push({
      pathname: '/circles/[id]/invite',
      params: { id: String(circle.id) },
    });
  }

  function goToMembers() {
    router.push(`/circles/${circle.id}/members`);
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
          <BackButton onPress={goBackToCircles} />

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
          <BackButton onPress={goBackToCircles} />

          <TouchableOpacity
            style={styles.topIconButton}
            activeOpacity={0.85}
            onPress={goToSettings}
          >
            <AppText variant="bodyStrong" color={colors.text}>
              ⚙
            </AppText>
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
            size={96}
            style={styles.mainAvatar}
          />
        )}

        <TouchableOpacity
          style={styles.cameraButton}
          activeOpacity={0.85}
          onPress={goToSettings}
        >
          <AppText variant="caption">📷</AppText>
        </TouchableOpacity>
      </View>

      <AppText variant="h1" numberOfLines={2} style={styles.title}>
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

      <AvatarStack
        items={avatarItems}
        max={5}
        size={28}
        style={styles.avatarStack}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionItem}
          activeOpacity={0.85}
          onPress={goToInvite}
        >
          <IconBubble icon="＋" size={42} />
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
          <IconBubble icon="💬" size={42} />
          <AppText variant="caption" color={colors.textMuted}>
            Chat
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          activeOpacity={0.85}
          onPress={goToTrips}
        >
          <IconBubble icon="✈️" size={42} />
          <AppText variant="caption" color={colors.textMuted}>
            Trips
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          activeOpacity={0.85}
          onPress={goToSettings}
        >
          <IconBubble icon="⚙" size={42} />
          <AppText variant="caption" color={colors.textMuted}>
            Settings
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <CircleTabs circleId={circle.id} activeTab={activeTab} />
      </View>
    </View>
  </View>
);
}