type Coordinate = {
  latitude: number;
  longitude: number;
};

export function calculateMapRegion(
  coordinates: Coordinate[]
) {
  if (!coordinates.length) {
    return {
      latitude: 39.8283,
      longitude: -98.5795,
      latitudeDelta: 20,
      longitudeDelta: 20,
    };
  }

  const latitudes = coordinates.map(
    (item) => item.latitude
  );

  const longitudes = coordinates.map(
    (item) => item.longitude
  );

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);

  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(
      (maxLat - minLat) * 1.35,
      8
    ),
    longitudeDelta: Math.max(
      (maxLng - minLng) * 1.35,
      8
    ),
  };
}