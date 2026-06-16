import { View } from 'react-native';

import { router } from 'expo-router';

import { CircleMemberRow } from '@/components/circles/CircleMemberRow';
import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { circleMembersTabStyles as styles } from '@/styles/circles/circleMembersTabStyles';

import type { Circle } from '@/types/circle';

type Props = {
  circle: Circle;
};

export function CircleMembersTab({ circle }: Props) {

  return (
    <View style={styles.container}>
      <AppText variant="bodyStrong" style={styles.title}>
        Members ({circle.member_count})
      </AppText>

      {circle.members.length > 0 ? (
        circle.members.map((member) => (
          <CircleMemberRow
            key={member.id}
            member={member}
          />
        ))
      ) : (
        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.emptyText}
        >
          No members found.
        </AppText>
      )}
    </View>
  );
}