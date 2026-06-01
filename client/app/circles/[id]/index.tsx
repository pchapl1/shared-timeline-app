import { useCallback, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  useFocusEffect,
  useLocalSearchParams,
  router,
} from 'expo-router';

import { api } from '../../../src/services/api';
import { useAuth } from '../../../src/context/AuthContext';
import { MemoryCard } from '../../../src/components/memories/MemoryCard';

type Circle = {
  id: number;
  name: string;
  circle_type: string;
  start_date: string;
};

type Memory = {
  id: number;
  circle: number;
  title: string;
  description: string;
  memory_date: string;
  location_name: string;
};

export default function CircleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { isLoading: authLoading, tokens } = useAuth();

  const [circle, setCircle] = useState<Circle | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    if (id && !authLoading && tokens) {
      fetchCircle();
      fetchMemories();
    }
  }, [id, authLoading, tokens]);

  useFocusEffect(
    useCallback(() => {
      if (id && !authLoading && tokens) {
        fetchCircle();
        fetchMemories();
      }
    }, [id, authLoading, tokens])
  );

  async function fetchCircle() {
    try {
      const response = await api.get(`/circles/${id}/`);
      setCircle(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMemories() {
    try {
      const response = await api.get('/memories/');

      const circleMemories = response.data.filter(
        (memory: Memory) => memory.circle === Number(id)
      );

      setMemories(circleMemories);
    } catch (error) {
      console.error(error);
    }
  }

  if (authLoading || !circle) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading circle...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{circle.name}</Text>

        <Text style={styles.subtitle}>{circle.circle_type}</Text>

        <Text style={styles.date}>Started: {circle.start_date}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>

          {memories.length === 0 ? (
            <Text style={styles.emptyText}>
              Memories will appear here.
            </Text>
          ) : (
            memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push(`/circles/${id}/add-memory`)}
      >
        <Text style={styles.floatingButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  contentContainer: {
    paddingBottom: 120,
  },

  loading: {
    color: '#ffffff',
    fontSize: 18,
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
    marginBottom: 8,
  },

  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 8,
  },

  date: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 32,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },

  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
  },

  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatingButtonText: {
    color: '#ffffff',
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '600',
  },
});