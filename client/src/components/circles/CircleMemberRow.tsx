import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';

import { colors } from '@/theme/colors';
import { circleMemberRowStyles as styles } from '@/styles/circles/circleMemberRowStyles';

import type { CircleMember } from '@/types/circle';

type Props = {
  member: CircleMember;
};

function formatRole(role: CircleMember['role']) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function CircleMemberRow({ member }: Props) {
  return (
    <View style={styles.container}>
      <Avatar label={member.username} size={34} />

      <View style={styles.content}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {member.username}
        </AppText>

        <AppText variant="bodySmall" color={colors.textMuted}>
          {formatRole(member.role)}
        </AppText>
      </View>
    </View>
  );
}