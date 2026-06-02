import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Image } from 'expo-image';

import {
  useLocalSearchParams,
  router,
} from 'expo-router';

import { useEffect, useState } from 'react';

import { formatDistanceToNow } from 'date-fns';

import { api } from '../../../../../src/services/api';

import { useAuth } from '../../../../../src/context/AuthContext';

import type { Memory } from '../../../../../src/types/memory';

export default function MemoryDetailScreen() {
  const { memoryId, id } = useLocalSearchParams<{
    memoryId: string;
    id: string;
  }>();

  const { tokens, isLoading } = useAuth();

  const [memory, setMemory] = useState<Memory | null>(
    null
  );

  useEffect(() => {
    if (memoryId && !isLoading && tokens) {
      setMemory(null);
      fetchMemory();
    }
  }, [memoryId, isLoading, tokens]);

  async function fetchMemory() {
    try {
      const response = await api.get(
        `/memories/${memoryId}/`
      );

      setMemory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading || !memory) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading memory...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        style={styles.backButton}
        onPress={() =>
          router.push(`/(tabs)/circles/${id}`)
        }
      >
        ← Back
      </Text>

      {memory.photos && memory.photos.length > 0 ? (
        <View style={styles.photoGrid}>
          {memory.photos.map((photo) => (
            <Image
              key={photo.id}
              source={{ uri: photo.image }}
              style={styles.gridImage}
              contentFit="cover"
            />
          ))}
        </View>
      ) : !!memory.photo ? (
        <Image
          source={{ uri: memory.photo }}
          style={styles.heroImage}
          contentFit="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>
            Photo Coming Soon
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>
          {memory.title}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.username}>
            @{memory.created_by?.username ?? 'unknown'}
          </Text>

          <Text style={styles.dot}>•</Text>

          <Text style={styles.timestamp}>
            {formatDistanceToNow(
              new Date(
                memory.created_at ??
                  memory.memory_date
              ),
              {
                addSuffix: true,
              }
            )}
          </Text>
        </View>

        {!!memory.location_name && (
          <Text style={styles.location}>
            📍 {memory.location_name}
          </Text>
        )}

        {!!memory.description && (
          <Text style={styles.description}>
            {memory.description}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },

  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },

  backButton: {
    color: '#60a5fa',
    fontSize: 16,
    marginTop: 70,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  heroImage: {
    width: '100%',
    height: 340,
  },

  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 12,
  },

  gridImage: {
    width: '48.8%',
    height: 180,
    borderRadius: 12,
  },

  imagePlaceholder: {
    width: '100%',
    height: 260,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '600',
  },

  content: {
    padding: 24,
  },

  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  username: {
    color: '#bfdbfe',
    fontSize: 15,
    fontWeight: '600',
  },

  dot: {
    color: '#64748b',
    marginHorizontal: 8,
  },

  timestamp: {
    color: '#94a3b8',
    fontSize: 14,
  },

  location: {
    color: '#93c5fd',
    fontSize: 16,
    marginBottom: 24,
  },

  description: {
    color: '#e2e8f0',
    fontSize: 18,
    lineHeight: 30,
  },
});