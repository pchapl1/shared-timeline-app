// src/components/navigation/BottomTabBar.tsx

import { useState } from 'react';

import { Modal, Pressable, View } from 'react-native';

import {
  Camera,
  CircleUserRound,
  List,
  MapPin,
  Plane,
  Plus,
  UsersRound,
} from 'lucide-react-native';
import { router } from 'expo-router';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';
import { bottomTabBarStyles as styles } from '@/styles/bottomTabBarStyles';

const tabs = [
  {
    routeName: 'timeline/index',
    label: 'Timeline',
    icon: List,
  },
  {
    routeName: 'circles/index',
    label: 'Circles',
    icon: UsersRound,
  },
  {
    routeName: 'create',
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
    icon: CircleUserRound,
  },
];

type Props = {
  state: any;
  navigation: any;
};

export function BottomTabBar({ state, navigation }: Props) {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  function closeCreateMenu() {
    setIsCreateMenuOpen(false);
  }

  function goToCreateCircle() {
    closeCreateMenu();
    router.push('/create-circle');
  }
  function goToChooseCircleForMemory() {
    closeCreateMenu();
    router.push('/create-memory');
  }

  function goToChooseCircleForTrip() {
    closeCreateMenu();
    router.push('/create-trip');
  }
  return (
    <>
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
                  onPress={() => setIsCreateMenuOpen(true)}
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

      <Modal
        visible={isCreateMenuOpen}
        transparent
        animationType="fade"
        onRequestClose={closeCreateMenu}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={closeCreateMenu}
        >
          <Pressable style={styles.createMenu}>
            <View style={styles.createMenuHandle} />

            <AppText style={styles.createMenuTitle}>
              Create something new
            </AppText>

            <Pressable
              style={styles.createMenuItem}
              onPress={goToChooseCircleForMemory}
            >
              <View style={styles.createMenuIcon}>
                <Camera size={22} color={colors.primary} />
              </View>

              <View style={styles.createMenuText}>
                <AppText style={styles.createMenuItemTitle}>
                  Memory
                </AppText>
                <AppText style={styles.createMenuItemSubtitle}>
                  Capture a moment
                </AppText>
              </View>
            </Pressable>

            <Pressable
              style={styles.createMenuItem}
              onPress={goToChooseCircleForTrip}
            >
              <View style={styles.createMenuIcon}>
                <Plane size={22} color={colors.primary} />
              </View>

              <View style={styles.createMenuText}>
                <AppText style={styles.createMenuItemTitle}>
                  Trip
                </AppText>
                <AppText style={styles.createMenuItemSubtitle}>
                  Plan or save a shared trip
                </AppText>
              </View>
            </Pressable>

            <Pressable
              style={styles.createMenuItem}
              onPress={goToCreateCircle}
            >
              <View style={styles.createMenuIcon}>
                <UsersRound size={22} color={colors.primary} />
              </View>

              <View style={styles.createMenuText}>
                <AppText style={styles.createMenuItemTitle}>
                  Circle
                </AppText>
                <AppText style={styles.createMenuItemSubtitle}>
                  Start a shared timeline
                </AppText>
              </View>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}