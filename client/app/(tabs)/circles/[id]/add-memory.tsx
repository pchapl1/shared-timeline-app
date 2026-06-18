import { useState } from 'react';

import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { SectionHeader } from '@/components/ui/SectionHeader';

import { LocationSearch } from '@/components/search/LocationSearch';

import { createMemory } from '@/services/memories';
import { useTrips } from '@/hooks/trips/useTrips';

import { colors } from '@/theme/colors';
import { addMemoryStyles as styles } from '@/styles/addMemoryStyles';

export default function AddMemoryScreen() {
  const { id, tripId } = useLocalSearchParams<{
    id: string;
    tripId?: string;
  }>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [memoryDate, setMemoryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [selectedTripId, setSelectedTripId] = useState<number | null>(
    tripId ? Number(tripId) : null
  );

  const [showTripDropdown, setShowTripDropdown] = useState(false);

  const queryClient = useQueryClient();

  const { data: trips = [] } = useTrips(Number(id));

  const selectedTrip = trips.find(
    (trip) => trip.id === selectedTripId
  ) ?? null;

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages(uris);
    }
  }

  async function handleCreateMemory() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      Alert.alert('Missing title', 'Please add a title.');
      return;
    }

    try {
      await createMemory({
        circleId: String(id),
        trip: selectedTripId,
        title: trimmedTitle,
        description,
        memoryDate: memoryDate.toISOString().split('T')[0],
        imageUris: images,
        locationName,
        latitude: latitude ? String(latitude) : undefined,
        longitude: longitude ? String(longitude) : undefined,
      });

      await queryClient.invalidateQueries({
        queryKey: ['memories', Number(id)],
      });

      await queryClient.invalidateQueries({
        queryKey: ['trips', Number(id)],
      });

      router.replace({
        pathname: '/circles/[id]',
        params: { id },
      });
    } catch (error: any) {
      console.error(
        'Create memory error:',
        error.response?.data || error
      );

      Alert.alert('Error', 'Could not create memory.');
    }
  }

  return (
    <AppScreen padded={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <AppText variant="bodyStrong">← Back</AppText>
          </TouchableOpacity>

          <View style={styles.header}>
            <AppText variant="h1">Add Memory</AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.subtitle}
            >
              Capture a moment from this timeline.
            </AppText>
          </View>

          <AppCard style={styles.card}>
            <SectionHeader
              title="Memory details"
              subtitle="Add the story, date, and anything you want to remember."
            />

            <AppText variant="caption" color={colors.textMuted}>
              Title
            </AppText>

            <TextInput
              style={styles.input}
              placeholder="Memory title"
              placeholderTextColor={colors.textSubtle}
              value={title}
              onChangeText={setTitle}
            />

            <AppText variant="caption" color={colors.textMuted}>
              Description
            </AppText>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What happened?"
              placeholderTextColor={colors.textSubtle}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
            />

            <AppText variant="caption" color={colors.textMuted}>
              Date
            </AppText>

            {Platform.OS === 'web' ? (
              <TextInput
                style={styles.input}
                value={memoryDate.toISOString().split('T')[0]}
                onChangeText={(text) => {
                  setMemoryDate(new Date(text));
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textSubtle}
              />
            ) : (
              <>
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <AppText variant="body" color={colors.text}>
                    {memoryDate.toDateString()}
                  </AppText>
                </Pressable>

                {showDatePicker && (
                  <DateTimePicker
                    value={memoryDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);

                      if (selectedDate) {
                        setMemoryDate(selectedDate);
                      }
                    }}
                  />
                )}
              </>
            )}
          </AppCard>

          <AppCard style={styles.card}>
            <SectionHeader
              title="Location"
              subtitle="Search a place to show this memory on the map."
            />

            <LocationSearch
              locationName={locationName}
              latitude={latitude}
              longitude={longitude}
              onChangeLocationName={setLocationName}
              onChangeLatitude={setLatitude}
              onChangeLongitude={setLongitude}
            />
          </AppCard>

          {trips.length > 0 && (
            <AppCard style={styles.card}>
              <SectionHeader
                title="Trip"
                subtitle="Optionally attach this memory to a trip."
              />

              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() =>
                  setShowTripDropdown(
                    (currentValue) => !currentValue
                  )
                }
              >
                <AppText
                  variant="body"
                  color={colors.text}
                >
                  {selectedTrip
                    ? selectedTrip.title
                    : 'Select Trip'}
                </AppText>

                <AppText
                  variant="bodySmall"
                  color={colors.textMuted}
                >
                  {showTripDropdown ? '▲' : '▼'}
                </AppText>
              </TouchableOpacity>

              {showTripDropdown && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedTripId(null);
                      setShowTripDropdown(false);
                    }}
                  >
                    <AppText
                      variant="body"
                      color={colors.text}
                    >
                      No Trip
                    </AppText>
                  </TouchableOpacity>

                  {trips.map((trip) => (
                    <TouchableOpacity
                      key={trip.id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedTripId(trip.id);
                        setShowTripDropdown(false);
                      }}
                    >
                      <AppText
                        variant="body"
                        color={colors.text}
                      >
                        {trip.title}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>

              )}
            </AppCard>
          )}

          <AppCard style={styles.card}>
            <SectionHeader
              title="Photos"
              subtitle="Add one or more photos to this memory."
            />

            <TouchableOpacity
              style={styles.imageButton}
              onPress={pickImage}
            >
              <AppText variant="bodyStrong" color={colors.primary}>
                {images.length > 0
                  ? `${images.length} Photos Selected ✓`
                  : 'Select Photos'}
              </AppText>
            </TouchableOpacity>
          </AppCard>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateMemory}
          >
            <AppText variant="bodyStrong" color={colors.primary}>
              Save Memory
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreen>
  );
}