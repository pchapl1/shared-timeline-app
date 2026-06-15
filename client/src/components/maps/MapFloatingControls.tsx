import {
  Layers,
  LocateFixed,
  Minus,
  Plus,
  Search,
} from 'lucide-react-native';

import { TouchableOpacity, View } from 'react-native';

import { colors } from '@/theme/colors';
import { mapFloatingControlsStyles as styles } from '@/styles/maps/mapFloatingControlsStyles';

const CONTROL_ICON_SIZE = 17;

type Props = {
  onSearchPress: () => void;
  onMapTypePress: () => void;
  onZoomInPress: () => void;
  onZoomOutPress: () => void;
  onFitPress: () => void;
};

export function MapFloatingControls({
  onSearchPress,
  onMapTypePress,
  onZoomInPress,
  onZoomOutPress,
  onFitPress,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={onSearchPress}>
        <Search size={CONTROL_ICON_SIZE} color={colors.text} />
      </TouchableOpacity>

    <View style={styles.zoomGroup}>
      <TouchableOpacity
        style={styles.zoomButton}
        activeOpacity={0.8}
        onPress={onZoomInPress}
      >
        <Plus size={CONTROL_ICON_SIZE} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.zoomDivider} />

      <TouchableOpacity
        style={styles.zoomButton}
        activeOpacity={0.8}
        onPress={onZoomOutPress}
      >
        <Minus size={CONTROL_ICON_SIZE} color={colors.text} />
      </TouchableOpacity>
    </View>

      <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={onFitPress}>
        <LocateFixed size={CONTROL_ICON_SIZE} color={colors.text} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={onFilterPress}>
        <SlidersHorizontal size={CONTROL_ICON_SIZE} color={colors.text} />
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={onMapTypePress}>
        <Layers size={CONTROL_ICON_SIZE} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}