import { useState } from 'react';

import {
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { CircleAboutTab } from '@/components/circles/CircleAboutTab';
import { CircleAlbumsTab } from '@/components/circles/CircleAlbumsTab';
import { CircleHeader } from '@/components/circles/CircleHeader';
import { CircleMembersTab } from '@/components/circles/CircleMembersTab';
import { CircleStatsTab } from '@/components/circles/CircleStatsTab';

import type { CircleTab } from '@/components/circles/CircleTabs';

import { useAuth } from '@/context/AuthContext';
import { useCircle } from '@/hooks/circles/useCircle';

import { colors } from '@/theme/colors';
import { circleTimelineStyles as styles } from '@/styles/circles/circleTimelineStyles';

export default function CircleDetailScreen() {
  const [activeTab, setActiveTab] =
    useState<CircleTab>('about');

  const { id } = useLocalSearchParams<{ id: string }>();

  const { isLoading: authLoading, tokens } = useAuth();

  const {
    data: circle,
    isLoading: isCircleLoading,
    refetch: refetchCircle,
  } = useCircle(id);

  if (authLoading || isCircleLoading || !tokens || !circle) {
    return (
      <View style={styles.screen}>
        <View style={styles.contentContainer}>
          <Text style={styles.loading}>Loading circle...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetchCircle}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <CircleHeader
          circle={circle}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {activeTab === 'about' && (
          <CircleAboutTab circle={circle} />
        )}

        {activeTab === 'members' && <CircleMembersTab circle={circle} />}

        {activeTab === 'albums' && <CircleAlbumsTab circle={circle} />}

        {activeTab === 'stats' && <CircleStatsTab circle={circle} />}
      </ScrollView>
    </View>
  );
}