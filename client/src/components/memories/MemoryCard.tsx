import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { formatDistanceToNow } from 'date-fns';

import type { Memory } from '@/types/memory';

const API_HOST = 'http://127.0.0.1:8000';

type Props = {
  memory: Memory;
  onPhotoPress?: (photoUrl: string) => void;
};

export function MemoryCard({ memory, onPhotoPress }: Props) {
  const photoUri = memory.photo
    ? memory.photo.startsWith('http')
      ? memory.photo
      : `${API_HOST}${memory.photo}`
    : null;

  return (
    <View style={styles.card}>
      {memory.photos && memory.photos.length > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {memory.photos.map((photo) => (
            <TouchableOpacity
              key={photo.id}
              activeOpacity={0.9}
              onPress={() => onPhotoPress?.(photo.image)}
            >
              <Image
                source={{ uri: photo.image }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : photoUri ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPhotoPress?.(photoUri)}
        >
          <Image
            source={{ uri: photoUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>
            Photo Coming Soon
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{memory.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.username}>
            @{memory.created_by?.username ?? 'unknown'}
          </Text>

          <Text style={styles.dot}>•</Text>

          <Text style={styles.date}>
            {formatDistanceToNow(
              new Date(
                memory.created_at ?? memory.memory_date
              ),
              {
                addSuffix: true,
              }
            )}
          </Text>
        </View>

        {!!memory.location_name && (
          <Text style={styles.location}>
            {memory.location_name}
          </Text>
        )}

        {!!memory.description && (
          <Text style={styles.description}>
            {memory.description}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 220,
  },

  galleryImage: {
    width: 340,
    height: 220,
  },

  imagePlaceholder: {
    height: 180,
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
    padding: 18,
  },

  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  username: {
    color: '#bfdbfe',
    fontSize: 14,
    fontWeight: '600',
  },

  dot: {
    color: '#64748b',
    marginHorizontal: 8,
  },

  date: {
    color: '#94a3b8',
    fontSize: 14,
  },

  location: {
    color: '#bfdbfe',
    fontSize: 14,
    marginBottom: 12,
  },

  description: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 24,
  },
});