import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import { Link } from 'expo-router';

import { api } from '../src/services/api';

import { useAuth } from '../src/context/AuthContext';

type Circle = {
  id: number;
  name: string;
  circle_type: string;
};

export default function CirclesScreen() {
  const [circles, setCircles] = useState<Circle[]>([]);

  const { tokens, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && tokens) {
      fetchCircles();
    }
  }, [isLoading, tokens]);

  async function fetchCircles() {
    try {
      const response = await api.get('/circles/');

      setCircles(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your Circles
      </Text>

      <Link
        href="/create-circle"
        style={styles.createLink}
      >
        Create Circle
      </Link>

      <FlatList
        data={circles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.name}
            </Text>

            <Text style={styles.cardSubtitle}>
              {item.circle_type}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No circles yet.
          </Text>
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

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
  },

  createLink: {
    color: '#60a5fa',
    fontSize: 16,
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },

  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },

  cardSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },

  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  },
});