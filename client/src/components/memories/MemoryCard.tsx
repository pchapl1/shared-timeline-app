import { View, Text, StyleSheet } from 'react-native';

type Memory = {
  id: number;
  title: string;
  description: string;
  memory_date: string;
  location_name?: string;
};

type Props = {
  memory: Memory;
};

export function MemoryCard({ memory }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Photo Coming Soon</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{memory.title}</Text>

        <Text style={styles.date}>
          {new Date(memory.memory_date).toLocaleDateString()}
        </Text>

        {!!memory.location_name && (
          <Text style={styles.location}>{memory.location_name}</Text>
        )}

        {!!memory.description && (
          <Text style={styles.description}>{memory.description}</Text>
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