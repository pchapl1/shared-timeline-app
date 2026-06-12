import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { useTrip } from '@/hooks/trips/useTrip';

import { tripCardStyles } from '@/styles/tripCardStyles';
import { memoryDetailStyles as styles } from '@/styles/memoryDetailStyles';

import { useCircleMemories } from '@/hooks/useCircleMemories';
import { MemoryCard } from '@/components/memories/MemoryCard';
import { useDeleteTrip } from '@/hooks/trips/useDeleteTrip';

export default function TripDetailScreen() {
  const { id, tripId } = useLocalSearchParams<{
    id: string;
    tripId: string;
  }>();

  const numericTripId = Number(tripId);

  const {
    data: trip,
    isLoading,
  } = useTrip(numericTripId);

  const deleteTripMutation = useDeleteTrip(
    Number(id)
  );

  const {
    data: memoriesData,
  } = useCircleMemories(Number(id));

  if (isLoading || !trip) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading trip...</Text>
      </View>
    );
  }

  const memoryCount = trip.memory_count ?? 0;

  function handleDeleteTrip() {
    if (!trip) {
      return;
    }

    const currentTripId = trip.id;
    const currentTripTitle = trip.title;

    Alert.alert(
      'Delete Trip',
      `Are you sure you want to delete "${currentTripTitle}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTripMutation.mutateAsync(
                currentTripId
              );

              router.replace({ pathname: '/circles/[id]/trips', params: { id }}
              );
            } catch (error) {
              console.error(error);

              Alert.alert(
                'Error',
                'Could not delete trip.'
              );
            }
          },
        },
      ]
    );
  }

  const tripMemories =
    memoriesData?.pages
        .flatMap((page) => page.results)
        .filter(
        (memory) => memory.trip === trip.id
        ) ?? [];

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text
          style={styles.backButton}
          onPress={() => router.push({pathname:'/circles/[id]/trips', params: { id }})}
        >
          ← Back
        </Text>

        <View style={styles.content}>
          <Text style={styles.title}>{trip.title}</Text>

          {!!trip.destination_name && (
            <Text style={styles.location}>
              📍 {trip.destination_name}
            </Text>
          )}

          <Text style={tripCardStyles.date}>
            {trip.start_date}
            {trip.end_date ? ` → ${trip.end_date}` : ''}
          </Text>

          {!!trip.description && (
            <Text style={styles.description}>
              {trip.description}
            </Text>
          )}

          <View style={tripCardStyles.card}>
            <Text style={tripCardStyles.title}>
              Memories
            </Text>

            <Text style={tripCardStyles.memoryCount}>
              {memoryCount} {memoryCount === 1 ? 'Memory' : 'Memories'}
            </Text>

            {tripMemories.length === 0 ? (
            <Text style={tripCardStyles.description}>
                Memories assigned to this trip will appear here.
            </Text>
            ) : (
            tripMemories.map((memory) => (
                <MemoryCard
                key={memory.id}
                memory={memory}
                onPress={() =>
                    router.push({
                    pathname:
                        '/circles/[id]/memories/[memoryId]',
                    params: {
                        id,
                        memoryId: String(memory.id),
                    },
                    })
                }
                />
            ))
            )}
          </View>
        <TouchableOpacity
          style={tripCardStyles.card}
          onPress={() =>
            router.push({
              pathname: '/circles/[id]/add-memory',
              params: {
                id,
                tripId: String(trip.id),
              },
            })
          }
        >
          <Text style={tripCardStyles.title}>
            Add Memory to Trip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tripCardStyles.card}
          onPress={() =>
            router.push({
              pathname: '/circles/[id]/trips/edit/[tripId]',
              params: {
                id,
                tripId,
              },
            })
          }
        >
          <Text style={tripCardStyles.title}>
            Edit Trip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tripCardStyles.card}
          onPress={handleDeleteTrip}
        >
          <Text
            style={[
              tripCardStyles.title,
              { color: '#EF4444' },
            ]}
          >
            Delete Trip
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}