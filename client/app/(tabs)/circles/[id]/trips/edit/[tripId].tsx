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
import { useTrip } from '@/hooks/trips/useTrip';
import { useUpdateTrip } from '@/hooks/trips/useUpdateTrip';

import { addMemoryStyles as styles } from '@/styles/addMemoryStyles';

function parseDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

export default function EditTripScreen() {
  const { id, tripId } = useLocalSearchParams<{
    id: string;
    tripId: string;
  }>();

  const circleId = Number(id);
  const numericTripId = Number(tripId);

  const { data: trip, isLoading } = useTrip(numericTripId);

  const updateTripMutation = useUpdateTrip(
    circleId,
    numericTripId
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showStartDatePicker, setShowStartDatePicker] =
    useState(false);

  const [showEndDatePicker, setShowEndDatePicker] =
    useState(false);

  const [destinationName, setDestinationName] =
    useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (!trip) {
      return;
    }

    setTitle(trip.title);
    setDescription(trip.description ?? '');
    setStartDate(parseDate(trip.start_date) ?? new Date());
    setEndDate(parseDate(trip.end_date));
    setDestinationName(trip.destination_name ?? '');
    setLatitude(trip.latitude ?? '');
    setLongitude(trip.longitude ?? '');
  }, [trip]);

  async function handleUpdateTrip() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      Alert.alert('Missing title', 'Please add a trip title.');
      return;
    }

    if (endDate && endDate < startDate) {
      Alert.alert(
        'Invalid dates',
        'End date cannot be before start date.'
      );
      return;
    }

    try {
      await updateTripMutation.mutateAsync({
        title: trimmedTitle,
        description,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate
          ? endDate.toISOString().split('T')[0]
          : null,
        destination_name: destinationName,
        latitude: latitude || null,
        longitude: longitude || null,
      });

      router.replace(`/circles/${id}/trips/${tripId}`);
    } catch (error: any) {
      console.error(
        'Update trip error:',
        error.response?.data || error
      );

      Alert.alert('Error', 'Could not update trip.');
    }
  }

  if (isLoading || !trip) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Loading trip...</Text>
      </ScrollView>
    );
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

      <Text style={styles.title}>Edit Trip</Text>

      <Text style={styles.label}>Trip Title</Text>
      <TextInput
        style={styles.input}
        placeholder="London 2026"
        placeholderTextColor="#64748b"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="What is this trip about?"
        placeholderTextColor="#64748b"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />

      <Text style={styles.label}>Start Date</Text>

      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={startDate.toISOString().split('T')[0]}
          onChangeText={(text) => {
            const parsedDate = parseDate(text);

            if (parsedDate) {
              setStartDate(parsedDate);
            }
          }}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#64748b"
        />
      ) : (
        <>
          <Pressable
            style={styles.dateInput}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {startDate.toDateString()}
            </Text>
          </Pressable>

          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);

                if (selectedDate) {
                  setStartDate(selectedDate);
                }
              }}
            />
          )}
        </>
      )}

      <Text style={styles.label}>End Date</Text>

      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={
            endDate
              ? endDate.toISOString().split('T')[0]
              : ''
          }
          onChangeText={(text) => {
            if (!text.trim()) {
              setEndDate(null);
              return;
            }

            const parsedDate = parseDate(text);

            if (parsedDate) {
              setEndDate(parsedDate);
            }
          }}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#64748b"
        />
      ) : (
        <>
          <Pressable
            style={styles.dateInput}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {endDate ? endDate.toDateString() : 'Select end date'}
            </Text>
          </Pressable>

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate ?? startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);

                if (selectedDate) {
                  setEndDate(selectedDate);
                }
              }}
            />
          )}
        </>
      )}

      <LocationSearch
        locationName={destinationName}
        latitude={latitude}
        longitude={longitude}
        onChangeLocationName={setDestinationName}
        onChangeLatitude={setLatitude}
        onChangeLongitude={setLongitude}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdateTrip}
        disabled={updateTripMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {updateTripMutation.isPending
            ? 'Saving Changes...'
            : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}