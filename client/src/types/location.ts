/**
 * Raw feature returned from the Mapbox Geocoding API.
 */
export type MapboxFeature = {
  id: string;
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    name?: string;
    full_address?: string;
    place_formatted?: string;
  };
};

/**
 * Full Mapbox API response.
 */
export type MapboxResponse = {
  features: MapboxFeature[];
};

/**
 * Simplified location object used throughout our app.
 */
export type LocationSuggestion = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

/**
 * Final selected location data that can be saved
 * on a Memory or Trip.
 */
export type SelectedLocation = {
  locationName: string;
  latitude: string;
  longitude: string;
};