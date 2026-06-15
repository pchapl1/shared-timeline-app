import { Search } from 'lucide-react-native';
import { TextInput, View } from 'react-native';

import { colors } from '@/theme/colors';

import { mapSearchBarStyles as styles } from '@/styles/maps/mapSearchBarStyles';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
};

export function MapSearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Search
        size={18}
        color={colors.textMuted}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search places..."
        placeholderTextColor={colors.textSubtle}
        style={styles.input}
      />
    </View>
  );
}