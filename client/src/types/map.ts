export type MapFilter = 'all' | 'memories' | 'trips';

export type MapItemType = 'memory' | 'trip';

export type MapDisplayItem = {
  id: number;
  type: MapItemType;
  circleId: number;
  title: string;
  subtitle?: string;
  latitude: number;
  longitude: number;
  imageUrl?: string | null;
  imageUrls?: string[];
  dateLabel?: string;
  endDateLabel?: string | null;
  countLabel?: string;
};

export type MapMarkerGroup = {
  key: string;
  latitude: number;
  longitude: number;
  items: MapDisplayItem[];
};

export type MapMemory = {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
};

export type MapTrip = {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
};