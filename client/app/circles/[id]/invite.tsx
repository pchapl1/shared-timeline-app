import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { createCircleInvite, searchUsers } from '../../../src/services/api';


type UserSearchResult = {
  id: number;
  username: string;
  email: string;
};
export default function InviteMemberScreen() {
  const { id } = useLocalSearchParams();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleInvite(userId: number) {
    try {
      setIsSubmitting(true);

      await createCircleInvite(Number(id), userId);

      Alert.alert('Invite sent', 'The invite was created successfully.');

      router.back();
    } catch (error: any) {
        console.error('Error creating invite:', error.response?.data || error);

        Alert.alert(
          'Invite not sent',
          error.response?.data?.error || 'Could not send invite.'
        );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSearch(text: string) {
  setQuery(text);

  if (text.length < 2) {
    setResults([]);
    return;
  }

  try {
    const data = await searchUsers(text);
    setResults(data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Search Users</Text>

    <TextInput
      style={styles.input}
      value={query}
      onChangeText={handleSearch}
      placeholder="Search username or email"
      placeholderTextColor="#64748b"
    />

    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.userCard}
          onPress={() => handleInvite(item.id)}
          disabled={isSubmitting}
        >
          <Text style={styles.username}>
            {item.username}
          </Text>

          <Text style={styles.email}>
            {item.email}
          </Text>
        </TouchableOpacity>
      )}
    />
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
  userCard: {
  backgroundColor: '#1e293b',
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
},

username: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},

email: {
  color: '#94a3b8',
  marginTop: 4,
},
});