import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { SectionHeader } from '@/components/ui/SectionHeader';

import { MemoryCard } from '@/components/memories/MemoryCard';

import { useTrip } from '@/hooks/trips/useTrip';
import { useDeleteTrip } from '@/hooks/trips/useDeleteTrip';
import { useCircleMemories } from '@/hooks/useCircleMemories';

import { colors } from '@/theme/colors';
import { tripDetailStyles as styles } from '@/styles/tripDetailStyles';

export default function TripDetailScreen() {
  const { id, tripId } = useLocalSearchParams<{
    id: string;
    tripId: string;
  }>();

  const numericTripId = Number(tripId);

  const { data: trip, isLoading } = useTrip(numericTripId);

  const deleteTripMutation = useDeleteTrip(Number(id));

  const { data: memoriesData } = useCircleMemories(Number(id));

  if (isLoading || !trip) {
    return (
      <AppScreen>
        <View style={styles.loadingContainer}>
          <AppText variant="bodyStrong" color={colors.textMuted}>
            Loading trip...
          </AppText>
        </View>
      </AppScreen>
    );
  }

  const memoryCount = trip.memory_count ?? 0;

  const allMemories = memoriesData?.pages
    ? memoriesData.pages.flatMap(
        (page) => page.results
      )
    : [];

  const tripMemories = allMemories.filter(
    (memory) => Number(memory.trip) === Number(trip.id)
  );

  const dateRange = `${trip.start_date}${
    trip.end_date ? ` → ${trip.end_date}` : ''
  }`;

  function handleDeleteTrip() {
    if (!trip) {
      return;
    }

    Alert.alert(
      'Delete Trip',
      `Are you sure you want to delete "${trip.title}"?`,
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
              await deleteTripMutation.mutateAsync(trip.id);

              router.replace({
                pathname: '/circles/[id]/trips',
                params: { id },
              });
            } catch (error) {
              console.error(error);

              Alert.alert('Error', 'Could not delete trip.');
            }
          },
        },
      ]
    );
  }

  return (
    <AppScreen padded={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              router.push({
                pathname: '/circles/[id]/trips',
                params: { id },
              })
            }
          >
            <AppText variant="bodyStrong">← Back</AppText>
          </TouchableOpacity>

          <AppCard style={styles.tripCard}>
            <View style={styles.creatorRow}>
              <Avatar
                label={trip.created_by_username ?? '?'}
                size={44}
              />

              <View style={styles.creatorText}>
                <AppText variant="bodyStrong">
                  @{trip.created_by_username}
                </AppText>

                <AppText variant="bodySmall" color={colors.textMuted}>
                  Trip organizer
                </AppText>
              </View>
            </View>

            <AppText variant="h1" style={styles.title}>
              {trip.title}
            </AppText>

            {!!trip.destination_name && (
              <View style={styles.destinationRow}>
                <AppText
                  variant="bodySmall"
                  color={colors.textMuted}
                  numberOfLines={1}
                >
                  📍 {trip.destination_name}
                </AppText>
              </View>
            )}

            <View style={styles.datePill}>
              <AppText variant="bodySmall" color={colors.primary}>
                {dateRange}
              </AppText>
            </View>
          </AppCard>

          <View style={styles.tripActions}>
            <TouchableOpacity
              style={styles.inlineActionButton}
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
              <AppText variant="bodySmall" color={colors.primary}>
                Add Memory
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inlineActionButton}
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
              <AppText variant="bodySmall" color={colors.primary}>
                Edit
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inlineDangerButton}
              onPress={handleDeleteTrip}
            >
              <AppText variant="bodySmall" color={colors.danger}>
                Delete
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.statRow}>
            <AppCard style={styles.statCard}>
              <AppText variant="h2">{memoryCount}</AppText>
              <AppText variant="caption" color={colors.textMuted}>
                Memories
              </AppText>
            </AppCard>

            <AppCard style={styles.statCard}>
              <AppText variant="h2">
                {trip.end_date ? 'Multi' : '1'}
              </AppText>
              <AppText variant="caption" color={colors.textMuted}>
                Day Trip
              </AppText>
            </AppCard>
          </View>

          {!!trip.description && (
            <View style={styles.section}>
              <SectionHeader title="About this trip" />

              <AppCard>
                <AppText
                  variant="body"
                  color={colors.textMuted}
                  style={styles.description}
                >
                  {trip.description}
                </AppText>
              </AppCard>
            </View>
          )}

          <View style={styles.section}>
            <SectionHeader
              title="Trip Memories"
              subtitle={`${tripMemories.length} linked`}
            />

            {tripMemories.length === 0 ? (
              <View style={styles.emptyMemories}>
                <AppText variant="h3">🧳</AppText>

                <AppText variant="bodyStrong" color={colors.textMuted}>
                  No memories linked yet.
                </AppText>

                <AppText variant="bodySmall" color={colors.textSubtle}>
                  Memories assigned to this trip will appear here.
                </AppText>
              </View>
            ) : (
              <View style={styles.memoryList}>
                {tripMemories.map((memory) => (
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
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}