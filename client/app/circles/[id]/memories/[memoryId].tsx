import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { Image } from 'expo-image';

import { useLocalSearchParams, router } from 'expo-router';

import { formatDistanceToNow } from 'date-fns';

import { api } from '../../../../src/services/api';
import { useAuth } from '../../../../src/context/AuthContext';
import { colors } from '../../../../src/theme/colors';
import { spacing } from '../../../../src/theme/spacing';
import { photoModalStyles } from '../../../../src/styles/photoModalStyles';

import type { Memory } from '../../../../src/types/memory';

export default function MemoryDetailScreen() {
  const { memoryId, id } = useLocalSearchParams<{
    memoryId: string;
    id: string;
  }>();

  const { tokens, isLoading } = useAuth();

  const [memory, setMemory] = useState<Memory | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (memoryId && !isLoading && tokens) {
      setMemory(null);
      fetchMemory();
    }
  }, [memoryId, isLoading, tokens]);

  async function fetchMemory() {
    try {
      const response = await api.get(`/memories/${memoryId}/`);

      setMemory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading || !memory) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading memory...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text
          style={styles.backButton}
          onPress={() => router.push(`/circles/${id}`)}
        >
          ← Back
        </Text>

        {memory.photos && memory.photos.length > 0 ? (
          <View style={styles.photoGrid}>
            {memory.photos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                activeOpacity={0.9}
                style={styles.gridImageWrapper}
                onPress={() => setSelectedPhoto(photo.image?? null)}
              >
                <Image
                  source={{ uri: photo.image }}
                  style={styles.gridImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : !!memory.photo ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedPhoto(memory.photo ?? null)}
          >
            <Image
              source={{ uri: memory.photo }}
              style={styles.heroImage}
              contentFit="cover"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Photo Coming Soon</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{memory.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.username}>
              @{memory.created_by?.username ?? 'unknown'}
            </Text>

            <Text style={styles.dot}>•</Text>

            <Text style={styles.timestamp}>
              {formatDistanceToNow(
                new Date(memory.created_at ?? memory.memory_date),
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

      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={photoModalStyles.photoModal}>
          <TouchableOpacity
            style={photoModalStyles.closeButton}
            onPress={() => setSelectedPhoto(null)}
          >
            <Text style={photoModalStyles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={photoModalStyles.fullscreenPhoto}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  loadingText: {
    color: colors.text,
    fontSize: 18,
  },

  backButton: {
    color: colors.primaryLight,
    fontSize: 16,
    marginTop: 70,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
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

  gridImageWrapper: {
    width: '48.8%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },

  gridImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    width: '100%',
    height: 260,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: colors.subtleText,
    fontSize: 16,
    fontWeight: '600',
  },

  content: {
    padding: spacing.lg,
  },

  title: {
    color: colors.text,
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
    color: colors.primaryLight,
    fontSize: 15,
    fontWeight: '600',
  },

  dot: {
    color: colors.border,
    marginHorizontal: spacing.sm,
  },

  timestamp: {
    color: colors.muted,
    fontSize: 14,
  },

  location: {
    color: colors.primaryLight,
    fontSize: 16,
    marginBottom: spacing.lg,
  },

  description: {
    color: colors.subtleText,
    fontSize: 18,
    lineHeight: 30,
  },
});