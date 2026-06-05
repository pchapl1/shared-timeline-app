import { Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { CircleTabs } from '@/components/circles/CircleTabs';
import { useCircle } from '@/hooks/useCircle';
import { circleTimelineStyles as styles } from '@/styles/circleTimelineStyles';

export default function CircleMembersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const circleId = Number(id);

  const {
    data: circle,
    isLoading,
  } = useCircle(id);

  if (isLoading || !circle) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading members...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <CircleTabs
          circleId={circleId}
          activeTab="members"
        />

        <View style={styles.section}>
          <Text style={styles.memberCount}>
            {circle.members.length}{' '}
            {circle.members.length === 1
              ? 'Member'
              : 'Members'}
          </Text>

          {circle.members.length === 0 ? (
            <Text style={styles.emptyText}>
              No members found.
            </Text>
          ) : (
            circle.members.map((member) => {
              const initial =
                member.username.charAt(0).toUpperCase();

              return (
                <View
                  key={member.id}
                  style={styles.memberRow}
                >
                  <View style={styles.memberAvatar}>
                    <Text style={styles.memberAvatarText}>
                      {initial}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.memberName}>
                      {member.username}
                    </Text>

                    <Text style={styles.memberRole}>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Text>
                  </View>
                </View>
              );
            })
          )}

          <TouchableOpacity
            style={styles.inviteButton}
            onPress={() =>
              router.push({
                pathname: '/circles/[id]/invite',
                params: {
                  id: id.toString(),
                },
              })
            }
          >
            <Text style={styles.inviteButtonText}>
              Invite Member
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}