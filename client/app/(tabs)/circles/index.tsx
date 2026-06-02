import { useCallback, useState } from 'react';

import {
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
import type { Circle } from '../../../src/types/circle';


export default function CirclesScreen() {
  const [circles, setCircles] = useState<Circle[]>([]);

  const { tokens, isLoading } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && tokens) {
        fetchCircles();
      }
    }, [isLoading, tokens])
  );

  async function fetchCircles() {
    try {
      const response = await api.get('/circles/');
      setCircles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCirclePress(circleId: number) {
    console.log('PRESSED CIRCLE ID:', circleId);

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
        data={circles}
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

  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },

  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },

  cardSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },

  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  },
});