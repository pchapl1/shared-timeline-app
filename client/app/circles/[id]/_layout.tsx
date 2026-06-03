import { Stack } from 'expo-router';

import { MemoryProvider } from '@/context/MemoryContext';

export default function CircleIdLayout() {
  return (
    <MemoryProvider>
      <Stack />
    </MemoryProvider>
  );
}