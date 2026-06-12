import { StyleSheet } from 'react-native';

export const circleMapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#111827',
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#1F2937',
  },

  activeFilterButton: {
    backgroundColor: '#3B82F6',
  },

  filterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  groupMarker: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  tripGroupMarker: {
    backgroundColor: '#7C3AED',
  },

  groupMarkerText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  calloutTitle: {
    fontWeight: '800',
    marginBottom: 4,
  },

  calloutText: {
    marginBottom: 2,
  },

  mapTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#111827',
  },

  mapTypeButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#1F2937',
  },

  activeMapTypeButton: {
    backgroundColor: '#10B981',
  },

  mapTypeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});