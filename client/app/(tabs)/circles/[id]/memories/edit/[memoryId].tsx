import { useEffect, useState } from 'react';

import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import DateTimePicker from '@react-native-community/datetimepicker';

import { LocationSearch } from '@/components/search/LocationSearch';

import { useMemory } from '@/hooks/useMemory';
import { useTrips } from '@/hooks/trips/useTrips';
import { useUpdateMemory } from '@/hooks/memories/useUpdateMemory';

import { addMemoryStyles as styles } from '@/styles/addMemoryStyles';

export default function EditMemoryScreen() {
  const { id, memoryId } = useLocalSearchParams<{
    id: string;
    memoryId: string;
  }>();

  const circleId = Number(id);
  const numericMemoryId = Number(memoryId);

  const {
    data: memory,
    isLoading,
  } = useMemory(memoryId);

  const {
    data: trips = [],
  } = useTrips(circleId);

  const updateMemoryMutation =
    useUpdateMemory(
      circleId,
      numericMemoryId
    );

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');

  const [memoryDate, setMemoryDate] =
    useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [locationName, setLocationName] =
    useState('');

  const [latitude, setLatitude] =
    useState('');

  const [longitude, setLongitude] =
    useState('');

  const [
    selectedTripId,
    setSelectedTripId,
  ] = useState<number | null>(null);

  useEffect(() => {
    if (!memory) {
      return;
    }

    setTitle(memory.title);
    setDescription(memory.description ?? '');
    setMemoryDate(
      new Date(memory.memory_date)
    );

    setLocationName(
      memory.location_name ?? ''
    );

    setLatitude(memory.latitude ?? '');
    setLongitude(memory.longitude ?? '');

    setSelectedTripId(
      memory.trip ?? null
    );
  }, [memory]);

  async function handleSave() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      Alert.alert(
        'Missing title',
        'Please add a title.'
      );
      return;
    }

    try {
      await updateMemoryMutation.mutateAsync({
        trip: selectedTripId,
        title: trimmedTitle,
        description,
        memory_date:
          memoryDate
            .toISOString()
            .split('T')[0],
        location_name: locationName,
        latitude:
          latitude || null,
        longitude:
          longitude || null,
      });

      router.replace(
        `/circles/${id}/memories/${memoryId}`
      );
    } catch (error: any) {
      console.error(
        error.response?.data || error
      );

      Alert.alert(
        'Error',
        'Could not update memory.'
      );
    }
  }

  if (isLoading || !memory) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.contentContainer
        }
      >
        <Text style={styles.title}>
          Loading memory...
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.contentContainer
      }
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Text style={styles.backLink}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Edit Memory
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#64748b"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
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
          value={
            memoryDate
              .toISOString()
              .split('T')[0]
          }
          onChangeText={(text) =>
            setMemoryDate(
              new Date(text)
            )
          }
        />
      ) : (
        <>
          <Pressable
            style={styles.dateInput}
            onPress={() =>
              setShowDatePicker(true)
            }
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
              onChange={(
                event,
                selectedDate
              ) => {
                setShowDatePicker(false);

                if (
                  selectedDate
                ) {
                  setMemoryDate(
                    selectedDate
                  );
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
        onChangeLocationName={
          setLocationName
        }
        onChangeLatitude={
          setLatitude
        }
        onChangeLongitude={
          setLongitude
        }
      />

      {trips.length > 0 && (
        <>
          <Text
            style={styles.label}
          >
            Trip
          </Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              setSelectedTripId(
                null
              )
            }
          >
            <Text>
              No Trip
            </Text>
          </TouchableOpacity>

          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.input}
              onPress={() =>
                setSelectedTripId(
                  trip.id
                )
              }
            >
              <Text>
                {selectedTripId ===
                trip.id
                  ? '✓ '
                  : ''}
                {trip.title}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text
          style={styles.buttonText}
        >
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}