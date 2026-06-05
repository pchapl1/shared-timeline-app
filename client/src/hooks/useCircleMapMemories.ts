import { useMemo } from 'react';

import { useCircleMemories } from '@/hooks/useCircleMemories';

import type { MapMemory } from '@/types/map';
import type { Memory } from '@/types/memory';

export function useCircleMapMemories(circleId: number) {
  const {
    data,
    isLoading,
    refetch,
  } = useCircleMemories(circleId);

  const memories = useMemo<Memory[]>(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  const mapMemories = useMemo<MapMemory[]>(() => {
    return memories
      .filter(
        (memory) =>
          memory.latitude &&
          memory.longitude
      )
      .map((memory) => ({
        id: memory.id,
        title: memory.title,
        latitude: Number(memory.latitude),
        longitude: Number(memory.longitude),
      }));
  }, [memories]);

  return {
    mapMemories,
    isLoading,
    refetch,
  };
}