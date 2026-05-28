import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { api } from '../services/api';

export default function CreateCircleScreen() {
  const [name, setName] = useState('');
  const [circleType, setCircleType] = useState('friends');
  const [startDate, setStartDate] = useState('');
  const [message, setMessage] = useState('');

  async function handleCreateCircle() {
    try {
      await api.post('/circles/', {
        name,
        circle_type: circleType,
        start_date: startDate,
        created_by: 1,
      });

      router.replace('/circles');
    } catch (error) {
      console.error(error);
      setMessage('Could not create circle.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Circle</Text>

      <TextInput
        placeholder="Circle name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Type: couple, friends, family, travel_group"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={circleType}
        onChangeText={setCircleType}
      />

      <TextInput
        placeholder="Start date: YYYY-MM-DD"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateCircle}>
        <Text style={styles.buttonText}>Create Circle</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  message: {
    color: '#ffffff',
    marginTop: 16,
    textAlign: 'center',
  },
});