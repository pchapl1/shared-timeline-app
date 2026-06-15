import { Pressable, View } from 'react-native';

import {
  Home,
  List,
  MapPin,
  Plus,
  UserRound,
} from 'lucide-react-native';
import { router } from 'expo-router';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { bottomTabBarStyles as styles } from '@/styles/bottomTabBarStyles';

const tabs = [
  {
    routeName: 'index',
    label: 'Home',
    icon: Home,
  },
  {
    routeName: 'timeline/index',
    label: 'Timeline',
    icon: List,
  },
  {
    routeName: 'circles/index',
    label: '',
    icon: Plus,
    isCreate: true,
  },
  {
    routeName: 'map/index',
    label: 'Map',
    icon: MapPin,
  },
  {
    routeName: 'profile/index',
    label: 'Profile',
    icon: UserRound,
  },
];

type Props = {
  state: any;
  navigation: any;
};

export function BottomTabBar({ state, navigation }: Props) {
  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const routeIndex = state.routes.findIndex(
            (route: any) => route.name === tab.routeName
          );

          const isFocused = state.index === routeIndex;
          const Icon = tab.icon;

          if (tab.isCreate) {
            return (
              <Pressable
                key={tab.routeName}
                style={styles.tabItem}
                onPress={() => {
                  router.push('/circles');
                }}
              >
                <View style={styles.createButton}>
                  <Icon
                    size={28}
                    strokeWidth={2.8}
                    color={colors.surface}
                  />
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={tab.routeName}
              style={styles.tabItem}
              onPress={() => {
                if (!isFocused) {
                  navigation.navigate(tab.routeName);
                }
              }}
            >
              <Icon
                size={20}
                strokeWidth={isFocused ? 2.5 : 2}
                color={
                  isFocused ? colors.primary : colors.textSubtle
                }
              />

              <AppText
                style={[
                  styles.label,
                  isFocused && styles.activeLabel,
                ]}
              >
                {tab.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}