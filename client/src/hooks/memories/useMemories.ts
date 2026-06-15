import { useQuery } from '@tanstack/react-query';

import { getMemories } from '@/services/memories';

import type { Memory } from '@/types/memory';

type PaginatedMemoriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Memory[];
};

function normalizeMemories(
  response: Memory[] | PaginatedMemoriesResponse
) {
  if (Array.isArray(response)) {
    return response;
  }

  return response.results;
}

export function useMemories() {
  return useQuery({
    queryKey: ['memories'],
    queryFn: getMemories,
    select: normalizeMemories,
  });
}