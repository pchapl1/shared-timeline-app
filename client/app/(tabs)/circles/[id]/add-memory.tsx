import { useState } from 'react';

import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
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

import { createMemory } from '../../../../src/services/memories';

export default function AddMemoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [memoryDate, setMemoryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [images, setImages] = useState<string[]>([]);

  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

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
    try {
      await createMemory({
        circleId: String(id),
        title,
        description,
        memoryDate: memoryDate.toISOString().split('T')[0],
        imageUris: images,
        locationName,
        latitude: String(latitude),
        longitude: String(longitude),
      });

      router.replace(`/circles/${id}`);
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

      <TextInput
        style={styles.input}
        placeholder="Location name"
        placeholderTextColor="#64748b"
        value={locationName}
        onChangeText={setLocationName}
      />

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        placeholderTextColor="#64748b"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="decimal-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        placeholderTextColor="#64748b"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="decimal-pad"
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  contentContainer: {
    paddingBottom: 120,
  },

  backLink: {
    color: '#60a5fa',
    fontSize: 16,
    marginBottom: 24,
  },

  title: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 24,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: 16,
  },

  dateInput: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  dateText: {
    color: '#ffffff',
    fontSize: 16,
  },

  imageButton: {
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },

  imageButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});