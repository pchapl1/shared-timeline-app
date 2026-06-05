import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { circleTabsStyles as styles } from '@/styles/circleTabsStyles';

type CircleTab = 'timeline' | 'members' | 'map';

type Props = {
  circleId: number;
  activeTab: CircleTab;
};

export function CircleTabs({ circleId, activeTab }: Props) {
  function navigateToTab(tab: CircleTab) {
    // Keep circle-level navigation centralized so future tabs
    // like Trips can be added without repeating route logic.
    if (tab === 'timeline') {
      router.push(`/circles/${circleId}`);
      return;
    }

    router.push(`/circles/${circleId}/${tab}`);
  }

  return (
    <View style={styles.container}>
      {(['timeline', 'members', 'map'] as CircleTab[]).map((tab) => {
        const isActive = tab === activeTab;

        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              isActive && styles.activeTab,
            ]}
            onPress={() => navigateToTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                isActive && styles.activeTabText,
              ]}
            >
              {tab === 'timeline'
                ? 'Timeline'
                : tab === 'members'
                  ? 'Members'
                  : 'Map'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}