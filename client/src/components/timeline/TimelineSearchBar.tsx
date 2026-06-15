import { X } from 'lucide-react-native';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { colors } from '@/theme/colors';
import { timelineSearchBarStyles as styles } from '@/styles/timeline/timelineSearchBarStyles';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export function TimelineSearchBar({
  value,
  onChangeText,
  onClear,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search memories..."
        placeholderTextColor={colors.textSubtle}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {!!value && (
        <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
          <X size={18} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}