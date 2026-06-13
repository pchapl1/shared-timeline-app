import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { circleTabsStyles as styles } from '@/styles/circleTabsStyles';

type CircleTab = 'about' | 'members' | 'albums' | 'stats';

type Props = {
  circleId: number;
  activeTab: CircleTab;
};

const tabs: CircleTab[] = ['about', 'members', 'albums', 'stats'];

function getTabLabel(tab: CircleTab) {
  if (tab === 'about') return 'About';
  if (tab === 'members') return 'Members';
  if (tab === 'albums') return 'Albums';
  return 'Stats';
}

export function CircleTabs({ circleId, activeTab }: Props) {
  function navigateToTab(tab: CircleTab) {
    if (tab === 'about') {
      router.push(`/circles/${circleId}`);
      return;
    }

    if (tab === 'albums') {
      router.push(`/circles/${circleId}/trips`);
      return;
    }

    if (tab === 'stats') {
      router.push(`/circles/${circleId}/map`);
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
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => navigateToTab(tab)}
            activeOpacity={0.85}
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