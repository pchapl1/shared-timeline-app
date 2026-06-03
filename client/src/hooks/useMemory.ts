import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';
import type { Memory } from '@/types/memory';

async function getMemory(memoryId: string) {
  const response = await api.get(`/memories/${memoryId}/`);

  return response.data;
}

export function useMemory(memoryId: string | undefined) {
  return useQuery<Memory>({
    queryKey: ['memory', memoryId],
    queryFn: () => getMemory(memoryId as string),
    enabled: !!memoryId,
  });
}