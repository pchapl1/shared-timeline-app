import type {
  LocationSuggestion,
  MapboxResponse,
} from '@/types/location';

/**
 * Searches Mapbox for matching locations.
 */
export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  const token = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

  console.log('Searching Mapbox for:', query);
  console.log('Mapbox token exists:', !!token);

  if (!token) {
    throw new Error('Missing EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN');
  }

  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedQuery}&access_token=${token}&autocomplete=true&limit=5`
  );

  console.log('Mapbox response status:', response.status);

  const data = (await response.json()) as MapboxResponse;

  console.log('Mapbox response data:', data);

  return data.features.map((feature) => {
    const [longitude, latitude] = feature.geometry.coordinates;

    return {
      id: feature.id,
      name:
        feature.properties.full_address ??
        feature.properties.name ??
        feature.properties.place_formatted ??
        query,
      latitude,
      longitude,
    };
  });
}