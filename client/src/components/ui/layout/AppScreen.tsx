import { ReactNode } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  padded?: boolean;
};

export function AppScreen({
  children,
  style,
  contentStyle,
  padded = true,
}: Props) {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View
        style={[
          styles.content,
          padded && styles.padded,
          contentStyle,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
  },

  padded: {
    paddingHorizontal: spacing.lg,
  },
});