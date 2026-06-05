import { StyleSheet } from 'react-native';

export const locationSearchStyles = StyleSheet.create({

  suggestionsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },

  suggestion: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },

  suggestionText: {
    color: '#ffffff',
    fontSize: 16,
  },

  helperText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 8,
  },
});