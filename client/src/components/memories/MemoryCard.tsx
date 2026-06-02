import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const API_HOST = 'http://127.0.0.1:8000';

type Memory = {
  id: number;
  title: string;
  description: string;
  memory_date: string;
  location_name?: string;
  photo?: string | null;
};

type Props = {
  memory: Memory;
  onPhotoPress?: (photoUrl: string) => void;
};

export function MemoryCard({
  memory,
  onPhotoPress,
}: Props) {
  const photoUri = memory.photo
    ? memory.photo.startsWith('http')
      ? memory.photo
      : `${API_HOST}${memory.photo}`
    : null;

  return (
    <View style={styles.card}>
      {photoUri ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPhotoPress?.(photoUri)}
        >
          <Image
            source={{
              uri: photoUri,
            }}
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

        <Text style={styles.date}>
          {new Date(memory.memory_date).toLocaleDateString()}
        </Text>

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

  date: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
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