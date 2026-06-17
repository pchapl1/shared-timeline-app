import { TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { circleCreateCardStyles as styles } from '@/styles/circles/circleCreateCardStyles';

type Props = {
  onPress: () => void;
};

export function CircleCreateCard({ onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.iconBubble}>
        <Plus size={34} color={colors.textInverse} />
      </View>

      <AppText
        variant="h3"
        color={colors.primary}
        style={styles.title}
      >
        Create a New Circle
      </AppText>

      <AppText
        variant="bodySmall"
        color={colors.textMuted}
        style={styles.subtitle}
      >
        Start a circle for your next adventure.
      </AppText>
    </TouchableOpacity>
  );
}