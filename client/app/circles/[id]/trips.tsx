import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';
import { TripCard } from '@/components/trips/TripCard';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/layout/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { SectionHeader } from '@/components/ui/SectionHeader';

import { useCircle } from '@/hooks/circles/useCircle';
import { useTrips } from '@/hooks/trips/useTrips';

import { spacing } from '@/theme/spacing';

export default function CircleTripsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const circleId = Number(id);

  const { data: circle, isLoading: isCircleLoading } =
    useCircle(id);

  const { data: trips = [], isLoading: isTripsLoading } =
    useTrips(circleId);

  if (isCircleLoading || isTripsLoading || !circle) {
    return (
      <AppScreen>
        <LoadingState message="Loading trips..." />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <CircleHeader
        circle={circle}
        activeTab="trips"
        variant="compact"
      />

      <SectionHeader
        title="Trips"
        subtitle="Travel plans and places you have shared."
      />

      <View>
        {trips.length === 0 ? (
          <EmptyState
            icon="✈️"
            title="No trips yet"
            message="Add a trip to start planning shared travel."
          />
        ) : (
          trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onPress={() =>
                router.push({
                  pathname: '/circles/[id]/trips/[tripId]',
                  params: {
                    id: String(circleId),
                    tripId: String(trip.id),
                  },
                })
              }
            />
          ))
        )}

        <AppButton
          title="New Trip"
          onPress={() =>
            router.push({
              pathname: '/circles/[id]/add-trip',
              params: {
                id,
              },
            })
          }
          style={{ marginTop: spacing.md }}
        />
      </View>
    </AppScreen>
  );
}