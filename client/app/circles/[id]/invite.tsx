import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { createCircleInvite } from '../../../src/services/api';

export default function InviteMemberScreen() {
  const { id } = useLocalSearchParams();

  const [invitedUserId, setInvitedUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleInvite() {
    if (!invitedUserId.trim()) {
      Alert.alert('Missing user', 'Please enter a user ID.');
      return;
    }

    try {
      setIsSubmitting(true);

      await createCircleInvite(
        Number(id),
        Number(invitedUserId)
      );

      Alert.alert('Invite sent', 'The invite was created successfully.');

      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not send invite.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Member</Text>

      <Text style={styles.label}>User ID</Text>

      <TextInput
        style={styles.input}
        value={invitedUserId}
        onChangeText={setInvitedUserId}
        placeholder="Enter user ID"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[
          styles.button,
          isSubmitting && styles.buttonDisabled,
        ]}
        onPress={handleInvite}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Sending...' : 'Send Invite'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
  },

  label: {
    color: '#cbd5e1',
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});