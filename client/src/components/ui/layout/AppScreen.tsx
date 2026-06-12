import { ReactNode } from 'react';

import {
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle | ViewStyle[];
  contentContainerStyle?: ViewStyle | ViewStyle[];
  safeTop?: boolean;
  safeBottom?: boolean;
};

export function AppScreen({
  children,
  scroll = false,
  style,
  contentContainerStyle,
  safeTop = true,
  safeBottom = true,
}: Props) {
  const insets = useSafeAreaInsets();

  const containerStyle = [
    {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: safeTop ? insets.top : 0,
      paddingBottom: safeBottom ? insets.bottom : 0,
    },
    style,
  ];

  if (scroll) {
    return (
      <View style={containerStyle}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            {
              paddingHorizontal: spacing.lg,
              paddingBottom: spacing.xxl,
            },
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <View
        style={[
          {
            flex: 1,
            paddingHorizontal: spacing.lg,
          },
          contentContainerStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
}