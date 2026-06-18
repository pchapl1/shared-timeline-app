import { Text, TouchableOpacity, View } from 'react-native';

import {
  Image,
  List,
  Plane,
  Users,
} from 'lucide-react-native';

import { colors } from '@/theme/colors';
import { circleTabsStyles as styles } from '@/styles/circles/circleTabsStyles';

export type CircleTab = 'timeline' | 'trips' | 'members' | 'albums';

type Props = {
  activeTab: CircleTab;
  onChangeTab: (tab: CircleTab) => void;
};

const tabs = [
  { key: 'timeline' as const, label: 'Timeline', Icon: List },
  { key: 'trips' as const, label: 'Trips', Icon: Plane },
  { key: 'members' as const, label: 'Members', Icon: Users },
  { key: 'albums' as const, label: 'Albums', Icon: Image },
];

export function CircleTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map(({ key, label, Icon }) => {
        const isActive = key === activeTab;

        return (
          <TouchableOpacity
            key={key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChangeTab(key)}
            activeOpacity={0.85}
          >
            <Icon
              size={13}
              strokeWidth={2}
              color={isActive ? colors.primary : colors.textMuted}
            />

            <Text
              style={[
                styles.tabText,
                isActive && styles.activeTabText,
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}