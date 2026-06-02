import { useCallback, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

import { Image } from 'expo-image';
// import MapView, { Marker } from 'react-native-maps';

import {
  useFocusEffect,
  useLocalSearchParams,
  router,
} from 'expo-router';

import { api } from '../../../../src/services/api';
import { useAuth } from '../../../../src/context/AuthContext';
import { MemoryCard } from '../../../../src/components/memories/MemoryCard';

type Circle = {
  id: number;
  name: string;
  circle_type: string;
  start_date: string;
};

type MemoryPhoto = {
  id: number;
  image: string;
  created_at: string;
};

type Memory = {
  id: number;
  circle: number;
  title: string;
  description: string;
  memory_date: string;
  location_name: string;
  latitude?: string | null;
  longitude?: string | null;
  photo?: string | null;
  photos?: MemoryPhoto[];
};

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

  const groupedMemories = groupMemoriesByMonth(memories);

  // useEffect(() => {
  //   if (id && !authLoading && tokens) {
  //     fetchCircle();
  //     fetchMemories();
  //   }
  // }, [id, authLoading, tokens]);

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

        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() =>
            router.push(`/circles/${id}/invite`)
          }
        >
          <Text style={styles.inviteButtonText}>
            Invite Member
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Map</Text>

          {/* <MapView
            style={styles.map}
            initialRegion={{
              latitude: 47.6062,
              longitude: -122.3321,
              latitudeDelta: 15,
              longitudeDelta: 15,
            }}
          >
            {memories
              .filter((memory) => memory.latitude && memory.longitude)
              .map((memory) => (
                <Marker
                  key={memory.id}
                  coordinate={{
                    latitude: Number(memory.latitude),
                    longitude: Number(memory.longitude),
                  }}
                  title={memory.title}
                  description={memory.location_name}
                />
              ))}
          </MapView> */}
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
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onPhotoPress={(photoUrl) =>
                        setSelectedPhoto(photoUrl)
                      }
                    />
                  ))}
                </View>
              )
            )
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push(`/circles/${id}/add-memory`)}
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

  map: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 32,
  },

  timelineGroup: {
    marginBottom: 32,
  },

  timelineGroupTitle: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
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

  photoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
    right: 24,
    zIndex: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  inviteButton: {
  backgroundColor: '#2563eb',
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 24,
},

inviteButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},
});