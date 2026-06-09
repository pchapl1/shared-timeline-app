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

import { useCircle } from '@/hooks/circles/useCircle';
import { useUpdateCircle } from '@/hooks/circles/useUpdateCircle';

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

const circleTypes = [
  { label: 'Couple', value: 'couple' },
  { label: 'Friends', value: 'friends' },
  { label: 'Family', value: 'family' },
  { label: 'Travel Group', value: 'travel_group' },
];

export default function EditCircleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const circleId = Number(id);

  const {
    data: circle,
    isLoading,
  } = useCircle(id);

  const updateCircleMutation =
    useUpdateCircle(circleId);

  const [name, setName] = useState('');
  const [circleType, setCircleType] =
    useState('friends');

  const [startDate, setStartDate] =
    useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  useEffect(() => {
    if (!circle) {
      return;
    }

    setName(circle.name);
    setCircleType(circle.circle_type);
    setStartDate(
      parseDate(circle.start_date) ?? new Date()
    );
  }, [circle]);

  async function handleSave() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert(
        'Missing name',
        'Please add a circle name.'
      );
      return;
    }

    try {
      await updateCircleMutation.mutateAsync({
        name: trimmedName,
        circle_type: circleType,
        start_date:
          startDate.toISOString().split('T')[0],
      });

      router.replace(`/circles/${id}`);
    } catch (error: any) {
      console.error(
        error.response?.data || error
      );

      Alert.alert(
        'Error',
        'Could not update circle.'
      );
    }
  }

  function handleArchiveCircle() {
    Alert.alert(
      'Archive Circle',
      `Archive "${name}"? You can restore it later.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Archive',
          style: 'destructive',
          onPress: async () => {
            try {
              await updateCircleMutation.mutateAsync({
                is_archived: true,
              });

              router.replace('/(tabs)/circles');
            } catch (error: any) {
              console.error(error.response?.data || error);

              Alert.alert(
                'Error',
                'Could not archive circle.'
              );
            }
          },
        },
      ]
    );
  }

  if (isLoading || !circle) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.contentContainer
        }
      >
        <Text style={styles.title}>
          Loading circle...
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
        Edit Circle
      </Text>

      <Text style={styles.label}>
        Circle Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Circle name"
        placeholderTextColor="#64748b"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>
        Circle Type
      </Text>

      {circleTypes.map((type) => (
        <TouchableOpacity
          key={type.value}
          style={styles.input}
          onPress={() =>
            setCircleType(type.value)
          }
        >
          <Text>
            {circleType === type.value
              ? '✓ '
              : ''}
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>
        Start Date
      </Text>

      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={
            startDate
              .toISOString()
              .split('T')[0]
          }
          onChangeText={(text) => {
            const parsedDate =
              parseDate(text);

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
            onPress={() =>
              setShowDatePicker(true)
            }
          >
            <Text style={styles.dateText}>
              {startDate.toDateString()}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(
                event,
                selectedDate
              ) => {
                setShowDatePicker(false);

                if (selectedDate) {
                  setStartDate(
                    selectedDate
                  );
                }
              }}
            />
          )}
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={updateCircleMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {updateCircleMutation.isPending
            ? 'Saving Changes...'
            : 'Save Changes'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleArchiveCircle}
      >
        <Text style={[styles.buttonText, { color: '#EF4444' }]}>
          Archive Circle
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}