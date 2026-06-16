import type { MapDisplayItem, MapMarkerGroup } from '@/types/map';

export function getPrimaryItem(group: MapMarkerGroup) {
  return group.items[0];
}

export function isMarkerCluster(group: MapMarkerGroup) {
  return group.items.length > 1;
}