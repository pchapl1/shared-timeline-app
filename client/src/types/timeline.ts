import type { Memory } from '@/types/memory';

export type TimelineMonth = {
  monthKey: string;
  monthLabel: string;
  memories: Memory[];
};