import { Text, TouchableOpacity, View } from 'react-native';

import { circleTabsStyles as styles } from '@/styles/circles/circleTabsStyles';

export type CircleTab = 'about' | 'members' | 'albums' | 'stats';

type Props = {
  activeTab: CircleTab;
  onChangeTab: (tab: CircleTab) => void;
};

const tabs: CircleTab[] = ['about', 'members', 'albums', 'stats'];

function getTabLabel(tab: CircleTab) {
  if (tab === 'about') return 'About';
  if (tab === 'members') return 'Members';
  if (tab === 'albums') return 'Albums';
  return 'Stats';
}

export function CircleTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChangeTab(tab)}
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