import { StyleSheet } from 'react-native';

export const tripCardStyles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
    backgroundColor: '#1F2937',
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  destination: {
    marginTop: 6,
    fontSize: 15,
    color: '#D1D5DB',
  },

  date: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#93C5FD',
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#9CA3AF',
  },
  memoryCount: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
    color: '#93C5FD',
  },
});