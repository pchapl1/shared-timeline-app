import { useCallback } from 'react';

import { Tabs, useFocusEffect } from 'expo-router';

import { useUnreadNotificationCount } from '@/hooks/useUnreadNotificationCount';
import { useAuth } from '@/context/AuthContext';

import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';

export default function TabsLayout() {
  const { tokens, isLoading } = useAuth();

  const { data: unreadNotificationCount = 0, refetch } =
    useUnreadNotificationCount();

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && tokens) {
        refetch();
      }
    }, [isLoading, tokens, refetch])
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarStyle: {
          height: 86,
          paddingTop: 8,
          paddingBottom: 24,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          ...shadows.sm,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => null,
        }}
      />

      <Tabs.Screen
        name="timeline/index"
        options={{
          title: 'Timeline',
          tabBarLabel: 'Timeline',
          tabBarIcon: ({ color }) => null,
        }}
      />

      <Tabs.Screen
        name="circles/index"
        options={{
          title: 'Create',
          tabBarLabel: '+',
          tabBarIcon: ({ color }) => null,
        }}
        listeners={{
          tabPress: (event) => {
            event.preventDefault();
          },
        }}
      />

      <Tabs.Screen
        name="map/index"
        options={{
          title: 'Map',
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => null,
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => null,
        }}
      />

      <Tabs.Screen
        name="notifications/index"
        options={{
          href: null,
          tabBarBadge:
            unreadNotificationCount > 0
              ? unreadNotificationCount
              : undefined,
        }}
      />

      <Tabs.Screen
        name="invites/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}