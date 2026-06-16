import type { MapDisplayItem } from '@/types/map';

export function getPreferredMapItem(items: MapDisplayItem[]) {
  return (
    items.find((item) => item.type === 'memory' && item.imageUrl) ??
    items.find((item) => item.type === 'memory') ??
    items[0] ??
    null
  );
}