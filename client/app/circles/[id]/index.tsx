import { useCallback, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';

import { Image } from 'expo-image';

import {
  useFocusEffect,
  useLocalSearchParams,
  router,
} from 'expo-router';

import { useAuth } from '../../../src/context/AuthContext';
import { MemoryCard } from '../../../src/components/memories/MemoryCard';
import { getCircle } from '../../../src/services/circles';
import { getMemories } from '../../../src/services/memories';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';

import type { Circle } from '../../../src/types/circle';
import type { Memory } from '../../../src/types/memory';

function groupMemoriesByMonth(memories: Memory[]) {
  const grouped: Record<string, Memory[]> = {};

  const sortedMemories = [...memories].sort(
    (a, b) =>
      new Date(b.memory_date).getTime() -
      new Date(a.memory_date).getTime()
  );

  sortedMemories.forEach((memory) => {
    const date = new Date(memory.memory_date);

    const groupKey = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }

    grouped[groupKey].push(memory);
  });

  return grouped;
}

export default function CircleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { isLoading: authLoading, tokens } = useAuth();

  const [circle, setCircle] = useState<Circle | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const groupedMemories = groupMemoriesByMonth(memories);

  useFocusEffect(
    useCallback(() => {
      if (id && !authLoading && tokens) {
        setCircle(null);
        setMemories([]);

        fetchCircle();
        fetchMemories();
      }
    }, [id, authLoading, tokens])
  );

  async function fetchCircle() {
    try {
      const circleData = await getCircle(id);

      setCircle(circleData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMemories() {
    try {
      const memoriesData = await getMemories();

      const circleMemories = memoriesData.filter(
        (memory: Memory) => memory.circle === Number(id)
      );

      setMemories(circleMemories);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRefresh() {
    try {
      setRefreshing(true);

      await Promise.all([fetchCircle(), fetchMemories()]);
    } finally {
      setRefreshing(false);
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text}
          />
        }
      >
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/circles')}
        >
          <Text style={styles.backLink}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{circle.name}</Text>

        <Text style={styles.subtitle}>{circle.circle_type}</Text>

        <Text style={styles.date}>Started: {circle.start_date}</Text>

        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() =>
            router.push({
              pathname: '/circles/[id]/invite',
              params: {
                id: id.toString(),
              },
            })
          }
        >
          <Text style={styles.inviteButtonText}>
            Invite Member
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Map</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>

          {memories.length === 0 ? (
            <Text style={styles.emptyText}>
              Memories will appear here.
            </Text>
          ) : (
            Object.entries(groupedMemories).map(
              ([groupTitle, groupMemories]) => (
                <View key={groupTitle} style={styles.timelineGroup}>
                  <Text style={styles.timelineGroupTitle}>
                    {groupTitle}
                  </Text>

                  {groupMemories.map((memory) => (
                    <TouchableOpacity
                      key={memory.id}
                      activeOpacity={0.9}
                      onPress={() => {
                        router.push({
                          pathname:
                            '/circles/[id]/memories/[memoryId]',
                          params: {
                            id: id.toString(),
                            memoryId: memory.id.toString(),
                          },
                        });
                      }}
                    >
                    <MemoryCard
                      memory={memory}
                      onPhotoPress={(photoUrl) =>
                        setSelectedPhoto(photoUrl)
                      }
                      onPress={() =>
                        router.push({
                          pathname: '/circles/[id]/memories/[memoryId]',
                          params: {
                            id: id.toString(),
                            memoryId: memory.id.toString(),
                          },
                        })
                      }
                    />
                    </TouchableOpacity>
                  ))}
                </View>
              )
            )
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          router.push({
            pathname: '/circles/[id]/add-memory',
            params: {
              id: id.toString(),
            },
          })
        }
      >
        <Text style={styles.floatingButtonText}>＋</Text>
      </TouchableOpacity>

      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.photoModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPhoto(null)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.fullscreenPhoto}
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
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },

  contentContainer: {
    paddingBottom: 120,
  },

  loading: {
    color: colors.text,
    fontSize: 18,
  },

  backLink: {
    color: colors.primaryLight,
    fontSize: 16,
    marginBottom: spacing.lg,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  subtitle: {
    color: colors.muted,
    fontSize: 16,
    marginBottom: spacing.sm,
  },

  date: {
    color: colors.subtleText,
    fontSize: 14,
    marginBottom: spacing.xl,
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: spacing.md,
  },

  timelineGroup: {
    marginBottom: spacing.xl,
  },

  timelineGroupTitle: {
    color: colors.muted,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  emptyText: {
    color: colors.muted,
    fontSize: 15,
  },

  floatingButton: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatingButtonText: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '600',
  },

  photoModal: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullscreenPhoto: {
    width: '100%',
    height: '100%',
  },

  closeButton: {
    position: 'absolute',
    top: 60,
    right: spacing.lg,
    zIndex: 10,
    backgroundColor: colors.modalButton,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },

  inviteButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: spacing.lg,
  },

  inviteButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});