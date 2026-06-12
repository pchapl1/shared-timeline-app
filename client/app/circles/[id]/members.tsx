import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconBubble } from '@/components/ui/IconBubble';
import { ListItem } from '@/components/ui/ListItem';
import { LoadingState } from '@/components/ui/LoadingState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AppScreen } from '@/components/ui/layout/AppScreen';

import { useCircle } from '@/hooks/circles/useCircle';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function CircleMembersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: circle, isLoading } = useCircle(id);

  if (isLoading || !circle) {
    return (
      <AppScreen>
        <LoadingState message="Loading members..." />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <CircleHeader
        circle={circle}
        activeTab="members"
        variant="compact"
      />

      <SectionHeader
        title={`${circle.members.length} ${
          circle.members.length === 1 ? 'Member' : 'Members'
        }`}
        subtitle="People who belong to this shared circle."
      />

      {circle.members.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No members yet"
          message="Invite someone to start sharing memories together."
        />
      ) : (
        <View>
          {circle.members.map((member) => {
            const role =
              member.role.charAt(0).toUpperCase() +
              member.role.slice(1);

            return (
              <ListItem
                key={member.id}
                title={member.username}
                leftContent={
                  <IconBubble
                    icon={
                      <AppText
                        variant="bodyStrong"
                        color={colors.primary}
                      >
                        {member.username.charAt(0).toUpperCase()}
                      </AppText>
                    }
                  />
                }
                rightContent={
                  <View
                    style={{
                      backgroundColor: colors.primarySoft,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 999,
                    }}
    >
      <AppText
        variant="caption"
        color={colors.primary}
      >
        {role}
      </AppText>
    </View>
  }
  style={{ marginBottom: spacing.md }}
/>
            );
          })}
        </View>
      )}

      <AppButton
        title="Invite Member"
        onPress={() =>
          router.push({
            pathname: '/circles/[id]/invite',
            params: {
              id: id.toString(),
            },
          })
        }
        style={{ marginTop: spacing.md }}
      />
    </AppScreen>
  );
}