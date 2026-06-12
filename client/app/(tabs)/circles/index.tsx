import { useCallback, useState } from 'react';

import {
  Alert,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import { router, useFocusEffect } from 'expo-router';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { CircleCard } from '@/components/circles/CircleCard';
import { PageHeader } from '@/components/ui/PageHeader';

import { useRestoreCircle } from '@/hooks/circles/useRestoreCircle';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

import { colors } from '@/theme/colors';
import { circlesScreenStyles as styles } from '@/styles/circlesScreenStyles';

import type { Circle } from '@/types/circle';

export default function CirclesScreen() {
  const [circles, setCircles] = useState<Circle[]>([]);

  const { tokens, isLoading } = useAuth();

  const restoreCircleMutation = useRestoreCircle();

  const activeCircles = circles.filter(
    (circle) => !circle.is_archived
  );

  const archivedCircles = circles.filter(
    (circle) => circle.is_archived
  );

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && tokens) {
        fetchCircles();
      }
    }, [isLoading, tokens])
  );

  async function fetchCircles() {
    try {
      const response = await api.get('/circles/', {
        params: {
          include_archived: true,
        },
      });

      setCircles(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  function handleRestoreCircle(circle: Circle) {
    Alert.alert(
      'Restore Circle',
      `Restore "${circle.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Restore',
          onPress: async () => {
            try {
              await restoreCircleMutation.mutateAsync(
                circle.id
              );

              fetchCircles();
            } catch (error: any) {
              console.log(
                'RESTORE CIRCLE ERROR: ',
                error.response?.data || error
              );

              Alert.alert(
                'Error',
                'Could not restore circle.'
              );
            }
          },
        },
      ]
    );
  }

  function handleCirclePress(circleId: number) {
    router.push({
      pathname: '/circles/[id]',
      params: {
        id: circleId.toString(),
      },
    });
  }

  function handleCreateCircle() {
    router.push('/create-circle');
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={activeCircles}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <PageHeader
              title="Your Circles"
              subtitle="Shared spaces for the people who matter most."
            />

            <AppButton
              title="+ New Circle"
              onPress={handleCreateCircle}
              style={styles.createButton}
            />
          </View>
        }
        renderItem={({ item }) => (
          <CircleCard
            name={item.name}
            circleType={item.circle_type}
            onPress={() => handleCirclePress(item.id)}
          />
        )}
        ListEmptyComponent={
          <AppCard style={styles.emptyCard}>
            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.emptyText}
            >
              No circles yet. Create your first shared space.
            </AppText>
          </AppCard>
        }
        ListFooterComponent={
          archivedCircles.length > 0 ? (
            <View style={styles.archivedSection}>
              <AppText
                variant="h3"
                color={colors.textMuted}
                style={styles.archivedTitle}
              >
                Archived Circles
              </AppText>

              {archivedCircles.map((circle) => (
                <TouchableOpacity
                  key={circle.id}
                  activeOpacity={0.9}
                  onPress={() => handleRestoreCircle(circle)}
                >
                  <AppCard style={styles.archivedCard}>
                    <AppText variant="bodyStrong">
                      {circle.name}
                    </AppText>

                    <AppText
                      variant="bodySmall"
                      color={colors.textMuted}
                      style={styles.archivedSubtitle}
                    >
                      Tap to restore
                    </AppText>
                  </AppCard>
                </TouchableOpacity>
              ))}
            </View>
          ) : null
        }
      />
    </View>
  );
}