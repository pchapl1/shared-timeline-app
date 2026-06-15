import { getAbsoluteImageUrl } from '@/utils/images/images';
import { getMemoryImage } from '@/utils/timeline/getMemoryImage';

import type { Memory } from '@/types/memory';
import type { Trip } from '@/types/trip';
import type {
  MapDisplayItem,
  MapFilter,
  MapMarkerGroup,
} from '@/types/map';

function getMemoryImageUrls(memory: Memory) {
  if (memory.photos?.length) {
    return memory.photos
      .map((photo) => getAbsoluteImageUrl(photo.image))
      .filter(Boolean) as string[];
  }

  const singleImage = getAbsoluteImageUrl(memory.photo);

  return singleImage ? [singleImage] : [];
}

function getClusterPrecision(latitudeDelta: number) {
  if (latitudeDelta > 80) return 0;
  if (latitudeDelta > 35) return 1;
  if (latitudeDelta > 12) return 2;
  if (latitudeDelta > 4) return 3;
  if (latitudeDelta > 1) return 4;

  return 5;
}

function getItemSortDate(item: MapDisplayItem) {
  return item.dateLabel
    ? new Date(item.dateLabel).getTime()
    : 0;
}

export function buildMapItems({
  memories,
  trips,
  filter,
  searchQuery,
}: {
  memories: Memory[];
  trips: Trip[];
  filter: MapFilter;
  searchQuery: string;
}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const memoryItems: MapDisplayItem[] =
    filter === 'trips'
      ? []
      : memories
          .filter((memory) => memory.latitude && memory.longitude)
          .map((memory) => {
            const imageUrls = getMemoryImageUrls(memory);

            return {
              id: memory.id,
              type: 'memory' as const,
              circleId: memory.circle,
              title: memory.title,
              subtitle: memory.location_name,
              latitude: Number(memory.latitude),
              longitude: Number(memory.longitude),
              imageUrl: getAbsoluteImageUrl(getMemoryImage(memory)),
              imageUrls,
              dateLabel: memory.memory_date,
              countLabel:
                imageUrls.length > 1
                  ? `+${imageUrls.length - 1}`
                  : undefined,
            };
          });

  const tripItems: MapDisplayItem[] =
    filter === 'memories'
      ? []
      : trips
          .filter((trip) => trip.latitude && trip.longitude)
          .map((trip) => ({
            id: trip.id,
            type: 'trip' as const,
            circleId: trip.circle,
            title: trip.title,
            subtitle: trip.destination_name,
            latitude: Number(trip.latitude),
            longitude: Number(trip.longitude),
            imageUrl: null,
            imageUrls: [],
            dateLabel: trip.start_date,
            endDateLabel: trip.end_date,
            countLabel: trip.memory_count
              ? `${trip.memory_count}`
              : undefined,
          }));

  const allItems = [...memoryItems, ...tripItems];

  const sortedItems = [...allItems].sort(
    (a, b) => getItemSortDate(b) - getItemSortDate(a)
  );

  if (!normalizedQuery) {
    return sortedItems;
  }

  return sortedItems.filter((item) =>
    [item.title, item.subtitle, item.type, item.dateLabel]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  );
}

export function groupMapItems(
  items: MapDisplayItem[],
  latitudeDelta = 4
) {
  const groups = new Map<string, MapMarkerGroup>();
  const precision = getClusterPrecision(latitudeDelta);

  for (const item of items) {
    const key = `${item.latitude.toFixed(precision)}-${item.longitude.toFixed(
      precision
    )}`;

    const existingGroup = groups.get(key);

    if (!existingGroup) {
      groups.set(key, {
        key,
        latitude: item.latitude,
        longitude: item.longitude,
        items: [item],
      });

      continue;
    }

    const nextCount = existingGroup.items.length + 1;

    existingGroup.latitude =
      (existingGroup.latitude * existingGroup.items.length + item.latitude) /
      nextCount;

    existingGroup.longitude =
      (existingGroup.longitude * existingGroup.items.length + item.longitude) /
      nextCount;

    existingGroup.items.push(item);
  }

  return Array.from(groups.values());
}