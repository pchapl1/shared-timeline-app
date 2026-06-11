import { useState } from 'react';
import { addMemoryStyles as styles } from '@/styles/addMemoryStyles';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  Platform,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import DateTimePicker from '@react-native-community/datetimepicker';

import * as ImagePicker from 'expo-image-picker';

import { createMemory } from '../../../src/services/memories';

import { useQueryClient } from '@tanstack/react-query';

import { LocationSearch } from '../../../src/components/search/LocationSearch';

import { useTrips } from '@/hooks/trips/useTrips';

export default function AddMemoryScreen() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [memoryDate, setMemoryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [locationName, setLocationName] = useState('');
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const queryClient = useQueryClient();

  const { data: trips = [] } = useTrips(Number(id));

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add Memory</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#64748b"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#64748b"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />

      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={memoryDate.toISOString().split('T')[0]}
          onChangeText={(text) => {
            setMemoryDate(new Date(text));
          }}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#64748b"
        />
      ) : (
        <>
          <Pressable
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {memoryDate.toDateString()}
            </Text>
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

      <LocationSearch
        locationName={locationName}
        latitude={latitude}
        longitude={longitude}
        onChangeLocationName={setLocationName}
        onChangeLatitude={setLatitude}
        onChangeLongitude={setLongitude}
      />

      {trips.length > 0 && (
        <>
          <Text style={styles.label}>Trip</Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setSelectedTripId(null)}
          >
            <Text style={{ color: selectedTripId ? '#64748b' : '#FFFFFF' }}>
              No Trip
            </Text>
          </TouchableOpacity>

          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.input}
              onPress={() => setSelectedTripId(trip.id)}
            >
              <Text
                style={{
                  color:
                    selectedTripId === trip.id
                      ? '#FFFFFF'
                      : '#64748b',
                  fontWeight:
                    selectedTripId === trip.id
                      ? '800'
                      : '400',
                }}
              >
                {selectedTripId === trip.id ? '✓ ' : ''}
                {trip.title}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <TouchableOpacity
        style={styles.imageButton}
        onPress={pickImage}
      >
        <Text style={styles.imageButtonText}>
          {images.length > 0
            ? `${images.length} Photos Selected ✓`
            : 'Select Photos'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateMemory}
      >
        <Text style={styles.buttonText}>
          Save Memory
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
