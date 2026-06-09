import { Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';
import { useCircle } from '@/hooks/circles/useCircle';
import { circleTimelineStyles as styles } from '@/styles/circleTimelineStyles';

export default function CircleMembersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
        <CircleHeader
          circle={circle}
          activeTab="members"
          variant='compact'
        />

        <View style={styles.section}>
          <Text style={styles.memberCount}>
            {circle.members.length}{' '}
            {circle.members.length === 1
              ? 'Member'
              : 'Members'}
          </Text>

          {circle.members.map((member) => {
            const initial =
              member.username.charAt(0).toUpperCase();

            const role =
              member.role.charAt(0).toUpperCase() +
              member.role.slice(1);

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
                    {role}
                  </Text>
                </View>
              </View>
            );
          })}

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