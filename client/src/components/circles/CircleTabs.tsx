import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { circleTabsStyles as styles } from '@/styles/circleTabsStyles';

type CircleTab = 'timeline' | 'members' | 'map' | 'trips';

type Props = {
  circleId: number;
  activeTab: CircleTab;
};

const tabs: CircleTab[] = [
  'timeline',
  'members',
  'map',
  'trips',
];

function getTabLabel(tab: CircleTab) {
  if (tab === 'timeline') {
    return 'Timeline';
  }

  if (tab === 'members') {
    return 'Members';
  }

  if (tab === 'map') {
    return 'Map';
  }

  return 'Trips';
}

export function CircleTabs({ circleId, activeTab }: Props) {
  function navigateToTab(tab: CircleTab) {
    // Timeline is the index route for a circle.
    if (tab === 'timeline') {
      router.push(`/circles/${circleId}`);
      return;
    }

    router.push(`/circles/${circleId}/${tab}`);
  }

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
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
              {getTabLabel(tab)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}