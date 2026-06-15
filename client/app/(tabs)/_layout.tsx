import { useCallback } from 'react';

import { Tabs, useFocusEffect } from 'expo-router';

import { BottomTabBar } from '@/components/navigation/BottomTabBar';
import { useAuth } from '@/context/AuthContext';
import { useUnreadNotificationCount } from '@/hooks/useUnreadNotificationCount';

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
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="timeline/index" options={{ title: 'Timeline' }} />
      <Tabs.Screen name="circles/index" options={{ title: 'Create' }} />
      <Tabs.Screen name="map/index" options={{ title: 'Map' }} />
      <Tabs.Screen name="profile/index" options={{ title: 'Profile' }} />

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