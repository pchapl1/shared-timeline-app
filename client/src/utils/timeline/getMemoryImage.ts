import type { Memory } from '@/types/memory';

export function getMemoryImage(memory: Memory) {
  if (memory.photos?.length) {
    return memory.photos[0].image;
  }

  return memory.photo ?? null;
}