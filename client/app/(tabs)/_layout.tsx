import { useCallback } from 'react';

import { Tabs, useFocusEffect } from 'expo-router';

import { useUnreadNotificationCount } from '@/hooks/useUnreadNotificationCount';
import { useAuth } from '@/context/AuthContext';

import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
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
        tabBarStyle: {
          height: 84,
          paddingTop: 8,
          paddingBottom: 24,

          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,

          position: 'relative',
          borderRadius: 0,
          left: undefined,
          right: undefined,
          bottom: undefined,

          ...shadows.sm,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
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
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
            color: colors.textInverse,
          },
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