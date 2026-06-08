import { StyleSheet } from 'react-native';

export const circleTabsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 24,
    padding: 4,
    borderRadius: 999,
    gap: 6,
    backgroundColor: '#1F2937',
  },

  tab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 999,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#FFFFFF',
  },

  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
  },

  activeTabText: {
    color: '#111827',
  },
});