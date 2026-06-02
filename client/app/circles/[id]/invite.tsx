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

import {
  createCircleInvite,
  searchUsers,
} from '../../../src/services/api';

import { useAuth } from '../../../src/context/AuthContext';

type UserSearchResult = {
  id: number;
  username: string;
  email: string;
};

export default function InviteMemberScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { tokens, isLoading } = useAuth();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleInvite(userId: number) {
    if (isLoading || !tokens || !id) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createCircleInvite(Number(id), userId);

      Alert.alert(
        'Invite sent',
        'The invite was created successfully.'
      );

      router.push({
        pathname: '/circles/[id]',
        params: {
          id: id.toString(),
        },
      });
    } catch (error: any) {
      console.error(
        'Error creating invite:',
        error.response?.data || error
      );

      Alert.alert(
        'Invite not sent',
        error.response?.data?.error ||
          'Could not send invite.'
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

    if (isLoading || !tokens) {
      return;
    }

    try {
      const data = await searchUsers(text);

      setResults(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/circles/[id]',
            params: {
              id: id?.toString(),
            },
          })
        }
      >
        <Text style={styles.backLink}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Invite Member</Text>

      <Text style={styles.label}>Search Users</Text>

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search username or email"
        placeholderTextColor="#64748b"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userCard,
              isSubmitting && styles.cardDisabled,
            ]}
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
        ListEmptyComponent={
          query.length >= 2 ? (
            <Text style={styles.emptyText}>
              No users found.
            </Text>
          ) : (
            <Text style={styles.emptyText}>
              Type at least 2 characters to search.
            </Text>
          )
        }
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

  backLink: {
    color: '#60a5fa',
    fontSize: 16,
    marginBottom: 24,
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

  userCard: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardDisabled: {
    opacity: 0.6,
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

  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 32,
  },

  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
});