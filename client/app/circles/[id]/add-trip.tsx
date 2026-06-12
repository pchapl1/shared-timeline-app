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
import { router, useLocalSearchParams } from 'expo-router';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LocationSearch } from '@/components/search/LocationSearch';

import { useCreateTrip } from '@/hooks/trips/useCreateTrip';

import { colors } from '@/theme/colors';
import { addTripStyles as styles } from '@/styles/addTripStyles';

export default function AddTripScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const circleId = Number(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] =
    useState(false);
  const [showEndDatePicker, setShowEndDatePicker] =
    useState(false);
  const [destinationName, setDestinationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const createTripMutation = useCreateTrip(circleId);

  async function handleCreateTrip() {
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
      await createTripMutation.mutateAsync({
        circle: circleId,
        title: trimmedTitle,
        description,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate
          ? endDate.toISOString().split('T')[0]
          : undefined,
        destination_name: destinationName,
        latitude: latitude || undefined,
        longitude: longitude || undefined,
      });

      router.replace({
        pathname: '/circles/[id]/trips',
        params: { id },
      });
    } catch (error: any) {
      console.error(
        'Create trip error:',
        error.response?.data || error
      );

      Alert.alert('Error', 'Could not create trip.');
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
            <AppText variant="h1">Add Trip</AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.subtitle}
            >
              Plan a trip and connect memories to it later.
            </AppText>
          </View>

          <AppCard style={styles.card}>
            <SectionHeader
              title="Trip details"
              subtitle="Give this trip a name, dates, and a short description."
            />

            <AppText variant="caption" color={colors.textMuted}>
              Trip Title
            </AppText>

            <TextInput
              style={styles.input}
              placeholder="London 2026"
              placeholderTextColor={colors.textSubtle}
              value={title}
              onChangeText={setTitle}
            />

            <AppText variant="caption" color={colors.textMuted}>
              Description
            </AppText>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What is this trip about?"
              placeholderTextColor={colors.textSubtle}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
            />
          </AppCard>

          <AppCard style={styles.card}>
            <SectionHeader
              title="Dates"
              subtitle="Set when this trip starts and optionally when it ends."
            />

            <AppText variant="caption" color={colors.textMuted}>
              Start Date
            </AppText>

            {Platform.OS === 'web' ? (
              <TextInput
                style={styles.input}
                value={startDate.toISOString().split('T')[0]}
                onChangeText={(text) => {
                  const parsedDate = new Date(text);

                  if (!Number.isNaN(parsedDate.getTime())) {
                    setStartDate(parsedDate);
                  }
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textSubtle}
              />
            ) : (
              <>
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <AppText variant="body" color={colors.text}>
                    {startDate.toDateString()}
                  </AppText>
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

            <View style={styles.fieldSpacer}>
              <AppText variant="caption" color={colors.textMuted}>
                End Date
              </AppText>
            </View>

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

                  const parsedDate = new Date(text);

                  if (!Number.isNaN(parsedDate.getTime())) {
                    setEndDate(parsedDate);
                  }
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textSubtle}
              />
            ) : (
              <>
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <AppText
                    variant="body"
                    color={endDate ? colors.text : colors.textSubtle}
                  >
                    {endDate
                      ? endDate.toDateString()
                      : 'Select end date'}
                  </AppText>
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
          </AppCard>

          <AppCard style={styles.card}>
            <SectionHeader
              title="Destination"
              subtitle="Search a destination to place this trip on the map."
            />

            <LocationSearch
              locationName={destinationName}
              latitude={latitude}
              longitude={longitude}
              onChangeLocationName={setDestinationName}
              onChangeLatitude={setLatitude}
              onChangeLongitude={setLongitude}
            />
          </AppCard>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateTrip}
            disabled={createTripMutation.isPending}
          >
            <AppText variant="bodyStrong" color={colors.primary}>
              {createTripMutation.isPending
                ? 'Saving Trip...'
                : 'Save Trip'}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreen>
  );
}