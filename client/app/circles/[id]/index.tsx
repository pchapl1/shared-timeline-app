import { View, Text, ScrollView, RefreshControl } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { CircleHeader } from '@/components/circles/CircleHeader';

import { useCircle } from '@/hooks/circles/useCircle';
import { useAuth } from '@/context/AuthContext';

import { colors } from '@/theme/colors';
import { circleTimelineStyles as styles } from '@/styles/circleTimelineStyles';
import { useEffect } from 'react';

function formatCircleType(circleType?: string) {
  if (!circleType) {
    return 'Private';
  }

  return circleType
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value?: string | null) {
  if (!value) {
    return 'Not set';
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CircleDetailScreen() {
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
  useEffect(() => {
    console.log('circle images:', {
      cover_photo: circle?.cover_photo,
      avatar: circle?.avatar,
    });
  }, [circle]);
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
        <CircleHeader circle={circle} activeTab="about" />

        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            Our little corner of the internet to remember the good times.
          </Text>

          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Created</Text>
            <Text style={styles.aboutValue}>
              {formatDate(circle.start_date)}
            </Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Circle Type</Text>
            <Text style={styles.aboutValue}>
              {formatCircleType(circle.circle_type)}
            </Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Members</Text>
            <Text style={styles.aboutValue}>{circle.member_count}</Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Memories</Text>
            <Text style={styles.aboutValue}>{circle.memory_count}</Text>
          </View>

          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Trips</Text>
            <Text style={styles.aboutValue}>{circle.trip_count}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}