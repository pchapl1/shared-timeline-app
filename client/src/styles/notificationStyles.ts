import { StyleSheet } from 'react-native';

export const notificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  unreadCard: {
    borderWidth: 1,
    borderColor: '#60a5fa',
  },

  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  memoryTitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 4,
  },

  circleName: {
    color: '#60a5fa',
    fontSize: 14,
    marginBottom: 4,
  },

  timestamp: {
    color: '#94a3b8',
    fontSize: 12,
  },

  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  },
});