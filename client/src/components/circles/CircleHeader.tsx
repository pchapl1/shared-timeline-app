import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { CircleTabs } from '@/components/circles/CircleTabs';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { AvatarStack } from '@/components/ui/AvatarStack';
import { StatsRow } from '@/components/ui/StatsRow';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

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
  const avatarItems = circle.members.map((member) => ({
    id: member.id,
    label: member.username,
  }));

  if (variant === 'compact') {
    return (
      <View style={{ marginBottom: spacing.md }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.md,
            marginBottom: spacing.md,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/circles')}
          >
            <AppText variant="bodySmall" color={colors.primary}>
              ← Back
            </AppText>
          </TouchableOpacity>

          <AppText
            variant="h3"
            numberOfLines={1}
            style={{ flex: 1, textAlign: 'right' }}
          >
            {circle.name}
          </AppText>
        </View>

        <CircleTabs circleId={circle.id} activeTab={activeTab} />
      </View>
    );
  }

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/circles')}
        hitSlop={12}
        style={{
          marginTop: 44,
          marginBottom: spacing.md,
          paddingVertical: 8,
        }}
      >
        <AppText variant="bodySmall" color={colors.primary}>
          ← Back to circles
        </AppText>
      </TouchableOpacity>

      <AppCard style={{ padding: 0, overflow: 'hidden' }}>
        <View
          style={{
            minHeight: 150,
            padding: spacing.lg,
            backgroundColor: colors.primarySoft,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: radius.full,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.md,
              borderWidth: 4,
              borderColor: colors.surface,
            }}
          >
            <AppText variant="h1" color={colors.textInverse}>
              {circle.name.charAt(0).toUpperCase()}
            </AppText>
          </View>

          <AppText variant="h1">{circle.name}</AppText>

          <AppText
            variant="bodySmall"
            color={colors.textMuted}
            style={{ marginTop: spacing.xs }}
          >
            {formatCircleType(circle.circle_type)}
          </AppText>
        </View>

        <View style={{ padding: spacing.lg }}>
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
            style={{ marginBottom: spacing.lg }}
          />

          {avatarItems.length > 0 && (
            <AvatarStack
              items={avatarItems}
              size={38}
              style={{
                marginBottom: spacing.lg,
                alignSelf: 'center',
              }}
            />
          )}

          <AppButton
            title="Manage Circle"
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: '/circles/[id]/edit',
                params: { id: String(circle.id) },
              })
            }
          />
        </View>
      </AppCard>

      <View style={{ marginTop: spacing.lg }}>
        <CircleTabs circleId={circle.id} activeTab={activeTab} />
      </View>
    </View>
  );
}