import { Image, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';
import { Images, Plane } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';

import { useTrips } from '@/hooks/trips/useTrips';

import { colors } from '@/theme/colors';
import { circleAlbumsTabStyles as styles } from '@/styles/circles/circleTripsTabStyles';

import type { Circle } from '@/types/circle';
import type { Trip } from '@/types/trip';

type Props = {
  circle: Circle;
};

function getTripCoverPhoto(trip: Trip) {
  return trip.preview_photos?.find((photo) => !!photo.image)?.image;
}

function formatMemoryCount(count?: number) {
  const value = count ?? 0;

  return `${value} ${value === 1 ? 'memory' : 'memories'}`;
}

function AlbumCard({ trip }: { trip: Trip }) {
  const coverPhoto = getTripCoverPhoto(trip);

  function openTrip() {
    router.push(`/circles/${trip.circle}/trips/${trip.id}`);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={openTrip}
      style={styles.albumCard}
    >
      <View style={styles.cover}>
        {coverPhoto ? (
          <Image
            source={{ uri: coverPhoto }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.coverFallback}>
            <Plane
              size={24}
              strokeWidth={2.2}
              color={colors.primary}
            />
          </View>
        )}
      </View>

      <View style={styles.albumContent}>
        <AppText
          variant="bodyStrong"
          numberOfLines={1}
          style={styles.albumTitle}
        >
          {trip.title}
        </AppText>

        {!!trip.destination_name && (
          <AppText
            variant="bodySmall"
            color={colors.textMuted}
            numberOfLines={1}
          >
            {trip.destination_name}
          </AppText>
        )}

        <AppText
          variant="caption"
          color={colors.primary}
          style={styles.memoryCount}
        >
          {formatMemoryCount(trip.memory_count)}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

export function CircleTripsTab({ circle }: Props) {
  const {
    data: trips = [],
    isLoading,
  } = useTrips(circle.id);

  return (
    <View style={styles.container}>
      <AppText variant="bodyStrong" style={styles.title}>
        Albums
      </AppText>

      {isLoading && (
        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.emptyText}
        >
          Loading albums...
        </AppText>
      )}

      {!isLoading && trips.length === 0 && (
        <View style={styles.emptyState}>
          <Images
            size={26}
            strokeWidth={2.2}
            color={colors.primary}
          />

          <AppText variant="bodyStrong">
            No albums yet
          </AppText>

          <AppText
            variant="bodySmall"
            color={colors.textMuted}
            style={styles.emptyDescription}
          >
            Trips with memories will appear here.
          </AppText>
        </View>
      )}

      {!isLoading &&
        trips.map((trip) => (
          <AlbumCard key={trip.id} trip={trip} />
        ))}
    </View>
  );
}