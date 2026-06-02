import { Stack } from 'expo-router';

import { AuthProvider } from '../src/context/AuthContext';
import { InviteProvider } from '../src/context/InviteContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <InviteProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="create-circle" />
          <Stack.Screen name="login" />
        </Stack>
      </InviteProvider>
    </AuthProvider>
  );
}