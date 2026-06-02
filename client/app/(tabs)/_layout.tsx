import { useCallback, useState } from 'react';

import { Tabs, useFocusEffect } from 'expo-router';

import { getPendingCircleInvites } from '../../src/services/api';

export default function TabsLayout() {
  const [pendingInviteCount, setPendingInviteCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function loadPendingInvites() {
        try {
          const invites = await getPendingCircleInvites();

          const pendingInvites = invites.filter(
            (invite: any) =>
              invite.status?.toLowerCase() === 'pending'
          );

          setPendingInviteCount(pendingInvites.length);
        } catch (error) {
          console.log('Error loading pending invites:', error);
        }
      }

      loadPendingInvites();
    }, [])
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
        }}
      />

      <Tabs.Screen
        name="circles/index"
        options={{
          title: 'Circles',
        }}
      />

      <Tabs.Screen
        name="invites/index"
        options={{
          title: 'Invites',
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
        }}
      />

      <Tabs.Screen
        name="circles/[id]/index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="circles/[id]/invite"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="circles/[id]/add-memory"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}