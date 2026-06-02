import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Props = {
  name: string;
  circleType: string;
  onPress: () => void;
};

export function CircleCard({
  name,
  circleType,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={styles.cardTitle}>
        {name}
      </Text>

      <Text style={styles.cardSubtitle}>
        {circleType}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    textTransform: 'capitalize',
  },
});