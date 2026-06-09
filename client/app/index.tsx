import { Redirect } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { tokens, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!tokens) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)/circles" />;
}