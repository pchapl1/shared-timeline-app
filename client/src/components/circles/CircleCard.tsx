import {
  TouchableOpacity,
  View,
} from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  name: string;
  circleType: string;
  onPress: () => void;
};

export function CircleCard({
  name,
  circleType,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
    >
      <AppCard
        style={{
          marginBottom: spacing.md,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppText
              variant="h3"
              color={colors.textInverse}
            >
              {name.charAt(0).toUpperCase()}
            </AppText>
          </View>

          <View style={{ flex: 1 }}>
            <AppText variant="h3">
              {name}
            </AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
            >
              {circleType}
            </AppText>
          </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );
}