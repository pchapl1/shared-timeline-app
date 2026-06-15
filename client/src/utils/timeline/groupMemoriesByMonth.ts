import { format, parseISO } from 'date-fns';

import type { Memory } from '@/types/memory';
import type { TimelineMonth } from '@/types/timeline';

export function groupMemoriesByMonth(
  memories: Memory[]
): TimelineMonth[] {
  const sortedMemories = [...memories].sort(
    (a, b) =>
      new Date(b.memory_date).getTime() -
      new Date(a.memory_date).getTime()
  );

  const groups = new Map<string, TimelineMonth>();

  for (const memory of sortedMemories) {
    const date = parseISO(memory.memory_date);
    const monthKey = format(date, 'yyyy-MM');
    const monthLabel = format(date, 'MMMM yyyy');

    if (!groups.has(monthKey)) {
      groups.set(monthKey, {
        monthKey,
        monthLabel,
        memories: [],
      });
    }

    groups.get(monthKey)?.memories.push(memory);
  }

  return Array.from(groups.values());
}