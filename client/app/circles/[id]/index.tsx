import { useEffect, useState } from 'react';

import {
  View,
 Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';

import { api } from '../../../src/services/api';

type Circle = {
  id: number;
  name: string;
  circle_type: string;
  start_date: string;
};

type Memory = {
  id: number;
  title: string;
  description: string;
  memory_date: string;
  location_name: string;
};

export default function CircleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [circle, setCircle] = useState<Circle | null>(null);

  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    if (id) {
      fetchCircle();
      fetchMemories();
    }
  }, [id]);

  async function fetchCircle() {
    try {
      const response = await api.get(`/circles/${id}/`);

      setCircle(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!circle) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>
          Loading circle...
        </Text>
      </View>
    );
  }

  async function fetchMemories() {
  try {
    const response = await api.get('/memories/');

    const circleMemories = response.data.filter(
      (memory: Memory & { circle: number }) => memory.circle === Number(id)
    );

    setMemories(circleMemories);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {circle.name}
      </Text>

      <Text style={styles.subtitle}>
        {circle.circle_type}
      </Text>

      <Text style={styles.date}>
        Started: {circle.start_date}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Timeline
        </Text>

      {memories.length === 0 ? (
        <Text style={styles.emptyText}>Memories will appear here.</Text>
      ) : (
        memories.map((memory) => (
          <View key={memory.id} style={styles.memoryCard}>
            <Text style={styles.memoryTitle}>{memory.title}</Text>
            <Text style={styles.memoryDate}>{memory.memory_date}</Text>
            {!!memory.description && (
              <Text style={styles.memoryDescription}>{memory.description}</Text>
            )}
          </View>
        ))
      )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/circles/${id}/add-memory`)}
      >
        <Text style={styles.buttonText}>
          Add Memory
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
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },

  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
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
memoryCard: {
  backgroundColor: '#0f172a',
  padding: 14,
  borderRadius: 12,
  marginBottom: 12,
},

memoryTitle: {
  color: '#ffffff',
  fontSize: 17,
  fontWeight: '600',
  marginBottom: 4,
},

memoryDate: {
  color: '#94a3b8',
  fontSize: 13,
  marginBottom: 8,
},

memoryDescription: {
  color: '#cbd5e1',
  fontSize: 14,
},
});