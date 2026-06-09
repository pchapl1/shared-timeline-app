import { useCallback, useState } from 'react';

import {
  Alert,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Link,
  router,
  useFocusEffect,
} from 'expo-router';

import { api } from '../../../src/services/api';
import { useAuth } from '../../../src/context/AuthContext';
import { CircleCard } from '@/components/circles/CircleCard';
import { useRestoreCircle } from '@/hooks/circles/useRestoreCircle';

import type { Circle } from '../../../src/types/circle';

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
              await restoreCircleMutation.mutateAsync(circle.id);

              fetchCircles();
            } catch (error: any) {
              console.log("RESTORE CIRCLE ERROR: ",error.response.data || error);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Circles</Text>

      <Link href="/create-circle" style={styles.createLink}>
        Create Circle
      </Link>

      <FlatList
        data={activeCircles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CircleCard
            name={item.name}
            circleType={item.circle_type}
            onPress={() => handleCirclePress(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No circles yet.
          </Text>
        }
        ListFooterComponent={
          archivedCircles.length > 0 ? (
            <View style={styles.archivedSection}>
              <Text style={styles.archivedTitle}>
                Archived Circles
              </Text>

              {archivedCircles.map((circle) => (
                <TouchableOpacity
                  key={circle.id}
                  style={styles.archivedCard}
                  onPress={() => handleRestoreCircle(circle)}
                >
                  <Text style={styles.archivedCardTitle}>
                    {circle.name}
                  </Text>

                  <Text style={styles.archivedCardSubtitle}>
                    Tap to restore
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
  },

  createLink: {
    color: '#60a5fa',
    fontSize: 16,
    marginBottom: 24,
  },

  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  },

  archivedSection: {
    marginTop: 24,
    paddingBottom: 40,
  },

  archivedTitle: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  archivedCard: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  archivedCardTitle: {
    color: '#ffffff',
    fontWeight: '600',
  },

  archivedCardSubtitle: {
    color: '#94a3b8',
    marginTop: 4,
  },
});