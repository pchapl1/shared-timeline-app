import { View, Text, StyleSheet } from 'react-native';

export default function CirclesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your Circles
      </Text>

      <Text style={styles.subtitle}>
        Couples, friends, families, and groups.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
  },
});