import { useCallback } from 'react';

import { Tabs, useFocusEffect } from 'expo-router';
import { useUnreadNotificationCount } from '@/hooks/useUnreadNotificationCount';
import { useAuth } from '@/context/AuthContext';

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
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
        },
        tabBarActiveTintColor: '#60a5fa',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Activity',
          tabBarLabel: 'Activity',
        }}
      />

      <Tabs.Screen
        name="circles/index"
        options={{
          title: 'Circles',
          tabBarLabel: 'Circles',
        }}
      />

      <Tabs.Screen
        name="notifications/index"
        options={{
          title: 'Notifications',
          tabBarLabel: 'Notifications',
          tabBarBadge:
            unreadNotificationCount > 0
              ? unreadNotificationCount
              : undefined,
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
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