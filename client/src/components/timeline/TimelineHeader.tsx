import { Search, SlidersHorizontal } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';

import { colors } from '@/theme/colors';
import { timelineHeaderStyles as styles } from '@/styles/timeline/timelineHeaderStyles';

type Props = {
  onSearchPress?: () => void;
  onFilterPress?: () => void;
};

export function TimelineHeader({
  onSearchPress,
  onFilterPress,
}: Props) {
  return (
    <View style={styles.headerRow}>
      <AppText variant="h1" style={styles.title}>
        Your Timeline
      </AppText>

      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerIconButton}
          activeOpacity={0.7}
          onPress={onSearchPress}
        >
          <Search
            size={22}
            strokeWidth={2.2}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerIconButton}
          activeOpacity={0.7}
          onPress={onFilterPress}
        >
          <SlidersHorizontal
            size={22}
            strokeWidth={2.2}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}