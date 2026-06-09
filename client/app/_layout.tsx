import { Stack } from 'expo-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { InviteProvider } from '../src/context/InviteContext';
import { useNotificationSocket } from '@/hooks/useNotificationSocket';
import { Redirect } from 'expo-router';

/**
 * =====================================================
 * React Query Client
 *
 * This manages all server state caching for the app.
 * =====================================================
 */
const queryClient = new QueryClient();


function SocketInitializer() {
  const { tokens, isLoading } = useAuth();


  if (isLoading) {
    return null;
  }

  if (!tokens) {
    return <Redirect href="/login" />;
  }
  useNotificationSocket();

  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InviteProvider>

          {/* Start notification WebSocket connection */}
          <SocketInitializer />

          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="create-circle" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="circles/[id]" />
            <Stack.Screen name="circles/[id]/invite" />
            <Stack.Screen name="circles/[id]/add-memory" />
            <Stack.Screen
              name="circles/[id]/memories/[memoryId]"
            />
          </Stack>

        </InviteProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}