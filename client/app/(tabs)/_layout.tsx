import { useEffect, useState } from 'react';

import { Tabs } from 'expo-router';

import { getPendingCircleInvites } from '../../src/services/api';

export default function TabsLayout() {
  const [pendingInviteCount, setPendingInviteCount] = useState(0);

  useEffect(() => {
    async function loadPendingInvites() {
      try {
        const invites = await getPendingCircleInvites();
        setPendingInviteCount(invites.length);
      } catch (error) {
        console.log('Error loading pending invites:', error);
      }
    }

    loadPendingInvites();
  }, []);

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
        }}
      />

      <Tabs.Screen
        name="circles"
        options={{
          title: 'Circles',
        }}
      />

      <Tabs.Screen
        name="invites"
        options={{
          title: 'Invites',
          tabBarBadge:
            pendingInviteCount > 0 ? pendingInviteCount : undefined,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}