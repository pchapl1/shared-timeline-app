import {
  TouchableOpacity,
  View,
} from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { circleCardStyles as styles } from '@/styles/circles/circleCardStyles';

type Props = {
  name: string;
  circleType: string;
  onPress: () => void;
};

function formatCircleType(circleType: string) {
  return circleType
    .replace('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function CircleCard({
  name,
  circleType,
  onPress,
}: Props) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.pressable}
    >
      <AppCard style={styles.card}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <AppText variant="h3" color={colors.textInverse}>
              {initial}
            </AppText>
          </View>

          <View style={styles.content}>
            <AppText
              variant="h3"
              numberOfLines={1}
              style={styles.title}
            >
              {name}
            </AppText>

            <View style={styles.badge}>
              <AppText
                variant="caption"
                color={colors.primary}
              >
                {formatCircleType(circleType)}
              </AppText>
            </View>
          </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );
}