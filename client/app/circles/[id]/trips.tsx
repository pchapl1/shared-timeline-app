import { Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';
import { TripCard } from '@/components/trips/TripCard';

import { useCircle } from '@/hooks/useCircle';
import { useTrips } from '@/hooks/trips/useTrips';

import { circleTimelineStyles as styles } from '@/styles/circleTimelineStyles';

export default function CircleTripsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const circleId = Number(id);

  const {
    data: circle,
    isLoading: isCircleLoading,
  } = useCircle(id);

  const {
    data: trips = [],
    isLoading: isTripsLoading,
  } = useTrips(circleId);

  if (isCircleLoading || isTripsLoading || !circle) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading trips...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <CircleHeader
          circle={circle}
          activeTab="trips"
        />

        <View style={styles.section}>
          {trips.length === 0 ? (
            <Text style={styles.emptyText}>
              Trips will appear here.
            </Text>
          ) : (
            trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
              />
            ))
          )}

          <TouchableOpacity
            style={styles.inviteButton}
            onPress={() =>
              router.push({
                pathname: '/circles/[id]/add-trip',
                params: {
                  id: id.toString(),
                },
              })
            }
          >
            <Text style={styles.inviteButtonText}>
              Add Trip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}