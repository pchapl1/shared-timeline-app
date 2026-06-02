import { useCallback } from 'react';

import { Tabs, useFocusEffect } from 'expo-router';

import { useInvites } from '../../src/context/InviteContext';

export default function TabsLayout() {
  const { pendingInviteCount, refreshInviteCount } = useInvites();

  useFocusEffect(
    useCallback(() => {
      refreshInviteCount();
    }, [refreshInviteCount])
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
          title: 'Home',
          tabBarLabel: 'Home',
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
        name="invites/index"
        options={{
          title: 'Invites',
          tabBarLabel: 'Invites',
          tabBarBadge:
            pendingInviteCount > 0
              ? pendingInviteCount
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
    </Tabs>
  );
}